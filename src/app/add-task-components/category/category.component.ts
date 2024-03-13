import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { CategoryColorPickersComponent } from "../category-color-pickers/category-color-pickers.component";
import { JoinTask } from '../../../models/task.model';
@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss', '../../app.component.scss'],
  imports: [NgIf, NgStyle, NgFor, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CategoryColorPickersComponent]
})
export class CategoryComponent {
  panelOpenState = false;
  newCategory = false
  @Input() task: any
  category: string = ""
  constructor(public ts: TaskService) { }

  toggleNewCategory() {
    this.newCategory = !this.newCategory
  }


  addCategory(color: any) {
    this.task.category = {
      name: this.category,
      color: color,
      id: null
    }
    console.log(this.task.category);

  }



}
