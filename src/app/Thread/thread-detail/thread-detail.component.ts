import { Subject } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { ThreadDataService } from '../thread-data.service';
import { Component, OnInit } from '@angular/core';
import { Thread } from '../thread.model';
import { SubThread } from '../sub-thread/sub-thread.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  private _thread: Thread;
  private unsubscribe = new Subject<Boolean>();
  private _currentUser: string;

  constructor(private _auth: AuthenticationService, private _route: ActivatedRoute, private _threadDataService: ThreadDataService, private router: Router) { }


	public get thread(): Thread {
		return this._thread;
	}


  ngOnInit() {
    this._currentUser = this._auth.user$.getValue();
    this._route.data.takeUntil(this.unsubscribe).subscribe(item => this._thread = item['thread']);
    this._route.paramMap.takeUntil(this.unsubscribe).subscribe(pa => this._threadDataService.getThread(pa.get('id')).subscribe(item => this._thread = item));
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  public get subThreads(): SubThread[] {
		return this._thread.subThreads;
  }

  public addSubThread(subThread: SubThread){
    this._thread.subThreads.push(subThread);
  }

  public deleteSubThread(subThread: SubThread){
    let index = this._thread.subThreads.indexOf(subThread);
    if(index !== -1){
      this._thread.subThreads.splice(index, 1);
    }
  }

	public get currentUser(): string {
		return this._currentUser;
	}
  
  public get userInLikes(): boolean{
    return this._thread.likes.indexOf(this._auth.user$.getValue()) !== -1;
  }

  public get likes(): string[]{
    return this._thread.likes;
  }

  public toggleLike(): any {
    this._threadDataService.toggleLikeThread(this._thread.id).subscribe(response => {
      this._thread.likes = response.likes;
    });
  }

  public onDeleteClick(): any{
    this._threadDataService.removeThread(this._thread.id).subscribe(response => {
      this.router.navigate(['/threads/']);
    });
  }

  public get canDelete(): boolean{
    return this._thread.username === this._auth.user$.getValue();
  }

}
