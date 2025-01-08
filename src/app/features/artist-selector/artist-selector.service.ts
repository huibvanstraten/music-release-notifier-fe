import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {Artist} from './artist';


@Injectable({
  providedIn: 'root'
})
export class ArtistSelectorService {
  url: string = 'http://localhost:8080/api/v1/artist'

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<void> {
    let params = new HttpParams().set('username', user.username);
    user.artistIdList.forEach((artistId) => {
      params = params.append('artistIdList', artistId);
    });

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.httpClient.post<void>(`${this.url}/user`, null, {
      params: params,
      headers: headers,
    });
  }

  getArtist(artistName: string): Observable<Artist> {
    let params = new HttpParams().set('artistName', artistName);

    return this.httpClient.get<Artist>(this.url, {params: params });
  }
}
