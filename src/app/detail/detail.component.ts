import { Component, OnInit, ElementRef  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GameService } from '../services/game.service';
import { Game } from '../interfaces/game';

import { environment } from '../../environments/environment';

const backgroundURL = environment.backgroundURL;
const videoURL = environment.videoURL;

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export class DetailComponent implements OnInit {

  public id: string | null = '';
  public gameDetail = {} as Game;
  public background: string | null = '';
  public urlVideo: string = '';

  constructor( private gameService: GameService, private route: ActivatedRoute, private elRef: ElementRef) { }

  ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');

    if(this.id != null) {
      this.urlVideo = videoURL.replace('%id%', this.id);
    }

    if(this.id != null) {
      this.background = backgroundURL.replace('%id%', this.id);
    }

    this.gameService.getDetail(this.id)
      .subscribe( resp => this.gameDetail = resp);
  }

  onMouseenter(gameDiv: HTMLElement) {

    const videoElement: any = gameDiv.querySelector('.video') as HTMLElement;
    const loader = gameDiv.querySelector('.loader-wrapper') as HTMLElement;
    loader.style.display = 'flex';

    videoElement.setAttribute("src", this.urlVideo);
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
