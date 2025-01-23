import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-log-off-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout-widget.component.html',
  styleUrls: ['./logout-widget.component.css']
})
export class LogoutWidgetComponent implements OnInit {
  private oauthService = inject(OAuthService);

  isLoggedIn = false;

  ngOnInit() {
    this.isLoggedIn = this.oauthService.hasValidAccessToken();

    this.oauthService.events.subscribe(() => {
      this.isLoggedIn = this.oauthService.hasValidAccessToken();
    });
  }

  onLogoutClick() {
      this.oauthService.logOut();
  }
}
