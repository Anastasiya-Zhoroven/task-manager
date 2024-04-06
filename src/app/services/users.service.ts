import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl: string = 'http://localhost:3000';

  constructor (private readonly http: HttpClient) { }

  getUsers (userEmail?: string, userPassword?: string): Observable<User[]> {
    let params = new HttpParams();
    
    if (userEmail) {
      params = params.append('email', userEmail);
    }
    if (userPassword) {
      params = params.append('password', userPassword);
    }

    return this.http.get<User[]>(`${this.apiUrl}/users`, { params: params });
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
