import {Component, OnInit} from '@angular/core';
import {ApisCallerService} from "../../apis-caller.service";
import {BodyDynamicsService} from "../../body-dynamics.service";
import {Router} from '@angular/router';
import {LoginService} from '../../login.service';
import {Observable} from 'rxjs/Rx';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public headerdaten = {};
  public groupBackgroundImage;
  public schoolBackgroundImage;
  public profileBackgroundImage;
  public profileHeaderImage;
  public avatarID;
  public avatarPictures = [];
  public edPlanData = {};
  public edPlanCompetences = [];
  public visibleArray = [false, false, false, false, false, false, false, false];



  constructor(private apisCallerService: ApisCallerService, private bodyDynamics: BodyDynamicsService, private router: Router,
              private loginService: LoginService) {
    this.getStudentData();
    this.getEdPlanData();

  }

  ngOnInit() {
  }

  setDdVisible(numberOfDd) {
    this.visibleArray[numberOfDd] = true;
  }

  setDdUnvisible(numberOfDd) {
    this.visibleArray[numberOfDd]=false;
  }

  async getStudentData() {
    await Observable.forkJoin(this.apisCallerService.getAvatar("All"), this.apisCallerService.getStudent()).subscribe(res => {
      this.avatarPictures = res[0];
      this.headerdaten = res[1];
      this.avatarID = res[1]["avatarId"];
      if(!!localStorage.getItem("authHeader")){
        localStorage.setItem("avatarId", this.avatarID);
      } else{
        sessionStorage.setItem("avatarId", this.avatarID);
      }
      this.groupBackgroundImage = "url(../../.." + res[1].studyGroups["imageUrlInactive"] + ")";
      this.schoolBackgroundImage = "url(../../.." + res[1].school["imageUrlInactive"] + ")";
      this.profileBackgroundImage = "url(../../.." + this.avatarPictures[this.avatarID]["avatarInactiveUrl"] + ")";
      this.profileHeaderImage = "url(../../.." + this.avatarPictures[this.avatarID]["avatarBigUrl"];
    });
  }

  getEdPlanData() {
    this.apisCallerService.getEdPlan("All")
      .subscribe(res => {
        this.bodyDynamics.edPlans.plans = res;
        this.bodyDynamics.edPlans.count = res.length;
        for(let i=0; i < res.length; i++){
          this.bodyDynamics.edPlans.hashMapPlans[res[i]._id]= {
            "name": res[i].name,
            "thema": res[i].thema
          };

          this.apisCallerService.getEdPlan(i+1).subscribe(res => {
            for(let j = 0; j < res[0].competences.length; j++){
              this.bodyDynamics.edPlans.competences[res[0].competences[j].competenceId] = {
                "edPlanId": res[0].educationalPlanId,
                "note": res[0].competences[j].note
                /*,"order": res[0].competences[j].order*/
              }
            }
          })
        }}
      );
  }

  loadChapter(i) {

    this.apisCallerService.getChapter(i).subscribe((res: Array<Object>) => this.bodyDynamics.changeBackground(res["weakcolor"]));
    this.bodyDynamics.changeFlag(i);
    this.bodyDynamics.changeButtonUp(i);
    this.bodyDynamics.changeButtonDown(i);
    this.apisCallerService.getCompetences("All", i)
      .subscribe((competence: Array<Object>) => this.bodyDynamics.changeChapterBubbles(competence));
    this.bodyDynamics.fillBooleanArray(this.bodyDynamics.chapterBubbles.length);
    this.router.navigate(["../home"])
  }

  loadCompetences(i) {
    this.apisCallerService.getChapter(i).subscribe((res: Array<Object>) => this.bodyDynamics.changeBackground(res["weakcolor"]));
    this.bodyDynamics.changeFlag(i);
    this.bodyDynamics.changeButtonUp(i);
    this.bodyDynamics.changeButtonDown(i);
    this.apisCallerService.getCompetences("true", i)
      .subscribe((competence: Array<Object>) => this.bodyDynamics.changeChapterBubbles(competence));
    this.bodyDynamics.fillBooleanArray(this.bodyDynamics.chapterBubbles.length);
    this.router.navigate(["../home"]);
  }

  loadEducationPlan(i) {

    this.apisCallerService.getCompetences("All", "All").subscribe(res => {
      let competenceAll = [];
      for (let j = 0; j < res.length; j++) {
        if(!!this.bodyDynamics.edPlans.competences[res[j].id]){
          if(this.bodyDynamics.edPlans.competences[res[j].id].edPlanId === i){
            competenceAll.push(res[j]);
          }
        }
      }
      this.bodyDynamics.chapterBubbles = competenceAll;
    })

    this.bodyDynamics.changeBackground("#8da6d6");
  }



  logout() {
    this.loginService.logout();
    this.router.navigate(["../logout"]);
  }

  changeGroupBackgroundImage(scope, activate) {
    if(activate){
      this.groupBackgroundImage = "url(../../.." + scope["imageUrl"] + ")";
    } else {
      this.groupBackgroundImage = "url(../../.." + scope["imageUrlInactive"] + ")";
    }
  }

  changeSchoolBackgroundImage(scope, activate) {
    if(activate){
      this.schoolBackgroundImage = "url(../../.." + scope["imageUrl"] + ")";
    } else {
      this.schoolBackgroundImage = "url(../../.." + scope["imageUrlInactive"] + ")";
    }
  }

  changeProfileBackgroundImage(scope, activate) {

    if(activate){
      this.profileBackgroundImage = "url(../../.." + scope["avatarUrl"] + ")";
    } else {
      this.profileBackgroundImage = "url(../../.." + scope["avatarInactiveUrl"] + ")";
    }
  }

}

