import { Component, EventEmitter, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-priorities',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './priorities.component.html',
  styleUrl: './priorities.component.scss'
})
export class PrioritiesComponent {

  @Output() priorityEmitter = new EventEmitter<any>()

  addPriority(value: any) {
    this.priorityEmitter.emit(value)

  }
}
