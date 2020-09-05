import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { take } from 'rxjs/operators'
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-withdraws',
  templateUrl: './withdraws.page.html',
  styleUrls: ['./withdraws.page.scss'],
})
export class WithdrawsPage implements OnInit {
  allrequests: any = [];

  constructor(
    private db: AngularFireDatabase,
    private commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getAllWithDraw()
  }


  getAllWithDraw() {
    this.db.list('transactions').snapshotChanges().subscribe((requests: any) => {
      if (requests != null) {
        let tmp = [];
        requests.forEach(request => {
          tmp.push({ key: request.key, ...request.payload.val() });
          return false;
        });
        this.allrequests = tmp;
      }
    })
  }

  send(txn) {
    this.db.object('drivers/' + txn.userId + '/balance').valueChanges().pipe(take(1)).subscribe((data: any) => {
      console.log(data);
      let balance = data;
      if (balance > txn.amount) {
        this.db.object('drivers/' + txn.userId).update({ balance: balance - txn.amount }).then(data => {
          this.db.object('transactions/' + txn.key).update({ status: 'SUCCESS' });
        })
      }
      else {
        this.commonService.showToast("Insufficient Balance")
      }

    })

  }
  cancel(txnId) {
    this.db.object('transactions/' + txnId).update({ status: 'CANCELED' });
  }

}
