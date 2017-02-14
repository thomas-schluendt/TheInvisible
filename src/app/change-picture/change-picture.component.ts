import { Component, OnInit } from '@angular/core';
import { CheckserviceService } from '../checkservice.service';

@Component({
  selector: 'app-change-picture',
  templateUrl: './change-picture.component.html',
  styleUrls: ['./change-picture.component.css'],
  providers: [CheckserviceService]
})
export class ChangePictureComponent implements OnInit {

  public avatarPictures = [];
  public pictureCurrentUrl = '../../img/student/superhero-robin-big-active.png';

  constructor(private CheckserviceService: CheckserviceService) {
  }

  ngOnInit() {
    this.CheckserviceService.getAvatar("All");
    this.getAvatars();
  }

  private getAvatars() {
    this.CheckserviceService.getAvatar("All")
      .subscribe((avatar: Array<Object>) => this.avatarPictures = avatar);
  }

  changePictureCurrent(url) {
    this.pictureCurrentUrl = url;
  }
}
