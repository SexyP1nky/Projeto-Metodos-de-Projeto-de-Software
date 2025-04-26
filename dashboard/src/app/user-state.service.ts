import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {

  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  updateUsers$(users: User[]) {
    this.usersSubject.next(users);
  }

  getUsers$(): Observable<User[]> {
    return this.usersSubject.asObservable()
  }
}
