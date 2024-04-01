import { NgFor, NgStyle } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-category-color-pickers',
  standalone: true,
  imports: [NgFor, NgStyle],
  templateUrl: './category-color-pickers.component.html',
  styleUrls: ['./category-color-pickers.component.scss', '../../app.component.scss']
})
export class CategoryColorPickersComponent {
  colors = ['#8AA4FF', '#FF0000', '#2AD300', '#FF8A00 ', '#E200BE', '#0038FF',]
  categoryColor = ''
  @Output() addColor = new EventEmitter<any>()

/**
 * Emits an event to add a color to the task.
 * @param value The color value to be added to the task
 */
  addCategoryColorOnTask(value: string) {
    this.addColor.emit(value)
  }

}
