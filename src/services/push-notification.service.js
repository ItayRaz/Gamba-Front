'use strict';

import httpService from './http.service.js';

const publicVapidKey = '';

async function sendNotification() {
    if ('serviceWorker' in navigator) {
        const register = await navigator.serviceWorker.register('./service-worker.js', {
            scope: '/'
        }); 

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
        });

        await httpService.post('/subscribe', JSON.stringify(subscription))

    } else {
        console.log('web push is not suported');
    }
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
















// 'use strict';

// ////////////FRONT////////////
// ////////////FRONT////////////
// ////////////FRONT////////////

// //onload
// function connect() {
//     window.addEventListener('load', async () => {
//         let sw = await navigator.serviceWorker.register('./sw.js');  //runs server worker
//     })
// }

// //onsubscribe
// async function subscribe() {
//     let sw = await navigator.serviceWorker.register.ready;
//     let push = await sw.pushManager.subscribe({
//         userVisbleOnly: true,
//         applicationServerKey: '' // equal to vapIdKeys.publickKey from back
//     })

//     httpService.post('/api/notification', push);
// }

// ////////////SERVER_WORKER////////////

// self.addEventListener('push', () => {
//     self.registration.sendNotification('msg', {}); //obj of options
// });

// ////////////BACK////////////

// //roter//
// const push = require('web-push');  //need to run npm i web-push

// app.use('/api/notofication', (req, res) => {
//     notificationService.add(req.body)
//         .then(async () => {
//             var subs = await notificationService.query();

//             var vapIdKeys = push.generateVAPIDkeys();
//             push.setVapidDetails('...', vapIdKeys.publickKey, vapIdKeys.privateKey);
//             subs.forEach(sub => {
//                 push.sendNotification(sub, 'msg');
//             })
//         })
// })


// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////







// ////////////FRONT////////////
// ////////////FRONT////////////
// ////////////FRONT////////////
// ////////////FRONT////////////
// ////////////FRONT////////////
// ////////////FRONT////////////

// function connect() {
//     window.addEventListener('load', async () => {
//         let sw = await navigator.serviceWorker.register('./sw.js');  //runs server worker
//     })
// }

// async function subscribe() {
//     let sw = await navigator.serviceWorker.register.ready;
//     let push = await sw.pushManager.subscribe({
//         userVisbleOnly: true,
//         applicationServerKey: '' // equal to vapIdKeys.publickKey from back
//     })
//     ///here needs to send 'push' to the server to be restored in an array
// }

// ////////////BACK////////////
// ////////////BACK////////////
// ////////////BACK////////////
// ////////////BACK////////////
// ////////////BACK////////////
// ////////////BACK////////////

// const push = require('web-push');  //need to run npm i web-push

// var vapIdKeys = push.generateVAPIDkeys();

// push.setVapidDetails('...', vapIdKeys.publickKey, vapIdKeys.privateKey);


// let sub = {}; //equal to value of push from the front

// push.sendNotification(sub, 'msg');

// ////////////SERVER_WORKER////////////
// ////////////SERVER_WORKER////////////
// ////////////SERVER_WORKER////////////
// ////////////SERVER_WORKER////////////
// ////////////SERVER_WORKER////////////
// ////////////SERVER_WORKER////////////

// self.addEventListener('push', () => {
//     self.registration.sendNotification('msg', {}); //obj of options
// });