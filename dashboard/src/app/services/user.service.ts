import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
// import * as fs from 'fs';
// import * as crypto from 'crypto';
// import { promises as fsPromises } from 'fs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private duration: number = 5000;
  private userFile = './users.dat';
  private initialized = false;
  private _snackBar = inject(MatSnackBar);

  private user!: User;
  private users: User[] = [];
  private user$ = new BehaviorSubject<User[]>([]);

  constructor() {
    console.log('inside userService constructor', this.user$.getValue())
  }

  private async initialize(): Promise<void> {
    // if (!this.initialized) {
    //   try {
    //     this.users = await this.loadFromFile();
    //     this.initialized = true;
    //   } catch (error) {
    //     console.error('Erro ao inicializar serviço de usuários:', error);
    //     this.users = [];
    //     this.initialized = true;
    //   }
    // }
  }

  updateUser$(users: User[]) {
    console.log('Updating user', users);
    this.user$.next(users);
  }

  getUser$(): Observable<User[]> {

    return this.user$.asObservable();
  }

  // Função para adicionar um novo usuário
  async addUser(login: string, id: string, password: string): Promise<User> {
    if (await this.checkUserExists(login)) {
      throw new Error(`Usuário com login '${login}' já existe.`);
    }

    if (login === "" || password === "") {
      throw new Error('Login ou senha com campos vazios.')
    }
    const user = new User(
      login,
      id,
      this.hashPassword(password),
      new Date(),
      false
    );

    const updatedUsers = [...this.user$.getValue(), user];
    this.updateUser$(updatedUsers);
    console.log({ updatedUsers });

    return user;
  }

  async getAllUsers(): Promise<User[]> {
    await this.ensureInitialized();
    return [...this.users];
  }

  // Função para obter um usuário pelo ID
  async getUserById(id: string): Promise<User | undefined> {
    await this.ensureInitialized();
    return this.users.find((user) => user.id === id);
  }

  // Função para atualizar um usuário
  async updateUser(user: User): Promise<void> {
    await this.ensureInitialized();

    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      this.openSnackBar('Usuário com ID ${user.id} não encontrado.');
      throw new Error(`Usuário com ID ${user.id} não encontrado.`);
    }

    this.users[index] = user;
    await this.saveCollection();
  }

  // Função para remover um usuário
  async deleteUser(id: string): Promise<void> {
    await this.ensureInitialized();

    const initialLength = this.users.length;
    this.users = this.users.filter((user) => user.id !== id);

    if (this.users.length === initialLength) {
      this.openSnackBar(`Usuário com ID ${id} não encontrado.`);
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }

    await this.saveCollection();
  }

  // Função para autenticar um usuário
  async authenticateUser(id: string, password: string): Promise<User> {
    await this.ensureInitialized();

    const user = await this.getUserById(id);
    if (!user) {
      this.openSnackBar(`Usuário não encontrado`);
      throw new Error('Usuário não encontrado');
    }

    if (user.blocked) {
      this.openSnackBar(`Usuário bloqueado`);
      throw new Error('Usuário bloqueado');
    }

    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      this.openSnackBar(`Senha incorreta`);
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
      this.openSnackBar(`Usuário com ID ${id} não encontrado.`);
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
      this.openSnackBar(`Usuário com ID ${id} não encontrado.`);
      throw new Error(`Usuário com ID ${id} não encontrado.`);
    }

    user.blocked = false;
    await this.updateUser(user);
  }

  // Validação do login (ID)
  validateLogin(login: string): void {
    if (login.length > 12) {
      this.openSnackBar(`O login não pode ter mais de 12 caracteres.`);
      throw new Error('O login não pode ter mais de 12 caracteres.');
    }
    if (!/^[a-zA-Z]+$/.test(login)) {
      // Login não pode ter números
      this.openSnackBar(`O login não pode conter números.`);
      throw new Error('O login não pode conter números.');
    }
    if (login === '') {
      this.openSnackBar(`O login não pode ser vazio.`);
      throw new Error('O login não pode ser vazio.');
    }
  }

  // Validação da senha (seguindo as regras do AWS IAM)
  validatePassword(password: string): void {
    const minLength = 8;
    const maxLength = 128;

    if (password.length < minLength || password.length > maxLength) {
      this.openSnackBar(
        `A senha deve ter entre ${minLength} e ${maxLength} caracteres.`
      );
      throw new Error(
        `A senha deve ter entre ${minLength} e ${maxLength} caracteres.`
      );
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;
    const number = /\d/;
    const specialChar = /[!@#$%^&*()_+\-=\[\]{}|']/;

    const validTypes = [upperCase, lowerCase, number, specialChar];
    const matchedTypes = validTypes.filter((regex) =>
      regex.test(password)
    ).length;

    if (matchedTypes < 3) {
      this.openSnackBar(
        `A senha deve conter no mínimo três tipos de caracteres: maiúsculas, minúsculas, números ou caracteres especiais.`
      );
      throw new Error(
        'A senha deve conter no mínimo três tipos de caracteres: maiúsculas, minúsculas, números ou caracteres especiais.'
      );
    }
  }

  // Função para "hashing" da senha (utilizando o SHA-256)
  hashPassword(password: string): string {
    return password;
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
      const serializedUsers = this.users.map((user) => ({
        name: user.name,
        id: user.id,
        password: user.password,
        lastAccessTime: user.lastAccessTime.toISOString(),
        blocked: user.blocked,
      }));

      // Converte para buffer binário e salva
      const buffer = Buffer.from(JSON.stringify(serializedUsers));
      // await fsPromises.writeFile(this.userFile, buffer);
    } catch (error) {
      console.error('Erro ao salvar coleção de usuários no arquivo:', error);
      this.openSnackBar(`Falha ao salvar a coleção de usuários.`);
      throw new Error('Falha ao salvar a coleção de usuários.');
    }
  }

  // Função para carregar usuários do arquivo
  private async loadFromFile(): Promise<void> {
    try {
      // // if (!fs.existsSync(this.userFile)) {
      // //   return [];
      // // }
      // // const data = await fsPromises.readFile(this.userFile);
      // const serializedUsers = JSON.parse(data.toString());
      // // Converte os dados serializados de volta para objetos User
      // return serializedUsers.map((userData: any) =>
      //   new User(
      //     userData.name,
      //     userData.id,
      //     userData.password,
      //     new Date(userData.lastAccessTime),
      //     userData.blocked
      //   )
      // );
    } catch (error) {
      console.error('Erro ao carregar usuários do arquivo:', error);
      this.openSnackBar(`Falha ao carregar os usuários.`);
      throw new Error('Falha ao carregar os usuários.');
    }
  }

  // Função para verificar se o login existe
  private async checkUserExists(name: string): Promise<boolean> {
    console.log(this.user);
    const users = this.user$.getValue();
    return users.some((user) => user.name === name);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: this.duration,
    });
  }
}
