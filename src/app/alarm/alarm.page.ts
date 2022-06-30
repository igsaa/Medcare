import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { ModalController } from '@ionic/angular';
import { AlarmModalPage } from '../alarm-modal/alarm-modal.page'; 
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.page.html',
  styleUrls: ['./alarm.page.scss'],
})
export class AlarmPage implements OnInit {
  hora: any;
  constructor(private modalCtrl: ModalController, private route: ActivatedRoute) { 
    this.route.params.subscribe(params => {
      this.hora = params.hora;
    })
  }
  ngOnInit() {

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

}
