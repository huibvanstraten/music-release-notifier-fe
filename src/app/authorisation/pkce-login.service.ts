import {inject, Injectable} from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';


export const authConfig: AuthConfig = {
  issuer: 'http://localhost:7080/realms/music-release-notifier',
  redirectUri: window.location.origin,
  clientId: 'music-release-notifier-fe',
  responseType: 'code',
  strictDiscoveryDocumentValidation: true,
  scope: 'openid profile email offline_access', // TODO: check which scopes are necessary
  showDebugInformation: true,
  disablePKCE: false,
};

@Injectable({
  providedIn: 'root'
})
export class PkceLoginService {
   oauthService = inject(OAuthService);

  initiateAuth(): void {
    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      console.log('Valid token? ', this.oauthService.hasValidAccessToken());
    });
  }
}
