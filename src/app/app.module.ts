import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes} from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
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

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'change-picture', component: ChangePictureComponent },
  { path: 'delete-profile', component: DeleteProfileComponent },
  { path: 'logout', component: LogoutComponent },
];

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
