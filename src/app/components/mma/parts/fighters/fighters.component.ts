import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router'
import { FighterDetailsComponent } from './details/details.component'

@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fighters: Observable<any[]>;
  fighterDetails: FighterDetailsComponent;

  name: string;

  // Get rid of polish signs and set id
  getId(name, lastname){
    let idWithoutPolishSigns = name.toLowerCase() + "-" + lastname.toLowerCase();
    
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ś/g,'s');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ą/g,'a');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ł/g,'l');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ę/g,'e');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ż/g,'z');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ż/g,'z');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ó/g,'o');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ć/g,'c');
    idWithoutPolishSigns = idWithoutPolishSigns.replace(/ń/g,'n');

    return idWithoutPolishSigns;
  }  

  constructor(db: AngularFirestore, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.fighters = db.collection('zawodnicy').valueChanges();
  }

  ngOnInit() {

  }

}
