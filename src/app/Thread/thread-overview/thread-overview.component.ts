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
    this._threadDataService.threads.subscribe(items => this._threads = items.sort(compareDate));
  }

	public get threads(): Thread[] {
		return this._threads;
	}
  
  public sorteerLikes(): any{
    this._threads.sort(compareLikes);
  }

  public sorteerDatum(): any{
    this._threads.sort(compareDate);
  }

  public sorteerReacties(): any{
    this._threads.sort(compareReactions);
  }
}

function compareLikes(a: Thread,b: Thread) {
  if (a.aantalLikes < b.aantalLikes)
    return 1;
  if (a.aantalLikes > b.aantalLikes)
    return -1;
  return 0;
}

function compareReactions(a: Thread,b: Thread) {
  if (a.aantalReacties < b.aantalReacties)
    return 1;
  if (a.aantalReacties > b.aantalReacties)
    return -1;
  return 0;
}

function compareDate(a: Thread,b: Thread) {
  if (a.date < b.date)
    return -1;
  if (a.date > b.date)
    return 1;
  return 0;
}
