import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {UserComponent} from './features/artist-selector/components/user/user.component';
import {GradientBgComponent} from './features/artist-selector/components/gradient-bg/gradient-bg.component';

@Component({
  selector: 'app-root',
  imports: [GradientBgComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Music Release Notifier';
}
