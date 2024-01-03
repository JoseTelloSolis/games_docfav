import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Games } from '../interfaces/games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor(private http: HttpClient) { }

  public getList(url: string): Observable<any> {
    return this.http.get<Games>(url);
  }
}
