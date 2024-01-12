const { initializeApp ,cert} = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./mychat-900b3-firebase-adminsdk-svfc1-535bf99073.json');

initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = db;