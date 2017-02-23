import { Component, OnInit } from '@angular/core';
import {BodyDynamicsService} from "../body-dynamics.service"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bodyDynamics: BodyDynamicsService) { }

  ngOnInit() {
  }

}
