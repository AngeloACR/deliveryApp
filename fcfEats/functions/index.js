const functions = require('firebase-functions');
const admin = require('firebase-admin');



const TRIP_STATUS_GOING = 'going';
const TRIP_STATUS_FINISHED = 'finished';
const PAYMENT_METHOD_CARD = 'card';

const TRIP_STATUS_QUEUED = 'Queued';
const TRIP_STATUS_Completed= 'Completed';

// init app
admin.initializeApp();

exports.orderList = functions.database.ref('/orders/{orderId}').onWrite(function (change, context) {

    const original = change.after.val();
	
	
	

    if (!original)
        return false;

    else {
        console.log(original);
		
		
		const data = original.email;
		const items = original.items;
		const customerName = original.customerDetails.name;
		const customerPhone = original.customerDetails.phoneNumber;
		const customerEmail = original.customerDetails.email;
		const productname = original.items[0].name;
		const restaurantName = original.items[0].restaurantName;
		
		
 		 var currentUtcTime = new Date(); // This is in UTC

 
		 var currentDateTimeCentralTimeZone = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: 'Asia/Ulaanbaatar' }));

		 console.log('currentUtcTime: ' + currentUtcTime.toLocaleDateString());
		 console.log('currentUtcTime Hour: ' + currentUtcTime.getHours());
		 console.log('currentUtcTime Minute: ' + currentUtcTime.getMinutes());
		 console.log('currentDateTimeCentralTimeZone Year: ' +        currentDateTimeCentralTimeZone.getFullYear());
		 console.log('currentDateTimeCentralTimeZone Month: ' +        currentDateTimeCentralTimeZone.getMonth());
		 console.log('currentDateTimeCentralTimeZone Day: ' +        currentDateTimeCentralTimeZone.getDate());
		 //console.log('currentDateTimeCentralTimeZone Hour: ' + currentDateTimeCentralTimeZone.getHours());
		 //console.log('currentDateTimeCentralTimeZone Minute: ' + currentDateTimeCentralTimeZone.getMinutes());
		
		var date = new Date();
		
		var changedFullYear = currentDateTimeCentralTimeZone.getFullYear();
		var changedMonth = parseFloat(currentDateTimeCentralTimeZone.getMonth()) + 1;
		var changedDay = currentDateTimeCentralTimeZone.getDate();
		
		console.log('year ' + changedFullYear);
		console.log('month ' + changedMonth);
		console.log('day ' + changedDay);
		
	
		
		//var restaurantorderlist = 'restaurantorderlist/'  + date.getFullYear() +  '/' + (date.getMonth() + 1)  + '/' + date.getDate();
		
		var restaurantorderlist = 'restaurantorderlist/'  + changedFullYear +  '/' + changedMonth  + '/' + changedDay;
      
		admin.database().ref(restaurantorderlist + '/' + original.id).once('value').then(function (snapshot) {
           

            admin.database().ref(restaurantorderlist + '/' + original.id).set(original);
			
			return console.log("sent");
        }).catch(err => console.log(err));
		
		var restaurantorderlistmonth = 'restaurantorderlistmonth/'  + changedFullYear +  '/' + changedMonth;
      
		admin.database().ref(restaurantorderlistmonth + '/' + original.id).once('value').then(function (snapshot) {
           

            admin.database().ref(restaurantorderlistmonth + '/' + original.id).set(original);
			
			return console.log("sent");
        }).catch(err => console.log(err));
		
		var restaurantorderlistday = 'restaurantorderlistyear/'  + changedFullYear;
      
		admin.database().ref(restaurantorderlistday + '/' + original.id).once('value').then(function (snapshot) {
           

            admin.database().ref(restaurantorderlistday + '/' + original.id).set(original);
			
			return console.log("sent");
        }).catch(err => console.log(err));
	
        return true;
		
    }


});

	
exports.makeReports = functions.database.ref(`categorizedOrders/{ownerId}/orders/{orderId}`)
	.onCreate(event => {
	
		
		console.log(event);
		
		console.log(event._data);
		
		console.log(event._path);
		
		console.log("key");
		
		console.log(event.key);
		
		if (!event._data) {
			return;
		 }
		
		
		console.log(event);
		
		console.log(event._data);
		
		const orderInfo = event._data;
		
		const original = event._data.status;
		
		const items = event._data.items;

		
		
		if (original === TRIP_STATUS_QUEUED) {
				console.log("Inside");
				console.log(original);
				
				 //var date = new Date();
				
				 var currentUtcTime2 = new Date(); // This is in UTC

 
				 var currentDateTimeCentralTimeZone2 = new Date(currentUtcTime2.toLocaleString('en-US', { timeZone: 'Asia/Ulaanbaatar' }));

				 console.log('currentUtcTime: ' + currentUtcTime2.toLocaleDateString());
				 console.log('currentUtcTime Hour: ' + currentUtcTime2.getHours());
				 console.log('currentUtcTime Minute: ' + currentUtcTime2.getMinutes());
				 console.log('currentDateTimeCentralTimeZone Year: ' +        currentDateTimeCentralTimeZone2.getFullYear());
				 console.log('currentDateTimeCentralTimeZone Month: ' +        currentDateTimeCentralTimeZone2.getMonth());
				 console.log('currentDateTimeCentralTimeZone Day: ' +        currentDateTimeCentralTimeZone2.getDate());
				 //console.log('currentDateTimeCentralTimeZone Hour: ' + currentDateTimeCentralTimeZone.getHours());
				 //console.log('currentDateTimeCentralTimeZone Minute: ' + currentDateTimeCentralTimeZone.getMinutes());
				
				var date = new Date();
				
				var changedFullYear2 = currentDateTimeCentralTimeZone2.getFullYear();
				var changedMonth2 = parseFloat(currentDateTimeCentralTimeZone2.getMonth()) + 1;
				var changedDay2 = currentDateTimeCentralTimeZone2.getDate();
				
				
				
					console.log(event.key);
					
					
						
						

						
						var yearPath = event._path;
						
						var resString = yearPath.split("/");
						
						var orderArrayId = resString[4];
						
						console.log(resString);
						
						console.log(resString[4]);
						

						
						admin.database().ref(yearPath + '/items').on('value', function (snap) {
						
							console.log("inside test");
						
						
								
								console.log(snap.val());
								
								var item2 = snap.val();
								
								
								
								
								 snap.forEach(function (trip) {
										
										console.log("insite test22222");
										
										
										
										var zero = 0;
										
										console.log(trip.val());
										
										console.log(event._path);
										
										
									
										
										//var newPath = 'reports/'  + date.getFullYear() + '/' + trip.val().owner_id;  
										
										var newPath = 'reports/'  + changedFullYear2 + '/' + trip.val().owner_id;  
										
									
										 
										admin.database().ref(newPath).child(orderArrayId).set(orderInfo);
										//admin.database().ref(newPath).child('restaurantName').set(trip.val().restaurantName);
										//admin.database().ref(newPath).child('restaurantOwnerId').set(trip.val().owner_id);
										

										
										var monthPath = 'reportsMonth/'  + changedFullYear2 + '/'  + changedMonth2 + '/' + trip.val().owner_id;	
										
								
										admin.database().ref(monthPath).child(orderArrayId).set(orderInfo);
										//admin.database().ref(monthPath).child('restaurantName').set(trip.val().restaurantName);
										//admin.database().ref(monthPath).child('restaurantOwnerId').set(trip.val().owner_id);
												
												
											  
									
										
										var datePath = 'reportsDay/'  + changedFullYear2  + '/' + changedMonth2 + '/' +  changedDay2 + '/' + trip.val().owner_id;
										
									
										admin.database().ref(datePath).child(orderArrayId).set(orderInfo);
										//admin.database().ref(datePath).child('restaurantName').set(trip.val().restaurantName);
										//admin.database().ref(datePath).child('restaurantOwnerId').set(trip.val().owner_id);
										
										

										//var orderPath = 'orders/' + event.key;
										
										//admin.database().ref(orderPath).child('year').set(date.getFullYear());
										//admin.database().ref(orderPath).child('month').set(date.getMonth() + 1);
										//admin.database().ref(orderPath).child('day').set(date.getDate());	
										
							
										
										
										
										
								
										
										
									});

							  });

				

						
						
				
				
				
				
		}
		
		
		return true;
		
		
		
	});




