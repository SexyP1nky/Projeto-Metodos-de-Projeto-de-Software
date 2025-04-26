import { forwardRef, Inject, Injectable } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import {
  TextReportGenerator,
  PDFReportGenerator,
} from '../../models/reportGenerator';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { FacadeService } from '../playlist-user-facade.service';
import { UserControllerService } from '../user-controller.service';
import { UserStateService } from '../../user-state.service';

@Injectable({
  providedIn: 'root',
})
export class ReportService {

  users!: User[];

  userSub!: Subscription;
  constructor(private userStateService: UserStateService) {
    this.userStateService.users$.subscribe((users) => {
      this.users = users;
    });
  }

  generateTextReport() {
    new TextReportGenerator().generateReport(this.users);
  }

  generatePDFReport() {
    new PDFReportGenerator().generateReport(this.users);
  }
}
