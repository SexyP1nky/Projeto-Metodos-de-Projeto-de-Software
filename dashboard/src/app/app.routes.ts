import { Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { PlaylistPanelComponent } from './components/playlist-panel/playlist-panel.component';

export const routes: Routes = [
    { path: '', component: PlaylistPanelComponent },
    { path: 'admin', component: AdminPanelComponent },
    { path: 'login', component: LoginScreenComponent },
    { path: 'playlist', component: PlaylistPanelComponent },
    { path: '**', redirectTo: '' }
  ];