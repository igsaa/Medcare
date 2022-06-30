import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { format,parseISO } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alarm-modal',
  templateUrl: './alarm-modal.page.html',
  styleUrls: ['./alarm-modal.page.scss'],
})
export class AlarmModalPage implements OnInit {
  timeFormattedString= 'testing';

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {
  }

  dismiss(){
    this.modalCtrl.dismiss();
  }

  timeSelected(value){
    this.timeFormattedString = format(parseISO(value), 'HH:mm');
    console.log('HORA ' + this.timeFormattedString);
  }

  aceptarBtn(){
    this.router.navigate(['/alarm', this.timeFormattedString])
  }

}
