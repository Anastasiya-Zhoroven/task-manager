import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  @Input() project!: Project;
  @Output() editProject = new EventEmitter<Project>()
  @Output() deleteProject = new EventEmitter<Project>()

  editProjectClick(): void {
    this.editProject.emit(this.project);
  }

  deleteProjectClick(): void {
    this.deleteProject.emit(this.project);
  }
}
