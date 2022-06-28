import { Component, OnInit } from '@angular/core';
import { DbService } from '../services/db.service';
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

  constructor(private dataService: DbService, private modalCtrl: ModalController) {
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }

  ngOnInit() {
    //const now = new Date();
    //this.today = now.toISOString();
  }
}
