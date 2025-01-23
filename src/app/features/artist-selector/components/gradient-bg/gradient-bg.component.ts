import {Component, inject, OnInit} from '@angular/core';
import {UserComponent} from '../user/user.component';
import {OAuthService} from 'angular-oauth2-oidc';
import {LoginWidgetComponent} from '../../../../authorisation/components/login-widget/login-widget.component';
import {NgIf} from '@angular/common';
import {LogoutWidgetComponent} from '../../../../authorisation/components/logout-widget/logout-widget.component';

@Component({
  selector: 'app-gradient-bg',
  imports: [
    UserComponent,
    LoginWidgetComponent,
    NgIf,
    LogoutWidgetComponent
  ],
  templateUrl: './gradient-bg.component.html',
  styleUrls: ['./gradient-bg.component.css']
})
export class GradientBgComponent implements OnInit {
  private oauthService = inject(OAuthService);

  userProfile: any;

  ngOnInit(): void {
    if (this.oauthService.hasValidAccessToken()) {
      this.oauthService.loadUserProfile().then(profile => {
        this.userProfile = profile;
        console.log(`profile: ${this.userProfile}`)
      });
    } else {
      this.userProfile = { error: 'Not logged in!' };
    }
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken()
  }

}
