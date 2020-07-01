import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utilities } from './utils';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {IState} from '../client-form/state-model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
 private apiUrl = './assets/json/state.json';

  constructor(private http: HttpClient) { }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(`${this.apiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }



}
