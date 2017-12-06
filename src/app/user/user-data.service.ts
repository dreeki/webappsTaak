import { Observable } from 'rxjs/Rx';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from './user.model';
import { Thread } from '../Thread/thread.model';

@Injectable()
export class UserDataService {

  private _appUrl = 'http://localhost:4200/API/users/';
  
  constructor(private http: Http, private auth: AuthenticationService) { }

  public get username(): string{
    return this.auth.user$.getValue();
  }

  public getUser(username: string): Observable<User> {
    return this.http.get(`${this._appUrl}${username}`)
      .map(response => response.json()).map(item => new User(item.username, item.firstname, item.lastname, item.country, new Date(item.birthDate), item.id, item.threads.map(thread => new Thread(thread.title, thread.description, new Date(thread.date), thread.user.username, thread.id, thread.subThreads, thread.likes))));
  }

  public editUser(user: User): Observable<User>{
    return this.http.patch(`${this._appUrl}edit/${user.id}`, user, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res => res.json()).map(item => new User(item.username, item.firstname, item.lastname, item.country, new Date(item.birthDate), item.id, item.threads));
  }

  public changePassword(password: string, userId: string): Observable<User>{
    return this.http.patch(`${this._appUrl}edit/password/${userId}`, {password}, { headers: new Headers({Authorization: `Bearer ${this.auth.token}`})}).map(res => res.json()).map(item => new User(item.username, item.firstname, item.lastname, item.country, new Date(item.birthDate), item.id, item.threads))
  }

}