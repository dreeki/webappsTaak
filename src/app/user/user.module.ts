import { AuthGuardService } from './auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from '@angular/http';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDataService } from './user-data.service';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserResolver } from './user.resolver';
import { ProfileThreadComponent } from './profile-thread/profile-thread.component';

const routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', canActivate: [AuthGuardService], component: LogoutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:username', component: ProfileComponent},
  { path: 'profile/edit/profile/:username', canActivate: [AuthGuardService], component: EditProfileComponent, resolve: {
    user: UserResolver
}},
  { path: 'profile/edit/password/:username', canActivate: [AuthGuardService], component: ChangePasswordComponent, resolve: {
    user: UserResolver
}}
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent,
    ProfileThreadComponent
  ],
  providers: [
    AuthGuardService,
    UserDataService,
    UserResolver
  ],
  exports: [
  ]
})
export class UserModule { }