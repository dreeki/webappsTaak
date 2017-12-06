import { AuthGuardService } from './user/auth-guard.service';
import { ThreadDetailComponent } from './Thread/thread-detail/thread-detail.component';
import { AddThreadComponent } from './Thread/add-thread/add-thread.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadOverviewComponent } from './Thread/thread-overview/thread-overview.component';
import { ThreadResolver } from './Thread/thread.resolver';
import { AuthenticationService } from './user/authentication.service';
import { ThreadComponent } from './Thread/thread/thread.component';
import { SubThreadComponent } from './Thread/sub-thread/sub-thread.component';
import { AddSubThreadComponent } from './Thread/add-sub-thread/add-sub-thread.component';

const appRoutes: Routes = [
    {
        path: 'threads',
        component: ThreadOverviewComponent
    },
    {
        path: 'addThreads',
        canActivate: [AuthGuardService], 
        component: AddThreadComponent
    },
    {
        path: 'threads/:id', 
        component: ThreadDetailComponent,
        resolve: {
            thread: ThreadResolver
        }
    },
    {
        path: '',
        component: ThreadOverviewComponent,
        pathMatch: 'full'
    },
    {
        path:'**',
        component: ThreadOverviewComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes//,
            /* { enableTracing: true} */
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}