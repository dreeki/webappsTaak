import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubThreadComponent } from './sub-thread.component';

describe('SubThreadComponent', () => {
  let component: SubThreadComponent;
  let fixture: ComponentFixture<SubThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
