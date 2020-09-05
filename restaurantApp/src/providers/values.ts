import { Injectable } from '@angular/core';

@Injectable()
export class Values {

  avatar: any = "assets/images/person.png";
  background: any = "assets/images/shopping.jpg";
  listview: boolean = true;
  count: number = 0;
  currency: any = "USD";
  role: any = "CUSTOMER";
  price: any;
  cart: Array<number> = [];
  qty: number = null;
  isLoggedIn: boolean = false;
  customerList: any;
  userRole: any = "";
  userChatData: any;
  userChatUserId: any;
  userRestaurantId: any;
  restaurantId: any;
  
  editItem: any;
  editItemId: any;
  
  editRestaurant: any;
  editRestaurantId: any;
  
  editCategory: any;
  editCategoryId: any;
  
  editOrder: any;
  editOrderId: any;
  
  editOriginLat: any;
  editOriginLng: any;
  editOriginVicinity: any;
  
  uberDrivers: any;
  
  orderYear: any;
  orderMonth: any;
  orderDay: any;
  
  trackId: any;
  
  
  constructor() {

 }





}

