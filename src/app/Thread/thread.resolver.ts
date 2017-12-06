import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Thread } from './thread.model';
import { ThreadDataService } from './thread-data.service';

@Injectable()
export class ThreadResolver implements Resolve<Thread> { 
  constructor(private threadService: ThreadDataService) {}
 
  resolve(route: ActivatedRouteSnapshot, 
          state: RouterStateSnapshot): Observable<Thread> {
    return this.threadService.getThread(route.params['id']);
  }
}