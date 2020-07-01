import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Utilities } from '../../src/app/utils';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {IState} from '../app/state-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
 private apiUrl = './assets/json/state.json';

  constructor(private http: HttpClient) { }

  getStates(): Observable<IState[]> {
    return this.http.get<IState[]>(`${this.apiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }



}
