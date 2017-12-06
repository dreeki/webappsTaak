import { Subject } from 'rxjs/Rx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';
import { Thread } from '../../Thread/thread.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private _user: User;
  private unsubscribe = new Subject<Boolean>();
  private _currentUser: string;

  constructor(private _route: ActivatedRoute, private _userService: UserDataService, private _authService: AuthenticationService) { }

  ngOnInit() {
    this._currentUser = this._authService.user$.getValue();
    this._route.data.takeUntil(this.unsubscribe).subscribe(item => this._user = item['user']);
    this._route.paramMap.takeUntil(this.unsubscribe).subscribe(pa => this._userService.getUser(pa.get('username')).subscribe(item => {this._user = item}));
  }

  public get user(): User {
     return this._user;
  }

  public get currentUser():string {
    return this._currentUser
  }
}
