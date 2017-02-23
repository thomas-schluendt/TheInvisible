import { Component, OnInit } from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ApisCallerService} from "../../../apis-caller.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../login.service";
import {BodyDynamicsService} from "../../../body-dynamics.service";
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css'],
  providers: [ApisCallerService]
})
export class MiddleComponent implements OnInit {
  public siteIllustrations = [];

  constructor(private apisCallerService: ApisCallerService, private loginService: LoginService, private router: Router,
              private bodyDynamics: BodyDynamicsService, private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle("CHECK!");
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(["../login"]);
    }

    if (this.bodyDynamics.loadAllCompetences == true) {
      this.getFirstCompetences();
      this.bodyDynamics.fillBooleanArray(this.bodyDynamics.chapterBubbles.length);
      this.bodyDynamics.changeLoadAllCompetences(false);
      this.bodyDynamics.calcContentHeigth();
    }

    this.getAllIllustrations();

  }

  private getFirstCompetences() {
    this.apisCallerService.getCompetences("true", "All")
      .subscribe((competence: Array<Object>) => this.bodyDynamics.changeChapterBubbles(competence));
  }

  private getAllIllustrations() {
    this.apisCallerService.getChapterIllustrations("All")
      .subscribe((illustration: Array<Object>) => this.siteIllustrations = illustration);
  }

}
