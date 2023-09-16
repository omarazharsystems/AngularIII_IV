import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { userData, usersdata } from '../userData';

@Injectable({
  providedIn: 'root',
})
//http:localhost:3000 https://template-json-server.vercel.app/api
export class AuthService {
  private apiServer = 'https://template-json-server.vercel.app/api';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient, private http: HttpClient) {}

  create(userData: any): Observable<userData> {
    return this.httpClient
      .post<userData>(
        this.apiServer + '/usersData/',
        JSON.stringify(userData),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
  getById(id: any): Observable<userData> {
    return this.httpClient
      .get<userData>(this.apiServer + '/usersData/' + id)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<userData[]> {
    return this.httpClient
      .get<userData[]>(this.apiServer + '/usersData/')
      .pipe(catchError(this.errorHandler));
  }
  find(id: any): Observable<userData[]> {
    return this.httpClient
      .get<userData[]>(this.apiServer + '/usersData/' + id)
      .pipe(catchError(this.errorHandler));
  }
  update(id: any, usersData: any): Observable<userData[]> {
    return this.httpClient
      .patch<userData[]>(
        this.apiServer + '/usersData/' + id,
        JSON.stringify(usersData),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  delete(id: any) {
    return this.httpClient
      .delete<userData>(this.apiServer + '/usersData/' + id, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
