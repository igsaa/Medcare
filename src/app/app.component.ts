import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  storage = Storage;

  constructor(private router: Router) {}
  
  async cerrarSesion(){
    await this.storage.remove({key:'usuario'})
    .then(async () => {await this.storage.remove({key:'doctor'})})
    .then(() => {
      console.log("\nDatos borrados con éxito")
      this.router.navigateByUrl('/', { replaceUrl: true })
    })
  }

  toStart(){
    this.router.navigate(['/start'], { replaceUrl: true });
  }

  toProfile(){
    this.router.navigate(['/profile'], { replaceUrl: true });
  }

  toMyData(){
    this.router.navigate(['/my-data'], { replaceUrl: true });
  }

}
