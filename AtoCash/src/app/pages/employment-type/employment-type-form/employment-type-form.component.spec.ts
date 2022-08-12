import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentTypeFormComponent } from './employment-type-form.component';

describe('EmploymentTypeFormComponent', () => {
  let component: EmploymentTypeFormComponent;
  let fixture: ComponentFixture<EmploymentTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
