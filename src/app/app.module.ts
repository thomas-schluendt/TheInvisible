import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RoutingModule} from './app.router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { ContentComponent } from './home/content/content.component';
import { MiddleComponent } from './home/content/middle/middle.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePictureComponent } from './change-picture/change-picture.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { LogoutComponent } from './logout/logout.component';
import {BodyDynamicsService} from "./body-dynamics.service";
import {LoginService} from "./login.service";
import {ApisCallerService} from "./apis-caller.service";
import { NotificationService } from './notification.service';
import { NotificationAdviceComponent } from './notification/notification-advice/notification-advice.component';
import { NotificationConfirmationComponent } from './notification/notification-confirmation/notification-confirmation.component';
import { NotificationWarningComponent } from './notification/notification-warning/notification-warning.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    MiddleComponent,
    ChangePasswordComponent,
    ChangePictureComponent,
    DeleteProfileComponent,
    LogoutComponent,
    NotificationAdviceComponent,
    NotificationConfirmationComponent,
    NotificationWarningComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [ApisCallerService, BodyDynamicsService, LoginService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
