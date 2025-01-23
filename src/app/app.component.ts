import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PkceLoginService} from './authorisation/pkce-login.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private pkceLoginService: PkceLoginService) {
  }

  ngOnInit(): void {
    this.pkceLoginService.initiateAuth()
  }
}
