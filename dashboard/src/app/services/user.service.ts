import { Injectable } from '@angular/core';
import { User } from '../models/user';  
import * as fs from 'fs';
import * as crypto from 'crypto';
import { promises as fsPromises } from 'fs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userFile = './users.dat'; // Caminho do arquivo binário onde os usuários serão armazenados
  private users: User[] = []; // Coleção em memória para os usuários
  private initialized = false;

  constructor() {
    this.initialize();
  }

  // Inicializa o serviço carregando os usuários do arquivo
  private async initialize(): Promise<void> {
    if (!this.initialized) {
      try {
        this.users = await this.loadFromFile();
        this.initialized = true;
      } catch (error) {
        console.error('Erro ao inicializar serviço de usuários:', error);
        this.users = [];
        this.initialized = true;
      }
    }
  }

  // Função para adicionar um novo usuário
  async addUser(name: string, id: string, password: string): Promise<User> {
    await this.ensureInitialized();
    
    try {
      // Verificação se o usuário já existe
      if (await this.checkUserExists(id)) {
        throw new Error(`Usuário com login '${id}' já existe.`);
      }

      // Validações
      this.validateLogin(id);
      this.validatePassword(password);

      // Criação do usuário
      const user = new User(name, id, this.hashPassword(password), new Date(), false);

      // Adicionando à coleção
      this.users.push(user);

      // Persistindo a coleção no arquivo binário
      await this.saveCollection();
      
      return user;
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      throw error; // Propagar o erro para tratamento externo
    }
  }

  // Função para obter todos os usuários
  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();
    return [...this.users]; // Retorna uma cópia da coleção
  }

  // Função para obter um usuário pelo ID
  async getUserById(id: string): Promise<User | undefined> {
    await this.ensureInitialized();
    return this.users.find(user => user.id === id);
  }

  // Função para atualizar um usuário
  async updateUser(user: User): Promise<void> {
    await this.ensureInitialized();
    
    const index = this.users.findIndex(u => u.id === user.id);
    if (index === -1) {
      throw new Error(`Usuário com ID ${user.id} não encontrado.`);
    }
    
    this.users[index] = user;
    await this.saveCollection();
  }

  // Função para remover um usuário
  async deleteUser(id: string): Promise<void> {
    await this.ensureInitialized();
    
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    
    if (this.users.length === initialLength) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    
    await this.saveCollection();
  }

  // Função para autenticar um usuário
  async authenticateUser(id: string, password: string): Promise<User> {
    await this.ensureInitialized();
    
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    
    if (user.blocked) {
      throw new Error('Usuário bloqueado');
    }
    
    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      throw new Error('Senha incorreta');
    }
    
    // Atualiza o horário de último acesso
    user.lastAccessTime = new Date();
    await this.updateUser(user);
    
    return user;
  }

  // Função para bloquear um usuário
  async blockUser(id: string): Promise<void> {
    await this.ensureInitialized();
    
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    
    user.blocked = true;
    await this.updateUser(user);
  }

  // Função para desbloquear um usuário
  async unblockUser(id: string): Promise<void> {
    await this.ensureInitialized();
    
    const user = await this.getUserById(id);
    if (!user) {
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }
    
    user.blocked = false;
    await this.updateUser(user);
  }

  // Validação do login (ID)
  validateLogin(id: string): void {
    if (id.length > 12) {
      throw new Error('O login não pode ter mais de 12 caracteres.');
    }
    if (!/^[a-zA-Z]+$/.test(id)) {  // Login não pode ter números
      throw new Error('O login não pode conter números.');
    }
    if (id === '') {
      throw new Error('O login não pode ser vazio.');
    }
  }

  // Validação da senha (seguindo as regras do AWS IAM)
  validatePassword(password: string): void {
    const minLength = 8;
    const maxLength = 128;

    if (password.length < minLength || password.length > maxLength) {
      throw new Error(`A senha deve ter entre ${minLength} e ${maxLength} caracteres.`);
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /\d/;
    const specialChar = /[!@#$%^&*()_+={}\[\]|';:,.<>?]/;

    const validTypes = [upperCase, lowerCase, number, specialChar];
    const matchedTypes = validTypes.filter(regex => regex.test(password)).length;

    if (matchedTypes < 3) {
      throw new Error('A senha deve conter no mínimo três tipos de caracteres: maiúsculas, minúsculas, números ou caracteres especiais.');
    }
  }

  // Função para "hashing" da senha (utilizando o SHA-256)
  hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Função para garantir que o serviço foi inicializado
  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.initialize();
    }
  }

  // Função para salvar a coleção completa em um arquivo binário
  private async saveCollection(): Promise<void> {
    try {
      // Converte a coleção para um formato serializado
      const serializedUsers = this.users.map(user => ({
        name: user.name,
        id: user.id,
        password: user.password,
        lastAccessTime: user.lastAccessTime.toISOString(),
        blocked: user.blocked
      }));

      // Converte para buffer binário e salva
      const buffer = Buffer.from(JSON.stringify(serializedUsers));
      await fsPromises.writeFile(this.userFile, buffer);
    } catch (error) {
      console.error('Erro ao salvar coleção de usuários no arquivo:', error);
      throw new Error('Falha ao salvar a coleção de usuários.');
    }
  }

  // Função para carregar usuários do arquivo
  private async loadFromFile(): Promise<User[]> {
    try {
      if (!fs.existsSync(this.userFile)) {
        return [];
      }

      const data = await fsPromises.readFile(this.userFile);
      const serializedUsers = JSON.parse(data.toString());
      
      // Converte os dados serializados de volta para objetos User
      return serializedUsers.map((userData: any) => 
        new User(
          userData.name, 
          userData.id, 
          userData.password, 
          new Date(userData.lastAccessTime), 
          userData.blocked
        )
      );
    } catch (error) {
      console.error('Erro ao carregar usuários do arquivo:', error);
      throw new Error('Falha ao carregar os usuários.');
    }
  }

  // Função para verificar se o login existe
  async checkUserExists(id: string): Promise<boolean> {
    await this.ensureInitialized();
    return this.users.some(user => user.id === id);
  }
}