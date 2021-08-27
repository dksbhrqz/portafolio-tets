const admin = require('firebase-admin');
const serviceAccount = require('../ServiceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

module.exports = {
    getInfo: async (cb) => {
        const snapshot = await db.collection('work_experience').doc('ooZoCGb4suO09dEtPOkI').get();
        cb(snapshot.data())
    },
    updateInfo: async (newInfo, cb) => {
        const userRef = db.collection('work_experience').doc('ooZoCGb4suO09dEtPOkI');
        try {
            await db.runTransaction(async (t) => {
                t.update(userRef, newInfo);
            });
          
            cb(newInfo, null);
        } catch (e) {
            cb(null, {message: 'Error updating user information'})
        }
    }
}
