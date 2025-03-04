export class User {
    name!: string;
    id!: string;
    lastAccessTime!: Date;
    blocked!: boolean;
    password!: string;

    constructor(name: string, id: string, password: string, lastAccessTime: Date, blocked: boolean) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.lastAccessTime = lastAccessTime;
        this.blocked = blocked;
    }

    login(): boolean {
        return true;
    }

    logout(): void {
        return;
    }
}
