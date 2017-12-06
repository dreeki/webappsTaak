import { UserModule } from './user/user.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { ThreadComponent } from './Thread/thread/thread.component';
import { ThreadOverviewComponent } from './Thread/thread-overview/thread-overview.component';
import { AddThreadComponent } from './Thread/add-thread/add-thread.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './Navbar/navbar/navbar.component';
import { ThreadDetailComponent } from './Thread/thread-detail/thread-detail.component';
import { SubThreadComponent } from './Thread/sub-thread/sub-thread.component';
import {SuiModule} from 'ng2-semantic-ui';
import { AddSubThreadComponent } from './Thread/add-sub-thread/add-sub-thread.component';
import { ThreadResolver } from './Thread/thread.resolver';
import { ThreadDataService } from './Thread/thread-data.service';
import { AuthenticationService } from './user/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ThreadComponent,
    ThreadOverviewComponent,
    AddThreadComponent,
    ThreadDetailComponent,
    SubThreadComponent,
    AddSubThreadComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    UserModule,
    AppRoutingModule,
    SuiModule
  ],
  providers: [ThreadResolver, ThreadDataService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
