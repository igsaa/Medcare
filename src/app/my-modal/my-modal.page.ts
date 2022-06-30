import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.page.html',
  styleUrls: ['./my-modal.page.scss'],
})
export class MyModalPage implements OnInit {

  timeFormattedString = '';
  minTime = '08:00';
  maxTime = '18:00';
  hourValues = ['08','09','10','11','12','13','14','15','16','17','18'];
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  timeSelected(value){
    this.timeFormattedString = format(parseISO(value), 'HH:mm');
    console.log('HORA ' + this.timeFormattedString);
  }

}
