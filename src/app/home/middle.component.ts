import { Component, OnInit } from '@angular/core';
import { CheckserviceService } from '../../../checkservice.service';
import {Http, Headers} from '@angular/http';

@Component({
  selector: 'app-middle',
  templateUrl: './middle.component.html',
  styleUrls: ['./middle.component.css'],
  providers: [CheckserviceService]
})
export class MiddleComponent implements OnInit {
  public siteContent= [];
  public siteIllustrations = [];

  constructor(private CheckserviceService: CheckserviceService) {
  }

  ngOnInit() {
    this.CheckserviceService.studentLogin();
    this.getAllCompetences();
    this.getAllIllustrations();
  }

  private getAllCompetences(){
    this.CheckserviceService.getCompetences("All","All")
        .subscribe((competence: Array<Object>) => this.siteContent = competence);
  }

  private getAllIllustrations(){
    this.CheckserviceService.getChapterIllustrations("All")
        .subscribe((illustration: Array<Object>) => this.siteIllustrations = illustration);
  }

}
