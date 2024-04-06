import { Component, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsListComponent {
  // projectsSubject: Observable<Project[]> = new Observable<Project[]>();
  projects: Project[] = [];
  constructor(private readonly projectsService: ProjectsService) {
    projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }
  // ngOnInit (): void {
  //   this.projectsSubject = this.projectsService.projectsSubject.asObservable();
  // }

}
