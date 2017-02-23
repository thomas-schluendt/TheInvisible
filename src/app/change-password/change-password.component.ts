import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ApisCallerService} from  '../apis-caller.service'
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {NotificationService} from "../notification.service";

const API_DATA = require('../apis.json')

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  private oldPassword;
  private newPassword;
  private confirmPassword;

  constructor(private notificationService: NotificationService, private apisCallerService: ApisCallerService, private titleService: Title,
              private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    this.titleService.setTitle( "CHECK! - Passwort ändern" );
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    }
  }

  public checkPassword() {

    this.oldPassword = (<HTMLInputElement>document.getElementById('oldPassword')).value;
    this.newPassword = (<HTMLInputElement>document.getElementById('newPassword')).value;
    this.confirmPassword = (<HTMLInputElement>document.getElementById('confirmPassword')).value;


    var password = this.newPassword;
    var template = /(^(?=^.{7,}$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&.,-]))/g;
    var result = template.test(password);


    if (result == false){
      this.notificationService.throwWarning("Das neue Passwort muss den Vorgaben entsprechen!");
    } else if(this.newPassword !== this.confirmPassword) {
      this.notificationService.throwWarning("Die Passwörter stimmen nicht überein, bitte versuchen Sie es erneut!");
    } else if (this.oldPassword === this.newPassword) {
      this.notificationService.throwWarning("Das alte Passwort darf nicht mit dem neuen übereinstimmen!");
    } else {
      let body = {"newpassword": this.newPassword,"password": this.oldPassword}
      this.apisCallerService.putWithHeader(API_DATA.chgPassword, body).subscribe((res: any) =>
        this.notificationService.throwConfirmation("Passwort wurde erfolgreich geändert!"),(err) =>
        this.notificationService.throwWarning("Passworteingabe falsch, bitte versuchen Sie es nochmal!"));


    }

  }
}
