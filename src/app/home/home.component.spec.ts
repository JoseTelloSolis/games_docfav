import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';
import { Games } from '../interfaces/games';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let testData: any[] = [
    {
      "id": 521,
      "title": "Diablo Immortal",
      "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
      "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
      "game_url": "https://www.freetogame.com/open/diablo-immortal",
      "genre": "MMOARPG",
      "platform": "PC (Windows)",
      "publisher": "Blizzard Entertainment",
      "developer": "Blizzard Entertainment",
      "release_date": "2022-06-02",
      "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
    },
    {
      "id": 343,
      "title": "Dragon Awaken",
      "thumbnail": "https://www.freetogame.com/g/343/thumbnail.jpg",
      "short_description": "A free-to-play, browser-based fantasy RPG developed \r\nby Game Hollywood and published by \r\nProficient City.",
      "game_url": "https://www.freetogame.com/open/dragon-awaken",
      "genre": "MMORPG",
      "platform": "Web Browser",
      "publisher": "Proficient city",
      "developer": "Game Hollywood",
      "release_date": "2017-01-03",
      "freetogame_profile_url": "https://www.freetogame.com/dragon-awaken"
    },
    {
      "id": 275,
      "title": "Dragon Saga",
      "thumbnail": "https://www.freetogame.com/g/275/thumbnail.jpg",
      "short_description": "A free to play arcade­-style side­-scrolling 3D MMORPG.",
      "game_url": "https://www.freetogame.com/open/dragon-saga",
      "genre": "MMORPG",
      "platform": "PC (Windows)",
      "publisher": "Gravity Interactive",
      "developer": "Gravity Interactive",
      "release_date": "2010-10-28",
      "freetogame_profile_url": "https://www.freetogame.com/dragon-saga"
    },
    {
      "id": 370,
      "title": "Dragon Blood",
      "thumbnail": "https://www.freetogame.com/g/370/thumbnail.jpg",
      "short_description": "A free-to-play browser MMORPG from 101XP, you'll harness your unique power and the blood of dragons that flows through your veins! ",
      "game_url": "https://www.freetogame.com/open/dragon-blood",
      "genre": "MMORPG",
      "platform": "Web Browser",
      "publisher": "101XP",
      "developer": "101XP",
      "release_date": "2016-04-16",
      "freetogame_profile_url": "https://www.freetogame.com/dragon-blood"
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [HomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should concatenate video url', () => {
    expect(component.getVideoURL(540)).toBe('https://www.freetogame.com/g/540/videoplayback.webm');
  });

  it('should filter games list', () => {
    expect(component.getFilterData(testData, 'dragon', 'Web Browser', 'MMORPG').length).toBe(2);
  });
});
