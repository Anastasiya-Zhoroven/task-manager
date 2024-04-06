import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../interfaces/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor (private readonly http: HttpClient) { }

  getProjects (): Observable<Project[]> {
    return this.http.get<Project[]>('http://localhost:3000/projects');
  }
}
