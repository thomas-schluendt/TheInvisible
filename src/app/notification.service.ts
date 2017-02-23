import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from "./login.service";

@Injectable()
export class NotificationService {
  private advice = {
    "show": false,
    "text": "text"
  }

  private confirmation = {
    "show": false,
    "text": "text",
    "logout": false
  }

  private warning = {
    "show": false,
    "text": "test"
  }

  constructor(private router: Router, private loginService: LoginService) { }

  setSuccessLogout(){
    this.confirmation.logout = true;
  }

  throwWarning(text){
    this.warning.text = text;
    this.warning.show = true;
  }
  resetWarning(){
    this.warning.text = "";
    this.warning.show = false;
  }

  throwConfirmation(text){
    this.confirmation.text = text;
    this.confirmation.show = true;
  }
  resetConfirmation(){
    this.confirmation.text = "";
    this.confirmation.show = false;
    this.router.navigate(["../home"]);
    if(this.confirmation.logout){
      this.loginService.logout();
    }
  }

  throwAdvice(text){
    this.advice.text = text;
    this.advice.show = true;
  }
  resetAdvice(){
    this.advice.text = "";
    this.advice.show = false;
  }
}

