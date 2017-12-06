import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../user.model';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';


function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? { 'passwordTooShort': { requiredLength: length, actualLength: control.value.length } } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmNewPassword');
  return password.value === confirmPassword.value ? null : { 'passwordsDiffer': true };
}


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  
    private _user: User;
    private unsubscribe = new Subject<Boolean>();
    public changePasswordForm: FormGroup;
    private errormessage: string;
  
    constructor(private auth: AuthenticationService, private fb: FormBuilder, private _route: ActivatedRoute, private _userService: UserDataService, private router: Router) { }
  
    get passwordControl(): FormControl {
      return <FormControl>this.changePasswordForm.get('newPasswordGroup').get('newPassword');
    }


    ngOnInit() {
      this.changePasswordForm = this.fb.group({
        oldPassword: ['', [Validators.required], this.serverSideValidatePassword()],
        newPasswordGroup: this.fb.group({
          newPassword: ['', [Validators.required, passwordValidator(12)]],
          confirmNewPassword: ['', Validators.required]
        }, { validator: comparePasswords })
      });
      this._route.data.takeUntil(this.unsubscribe).subscribe(item => {
        this._user = item['user']
        if(this._user.username !== this.auth.user$.getValue()){
          this.router.navigate(['/threads/']);
        }
    });
      this._route.paramMap.takeUntil(this.unsubscribe).subscribe(pa => this._userService.getUser(pa.get('username')).subscribe(item => {
        this._user = item;
      }));
    }
  
    ngOnDestroy() {
      this.unsubscribe.next(true);
      this.unsubscribe.complete();
    }

    serverSideValidatePassword(): ValidatorFn {
      return (control: AbstractControl): Observable<{ [key: string]: any }> => {
        return this.auth.checkPasswordCorrect(control.value, this.auth.user$.getValue()).map(correct => {
          if (correct) {
            return null;
          }
          return { passwordIncorrect: true };
        });
      };
    }
  
    onSubmit() {
      this._userService.changePassword(this.passwordControl.value, this._user.id).subscribe(response => {
        this.router.navigate(['/profile/' + this._user.username]);
      });
    }
  
    public get user(): User {
      return this._user;
    }
  
  }
