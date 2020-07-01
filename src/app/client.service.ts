import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Utilities } from './utils';
import {IClientList } from '../app/client-list-model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://demo5838836.mockable.io/contact';


  getClientList(): Observable<IClientList[]> {
    return this.http.get<IClientList[]>(`${this.apiUrl}`)
      .pipe(
        catchError(Utilities.handleError)
      );   // ...errors if any
  }


}
