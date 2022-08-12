import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxAlertComponent } from './inbox-alert.component';

describe('InboxAlertComponent', () => {
  let component: InboxAlertComponent;
  let fixture: ComponentFixture<InboxAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InboxAlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
