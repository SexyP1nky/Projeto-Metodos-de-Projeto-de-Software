import { Injectable } from '@angular/core';
import { PlaylistService } from '../playlist.service';
import {
  TextReportGenerator,
  PDFReportGenerator,
} from '../../models/reportGenerator';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor() {}

  generateTextReport(users: User[]) {
    new TextReportGenerator().generateReport(users);
  }

  generatePDFReport(users: User[]) {
    new PDFReportGenerator().generateReport(users);
  }
}
