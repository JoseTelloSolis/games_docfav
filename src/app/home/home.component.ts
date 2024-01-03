import { Component, OnInit } from '@angular/core';
import { GamesService } from '../services/games.service';

import { Games } from '../interfaces/games';
import { from } from 'rxjs';
import { finalize, groupBy } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const baseURL = environment.baseURL;
const videoURL = environment.videoURL;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public gamesList: Games[] = [];
  public gamesListFull: Games[] = [];
  public genres: any[] = [];
  public platforms: any[] = [];
  public count: number = 0;

  constructor( private gamesService: GamesService) { }

  ngOnInit() {
      this.gamesService.getList(baseURL)
        .pipe(
          finalize(() => {

            this.count = this.gamesList.length;
            this.gamesListFull = this.gamesList;

            from(this.gamesList).pipe(groupBy(item => item.genre))
              .subscribe(result => this.genres.push( result ));

            from(this.gamesList).pipe(groupBy(item => item.platform))
              .subscribe(result => this.platforms.push( result ));
          })
        )
        .subscribe( resp => this.gamesList.push( ...resp ));
  }

  filters(name: string, platform: string, genre: string) {
    this.gamesList = this.getFilterData(this.gamesListFull, name, platform, genre);
  }

  getFilterData(gameList: Games[], name: string, platform: string, genre: string) {
    return gameList.filter(game => game.title.toLowerCase().includes(name.toLowerCase()) && game.platform.includes(platform) && game.genre.includes(genre));
  }

  getVideoURL(id: any) {
    return videoURL.replace('%id%', id);
  }

  onMouseenter(id: number, gameDiv: HTMLElement) {
    let urlVideo = this.getVideoURL(id);

    const videoElement: any = gameDiv.querySelector('.video') as HTMLElement;
    const loader = gameDiv.querySelector('.loader-wrapper') as HTMLElement;
    loader.style.display = 'flex';

    videoElement.setAttribute("src", urlVideo);
    videoElement.muted = true;

    videoElement.oncanplay = () => {
      loader.style.display = 'none';
    };
    videoElement.load();
    videoElement.play().catch((e: any) => {console.log(e)});
    videoElement.currentTime = 15;
  }

  onMouseleave(gameDiv: HTMLElement) {
    const loader = gameDiv.querySelector('.loader-wrapper') as HTMLElement;
    const videoElement: any = gameDiv.querySelector('.video') as HTMLElement;

    videoElement.pause();
    videoElement.removeAttribute('src');
    videoElement.load();
    loader.style.display = 'none';
  }

}
