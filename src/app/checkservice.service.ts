import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CheckserviceService {
  private server = 'http://46.101.204.215:1337/api/V1'
  private ApiStudentCompetences = '/studentcompetence';
  private ApiChapterIllustrations ="/chapterillustrations/";
  private ApiAvatars = "/avatar";
  private ApiChapters = "/chapter";
  private ApiEdPlan = "/educationalPlan";
  private ApiStudent = "/student";
  private token= "";

  constructor(private http: Http) {}

  private getJsonFromApi(url){

    var authHeader = new Headers();
    authHeader.append('Authorization', 'jriejkwko');
    console.log(this.server+url);
    return this.http.get(this.server+url, {headers: authHeader})
                    .map((res: Response) =>  res.json());
  }

  private put(url, body){
    let test= this.http.put(this.server+url, body).map((res:Response)=> res.json());
    return test;
  }

  studentLogin(){
    let credentials= JSON.stringify({ "username": "username", "password": "password" });
    let myToken = this.put("/login", credentials);
  }

  getAvatar(avatarID){
    let suffix = "";
    suffix = (avatarID !== "All" ? ("/"+avatarID) : suffix);
    return this.getJsonFromApi(this.ApiAvatars+suffix);
  }

  getStudent(){
    return this.getJsonFromApi(this.ApiStudent);
  }

  getChapterIllustrations(chapterID){
    let suffix = "";
    suffix = (chapterID !== "All" ? (":"+chapterID) : suffix);
    return this.getJsonFromApi(this.ApiChapterIllustrations+suffix);
  }

  getCompetences(checked,chapterID){
      let suffix = "";
      suffix = (checked !== "All" ? ("?checked='"+checked+"'") : suffix);
      suffix = (chapterID !== "All" ?
        (suffix !== "" ? suffix+"&chapterId='"+chapterID+"'" : "?chapterId='"+chapterID+"'"): suffix);

      return this.getJsonFromApi(this.ApiStudentCompetences+suffix);
  }

  getChapter(info){
    let suffix = "";
    suffix = (info !== "About" ? ("/"+info) : suffix);
    return this.getJsonFromApi(this.ApiChapters+suffix);
  }

  getEdPlan(info){
    let suffix = "";
    suffix = (info !== "About" ? ("/"+info) : suffix);
    return this.getJsonFromApi(this.ApiEdPlan+suffix);
  }

}
