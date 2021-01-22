const functions = require('firebase-functions');
const admin = require('firebase-admin');
// update your stipe key here
const stripe = require("stripe")("sk_live_sWmijyyZQcahJClYg8TVRp2D");
const cors = require('cors')({ origin: true });

const TRIP_STATUS_GOING = 'going';
const TRIP_STATUS_FINISHED = 'finished';
const PAYMENT_METHOD_CARD = 'card';

// init app
admin.initializeApp();

exports.payWithStripe = functions.region('us-central1').https.onRequest((request, response) => {
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

getClient = async function (id) {
    return new Promise((resolve, reject) => {
        admin.database().ref(`passengers/${id}`).once('value').then(function (snapshot) {
            let data = snapshot.val();
            resolve(data);
        })
    });

}

getDriver = async function (id) {
    return new Promise((resolve, reject) => {
        admin.database().ref(`drivers/${id}`).once('value').then(function (snapshot) {
            let data = snapshot.val();
            resolve(data);
        })
    });

}

getRestaurant = async function (id) {
    return new Promise((resolve, reject) => {
        admin.database().ref(`restaurants/${id}`).once('value').then(function (snapshot) {
            let data = snapshot.val();
            resolve(data);
        })
    });

}

getOwner = async function (id) {
    return new Promise((resolve, reject) => {
        admin.database().ref(`owners/${id}`).once('value').then(function (snapshot) {
            let data = snapshot.val();
            resolve(data);
        })
    });

}

exports.pushCrearCarrera = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera

    let cliente = await getClient(carrera.client)

    let driver = await getDriver(carrera.driver)

    console.log(driver);
    let usuario;
    let token = driver.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `${cliente.name} te ha pedido una carrera`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCrearPedido = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let restaurant = await getRestaurant(pedido.restaurantId)

    let cliente = await getClient(pedido.client)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = owner.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `${cliente.name} te ha hecho un pedido`,
            body: message,
            sound: "default"
        }
    };


    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCrearDelivery = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let token = driver.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `${restaurant} te ha pedido un delivery`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushAceptarCarrera = functions.region('us-central1').https.onCall(async (data, context) => {

    try {

        let carrera = data.carrera
        let driver = await getDriver(carrera.driver)

        let cliente = await getClient(carrera.client)
        console.log("Aceptando carrera")

        let usuario;
        let token = cliente.token;
        let message = '';
        // Create a notification
        const payload = {
            notification: {
                title: `La carrera ha sido aceptada, hora de realizar el pago`,
                body: message,
                sound: "default"
            }
        };


        //Create an options object that contains the time to live for the notification and the priority
        const options = {
            priority: "high",
            timeToLive: 60 * 60 * 24
        };

        let pushdata = await admin.messaging().sendToDevice(token, payload);
        return pushdata;
    } catch (e) {
        console.log(e.toString());
    }

});

exports.pushAceptarPedido = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.carrera
    let restaurant = await getRestaurant(pedido.restaurantId)

    let cliente = await getClient(pedido.client)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido ha sido aceptado, hora de realizar el pago`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushAceptarDelivery = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = owner.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El delivery ha sido aceptado, hora de aceptar el pedido`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCancelarCarrera = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = driver.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `La carrera ha sido cancelada`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCancelarPedido = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido

    let restaurant = await getRestaurant(pedido.restaurantId)

    let cliente = await getClient(pedido.client)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = owner.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido ha sido cancelado`,
            body: message,
            sound: "default"
        }
    };
    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCancelarDelivery = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = driver.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El delivery ha sido cancelado`,
            body: message,
            sound: "default"
        }
    };
    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushRechazarCarrera = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `La carrera ha sido rechazada, hora de buscar otro conductor`,
            body: message,
            sound: "default"
        }
    };    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushRechazarPedido = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let restaurant = await getRestaurant(pedido.restaurantId)

    let cliente = await getClient(pedido.client)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido ha sido rechazado, hora de realizar otro pedido`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushRechazarDelivery = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = owner.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El delivery ha sido rechazado, hora de buscar otro conductor`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushCarreraPagada = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = driver.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `La carrera ha sido pagada, hora de salir a buscar al cliente`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushPedidoPagado = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let restaurant = await getRestaurant(pedido.restaurantId)

    let cliente = await getClient(pedido.client)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = owner.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido ha sido pagado, hora de encender las brasas`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushPedidoListo = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let cliente = await getClient(pedido.client)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = [driver.token, cliente.token];
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido está listo para recoger`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushDeliveryEnDestino = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let cliente = await getClient(pedido.client)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = [owner.token, cliente.token];
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El conductor ha llegado al punto de destino`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushDeliveryEnOrigen = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let cliente = await getClient(pedido.client)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = [owner.token, cliente.token];
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El conductor ha llegado al punto de origen`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushConductorEnDestino = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El conductor ha llegado al punto de destino`,
            body: message,
            sound: "default"
        }
    };


    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushConductorEnOrigen = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El conductor ha llegado al punto de origen`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushConductorEnCamino = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El conductor se encuentra en camino`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});


exports.pushConductorEnCamino = functions.region('us-central1').https.onCall(async (data, context) => {

    let carrera = data.carrera
    let driver = await getDriver(carrera.driver)

    let cliente = await getClient(carrera.client)


    let usuario;
    let token = cliente.token;
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El delivery se encuentra en camino`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

exports.pushPedidoEnProceso = functions.region('us-central1').https.onCall(async (data, context) => {

    let pedido = data.pedido
    let driver = await getDriver(pedido.driverId)

    let cliente = await getClient(pedido.client)

    let restaurant = await getRestaurant(pedido.restaurantId)

    let owner = await getOwner(restaurant.ownerId)


    let usuario;
    let token = [cliente.token, driver.token];
    let message = '';
    // Create a notification
    const payload = {
        notification: {
            title: `El pedido está en proceso y estará listo en unos minutos`,
            body: message,
            sound: "default"
        }
    };

    //Create an options object that contains the time to live for the notification and the priority
    const options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };

    let pushdata = await admin.messaging().sendToDevice(token, payload);
    return pushdata;

});

