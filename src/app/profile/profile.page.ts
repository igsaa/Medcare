import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage{

//Datos ingresados manualmente para testeo - BORRAR ESTA LINEA
nombredoctor = 'Sigmun Froid';
centroMed = 'Centro Médico MedCare San Joaquín';
peso = '75';
altura = '180';
edad= '54';
rh= 'AB';
enfermedad= 'Asma';
tratamiento= 'Aplicación de penedol';
dosis='Cada 8 horas';

  constructor() { }


}
