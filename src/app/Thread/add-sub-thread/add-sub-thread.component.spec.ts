import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubThreadComponent } from './add-sub-thread.component';

describe('AddSubThreadComponent', () => {
  let component: AddSubThreadComponent;
  let fixture: ComponentFixture<AddSubThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSubThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSubThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
