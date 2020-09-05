const functions = require('firebase-functions');
const admin = require('firebase-admin');
// update your stipe key here
const stripe = require("stripe")("sk_live_sWmijyyZQcahJClYg8TVRp2D");

const TRIP_STATUS_GOING = 'going';
const TRIP_STATUS_FINISHED = 'finished';
const PAYMENT_METHOD_CARD = 'card';

// init app
admin.initializeApp();

exports.payWithStripe = functions.https.onRequest((request, response) => {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys

    // eslint-disable-next-line promise/catch-or-return
    stripe.charges.create({
        amount: request.body.amount,
        currency: request.body.currency,
        source: request.body.token,
    }).then((charge) => {
        // asynchronously called
        response.send(charge);
    })
        .catch(err => {
            console.log(err);
        });

});

exports.calculateRating = functions.database.ref('/trips/{tripId}').onWrite(function (change, context) {

    const original = change.after.val();

    if (!change.before.val() && !original.rating)
        return false;

    else {
        admin.database().ref('/trips').orderByChild('driverId').equalTo(original.driverId).once('value', function (snap) {
            var stars = 0;
            var count = 0;

            snap.forEach(function (trip) {
                if (trip.val().rating) {
                    stars += parseInt(trip.val().rating);
                    count++
                }
            });

            // calculate avg
            var rating = stars / count;
            admin.database().ref('/drivers/' + original.driverId).update({ rating: rating.toFixed(1) });
        });
        return true;
    }


});


// calculate driver report
exports.makeReport = functions.database.ref('/trips/{tripId}').onWrite(function (change, context) {
    // Exit when the data is deleted.
    if (!change.before.val()) {
        return false;
    }

    // Grab the current value of what was written to the Realtime Database
    const original = change.after.val();

    // get old status
    const oldStatus = change.before.child('status').val();

    console.log(original);
    console.log(oldStatus);

    if (original.status == TRIP_STATUS_GOING) {

        var fee = parseFloat(original.fee).toFixed(2);

        // process payment
        if (original.paymentMethod == PAYMENT_METHOD_CARD) {
            // update driver balance
            admin.database().ref('drivers/' + original.driverId + '/balance').once('value').then(function (snapshot) {
                if (snapshot != null && snapshot != undefined && snapshot != NaN) {
                    var snapshotVal = snapshot.val() ? parseFloat(snapshot.val()) : 0;
                    var total = parseFloat(snapshotVal) + parseFloat(fee);
                    var tmptotal = total.toFixed(2);
                    admin.database().ref('drivers/' + original.driverId + '/balance').set(tmptotal);
                }
            });

            // format currency
            if (original.currency == '$') {
                const currency = 'usd';
                admin.database().ref('passengers/' + original.passengerId + '/card').once('value').then(function (snapshot) {
                    stripe.charges.create({
                        amount: fee,
                        currency: currency,
                        source: snapshot.val(),
                        description: "Charge for tripId: " + context.params.tripId
                    }, { idempotency_key: context.params.tripId }, function (err, charge) {
                        console.error(err);
                        console.log(charge);
                    });
                });
            } else {
                console.log('Currency ' + original.currency + ' is not supported');
            }
        }
    }

    if ((original.status == TRIP_STATUS_FINISHED) && (oldStatus == TRIP_STATUS_GOING)) {
        console.log("Creating Report");

        var date = new Date();
        var fee = parseFloat(original.fee).toFixed(2);

        // total sale
        admin.database().ref('reports/' + original.driverId + '/total').once('value').then(function (snapshot) {
            var snapshotVal = snapshot.val() ? parseFloat(snapshot.val()) : 0;
            var tmptotal = parseFloat(parseFloat(snapshotVal) + fee).toFixed(2);

            admin.database().ref('reports/' + original.driverId + '/total').set(tmptotal);
        });

        // by year
        var yearPath = 'reports/' + original.driverId + '/' + date.getFullYear();
        admin.database().ref(yearPath + '/total').once('value').then(function (snapshot) {
            var snapshotVal = snapshot.val() ? parseFloat(snapshot.val()) : 0;
            var tmptotal = parseFloat(parseFloat(snapshotVal) + fee).toFixed(2);

            admin.database().ref(yearPath + '/total').set(tmptotal);
        });

        // by month
        var monthPath = yearPath + '/' + (date.getMonth() + 1);
        admin.database().ref(monthPath + '/total').once('value').then(function (snapshot) {
            var snapshotVal = snapshot.val() ? parseFloat(snapshot.val()) : 0;
            var tmptotal = parseFloat(parseFloat(snapshotVal) + fee).toFixed(2);

            admin.database().ref(monthPath + '/total').set(tmptotal);
        });

        // by date
        var datePath = monthPath + '/' + date.getDate();
        admin.database().ref(datePath + '/total').once('value').then(function (snapshot) {
            var snapshotVal = snapshot.val() ? parseFloat(snapshot.val()) : 0;
            var tmptotal = parseFloat(parseFloat(snapshotVal) + fee).toFixed(2);

            admin.database().ref(datePath + '/total').set(tmptotal);
        });


        return true;
    }
    else {
        console.log("Skip Make Report")
        return false;
    }

});