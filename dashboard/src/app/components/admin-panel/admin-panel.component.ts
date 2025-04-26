import { ChangeDetectorRef, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { UserControllerService } from '../../services/user-controller.service';
import { FacadeService } from '../../services/playlist-user-facade.service';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin-panel',
  imports: [
    MatCardModule,
    MatTableModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  displayedColumns: string[] = [
    'name',
    'id',
    'lastAccessTime',
    'blocked',
    'actions',
  ];
  showTableCells: boolean = true; 

  users!: User[];

  constructor(
    private cdr: ChangeDetectorRef,
    private userController: UserControllerService,
    private facadeService: FacadeService
  ) {
    this.facadeService.getUser$().subscribe((users) => {
      this.users = users;
    });
  }

  toggleUserList(): void {
    this.showTableCells = !this.showTableCells;
    console.log(this.showTableCells);
  }

  toggleBlockUser(user: User) {
    this.userController.toggleBlock(user);
    console.log(user.blocked);
  }
}
