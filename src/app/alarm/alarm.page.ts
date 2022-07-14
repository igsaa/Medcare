import { Component } from '@angular/core';
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
export class AlarmPage{

  storage = Storage;
  alarma: any = [];
  index: any;

  constructor(private modalCtrl: ModalController, private alert: AlertController) {
    this.llenarAlarma();
  }

  //Método que abre el modal "alarm-modal"
  async openModal(){
    const modal = await this.modalCtrl.create({
      component: AlarmModalPage,
      cssClass: 'popupTime-modal'
    });

    await modal.present();
  }

  //Método que asigna las alarmas guardadas en la array para mostrarlas
  async llenarAlarma(){
    await this.storage.get({key: 'alarma_array'}).then((array) => {this.alarma = JSON.parse(array.value)})
  }

  //Método que retorna el índex del array de alarmas
  setIndex(index){
    this.index = index;
    console.log(this.index)
  }

  //Método para eliminar el index encontrado de la alarma
  async eliminarHoraMedica(index){
    this.setIndex(index)
    this.alarma.splice(index, 1)
    await this.storage.remove({key: 'horaMedica_array'})
    await this.storage.set({key: 'horaMedica_array', value: JSON.stringify(this.alarma)}).then(()=>{
      alert("Alarma borrada con éxito")
    })
  }

  async notificationModel(){
    await LocalNotifications.schedule({
      notifications:[{
        id:1,
        title: 'Recordatorio',
        body: 'Hora de tus medicamentos',
        sound: 'beep.wav'
      }]
    });
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