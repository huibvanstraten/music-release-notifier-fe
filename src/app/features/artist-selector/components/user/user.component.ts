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

  // URL for the getArtist API
  private url: string = 'https://api.example.com/getArtist'; // Replace with actual URL

  constructor(
    private formBuilder: FormBuilder,
    private artistSelectorService: ArtistSelectorService
  ) {
    // Initialize the main user form
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required]
    });

    // Initialize the artist search form
    this.artistSearchForm = this.formBuilder.group({
      artistName: ['', Validators.required]
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
        const exists = this.artistList.some(a => a.streamingId === artist.streamingId);
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

  /**
   * Removes an artist from the artistList based on the index.
   * @param index The index of the artist to remove.
   */
  removeArtist(index: number): void {
    this.artistList.splice(index, 1);
  }

  /**
   * Handles the form submission by sending the user data.
   */
  onSubmit(): void {
    if (this.userForm.valid && this.artistList.length > 0) {
      const user: User = {
        username: this.userForm.get('username')?.value,
        artistIdList: this.artistList.map(artist => artist.streamingId)
      };

      this.artistSelectorService.createUser(user).subscribe({
        next: (response) => {
          console.log("User created successfully:", response);
          this.userForm.reset();
          this.artistList = [];
        },
        error: (error) => {
          console.error("Error creating user:", error);
          // TODO: Display a user-friendly error message
        }
      });
    }
  }
}
