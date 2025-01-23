import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import {Artist} from '../../artist';
import {User} from '../../user';
import {ArtistSelectorService} from '../../artist-selector.service';
import {PkceLoginService} from '../../../../authorisation/pkce-login.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userForm: FormGroup;
  artistSearchForm: FormGroup;
  artistList: Artist[] = [];
  artistError: string | null = null;


  constructor(
    private formBuilder: FormBuilder,
    private artistSelectorService: ArtistSelectorService,
    private pkceLoginService: PkceLoginService,
  ) {

    const claims = pkceLoginService.oauthService.getIdentityClaims()

    this.userForm = this.formBuilder.group({
      username: [{ value: claims['preferred_username'], disabled: true }],
    });


    this.artistSearchForm = this.formBuilder.group({
      artistName: ['']
    });
  }

  searchArtist(): void {
    const artistName = this.artistSearchForm.get('artistName')?.value.trim();
    if (!artistName) {
      this.artistError = 'Artist name cannot be empty.';
      return;
    }

    this.artistSelectorService.getArtist(artistName).subscribe({
      next: (artist: Artist) => {
        const exists = this.artistList.some(a => a.artistId === artist.artistId);
        if (exists) {
          this.artistError = 'Artist is already added.';
        } else {
          this.artistList.push(artist);
          this.artistError = null;
          this.artistSearchForm.reset();
        }
      },
      error: (error: { status: number; }) => {
        if (error.status === 404) {
          this.artistError = 'Artist could not be found.';
        } else {
          this.artistError = 'An unexpected error occurred.';
          console.error(error);
        }
      }
    });
  }

  removeArtist(index: number): void {
    this.artistList.splice(index, 1);
  }

  // TODO: somehow form is invalid when reaching this point. in html still valid
  onSubmit(): void {
    console.log(this.userForm.getRawValue())
    // if (this.userForm.valid && this.artistList.length > 0) {
      const user: User = {
        userId: this.pkceLoginService.oauthService.getIdentityClaims()['sub'],
        username: this.userForm.get('username')?.value,
        artistIdList: this.artistList.map(artist => artist.artistId)
      };

      this.artistSelectorService.createUser(user).subscribe({
        next: () => {
          this.userForm.reset();
          this.artistList = [];
        },
        error: (error) => {
          console.error("Error creating user:", error);
          // TODO: Display a user-friendly error message
        }
      });
    }
  // }
}
