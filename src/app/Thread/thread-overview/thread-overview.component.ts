import { Thread } from '../thread.model';
import { Component, OnInit} from '@angular/core';
import {ThreadDataService} from '../thread-data.service';


@Component({
  selector: 'app-thread-overview',
  templateUrl: './thread-overview.component.html',
  styleUrls: ['./thread-overview.component.css']
})

export class ThreadOverviewComponent implements OnInit {
  private _threads: Thread[];

  constructor(private _threadDataService: ThreadDataService) { }

  ngOnInit() {
    this._threadDataService.threads.subscribe(items => this._threads = items);
  }

	public get threads(): Thread[] {
		return this._threads;
	}
  

}
