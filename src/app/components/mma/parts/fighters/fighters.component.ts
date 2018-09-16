import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-fighters',
  templateUrl: './fighters.component.html',
  styleUrls: ['./fighters.component.scss']
})
export class FightersComponent implements OnInit {

  fighters: Observable<any[]>;

  constructor(db: AngularFirestore) {
    this.fighters = db.collection('zawodnicy').valueChanges();
  }

  ngOnInit() {
  }

}
