import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'; 

export interface Item { imie: string; }


@Component({
  selector: 'fighter-details',
  templateUrl: './details.component.html',
  styleUrls: ['../fighters.component.scss']
})
export class FighterDetailsComponent implements OnInit {

  fighter: {};
  id: string;
  private sub: any;
  private item: Observable<Item>
  private itemDoc: AngularFirestoreDocument;
  

  constructor(db: AngularFirestore, private afs: AngularFirestore, private route: ActivatedRoute) {
    // Get id parameter from routing
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    
    this.fighter = db.collection("zawodnicy")
  }
  
  update(item: Item) {
    this.itemDoc.update(item);
  }

  ngOnInit() { 

  }

}
