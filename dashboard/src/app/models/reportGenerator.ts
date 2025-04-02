import { Playlist } from './playlist';
import { User } from './user';

import { jsPDF } from 'jspdf';

export abstract class ReportGenerator {
  generateReport(users: User[]): void {
    const content = this.generateContent(users);
    this.outputReport(content);
  }

  protected abstract generateContent(users: User[]): string;
  protected abstract outputReport(content: string): void;
}

export class TextReportGenerator extends ReportGenerator {
  protected generateContent(users: User[]): string {
    let content = '';

    users.forEach((user) => {
      content += `User ${user.name} has ${user.playlists.size} playlists.\n\n`;
      user.playlists.forEach((playlist) => {
        content += `Playlist: ${playlist.title}\n`;
        if (playlist.tracks.length > 0) {
          content += 'Tracks:\n';
          playlist.tracks.forEach((track) => {
            content += `- ${track.title} (${track.duration} ms) [${track.URI}]\n`;
          });
        } else {
          content += 'No tracks in this playlist.\n';
        }
        content += '\n';
      });
      content += '\n';
    });

    return content;
  }

  protected outputReport(content: string): void {
    console.log(content);
  }
}

export class PDFReportGenerator extends ReportGenerator {
  protected generateContent(users: User[]): string {
    let content = '';

    users.forEach((user) => {
      content += `User ${user.name} has ${user.playlists.size} playlists.\n\n`;
      user.playlists.forEach((playlist) => {
        content += `Playlist: ${playlist.title}\n`;
        if (playlist.tracks.length > 0) {
          content += 'Tracks:\n';
          playlist.tracks.forEach((track) => {
            content += `- ${track.title} (${track.duration} ms) [${track.URI}]\n`;
          });
        } else {
          content += 'No tracks in this playlist.\n';
        }
        content += '\n';
      });
      content += '\n';
    });

    return content;
  }

  protected outputReport(content: string): void {
    const doc = new jsPDF();
    doc.text(content, 10, 10);
    doc.save('report.pdf');
  }
}
