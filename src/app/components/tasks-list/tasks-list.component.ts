import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/interfaces/task.interface';
import { TasksService } from 'src/app/services/tasks.service';

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

  constructor(private readonly tasksService: TasksService, private readonly route: ActivatedRoute) {
    let projectId: number = route.snapshot.params['id'];
    tasksService.getTasks(projectId).subscribe(tasks => {
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
}
