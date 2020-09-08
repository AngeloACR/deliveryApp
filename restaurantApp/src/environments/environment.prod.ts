// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  firebase: {
    apiKey: "AIzaSyC1yKacAVVJAlen2jHu39M0XsYavtYFIEY",
    authDomain: "tukonline-3c1f8.firebaseapp.com",
    databaseURL: "https://tukonline-3c1f8.firebaseio.com",
    projectId: "tukonline-3c1f8",
    storageBucket: "tukonline-3c1f8.appspot.com",
    messagingSenderId: "451399025593",
    appId: "1:451399025593:web:54fe13e3aa2fd8faf8ec68",
    measurementId: "G-ZB3ZR0FJBK"
  },
  AdMobFreeBannerConfig: {
    isTesting: true,
    autoShow: true
  },
  onesignal: {
    appId: "6e982d1b-31fe-4959-a90c-a49680df0b30",
    googleProjectNumber: "81704775455",
    restKey: "MjgzZWE1M2ItYTZhYS00NTA5LWI0YzctNjVlNGZiM2UzNmY0"
  },
  /**
	onesignal: {
		appId: '68f02562-d0b7-40ac-b295-7618fd9e4a22',
		googleProjectNumber: '81704775455',
		restKey: 'ZGU4MjdiMTMtY2I3Ni00MjZjLTg4ZGYtN2JjOWYwNDgwNzg4'
    },
	**/

  stripe_publish_key: "pk_test_nqykHcHCdCnWPJCD6pguqShK",
  google_project_number: "762391382612",
  fb_app: 571610369618746,
  fb_v: "v3.2",
  paypal_sandbox_client_id:
    "Ac-QK_Lkar46qQDWcp1kega6aPk13SxXv3dkCVX7A2Nlw7BViP3JyDUQQg-6W386yjgaeEHTuaO9BxGx",
  paypal_live_client_id: "",
  languages: {
    en: "English",
    vi: "Vietnamese"
  },
  menu: [
    {
      name: "Restaurants",
      path: "/home",
      component: "HomePage",
      icon: "pizza"
    },
    {
      name: "Add Restaurant",
      path: "/add-restaurant",
      component: "AddRestaurantPage",
      icon: "restaurant"
    },
    {
      name: "Add Category",
      path: "/add-category",
      component: "AddCategoryPage",
      icon: "folder-open"
    },
    {
      name: "Add Item",
      path: "/new-address",
      component: "NewAddressPage",
      icon: "add-circle"
    },
    {
      name: "Todays Order",
      path: "/today-order",
      component: "TodayOrderPage",
      icon: "today"
    },
    {
      name: "Month Order",
      path: "/month-order",
      component: "MonthOrderPage",
      icon: "calendar"
    },
    {
      name: "Year Order",
      path: "/year-order",
      component: "YearOrderPage",
      icon: "podium"
    },
    {
      name: "ChatList",
      path: "/chat-list",
      component: "ChatListPage",
      icon: "chatboxes"
    },
    {
      name: "Search Day Order",
      path: "/filter-day-order",
      component: "FilterDayOrderPage",
      icon: "search"
    },
    {
      name: "Search Month Order",
      path: "/filter-month-order",
      component: "FilterMonthOrderPage",
      icon: "stats"
    },
    {
      name: "Search Year Order",
      path: "/filter-year-order",
      component: "FilterYearOrderPage",
      icon: "filing"
    },
    {
      name: "Track Drivers",
      path: "/track-drivers",
      component: "TrackDriversPage",
      icon: "car"
    }
  ],

  themes: [
    {
      name: "Orange",
      primary: "#ff9800",
      secondary: "#7d65e8",
      tertiary: "#ffab40",
      light: "#fff3e0",
      medium: "#ffdaa3",
      dark: "#1a1714"
    }
  ]
};

export let SHOW_VEHICLES_WITHIN = 20; // within 5km
export let VEHICLE_LAST_ACTIVE_LIMIT = 1000 * 60 * 10; // 15 mins
export let POSITION_INTERVAL = 5000; // 5000ms for refreshing geolocation

export let DRIVER_INIT_BALANCE = 10; // balance when user signed up for first time
export let DRIVER_INIT_RATING = 5; // rating when user signedup for first time

export let DEAL_STATUS_PENDING = "pending";
export let DEAL_STATUS_ACCEPTED = "accepted";
export let DEAL_TIMEOUT = 20; // 20 seconds

export let TRIP_STATUS_WAITING = "waiting";
export let TRIP_STATUS_GOING = "going";
export let TRIP_STATUS_FINISHED = "finished";
export let TRIP_STATUS_CANCELED = "canceled";
export let TRANSACTION_TYPE_WITHDRAW = "withdraw";

// Global Settings
export let DEFAULT_COUNTRY_CODE = "VE"; // used in AccountKit Mobile verification
export let DEFAULT_COUNTRY_MOBILE_CODE = "+58";

export let EMAIL_VERIFICATION_ENABLED = true; // send verification email after user register
export let APPROVAL_REQUIRED = false; // driver can ride without any approval
export let CURRENCY_SYMBOL = "$";
export let ENABLE_SIGNUP = true;
export let PLAY_AUDIO_ON_REQUEST = true;
export let AUDIO_PATH = "./assets/audio/sound.mp3"; //must have mp3 file

export let DEFAULT_AVATAR = "./assets/img/default-dp.png";
export let CUSTOMER_CARE = "1234567890";

/*
    !!! Important update !!!
    Please update your firebase configurations on src/app/app.module.ts
*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
