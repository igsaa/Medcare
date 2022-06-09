import { Component, OnInit } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular'; 


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }

  onDateSelected(){
    this.openModal();
  }

}
