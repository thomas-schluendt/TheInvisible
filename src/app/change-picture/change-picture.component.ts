import { Component, OnInit } from '@angular/core';
import {ApisCallerService} from "../apis-caller.service";
import { Title } from '@angular/platform-browser';
import {Router} from '@angular/router';
import {LoginService} from '../login.service';
import {NotificationService} from '../notification.service'

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.css'],
  providers: [ApisCallerService]
})
export class ChangePictureComponent implements OnInit {

  public avatarPictures = [];
  public pictureCurrentUrl = this.avatarPictures[this.currentPicture];
  public currentPicture = (!!sessionStorage.getItem("avatarId")) ? sessionStorage.getItem("avatarId") : localStorage.getItem("avatarId");
  public index;
  public picTopOld = true;
  public picTopNew = false;
  public pictureID;

  constructor(private apisCallerService: ApisCallerService,private titleService: Title,private loginService: LoginService,
              private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(["../home"]);
    }
    this.titleService.setTitle( "CHECK! - Profilbild ändern" );
    this.getAvatars();
  }

  private getAvatars() {
    this.apisCallerService.getAvatar("All")
      .subscribe((avatar: Array<Object>) => this.avatarPictures = avatar);
  }

  changePictureCurrent(url, index) {
    this.picTopOld = false;
    this.picTopNew = true;
    this.pictureCurrentUrl = url;
    this.pictureID = index;
  }

  public changePicture() {
    this.apisCallerService.putProfilePicture(this.pictureID).subscribe((res: any) => {
      this.notificationService.throwConfirmation("Profilbild wurde erfolgreich geändert!");
      if (!!sessionStorage.getItem("avatarId")) {
        sessionStorage.setItem("avatarId", this.pictureID);
      } else {
        localStorage.setItem("avatarId", this.pictureID);
      }

    }, (err) => this.notificationService.throwWarning("Profilbild konnte nicht geändert werden, bitte versuchen Sie es später erneut!"));
  }

}
