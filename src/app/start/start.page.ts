import { Component, OnInit } from '@angular/core';
import { MyModalPage } from '../my-modal/my-modal.page';
import { ModalController } from '@ionic/angular';
import { HomePage } from '../home/home.page';
import { DbService } from '../services/db.service'; 
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  homepage: any;
  listData = [];
  name: '';
  meds: '';
  today: '';

  constructor(private dbservice: DbService, private modalCtrl: ModalController, private route: ActivatedRoute) {
    this.homepage = HomePage;
    this.route.params.subscribe(rut => {
      this.llenarNombre(rut.rut);
    })
  }
       
  llenarNombre(rut){
    this.dbservice.datosUsuario(rut).then((array: any) => {
      this.name = array.map(user => user.nombre.toUpperCase());
      this.meds = array.map(user => user.remedio.toUpperCase());
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
