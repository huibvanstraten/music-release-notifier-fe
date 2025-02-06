import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {Artist} from './artist';
import {PkceLoginService} from '../../authorisation/pkce-login.service';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistSelectorService {
  baseUrl: string = environment.coreServiceBaseUrl
  artistUrl: string = this.baseUrl + '/api/v1/artist'
  userUrl: string = this.baseUrl + '/api/v1/user'
  token: string = ""

  constructor(private httpClient: HttpClient, private pkce: PkceLoginService) { }

  createUser(user: User): Observable<void> {
    return this.httpClient.post<void>(
      `${this.userUrl}/list`,
      user,
      { headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': `bearer ${this.token}`
      }) }
    );
  }

  getArtist(artistName: string): Observable<Artist> {
    this.token = this.pkce.oauthService.getAccessToken()
    console.log(`token is ${this.token}`)

    return this.httpClient.get<Artist>(`${this.artistUrl}/name`, {
      params: new HttpParams().set('artistName', artistName),
      headers: new HttpHeaders({ 'authorization': `bearer ${this.token}` })
    });
  }
}
