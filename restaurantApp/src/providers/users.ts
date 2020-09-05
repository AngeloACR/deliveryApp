import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs-compat/Observable';
import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable()
export class UsersProvider {

  private snapshotChangesSubscription: any;

  downloadURL: Observable<string>;
  
  /**added**/
  public fireAuth : any;
  public restaurantUserInfo: any;

  constructor(public facebook: Facebook, public alertCtrl: AlertController ) {
	  
	  this.fireAuth = firebase.auth(); 
	  
	  this.restaurantUserInfo = firebase.database().ref('/users');
	  
  }

 


  loginUser(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  signupUser(email, password, firstname, lastname , phone, address 
  , cardnumber , nation , europeResult) {
	  
	  return this.fireAuth.createUserWithEmailAndPassword(email, password)
  	.then((newUser) =>{
  		this.restaurantUserInfo.child(newUser.user.uid).set({
        displayName: firstname,
		ownerId: newUser.user.uid,
		email: email, 
        address: address,
        phone: phone,
		lastName: lastname,
		facebook: false,
		cardnumber: cardnumber,
		europeResult: europeResult,
		nation: nation,
		first: "true",
		status: "active"
        });
  	});
	  
	  
	
  }

  facebookLogin(){
    return new Promise<any>((resolve, reject) => {
      this.facebook.login(['email']).then( response => {
        
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential).then( success => { 
          console.log("Firebase success: " + JSON.stringify(success)); 
          
          resolve(success);


        })
      })
    }).catch((error) => { console.log(error) });
  }





  logoutUser() {
    return firebase.auth().signOut();
  }




}
