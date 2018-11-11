import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { ActivatedRoute, Router} from '@angular/router'
// import { DetailsComponent } from './details/details.component'


@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fighters: Observable<any[]>;
  // fighterDetails: DetailsComponent;

  constructor(db: AngularFirestore, private _activatedRoute: ActivatedRoute, private _router: Router) {
    this.fighters = db.collection('zawodnicy').valueChanges();
  }

  // showDetails(details:FighterDetails): void{
    
  //    this.fighterDetails = details;
  // }

  ngOnInit() {

  }

}
