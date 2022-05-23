import { Component } from '@angular/core';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user: string;
  pass: string;
  listData = [];

  constructor(private dataService: DataService) {
    this.loadData();
  }

  async loadData() {
    this.listData = await this.dataService.getData();
  }

  async addData() {
    await this.dataService.addData(this.user);
    await this.dataService.addData(this.pass);
    await this.dataService.addData('John Deere');
    await this.dataService.addData('ASMA');
    await this.dataService.addData('SALBUTAMOL');
    this.loadData();
  }

  async removeItem(index) {
    this.dataService.removeItem(index);
    this.listData.splice(index, 1);
  }

}
