import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-priorities',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './priorities.component.html',
  styleUrl: './priorities.component.scss'
})
export class PrioritiesComponent implements AfterViewInit {
  @Output() priorityEmitter = new EventEmitter<any>()
  selectedPriority: string | null = null;
  @Input() task: any = {}

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
/**
 * Initializes the component after the view is initialized.
 * Calls the method to display the task priority.
 */
  ngAfterViewInit(): void {
    this.displayTaskPriority()
  }


  /**
 * Displays the priority of the task.
 * Sets background color based on the task's priority.
 */
  displayTaskPriority() {
    if (Object.keys(this.task).length !== 0 && this.selectedPriority == null) {
      const element = this.elementRef.nativeElement.querySelector(`#${this.task.priority}`);
      this.renderer.setStyle(element, 'background-color', this.getBackgroundColor(this.task.priority));
    }
  }


  /**
 * Handles the selection of a priority.
 * Emits an event with the selected priority.
 * @param value The selected priority value
 */
  handlePriority(value: string) {
    const elements = this.elementRef.nativeElement.querySelectorAll('.urgency');
    elements.forEach((element: HTMLElement) => {
      const priority = element.id;
      const backgroundColor = priority === value ? this.getBackgroundColor(priority) : '#575757';
      this.renderer.setStyle(element, 'background-color', backgroundColor);
    });
    this.selectedPriority = this.selectedPriority === value ? null : value;
    if (this.selectedPriority !== null) {
      this.priorityEmitter.emit(this.selectedPriority);
    }
  }


  /**
 * Determines the background color based on the priority value.
 * @param value The priority value
 * @returns The background color corresponding to the priority
 */
  getBackgroundColor(value: string): string {
    if (value === 'low') {
      return 'green';
    } else if (value === 'middle') {
      return '#81810d';
    } else if (value === 'urgent') {
      return '#F55246';
    }
    return 'transparent';
  }
}
