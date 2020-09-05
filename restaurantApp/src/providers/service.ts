import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs-compat/Observable';
import * as firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
//import {map} from 'rxjs/Operator/map';
import { URLSearchParams } from '@angular/http';
import { Place } from "./place";


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { take } from 'rxjs/operators';



@Injectable()
export class ServiceProvider {


	product_id: Array<number> = [];
	url: any;
	cart: any;
	params:any;
	orderLists: any;
	public ref: any;  
	productsList:any;
	customerList: any;
	public orderList: any;
	
	
	total: number = 0;
	proqty: Array<number> = [];
	getSecKey: any;
	users: any;
	

	public fireAuth: any;
	public restaurantUserInfo : any;
	public restaurants : any;
	public restaurantCategory : any;
	public category: any;
	public restaurantItems: any;
	public items: any;
	public currentUser: any;
	public userAddressList: any;
	
	public cityName: any;
	public cityDistrictName: any;
	public streetName: any;
	public apartmentOfficeName: any;
	public categorizedOrders: any;
	public favoriteItem: any;
	public favoriteItemList: any;
	public chats: any;
	public userChatList: any;
	public allChoosenItems: any;
	
	public hotelCords: any;
	
	public bannerList: any;
	
	public ownerRestaurantList: any;
	
	public ownerCategoryList: any;
	
	public addCategory: any;
	
	public ownerCategoryListDetails: any;
	
	public ownerRestaurantListDetails: any;
	
	public newUserChatList: any;
	
	public categorizedOrderList: any;
	
	public ownerOrderList: any;
	
	public allOrderDetails: any;
	
	public orderCompleted: any;
	
	public uberDriversList: any;
	
	public uberDeal: any;
	
	public orderlistByDay: any;
	
	public reportsDay: any;
	
	public reportsMonth: any;
	
	public reportsYear: any;
	
	public orderlistByMonth: any;
	
	public orderlistByYear: any;
	
	public restaurantOrderList: any;
	
	public restaurantOrderListMonth: any;
	
	public restaurantOrderListYear: any;
	
	public uberActiveDrivers: any;
	
	/*******integrated******/
	public destination: any;
	
	private origin: any;
	
	private currency: any;
	
	private locality: any;
	
	private paymentMethod: any;
	
	private id: any;

  constructor(public facebook: Facebook, 
  public alertCtrl: AlertController,private afAuth: AngularFireAuth, 
  private db: AngularFireDatabase,
  private http: HttpClient  ) {
	  
	  this.cart = { "line_items": [],
		"extraOptions": [] };
		
	  //this.currentUser = firebase.auth().currentUser;
	  
	  //console.log(this.currentUser);
	  
	  this.fireAuth = firebase.auth(); 
	  
	  this.restaurantUserInfo = firebase.database().ref('/users');
	  
	  this.restaurants = firebase.database().ref('/restaurants');
	  
	  this.restaurantCategory = firebase.database().ref('/category');
	  
	  this.items = firebase.database().ref('/items');
	  
	  this.cityName = firebase.database().ref('/city');
	  
	  this.cityDistrictName = firebase.database().ref('/districts');
	  
	  this.streetName = firebase.database().ref('/streets');
	  
	  this.apartmentOfficeName = firebase.database().ref('/apartments');
	  
	  this.orderList = firebase.database().ref('/orders'); 
	  
	  this.categorizedOrders = firebase.database().ref('/categorizedOrders');
	  
	  this.chats = firebase.database().ref('/chats');
	  
	  this.allChoosenItems = firebase.database().ref('/items');
	  
	  this.hotelCords = firebase.database().ref('/cordItems');
	  
	  
	  this.bannerList = firebase.database().ref('/slider');
	  
	  this.addCategory = firebase.database().ref('/Category_List'); 
	  
	  this.categorizedOrderList = firebase.database().ref('/categorizedOrders');
	  
	  this.orderCompleted = firebase.database().ref('/orderCompleted'); 
	  
	  this.uberDriversList = firebase.database().ref('/uberDriversList'); 
	  
	  this.uberDeal = firebase.database().ref('/uberDeal'); 
	  
	   this.reportsDay = firebase.database().ref('/reportsDay');
	  
	  this.reportsMonth = firebase.database().ref('/reportsMonth');
	  
	  this.reportsYear = firebase.database().ref('/reports');
	  
	  this.restaurantOrderList = firebase.database().ref('/restaurantorderlist');
	  
	  this.restaurantOrderListMonth = firebase.database().ref('/restaurantorderlistmonth');
	  
	  this.restaurantOrderListYear = firebase.database().ref('/restaurantorderlistyear');
	  
	  this.uberActiveDrivers = firebase.database().ref('/uberDriverOrderList');
	  
	  
	  
	  
	  
  }
  
  
  
