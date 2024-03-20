import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatExpansionModule } from '@angular/material/expansion';
import { NgFor, NgIf, NgStyle, NgClass } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../services/task.service';
import { CategoryColorPickersComponent } from "../category-color-pickers/category-color-pickers.component";
import { JoinTask } from '../../../models/task.model';
@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss', '../../app.component.scss'],
  imports: [NgClass, NgIf, NgStyle, NgFor, MatCardModule, MatExpansionModule, MatIconModule, MatButtonModule, FormsModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, CategoryColorPickersComponent]
})
export class CategoryComponent implements OnInit {
  panelOpenState = false;
  newCategory = false
  @Input() task: any
  category: string = ""
  categoryExists = false
  existingCategories: JoinTask["category"][] | null = null;
  categoryCreated = false
  constructor(public ts: TaskService) { }


  async ngOnInit() {
    this.existingCategories = await this.ts.loadCategories()
  }


  toggleNewCategory() {
    this.newCategory = !this.newCategory
  }


  async addCategory(color: any) {
    if (this.category && color) {
      this.task.category = {
        name: this.category,
        color: color,
        id: null
      }
      this.categoryCreated = true
    }
  }


  addExistingCategory(category: {}) {
    this.task.category = category
    this.categoryCreated = true
    console.log(this.task.category);
    
  }


  checkIfCategoryExists() {
    if (this.existingCategories && this.category) {
      const index = this.existingCategories.findIndex(category => category.name === this.category);
      this.categoryExists = index !== -1;
    } else {
      this.categoryExists = false;
    }
  }


  deleteCategory() {
    delete this.task.category;
    this.categoryCreated = false
    console.log('after', this.task.category);
  }
}
