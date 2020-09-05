import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {};
  adminEmail: any = 'tukonlineapp@gmail.com';
  constructor(
    private afAuth: AngularFireAuth,
    private commonService: CommonService
  ) { }

  ngOnInit() {
  }

  login() {
    console.log("calling");
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(data => {
      this.commonService.showToast("LoggedIn!")
      console.log(data);
    }).catch(err => {
      this.commonService.showToast("Error!")
    });
  }
}
