import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  private _url = '/API/users';
  private _user$: BehaviorSubject<string>;

  public redirectUrl: string;

  constructor(private http: Http) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this._user$ = new BehaviorSubject<string>(currentUser && currentUser.username);
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    return JSON.parse(localStorage.getItem('currentUser')).token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username: username, password: password })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if (this._user$.getValue()) {
      localStorage.removeItem('currentUser');
      setTimeout(() => this._user$.next(null));
    }
  }

  register(username: string, password: string, firstname: String, lastname: String, country: String, birthDate: Date): Observable<boolean> {
    return this.http.post(`${this._url}/register`, { username: username, password: password, firstname: firstname, lastname: lastname, country: country, birthDate: birthDate })
      .map(res => res.json()).map(res => {
        const token = res.token;
        if (token) {
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: res.token }));
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      });
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username: username }).map(res => res.json())
      .map(item => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      });
  }

  checkPasswordCorrect(password: string, username: string): Observable<boolean> {
    const myUrl:string = this._url + '/checkpassword/' + username;
    return this.http.post(`${this._url}/checkpassword/${username}`, { password }, { headers: new Headers({Authorization: `Bearer ${this.token}`})}).map(res => res.json()).map(item => item.password === 'ok');
    
  }
}