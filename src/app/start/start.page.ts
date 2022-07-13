import { Component } from '@angular/core';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss'],
})
export class StartPage{

  constructor(private dbservice: DbService) {}

}
