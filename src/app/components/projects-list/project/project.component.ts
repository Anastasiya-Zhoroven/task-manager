import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project!: Project;
  @Input() users!: User[];
  @Output() editProject = new EventEmitter<Project>()
  @Output() deleteProject = new EventEmitter<Project>()
  selectedUsers: User[] = [];
  usersToAdd: User[] = [];

  constructor(private readonly projectsService: ProjectsService) { }

  ngOnInit() {
    this.filterTeam();
  }

  filterTeam() {
    this.selectedUsers = this.users.filter(user => user?.id && this.project.team.includes(user?.id));
    this.usersToAdd = this.users.filter(user => user?.id && !this.project.team.includes(user?.id));
  }

  addUser(userId?: number) {
    if (userId) {
      this.project.team.push(userId);
      this.projectsService.updateProject(this.project).subscribe(
        (response) => this.filterTeam()
      )
    }
  }

  editProjectClick(): void {
    this.editProject.emit(this.project);
  }

  deleteProjectClick(): void {
    this.deleteProject.emit(this.project);
  }
}
