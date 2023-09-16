import { HttpClient,HttpErrorResponse,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  throwError,Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Carousel } from '../pages/user-interface/carousel/carousel-create/carousel-create.component';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  private apiServer = "http://localhost:3000";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http : HttpClient) { }
  createCarousel(carouselData:any): Observable<Carousel[]> {
    return this.http.post<Carousel[]>(this.apiServer + '/carousel/', JSON.stringify(carouselData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  // getAllCarousel(): Observable<any> {
  //   return this.http.get<any>(this.apiServer + '/carousel/')
  //   .pipe(
  //     (catchError(this.errorHandler))
  //   )
  // }
  getAll(): Observable<Carousel[]> {
    return this.http.get<Carousel[]>(this.apiServer + '/carousel/')
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
 carouselData; 
  getCarouselData(): Observable<Carousel[]> {
    return of(this.carouselData);
  }
  
  
  updateCarousel(id:any,carouselData:any ): Observable<Carousel> {
    return this.http.patch<Carousel>(this.apiServer + '/carousel/' + id, JSON.stringify(carouselData), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
  deleteCarousel(id:any):Observable<Carousel>{
   
    return this.http.delete<Carousel>(this.apiServer + '/carousel/' + id,this.httpOptions)
   
  }
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
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
