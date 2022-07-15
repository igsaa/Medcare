import { Component } from '@angular/core';
import { LocalNotifications,CancelOptions } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';
import { AlarmModalPage } from '../alarm-modal/alarm-modal.page'; 
import { Storage } from '@capacitor/storage';
import { AlertController } from '@ionic/angular';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage{
  hora: any;
  minuto:any;
  storage = Storage;
  alarma: any = [];
  index: any;
  estado: any = [];

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
    await this.storage.get({key: 'alarma_array'}).then((array) => {
      if(array.value!=null){
        this.alarma = JSON.parse(array.value)
      }
    })
    await this.storage.get({key: 'estado'}).then((array) => {
      if(array.value!=null){
        this.estado = JSON.parse(array.value)
      }
    })
    console.log('estado: '+this.estado[0])
  }

  //Método que retorna el índex del array de alarmas
  setIndex(index){
    this.index = index;
    console.log('indice: '+this.index)
  }

  //Método para eliminar el index encontrado de la alarma
  async eliminarAlarma(index){
    this.setIndex(index)
    this.alarma.splice(index,1)
    await this.storage.remove({key: 'alarma_array'})
    await this.storage.set({key: 'alarma_array', value: JSON.stringify(this.alarma)}).then(()=>{
      alert("Alarma borrada con éxito")
    })
    this.alarma.splice(index,1)
    await this.storage.remove({key: 'estado'})
    await this.storage.set({key: 'estado', value: JSON.stringify(this.estado)})
  }

  async notificationModel(index){
    this.hora = this.alarma[index].split(':')[0];
    this.minuto = this.alarma[index].split(':')[1];
    console.log('Alarma: '+this.alarma[index]);
    console.log('Estado: '+this.estado[index])
    this.estado.splice(index,1, this.estado[index])
    await this.storage.remove({key: 'estado'})
    await this.storage.set({key: 'estado', value: JSON.stringify(this.estado)})
    if (this.estado[index]==true){
      await LocalNotifications.schedule({
        notifications:[{
          id:index,
          title: 'Recordatorio',
          body: 'Hora de tus medicamentos',
          sound: 'beep.wav',
          schedule:{on:{hour: this.hora, minute: this.minuto, second:0}}
        }]
      });
    }
    else{
      LocalNotifications.cancel({
        notifications: [{
          id: index
        }]
      })
    }
  }

  async notificationModelTest(){
    await LocalNotifications.schedule({
      notifications:[{
        id: 8888,
        title: 'Recordatorio',
        body: 'Hora de tus Medicamentos'
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