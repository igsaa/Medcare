import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';


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

  constructor(private dataService: DataService, private modalCtrl: ModalController) {
    this.loadData();
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
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
