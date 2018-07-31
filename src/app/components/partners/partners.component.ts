import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
  items: Observable<any[]>;
  
  constructor(db: AngularFirestore){
    this.items = db.collection('partnerzy').valueChanges();
  }

  ngOnInit() {
  }

}
