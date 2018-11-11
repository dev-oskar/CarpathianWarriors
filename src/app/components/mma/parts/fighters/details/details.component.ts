import { Component, OnInit, Input } from '@angular/core';
import { FightersComponent } from '../fighters.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../fighters.component.scss']
})
export class DetailsComponent implements OnInit {
  
  // @Input() fighter: DetailsComponent;

  constructor() { 

  }
  
  ngOnInit() {
  }

}
