import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from 'src/app/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

interface Status {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  minDate: Date = new Date();
  form!: FormGroup;
  users: User[] = [];
  instance: Task | undefined;
  projectId: number;
  statuses: Status[] = [
    {value: 'todo', viewValue: 'To do'},
    {value: 'inprogress', viewValue: 'In progress'},
    {value: 'done', viewValue: 'Done'},
  ];

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private readonly tasksService: TasksService,
      public dialogRef: MatDialogRef<TaskFormComponent>
    ) { 
      this.instance = data['task'];
      this.projectId = data['projectId'];
      this.users = data['users'];
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        assignees: ['', [Validators.required]],
        status: ['', [Validators.required]],
        due_date: ['', [Validators.required]]
      });
      if (this.instance) {
        this.form.patchValue({
          title: this.instance.title,
          description: this.instance.description,
          assignees: this.instance.assignees,
          status: this.instance.status,
          due_date: new Date(this.instance.due_date)
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

    getAssigneesErrorMessage() {
      const control = this.form.get('assignees');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      } else {
        return '';
      }
    }

    getDueDateErrorMessage() {
      const control = this.form.get('due_date');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      } else {
        return '';
      }
    }

    getStatusErrorMessage() {
      const control = this.form.get('status');
      if (control?.hasError('required') && (control.dirty || control.touched)) {
        return 'You must enter a value';
      } else {
        return '';
      }
    }

    onSubmit() {
      if (this.form.valid) {
        this.form.value.due_date = this.form.value.due_date.getTime();
        if (this.instance) {
          this.instance.title = this.form.value.title;
          this.instance.description = this.form.value.description;
          this.instance.assignees = this.form.value.assignees;
          this.instance.due_date = this.form.value.due_date;
          this.instance.status = this.form.value.status;

          this.tasksService.updateTask(this.instance).subscribe(
            (response) => {
              this.dialogRef.close(true);
            }
          );
        } else {
          let data = this.form.value;
          data['project_id'] = this.projectId;
          this.tasksService.addTask(data).subscribe(
            (response) => {
              this.dialogRef.close(true);
            }
          );
        }
      }
    }
}
