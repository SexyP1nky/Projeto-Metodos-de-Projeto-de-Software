import { User } from "./user";

export class Admin extends User {
    constructor(name: string, id: string, lastAccessTime: Date, blocked: boolean) {
        super(name, id, lastAccessTime, blocked);  
    }

    manageUsers(): void {
        console.log('Managing users...');
    }
}