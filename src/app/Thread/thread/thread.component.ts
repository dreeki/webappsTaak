import { Component, Input, OnInit } from '@angular/core';
import {Thread} from '../thread.model';

@Component({
  selector: '[app-thread]',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  @Input() public thread: Thread;

  constructor() { }

  ngOnInit() {
  }

  
}
