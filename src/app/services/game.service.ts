import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Game } from '../interfaces/game';

const detailURL = environment.detailURL;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public getDetail(id: any): Observable<any> {
    return this.http.get<Game>(detailURL + id);
  }
}
