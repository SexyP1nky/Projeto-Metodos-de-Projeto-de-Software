import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminPanelComponent, LoginScreenComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
}
