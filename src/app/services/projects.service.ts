import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  apiUrl: string = 'http://localhost:3000';
  constructor (private readonly http: HttpClient) { }

  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  addProject (project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projects`, project).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  updateProject (project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projects/${project.id}`, project).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }

  deleteProject (project: Project): Observable<Project> {
    return this.http.delete<Project>(`${this.apiUrl}/projects/${project.id}`).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError('Something went wrong; please try again later.');
      })
    );
  }
}
