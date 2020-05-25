import { Component, OnInit } from '@angular/core';
import { MusicService } from './music.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(
    private musicService: MusicService,
  ) { }

  ngOnInit(): void {

    this.loginSpotify();
  }

  loginSpotify() {
    //
    this.musicService.loginSpotify().subscribe(
      data => {
        console.log('loginSpotify', data);

      }
    );

  }

  getPlaylist() {
    //
    this.musicService.getPlaylist().subscribe(
      data => {
        console.log('getPlaylist', data);

      }
    );

  }

}
