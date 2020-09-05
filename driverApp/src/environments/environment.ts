export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyC1yKacAVVJAlen2jHu39M0XsYavtYFIEY",
    authDomain: "tukonline-3c1f8.firebaseapp.com",
    databaseURL: "https://tukonline-3c1f8.firebaseio.com",
    projectId: "tukonline-3c1f8",
    storageBucket: "tukonline-3c1f8.appspot.com",
    messagingSenderId: "451399025593",
    appId: "1:451399025593:web:54fe13e3aa2fd8faf8ec68",
    measurementId: "G-ZB3ZR0FJBK"
  }
};

export let POSITION_INTERVAL = 5000; // 5000ms for refreshing geolocation

export let DRIVER_INIT_BALANCE = 10; // balance when user signed up for first time
export let DRIVER_INIT_RATING = 5; // rating when user signedup for first time

export let DEAL_STATUS_PENDING = "pending";
export let DEAL_STATUS_ACCEPTED = "accepted";
export let DEAL_TIMEOUT = 60; // 60 seconds

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
