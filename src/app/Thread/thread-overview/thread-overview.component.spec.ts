import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadOverviewComponent } from './thread-overview.component';

describe('ThreadOverviewComponent', () => {
  let component: ThreadOverviewComponent;
  let fixture: ComponentFixture<ThreadOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
