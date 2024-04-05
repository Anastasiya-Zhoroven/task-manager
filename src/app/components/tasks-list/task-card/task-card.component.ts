import { Component } from '@angular/core';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {

  optionSelected(option: string) {
    console.log('Selected option:', option);
  }
}
