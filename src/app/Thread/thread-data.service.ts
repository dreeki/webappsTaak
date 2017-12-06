import { Thread } from './thread.model';
import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { AuthenticationService } from '../user/authentication.service';
import { SubThread } from './sub-thread/sub-thread.model';

@Injectable()
export class ThreadDataService {
  private _appUrl = '/API/threads/';

  constructor(private http: Http, private auth: AuthenticationService) { }

  public get username(): string{
    return this.auth.user$.getValue();
  }

	public get threads(): Observable<Thread[]> {
    return this.http.get(this._appUrl).map(response => response.json().map(item => new Thread(item.title, item.description, new Date(item.date), item.user.username, item.id, item.subThreads, item.likes)));
	}
  
  public addNewThread(rec: Thread): Observable<Thread> {
    return this.http.post(`${this._appUrl}${this.auth.user$.getValue()}`, rec, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res => res.json()).map(item => new Thread(item.title, item.description, new Date(item.date), item.username, item.id, item.subThreads, item.likes));
  }

  public addNewSubThread(rec: SubThread, outerThreadId: string): Observable<SubThread> {
    return this.http.post(`${this._appUrl}${this.auth.user$.getValue()}/addsubthread/${outerThreadId}`, rec, {headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res => res.json()).map(item => new SubThread(item.description, new Date(item.date), item.username, item.id));
  }

  public getThread(id: string): Observable<Thread> {
    return this.http.get(`${this._appUrl}${id}`).map(response => response.json()).map(item => new Thread(item.title, item.description, new Date(item.date), item.user.username, item.id, item.subThreads.map(sub => new SubThread(sub.description, new Date(sub.date), sub.user.username, sub.id)), item.likes));
  }

  public removeSubThread(id: string): Observable<string>{
    return this.http.delete(`${this._appUrl}delete/subthread/${id}`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response => response.json());
  }

  public removeThread(id: string): Observable<string> {
    return this.http.delete(`${this._appUrl}delete/thread/${id}`, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response => response.json());
  }

  public toggleLikeThread(id: string): Observable<Thread>{
    return this.http.post(`${this._appUrl}${id}/like`, {username: this.auth.user$.getValue()}, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(response => response.json()).map(item => new Thread(item.title, item.description, new Date(item.date), item.user.username, item.id, item.subThreads, item.likes));
  }
}
