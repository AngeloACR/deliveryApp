import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-promos',
  templateUrl: './promos.page.html',
  styleUrls: ['./promos.page.scss'],
})
export class PromosPage implements OnInit {
  promocodes: any = [];
  newpromocode: any = {};
  constructor(
    private db: AngularFireDatabase,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.getPromos();
  }

  getPromos() {
    this.db.list('promocodes').snapshotChanges().subscribe((snap: any) => {
      if (snap != null) {
        let tmp = [];
        snap.forEach(promo => {
          tmp.push({ key: promo.key, ...promo.payload.val() });
          return false;
        })
        this.promocodes = tmp;
      }
    })
  }
  delete(key) {
    this.db.object('promocodes/' + key).remove()
  }
  add() {
    this.db.list('promocodes').push(this.newpromocode).then(() => {
      this.commonService.showToast("Added");
    })
  }
  update(i) {
    let promocode = this.promocodes[i];
    this.db.object('promocodes/' + promocode.key).update(promocode).then(data => {
      this.commonService.showToast("Updated");
    }).catch(err => console.log(err));
  }

}
