import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Thread } from '../../Thread/thread.model';

@Component({
  selector: '[app-profile-thread]',
  templateUrl: './profile-thread.component.html',
  styleUrls: ['./profile-thread.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileThreadComponent implements OnInit {
  @Input() public thread: Thread;

  constructor() { }

  ngOnInit() {
  }

}
