import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryColorPickersComponent } from './category-color-pickers.component';

describe('CategoryColorPickersComponent', () => {
  let component: CategoryColorPickersComponent;
  let fixture: ComponentFixture<CategoryColorPickersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryColorPickersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryColorPickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