  getUberDriverDetails(id){
	  
	  
	  return this.uberDriversList.child(id);
  }
  
  removeOnesignalTokenId(){
	  
		var uid = firebase.auth().currentUser.uid;
		
		
	  
	    return this.restaurantUserInfo.child(uid).update({
		 
			fcm_one_signal: ''
	  
		});
	  
  }
  
  updateOnesignalTokenId(tokenId){
	  
		var uid = firebase.auth().currentUser.uid;
		
		
	  
	    return this.restaurantUserInfo.child(uid).update({
		 
			fcm_one_signal: tokenId
	  
		});
	  
  }
  
  sendNotification(msg, title, id) {
    const body = {
      app_id: environment.onesignal.appId,
      include_player_ids: [id],
      headings: { en: title },
      contents: { en: msg },
      data: { task: msg }
    };
    const header = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Basic ${environment.onesignal.restKey}`)
    };
    return this.http.post('https://onesignal.com/api/v1/notifications', body, header);
  }
  
  
  getUberDriverPosition( id) {

	  console.log(id);
	  
    return this.db.object('activeDriverList/' + id);
  }
  
  getDriver(id) {
    return this.db.object('uberDriversList/' + id);
  }
  
 
  
   getRestaurantManagerInfo() {
    return this.afAuth.auth.currentUser;
  }
  
  setCurrency(currency) {
    return this.currency = currency;
  }
  
  setUberEatRestaurantCoordinate(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return this.origin = place.getFormatted();
  }
  
 
  getRestaurantCoordinate() {
    return this.origin;
  }
  
  getCustomerDeliveryAddress() {
    return this.destination
  }
  
  
  
  getUberActiveDriverList(){
	  var uid = firebase.auth().currentUser.uid;
	  
	  return this.uberActiveDrivers.orderByChild("restaurantOwnerId").equalTo(uid);
  }
  
  getDrivers(){
	  return this.uberDriversList;
  }
  
  saveOrderStatusBySuperDay(year, month, day, id , status){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderList.child(year).child(month).child(day).child(id).update({
		  status : status,
		});
	   

	  
  }
  
  saveOrderStatusBySuperDayOrigin(year, month, day, id , status,originLat,originLng,originVicinity){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderList.child(year).child(month).child(day).child(id).update({
		  status : status,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		});
	   

	  
  }
  
  saveOrderStatusBySuperMonth(year, month, id , status){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderListMonth.child(year).child(month).child(id).update({
		  status : status,
		});
	   

	  
  }
  
  saveOrderStatusBySuperMonthOrigin(year, month, id , status,originLat ,originLng,originVicinity){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderListMonth.child(year).child(month).child(id).update({
		  status : status,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		});
	   

	  
  }
  
  saveOrderStatusBySuperYear(year, id , status){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderListYear.child(year).child(id).update({
		  status : status,
		});
	   

	  
  }
  
  saveOrderStatusBySuperYearOrigin(year, id , status, originLat ,originLng,originVicinity){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	 
	   
	   return this.restaurantOrderListYear.child(year).child(id).update({
		  status : status,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		});
	   

	  
  }
  
  
  
  
  
  orderByOwnerYear(year){
	  
	    var uid = firebase.auth().currentUser.uid;
		

		
		console.log(year);
		
		
	  
	   this.orderlistByYear = this.reportsYear.child(year).child(uid);
	   
	   
	  
	   console.log(this.orderlistByYear);
	   
	  return this.orderlistByYear;
	  
  }
  
  orderByOwnerMonth(year,month){
	  
	    var uid = firebase.auth().currentUser.uid;
		

		
		console.log(year);
		console.log(month);
		
	  
	   this.orderlistByMonth = this.reportsMonth.child(year).child(month).child(uid);
	   
	   
	  
	   console.log(this.orderlistByMonth);
	   
	  return this.orderlistByMonth;
	  
  }
  
  saveOrderStatusByYear(year, id , status, total){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   return this.reportsYear.child(year).child(uid).child(id).update({
		  status : status,
		  total : total,
		});
	   

	  
  }
  
  saveOrderStatusByYearOrigin(year, id , status, total,originLat,originLng,originVicinity){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);

	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   return this.reportsYear.child(year).child(uid).child(id).update({
		  status : status,
		  total : total,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity
		});
	   

	  
  }
  
  saveOrderStatusByMonth(year,month, id , status, total){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);
		console.log(month);
		
	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   return this.reportsMonth.child(year).child(month).child(uid).child(id).update({
		  status : status,
		  total : total,
		});
	   

	  
  }
  
  saveOrderStatusByMonthOrigin(year,month, id , status, total,originLat,originLng,originVicinity){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);
		console.log(month);
		
	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   return this.reportsMonth.child(year).child(month).child(uid).child(id).update({
		  status : status,
		  total : total,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		});
	   

	  
  }
  
  saveOrderStatusByDay(year,month,day, id , status, total){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);
		console.log(month);
		console.log(day);
	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   return this.reportsDay.child(year).child(month).child(day).child(uid).child(id).update({
		  status : status,
		  total : total,
		});
	   

	  
  }
  
  
  uberRestaurantCoordinateFormat(address) {
    console.log(address);
    let components = address.address_components;
    let vicinity = address.formatted_address;
   
    return {
      location: {
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng()
      },
      vicinity: vicinity
    }
  }
  
  saveOrderStatusByDayOrigin(year,month,day, id , status, total,originLat,originLng,originVicinity,order_details){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
		console.log(year);
		console.log(month);
		console.log(day);
	  
	   //this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   /**
	   return this.reportsDay.child(year).child(month).child(day).child(uid).child(id).update({
		   
		   
		   
		  status : status,
		  total : total,
		   originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		});
	***/
		
		return this.reportsDay.child(year).child(month).child(day).child(uid).child(id).update({
		   
				id: order_details[0].id,
				addresses: order_details[0].addresses,
				customerDetails: order_details[0].customerDetails,
				email: order_details[0].email,
				payments: order_details[0].payments,
				reverseOrder: order_details[0].reverseOrder,
				items: order_details[0].items,
				status: status,
				timeStamp: order_details[0].timeStamp,
				originLat:  originLat,
				originLng: originLng,
				originVicinity: originVicinity,
				total: total,
		   
		 
		});
		
		
				

	  
  }
  
   orderByOwnerDay(year,month,day){
	  
	    var uid = firebase.auth().currentUser.uid;
		
		
	
	   // var yearValue = parseToFloatyear;
		
		var yearValue =  parseFloat(year);
		
		console.log(year);
		console.log(month);
		console.log(day);
	  
	   this.orderlistByDay = this.reportsDay.child(year).child(month).child(day).child(uid);
	   
	   
	  // console.log(this.orderCompleted.child(uid).orderByChild("year").equalTo(year));
	   console.log(this.orderlistByDay);
	   
	  return this.orderlistByDay;
	  
  }
  
   saveStatus(id , status, total){
	  return this.orderList.child(id).update({
		  status : status,
		  total : total,
    });
  }
  
   saveStatusOrigin(id , status, total,originLat,originLng,originVicinity){
	  return this.orderList.child(id).update({
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
		  status : status,
		  total : total,
    });
  }
  
   saveStatusByOwner(id, status, total){
	   
	    var uid = firebase.auth().currentUser.uid;
	  
	 
	   
	  return this.categorizedOrderList.child(uid).child("orders").child(id).update({
		  status : status,
		  total: total,
    });
  }
  
   saveStatusByOwnerOrigin(id, status, total,originLat,originLng,originVicinity){
	   
	    var uid = firebase.auth().currentUser.uid;
	  
	 
	   
	  return this.categorizedOrderList.child(uid).child("orders").child(id).update({
		  status : status,
		  total: total,
		  originLat: originLat,
		  originLng: originLng,
		  originVicinity: originVicinity,
    });
  }
  
  
    createOwnerOrderStatus(id, order_details,status,total){
	  
		  var uid = firebase.auth().currentUser.uid;
		  
		  console.log(id);
		  console.log(order_details);
		  console.log(status);
	   
		
		return this.orderCompleted.child(uid).child(id).update({
				
				id: order_details[0].id,
				addresses: order_details[0].addresses,
				customerDetails: order_details[0].customerDetails,
				email: order_details[0].email,
				payments: order_details[0].payments,
				reverseOrder: order_details[0].reverseOrder,
				items: order_details[0].items,
				status: status,
				timeStamp: order_details[0].timeStamp,
				total: total,
				
		});
		
		
	
  }
  
  cancelUberDriverOffer(id) {
    return this.db.object('uberDriverOrderList/' + id).update({ status: 'canceled' })
  }
  
  getUberDriverOfferDetails(id) {
    return this.db.object('uberDriverOrderList/' + id);
  }
  
  
 
  
  createOwnerOrderStatusOrigin(id, order_details,status,total,originLat,originLng,originVicinity){
	  
		  var uid = firebase.auth().currentUser.uid;
		  
		  console.log(id);
		  console.log(order_details);
		  console.log(status);
	   
		
		return this.orderCompleted.child(uid).child(id).update({
				
				id: order_details[0].id,
				addresses: order_details[0].addresses,
				customerDetails: order_details[0].customerDetails,
				email: order_details[0].email,
				payments: order_details[0].payments,
				reverseOrder: order_details[0].reverseOrder,
				items: order_details[0].items,
				status: status,
				timeStamp: order_details[0].timeStamp,
				originLat:  originLat,
				originLng: originLng,
				originVicinity: originVicinity,
				total: total,
				
		});
		
		
	
  }
  

  
  getOrderDetails(id){
	  
	  
	  this.allOrderDetails = this.orderList.child(id);
	  return this.allOrderDetails;
  }
  
  orderByOwner(){
    var uid = firebase.auth().currentUser.uid;
	  
	   this.ownerOrderList = this.categorizedOrderList.child(uid).child("orders").orderByChild("restaurant_owner_id").equalTo(uid);
	   
	   console.log(this.ownerOrderList);
	   
	  return this.ownerOrderList;
	  
	  
  }
  
   deleteCategory(id){
	  
	  return this.restaurantCategory.child(id).remove();
	  
  }
  
  
  editCategory(cat_id: any, 
	cat_name: any,
	res_name: any, 
	downloadURL: any,
	categoryID: any,
	restaurantDetails: any){  
	 // console.log(restaurantID);
	  
	  console.log(cat_id);
	  console.log(cat_name);
	  console.log(res_name);

	  console.log(downloadURL);
	  console.log(categoryID);
	  console.log(restaurantDetails);
	  //console.log(categoryDetails);
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	  	return this.restaurantCategory.child(categoryID).update({

			  cat_id: cat_id,
			  cat_name: cat_name,
			  image: downloadURL,
			  firebase_url: downloadURL,
			  res_id: res_name,
			  res_name: res_name,
			  restaurant_image: restaurantDetails.firebase_url,
			  restaurant_lat: restaurantDetails.lat,
			  restaurant_long: restaurantDetails.long,
			  restaurant_name: restaurantDetails.title,
			  user_id:  uid,
		

			});
	

	
	
	
	
	
	
	
	
  }
  
   deleteRestaurant(id){
	  
	  return this.restaurants.child(id).remove();
	  
  }
  
  editRestaurant(title: any, 
	address: any,
	description: any, 
	info: any,
	lat: any,
	long: any,
	mark: any,
	option: any,
	outlet: any,
	phonenumber: any,
	downloadURL: any,
	restaurantID: any){  
	 // console.log(restaurantID);
	  
	  console.log(title);
	  console.log(address);
	  console.log(description);
	  console.log(info);
	  console.log(lat);
	  console.log(long);
	  console.log(mark);
	  console.log(option);
	  console.log(outlet);
	  console.log(phonenumber);
	  console.log(downloadURL);
	  console.log(restaurantID);
	  //console.log(categoryDetails);
	  
	  var uid = firebase.auth().currentUser.uid;
	
	
    return this.restaurants.child(restaurantID).update({
      
	  address: address,
	  description: description,
	  firebase_url: downloadURL,
	  image: downloadURL,
	  info: info,
	  lat: lat,
	  long: long,
	  mark: mark,
	  option: option,
	  outlet: outlet,
	  phonenumber: phonenumber,
	  title: title,
	  user_id: uid,
	 
    });
	
	
	
	
	
	
	
	
  }
  
  addNewCategory(newCategory, downloadURL, restaurantDetails){
	  console.log(newCategory);
	  console.log(downloadURL);
	  
	    var uid = firebase.auth().currentUser.uid;
	  
			return this.restaurantCategory.push({

			  cat_id: newCategory.cat_id,
			  cat_name: newCategory.cat_name,
			  image: downloadURL,
			  firebase_url: downloadURL,
			  res_id: newCategory.res_name,
			  res_name: newCategory.res_name,
			  restaurant_image: restaurantDetails.firebase_url,
			  restaurant_lat: restaurantDetails.lat,
			  restaurant_long: restaurantDetails.long,
			  restaurant_name: restaurantDetails.title,
			  user_id:  uid,
		

			});
	  
	  
  }
  
  setUberEatRestaurantAddressFromGeocoder(results) {
    let component;
    let address;

    for (let i = 0; i < results.length; i++) {
      address = results[i];
      for (let j = 0; j < address.address_components.length; j++) {
        component = address.address_components[j];

        // if (component.types[0] == 'administrative_area_level_2') {
        if (component.types[0] == 'locality') {
          // escape firebase characters
          let locality = component.short_name.replace(/[\%\.\#\$\/\[\]]/, '_');
          this.createAddressFromGoogleGeocoder(locality);

          return locality;
        }
      }
    }

    return false;
  }
  
   addNewRestaurant(
	  newRestaurant,   
	  downloadURL,
	 ){
		 
		 console.log(newRestaurant);
		 console.log(downloadURL);
		
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	   return this.restaurants.push({

			  address: newRestaurant.address,
			  description: newRestaurant.description,
			  info: newRestaurant.info,
			  lat: newRestaurant.lat,
			  long: newRestaurant.long,
			  mark: newRestaurant.mark,
			  option : newRestaurant.option,
			  outlet : newRestaurant.outlet,
			  phonenumber : newRestaurant.phonenumber,
			  title : newRestaurant.title,
			  firebase_url : downloadURL,
			  image: downloadURL,
			  user_id: uid,
			});
	  
 
  }
  
   // Converts numeric degrees to radians
  calculateRadius(value) {
    return value * Math.PI / 180;
  }
  
  
  
  
  
  createAddressFromGoogleGeocoder(locality) {
    return this.locality = locality;
  }

  
  addRestaurantPro2(
	  newItem,   
	  downloadURL,
	  category
	 ){
		 
		 console.log(newItem);
		 console.log(downloadURL);
		 console.log(category);
	  
	  var uid = firebase.auth().currentUser.uid;
	  
    return this.items.push({

	  available: newItem.available,
	  categories : newItem.categories,
	  category: newItem.category,
	  description: newItem.description,
	  image: newItem.image,
      name: newItem.name,
	  percent: newItem.percent,
	  price : newItem.price,
	  real_price : newItem.real_price,
	  stock : newItem.stock,
	  image_firebase_url : downloadURL,
	  user_id: uid,
	  res_id: category.res_id,
	  restaurant_image: category.restaurant_image,
	  restaurant_lat: category.restaurant_lat,
	  restaurant_long: category.restaurant_long,
	  restaurant_name: category.restaurant_name,

    });
	
	
  }
  
  
  addRestaurantPro(
	  name, 
	  available, 
	  category,
	  description, 
	  image, 
	  percent, 
	  price, 
	  real_price, 
	  stock, 
	  categories,  
	  downloadURL,
	  res_id,
	  restaurant_image,
	  restaurant_lat,
	  restaurant_long,
	  restaurant_name,
	  facebook,
	  instagram,
	  snapchat){
	  
	  var uid = firebase.auth().currentUser.uid;
	  
    return this.items.push({

      name: name,
      available: available,
      category:category,
      description: description,
      image: image,
	  percent: percent,
	  price : price,
	  real_price : real_price,
	  stock : stock,
	  categories : categories,
	  image_firebase_url : downloadURL,
	  user_id: uid,
	  res_id: res_id,
	  restaurant_image: restaurant_image,
	  restaurant_lat: restaurant_lat,
	  restaurant_long: restaurant_long,
	  restaurant_name: restaurant_name,
	  facebook: facebook,
	  instagram: instagram,
	  snapchat: snapchat,

    });
      
   
   
  }
  
  
  
  
  restaurantByOwner(){
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	   this.ownerRestaurantList = this.restaurants.orderByChild("user_id").equalTo(uid);
	  return this.ownerRestaurantList;
	  
  }
  

  getRestaurantsById(id){
	 var uid = firebase.auth().currentUser.uid;
	  
	   this.ownerRestaurantListDetails = this.restaurants.child(id);
	  return this.ownerRestaurantListDetails;
	  
  }
  
   setCustomerDeliveryAddress(vicinity, lat, lng) {
    let place = new Place(vicinity, lat, lng);
    return this.destination = place.getFormatted();
  }
  
  
  getCategoriesById(id){
	 var uid = firebase.auth().currentUser.uid;
	  
	   this.ownerCategoryListDetails = this.restaurantCategory.child(id);
	  return this.ownerCategoryListDetails;
	  
  }
  
    getCategoryList(): any {
    return this.addCategory;
  }

  
    categoryByOwner(){
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	   this.ownerCategoryList = this.restaurantCategory.orderByChild("user_id").equalTo(uid);
	  return this.ownerCategoryList;
	  
  }
  
  restaurantsByOwner(){
	  
	  console.log(firebase.auth().currentUser.uid);
	  
	  var uid = firebase.auth().currentUser.uid;
	  
	  console.log(uid);
	  
	   this.ownerRestaurantList = this.restaurants.orderByChild("user_id").equalTo(uid);
	   
	   console.log(this.ownerRestaurantList);
	   
	  return this.ownerRestaurantList;
	  
  }
  
  calculateDistance(lat1, lon1, lat2, lon2) {
    let R = 6371; // km
    let dLat = this.calculateRadius(lat2 - lat1);
    let dLon = this.calculateRadius(lon2 - lon1);
    lat1 = this.calculateRadius(lat1);
    lat2 = this.calculateRadius(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;
  }


  
  
  getRestaurantUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }
  
  
  getRestaurantsList(): any{
	  console.log(this.restaurants);
	  return this.restaurants;
  }
  
  getAllCategoryList(){
	   
    this.category = this.restaurantCategory;
    return this.category;
  }
  
   getDriverDeal(driverId) {
	  
	  console.log(driverId);
	  
    return this.db.object('uberDeal/' + driverId);
  }
  
  getRestaurantCategoryLists(id){
	   console.log(id);
    this.category = this.restaurantCategory.orderByChild("res_name").equalTo(id);
    return this.category;
  }
  
  getItemLists(id){
	 console.log(id);
    this.restaurantItems = this.items.orderByChild("categories").equalTo(id);
    return this.restaurantItems;
	  
  }

  
  saveNewAddress(city,district,street,apartmentOffice,displayName,email,phone,address,uid){
	    return this.restaurantUserInfo.child(uid).child("addresses").push({
			city: city,
			district:district,
			street:street,
			apartmentOffice:apartmentOffice,
			displayName: displayName,
			email:email,
			phone: phone,
			address: address,
			uid:uid,
			timeStamp: firebase.database.ServerValue.TIMESTAMP,
			reverseOrder: 0 - Date.now()
    });
  }
  
   setUberDeliveryId(id) {
    return this.id = id;
  }
  
  getUberEatDriverPaymentType() {
    return this.paymentMethod;
  }
  
  getActiveDrivers() {
    return this.db.list('activeDriverList');
  }

  
  getUserProfile(id): any {
    return this.restaurantUserInfo.child(id);
  }
 
  getOrderDetail(id){
    return this.orderList.child(id);
  }
  
  createUberEatOffer(driverId, origin, destination, orderDetails, restaurantOrderId) {
   
	
	var uid = firebase.auth().currentUser.uid;
	var status = "pending";
	
	
	
    //return this.db.object('new/' + driverId).set({
	return this.uberDeal.child(driverId).update({
      restaurantOwnerId: uid,
      origin: origin,
      destination: destination,
      orderDetails: orderDetails,
      status: status,
	  restaurantOrderId: restaurantOrderId,
      createdAt: Date.now()
      
    });
  }
 
  
  addRoom(uid,data,userImage,userName){
	

	console.log(data);
	
	this.chats.child(data.owner_id).child(data.id).child('chat').child(uid).child('list').child("-0000").set({
      
	  type:'join',
      user:'user',
      message:'Welcome to restaurant.',
	  timeStamp: firebase.database.ServerValue.TIMESTAMP,
      sendDate:''
    
    });
	
	this.chats.child(data.owner_id).child(data.id).child('chat').child(uid).update({
      
	  restaurantTitle: data.title,
	  restaurantImage: data.firebase_url,
	  restaurantOwnerId: data.owner_id,
	  timeStamp: firebase.database.ServerValue.TIMESTAMP,
	  userImage: userImage,
	  userName: userName,
	  lastMessage: "Hello Dear"
    
    });
	
	
	
	
	 this.chats.child(uid).child('chat').child(data.id).child('list').child("-0000").set({
      
	  type:'join',
      user:'user',
      message:'Welcome to restaurant.',
      sendDate:''
    
    });
	
	
	return this.chats.child(uid).child('chat').child(data.id).update({
      
	  restaurantTitle: data.title,
	  restaurantImage: data.firebase_url,
	  restaurantOwnerId: data.owner_id,
	  userImage: userImage,
	  userName: userName,
	  lastMessage: "Hello Dear"
	  
    
    });
	
	
	
  }

  


	editRestaurantProduct(name: any, 
				categoryDetails: any,
				available: any, 
				description: any,
				image: any,
				percent: any,
				price: any,
				stock: any,
				categories: any,
				downloadURL: any,
				id: any){  
	  console.log(id);
	  
	  console.log(categoryDetails);
	  
	  var uid = firebase.auth().currentUser.uid;
	
    return this.items.child(id).update({
      name: name,
	  available: available,
	  description: description,
	  image: image,
	  percent: percent,
	  price: price,
	  categories: categories,
	  image_firebase_url: downloadURL,
	  res_id: categoryDetails.res_id,
	  restaurant_image: categoryDetails.restaurant_image,
	  restaurant_lat: categoryDetails.restaurant_lat,
	  restaurant_long: categoryDetails.restaurant_long,
	  restaurant_name: categoryDetails.restaurant_name,
	  user_id: uid
    });
	
	
	
	
	
	
  }
  
   deleteProduct(id){
	  
	  return this.items.child(id).remove();
	  
  }
  
    restaurantsChatLists(id){
	   var uid = firebase.auth().currentUser.uid;
	  
	   this.newUserChatList = this.chats.child(uid).child(id).child("chat");
	  return this.newUserChatList;
  }
  
  

}
