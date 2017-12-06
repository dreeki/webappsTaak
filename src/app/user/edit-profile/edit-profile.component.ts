import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs/Rx';
import { User } from '../user.model';
import { Component, OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  private _user: User;
  private unsubscribe = new Subject<Boolean>();
  public editProfileForm: FormGroup;


  constructor(private auth: AuthenticationService, private fb: FormBuilder, private _route: ActivatedRoute, private _userService: UserDataService, private router: Router) { }

  ngOnInit() {
    this._route.data.takeUntil(this.unsubscribe).subscribe(item => {
      this._user = item['user'];
      if(this._user.username !== this.auth.user$.getValue()){
        this.router.navigate(['/threads/']);
      }
      this.editProfileForm = this.fb.group({
        lastname: [this._user.lastname, Validators.required],
        firstname: [this._user.firstname, Validators.required],
        country: [this._user.country, Validators.required],
        birthDate: [this._user.birthDate.toISOString().substring(0,10), Validators.required]
      });
    });
    this._route.paramMap.takeUntil(this.unsubscribe).subscribe(pa => this._userService.getUser(pa.get('username')).subscribe(item => {
      this._user = item;
    }));
  }

  ngOnDestroy() {
    this.unsubscribe.next(true);
    this.unsubscribe.complete();
  }

  onSubmit() {
    const user = new User(this._user.username, this.editProfileForm.value.firstname, this.editProfileForm.value.lastname, this.editProfileForm.value.country, this.editProfileForm.value.birthDate, this._user.id, this._user.threads);
    this._userService.editUser(user).subscribe(response => {
      this.router.navigate(['/profile/' + this._user.username]);
    });
    
  }

  public get user(): User {
    return this._user;
  }

}
