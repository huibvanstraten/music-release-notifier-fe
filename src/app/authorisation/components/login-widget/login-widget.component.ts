import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-auth-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login-widget.component.html',
  styleUrls: ['./login-widget.component.css']
})
export class LoginWidgetComponent implements OnInit {
  private oauthService = inject(OAuthService);

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.oauthService.hasValidAccessToken();

    this.oauthService.events.subscribe(() => {
      this.isLoggedIn = this.oauthService.hasValidAccessToken();
    });
  }

  onAuthClick() {
    if (this.isLoggedIn) {
      this.oauthService.logOut();
    } else {
      this.oauthService.initCodeFlow();
    }
  }
}
