import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {LoginService} from '../login.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {NotificationService} from '../notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router, private notificationService: NotificationService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("CHECK! - Login");
    if (this.loginService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    }
  }

  private login(username, password, savedLogin) {
    this.loginService.login(username, password, !!savedLogin).subscribe(res => this.router.navigate(["../home"]), (err) => {
      this.notificationService.throwWarning("Falsche Eingabe, bitte versuchen Sie es erneut.");
    });
  }

  showDialog = false;

}
