import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from './user';
import {Observable} from 'rxjs';
import {Artist} from './artist';


@Injectable({
  providedIn: 'root'
})
export class ArtistSelectorService {
  artistUrl: string = 'http://localhost:8080/api/v1/artist'
  userUrl: string = 'http://localhost:8080/api/v1/user'

  constructor(private httpClient: HttpClient) { }

  createUser(user: User): Observable<void> {
    return this.httpClient.post<void>(
      `${this.userUrl}/list`,
      user,
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
    );
  }


  getArtist(artistName: string): Observable<Artist> {
    let params = new HttpParams().set('artistName', artistName);

    return this.httpClient.get<Artist>(`${this.artistUrl}/name`, {params: params });
  }
}
