import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePictureComponent } from './change-picture/change-picture.component';
import { DeleteProfileComponent } from './delete-profile/delete-profile.component';
import { LogoutComponent } from './logout/logout.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'changepassword', component: ChangePasswordComponent },
  { path: 'changepicture', component: ChangePictureComponent },
  { path: 'deleteprofile', component: DeleteProfileComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class RoutingModule { }

