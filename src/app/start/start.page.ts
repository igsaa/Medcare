import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {

  today;

  constructor() { }

  ngOnInit() {
    //const now = new Date();
    //this.today = now.toISOString();
  }



}
