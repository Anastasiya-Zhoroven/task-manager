import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { TaskFormComponent } from 'src/app/forms/task-form/task-form.component';
import { Project } from 'src/app/interfaces/project.interface';
import { Task } from 'src/app/interfaces/task.interface';
import { TaskFilters } from 'src/app/interfaces/taskFilters.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ProjectsService } from 'src/app/services/projects.service';
import { TasksService } from 'src/app/services/tasks.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent {
  tasks: Task[] = [];
  todo: Task[] = [];
  inprogress: Task[] = [];
  done: Task[] = [];
  users: User[] = [];
  project!: Project;
  searchValue: string = '';
  filters: TaskFilters = {};

  constructor(
    public dialog: MatDialog,
    private readonly tasksService: TasksService,
    private readonly route: ActivatedRoute,
    private readonly usersService: UsersService,
    private readonly projectsService: ProjectsService,
  ) {
    let projectId: number = this.route.snapshot.params['id'];
    projectsService.getProject(projectId).subscribe(
      (response) => {
        this.project = response;
        usersService.getUsers({'ids': this.project.team}).subscribe(users => {
          this.users = users;
          this.fetchData();
        });
      }
    )
  }

  get badgeCount(): number {
    return (
      +!!this.filters.assignees?.length +
      +!!(this.filters.dueDate?.start || this.filters.dueDate?.end) +
      +!!this.filters.sortBy
    )
  }

  fetchData(): void {
    let projectId: number = this.route.snapshot.params['id'];
    this.tasksService.getTasks(projectId, this.searchValue, this.filters).subscribe(tasks => {
      this.tasks = tasks;
      this.todo = tasks.filter(task => task.status === "todo");
      this.inprogress = tasks.filter(task => task.status === "inprogress");
      this.done = tasks.filter(task => task.status === "done");
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log('event', event)
    console.log('container', event.container.data)
    console.log('previousContainer', event.previousContainer.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let task = event.container.data[event.currentIndex];
      task.status = event.container.id;
      this.tasksService.updateTask(task).subscribe();
    }
  }

  openForm(task?: Task) {
    let dialogRef = this.dialog.open(TaskFormComponent, {
      width: '40%',
      height: 'auto',
      data: {
        'task': task,
        'users': this.users,
        'projectId': this.route.snapshot.params['id'],
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task).subscribe(result => {
      this.fetchData();
    });
  }

  search(queryString: string) {
    this.searchValue = queryString;
    this.fetchData();
  }

  filtersFormSubmit(menuTrigger: MatMenuTrigger, data: TaskFilters) {
    menuTrigger.closeMenu();
    this.filters = data;
    this.fetchData();
  }
}
