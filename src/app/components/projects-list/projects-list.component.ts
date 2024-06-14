import { Component, ViewEncapsulation } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { ProjectsService } from 'src/app/services/projects.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../../forms/project-form/project-form.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectsListComponent {
  projects: Project[] = [];
  searchValue: string = '';
  users: User[] = [];

  constructor(private readonly projectsService: ProjectsService, private readonly usersService: UsersService, public dialog: MatDialog) {
    usersService.getUsers().subscribe(users => {
      this.users = users;
      this.fetchData();
    });
  }

  fetchData(): void {
    this.projectsService.getProjects(this.searchValue).subscribe(projects => {
      this.projects = projects;
    });
  }

  openForm(project?: Project) {
    let dialogRef = this.dialog.open(ProjectFormComponent, {
      width: '40%',
      height: 'auto',
      data: project
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  deleteProject(project: Project) {
    this.projectsService.deleteProject(project).subscribe(result => {
      this.fetchData();
    });
  }

  search(queryString: string) {
    this.searchValue = queryString;
    this.fetchData();
  }
}
