import { Component, OnInit } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';
import { format, parseISO  } from 'date-fns';
import { es } from 'date-fns/locale';
import { DatePipe } from '@angular/common';
import { pipe } from 'rxjs';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage implements OnInit {

  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  dateFormattedString = '';
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) {

   }

  ngOnInit() {
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: MyModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }


  dateSelected(value) {
    this.dateFormattedString = format(parseISO(value), 'MMM d, yyyy', {locale: es});
    //this.formattedString = value;
    this.openModal();
  }

}
