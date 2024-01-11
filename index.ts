import app from "./src/app"
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("mychat-900b3-firebase-adminsdk-svfc1-535bf99073.json"),
  databaseURL: "https://mychat-900b3-default-rtdb.firebaseio.com"
});
const port = process.env.PORT || 5500

app.listen(port, () => {
  console.log(`Servidor ligado http://localhost:${port}`)
})