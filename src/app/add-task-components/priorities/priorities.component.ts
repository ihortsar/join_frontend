import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { JoinTask } from '../../../models/task.model';


@Component({
  selector: 'app-priorities',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './priorities.component.html',
  styleUrl: './priorities.component.scss'
})
export class PrioritiesComponent implements AfterViewInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    this.displayTaskPriority()
  }

  @Output() priorityEmitter = new EventEmitter<any>()
  selectedPriority: string | null = null;
  @Input() task: any = {}


  displayTaskPriority() {
    if (Object.keys(this.task).length !== 0) {
      const element = this.elementRef.nativeElement.querySelector(`#${this.task.priority}`);
      if (element) {
        this.renderer.setStyle(element, 'background-color', this.getBackgroundColor(this.task.priority));
      }
    }
  }


  handlePriority(value: string) {
    if (this.selectedPriority === value) {
      this.selectedPriority = null;
    } else {
      this.selectedPriority = value;
      this.addPriority(value);
    }
  }

  addPriority(value: any) {
    this.priorityEmitter.emit(value);
  }

  getBackgroundColor(value: string): string {
    if (value === 'low') {
      return 'green';
    } else if (value === 'middle') {
      return '#81810d';
    } else if (value === 'urgent') {
      return 'red';
    }
    return 'transparent';
  }
}
