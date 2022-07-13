import { Component,OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';
import { AlarmModalPage } from '../alarm-modal/alarm-modal.page'; 
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit{
  storage = Storage;
  alarma: any[];
  index:any;
  constructor(private modalCtrl: ModalController, private alert: AlertController) { 
  }

  ngOnInit() {
    this.llenarAlarma();
  }

  async llenarAlarma(){
    await this.storage.get({key: 'alarma'}).then((array) => {this.alarma = JSON.parse(array.value)})
  }

  async notificationModel(){
    await LocalNotifications.schedule({
      notifications:[{
        id:1,
        title: 'Recordatorio',
        body: 'Hora de tus medicamentos}',
        sound: 'beep.wav'
      }]
    });
  }

  getIndex(index){
    this.index = index;
    console.log(this.index)
  }

  async notificationModelDate(){
    await LocalNotifications.schedule({
      notifications:[{
        id:1,
        title: 'Recordatorio',
        body: 'Hora de tus Medicamentos',
        schedule:{every:'hour',count:8}
      }]
    });
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: AlarmModalPage,
      cssClass: 'popupTime-modal'
    });

    await modal.present();
  }

  openTime(){
    this.openModal();
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Deseas eliminar esta alarma?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'alert-button-cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          cssClass: 'alert-button-confirm',
          handler: () => {this.storage.remove({key:'alarma'});}
        }
      ]
    });
    await alert.present();
  }

}