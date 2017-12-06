import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserDataService } from './user-data.service';

@Injectable()
export class UserResolver implements Resolve<User> { 
  constructor(private userService: UserDataService) {}
 
  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<User> {
    return this.userService.getUser(route.params['username']);
  }
}