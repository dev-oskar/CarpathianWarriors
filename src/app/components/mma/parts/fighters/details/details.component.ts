import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['../fighters.component.scss']
})
export class FighterDetailsComponent implements OnInit {
  
  fighter: Observable<any[]>;
  id: string;
  private sub: any;
  private itemDoc: AngularFirestoreDocument;

  constructor(db: AngularFirestore, private afs: AngularFirestore, private route: ActivatedRoute) {
    this.fighter = db.collection('zawodnicy').valueChanges();
  }
  
  ngOnInit() { 
    // Get id parameter from routing
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

}
