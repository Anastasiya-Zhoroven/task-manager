import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/projects.service';
import { UsersService } from 'src/app/services/users.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from 'src/app/interfaces/project.interface';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
    form!: FormGroup;
    users: User[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) public instance: Project, private fb: FormBuilder, private readonly usersService: UsersService, private readonly projectsService: ProjectsService, public dialogRef: MatDialogRef<ProjectFormComponent>) { 
      usersService.getUsers().subscribe(users => {
        this.users = users
      });
    }
  
    ngOnInit(): void {
      this.form = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        team: ['', [Validators.required]]
      });
      if (this.instance) {
        this.form.patchValue({
          title: this.instance.title,
          description: this.instance.description,
          team: this.instance.team
        });
      }
    }

    getTitleErrorMessage() {
      const control = this.form.get('title');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      }
      return '';
    }

    getDescriptionErrorMessage() {
      const control = this.form.get('description');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      } else {
        return '';
      }
    }

    getTeamErrorMessage() {
      const control = this.form.get('team');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      } else {
        return '';
      }
    }

    onSubmit() {
      if (this.form.valid) {
        if (this.instance) {
          this.instance.title = this.form.value.title;
          this.instance.description = this.form.value.description;
          this.instance.team = this.form.value.team;

          this.projectsService.updateProject(this.instance).subscribe(
            (response) => {
              this.dialogRef.close(true);
            }
          );
        } else {
          this.projectsService.addProject(this.form.value).subscribe(
            (response) => {
              this.dialogRef.close(true);
            }
          );
        }
      }
    }
}
