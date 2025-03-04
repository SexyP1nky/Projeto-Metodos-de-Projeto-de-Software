import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserControllerService {

  constructor() { }

  toggleBlock(user: User): void {
    user.blocked = !user.blocked;
  }

}
