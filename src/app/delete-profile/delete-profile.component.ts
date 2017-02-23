import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ApisCallerService} from "../apis-caller.service";
import {NotificationService} from "../notification.service";
import {LoginService} from "../login.service"

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.css']
})
export class DeleteProfileComponent implements OnInit {
  constructor(private apisCallerService: ApisCallerService, private notificationService: NotificationService,
              private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    }
  }

  public deleteAccount() {
    let password = (<HTMLInputElement>document.getElementById('passwordField')).value;
    console.log("password:"+password);
    this.apisCallerService.deleteStudent().subscribe((res: any) => {
        this.notificationService.setSuccessLogout();
        this.notificationService.throwConfirmation("Ihr User wurde erfolgreich gelöscht!");
      },
      (err) => this.notificationService.throwWarning("Der User konnte nicht gelöscht werden!"));
  }
}
