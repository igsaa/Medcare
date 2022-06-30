import { Component, OnInit } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  homepage: any;
  listData = [];
  name: string = '';
  meds;
  today;

  constructor(private dbservice: DbService, private modalCtrl: ModalController) {
    this.homepage = HomePage;
    this.llenarNombre();
  }
  
  llenarNombre(){
    this.dbservice.datosUsuario("asd").then((array: any) => {
      this.name = array.map(user => user.email);
    })
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
