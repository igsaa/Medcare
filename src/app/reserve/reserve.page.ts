import { Component, OnInit } from '@angular/core';
import { ReserveModalPage } from '../reserve-modal/reserve-modal.page';
import { ModalController } from '@ionic/angular';
import { format, parseISO  } from 'date-fns';
import { es } from 'date-fns/locale';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.scss'],
})
export class ReservePage{

  storage = Storage;
  fecha = '';
  horaMedica = '';
  minDate: string = new Date().toISOString();
  selectedDate: string = new Date().toISOString();

  constructor(private modalCtrl: ModalController) { this.horaTomada() }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ReserveModalPage,
      cssClass: 'popup-modal'
    });

    await modal.present();
  }

  //Método que desactica el día 0 (Domingo) del calendario
  notSunday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0;
  }

  //Método que trae la hora tomada en el reserve-modal
  async horaTomada(){
    await this.storage.get({key: 'horaMedica'}).then(data =>{
      this.horaMedica = data.value;
    })
  }

  //Método que guarda en una variable el mes, día y año seleccionado en el calendario
  //Luego abre reserve-page para seleccionar la hora
  async dateSelected(value) {
    this.fecha = format(parseISO(value), 'dd MMM, yyyy', {locale: es});
    await this.storage.set({key: 'fechaTemporal', value: this.fecha})
    this.openModal();
  }

}
