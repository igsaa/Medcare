import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  listData = [];
  name;
  meds;
  today;

  constructor(private dataService: DataService) {
    this.loadData(); 
  }

  async loadData() {
    this.listData = await this.dataService.getData();
    this.name = this.listData[2].toString();
    this.meds = this.listData[4].toString();
  }

  ngOnInit() {
    //const now = new Date();
    //this.today = now.toISOString();
  }
}
