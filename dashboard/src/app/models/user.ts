export class User {
    name!: string;
    id!: string;
    lastAccessTime!: Date;
    blocked!: boolean;

    constructor(name: string, id: string, lastAccessTime: Date, blocked: boolean) {
        this.name = name;
        this.id = id;
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