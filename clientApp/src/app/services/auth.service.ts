import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "@angular/fire/auth";
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";
import { Observable } from "rxjs";
import { Storage } from "@ionic/storage";
import {
  EMAIL_VERIFICATION_ENABLED,
  DEFAULT_AVATAR,
  APPROVAL_REQUIRED
} from "src/environments/environment";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private fcm: FCM,
    private storage: Storage
  ) {}

  async login(email: string, pass: string) {
    try {
      let authData = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        pass
      );
      console.log(authData.user.uid);
      let uid = authData.user.uid;
      console.log(uid);
      let snap = await this.getUser(uid)
        .snapshotChanges()
        .pipe(take(1))
        .toPromise();
      let key = snap.key;
      let val: any = snap.payload.val();
      let user = { key, ...val };
      console.log(user);
      await this.storeAuthData(user);
      await this.setUId(uid);
      await this.setStatus(true);
      await this.getFCMToken(uid);
    } catch (error) {
      console.log(error.toString());
      throw error;
    }
  }

  async setToken(token) {
    let uid = await this.getUId();
    this.db.object("passengers/" + uid).update({
      token: token
    });
  }

  async getFCMToken(uid) {
    try {
      let token = await this.fcm.getToken();
      console.log(`token: ${token}`);
      this.db.object("passengers/" + uid).update({
        token: token
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async storeAuthData(authData) {
    await this.storage.set("authData", JSON.stringify(authData));
  }

  async getStatus() {
    let isLogged = await this.storage.get("isLogged");
    return isLogged;
  }

  async getAuthData() {
    let authData = await this.storage.get("authData");
    return JSON.parse(authData);
  }
  async setUId(uid) {
    await this.storage.set("uid", uid);
  }
  async getUId() {
    let uid = await this.storage.get("uid");
    return uid;
  }
  async setStatus(authData) {
    await this.storage.set("isLogged", "true");
  }
  reset(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  async register(userInfo) {
    try {
      let email: string = userInfo.email;
      let password: string = userInfo.password;
      let authData = await this.afAuth.auth.createUserWithEmailAndPassword(
        email,
        password
      );
      // update driver object
      console.log(authData);
      userInfo.uid = authData.user.uid;
      userInfo.photoURL = DEFAULT_AVATAR;
      userInfo.isPhoneVerified = false;

      this.getUserData().updateProfile({
        displayName: userInfo.name,
        photoURL: DEFAULT_AVATAR
      });
      let userData = {
        address: userInfo.address,
        name: userInfo.name,
        displayName: userInfo.name,
        phone: userInfo.phoneNumber,
        uid: userInfo.uid,
        email: userInfo.email,
        photoURL: DEFAULT_AVATAR,
        status: "active",
        facebook: false,
        first: "true"
      };
      this.updateUserProfile(userData);

      if (EMAIL_VERIFICATION_ENABLED)
        this.getUserData().sendEmailVerification();

      /*     return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((authData: any) => {
        // update driver object
        console.log(authData);
        userInfo.uid = authData.user.uid;
        userInfo.photoURL = DEFAULT_AVATAR;
        userInfo.isPhoneVerified = false;

        this.getUserData().updateProfile({
          displayName: userInfo.name,
          photoURL: DEFAULT_AVATAR
        });
        let userData = {
          address: userInfo.address,
          name: userInfo.name,
          displayName: userInfo.name,
          phone: userInfo.phoneNumber,
          uid: userInfo.uid,
          email: userInfo.email,
          photoURL: DEFAULT_AVATAR,
          status: "active",
          facebook: false,
          first: "true"
        };
        this.updateUserProfile(userData);

        if (EMAIL_VERIFICATION_ENABLED === true)
          this.getUserData().sendEmailVerification();
      }); */
    } catch (error) {}
  }

  sendVerification() {
    this.getUserData().sendEmailVerification();
  }

  // update user display name and photo
  updateUserProfile(user) {
    console.log(user);
    let name = user.name ? user.name : user.email;
    let photoUrl = user.photoURL ? user.photoURL : DEFAULT_AVATAR;

    this.getUserData().updateProfile({
      displayName: name,
      photoURL: photoUrl
    });

    // create or update passenger
    this.db.object("passengers/" + user.uid).update(user);
  }

  getUserData() {
    return this.afAuth.auth.currentUser;
  }

  getUser(id) {
    return this.db.object("passengers/" + id);
  }

  async logout() {
    try {
      console.log("login out");
      await this.afAuth.auth.signOut(); // logout from firebase
      await this.storage.clear();
      localStorage.clear();
    } catch (error) {
      console.log(error.toString());
    }
  }
}
