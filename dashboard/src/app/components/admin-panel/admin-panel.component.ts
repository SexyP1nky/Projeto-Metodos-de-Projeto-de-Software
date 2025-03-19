import { ChangeDetectorRef, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UserControllerService } from '../../services/user-controller.service';

@Component({
  selector: 'app-admin-panel',
  imports: [MatCardModule, MatTableModule, MatIconModule,CommonModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {
  displayedColumns: string[] = ['name', 'id', 'lastAccessTime', 'blocked', 'actions'];
  showTableCells: boolean = true;  // Toggle visibility of the table cells

  constructor(private cdr: ChangeDetectorRef, private userController: UserControllerService) {
    
  }
  users: User[] = [
    new User('John Doe', '257854309314592768', '12345689', new Date('2025-02-23T14:45:00Z'), false),
    new User('Jane Smith', '311968496466526208', '12345689', new Date('2025-02-22T08:30:00Z'), false,),
    new User('Sam Green', '656706124560728065', '12345689', new Date('2025-02-20T19:15:00Z'), true)
  ];


  toggleUserList(): void {
    this.showTableCells = !this.showTableCells;
    console.log(this.showTableCells)
  }

  toggleBlockUser(user: User) {
    this.userController.toggleBlock(user)
    console.log(user.blocked)
  }
}
