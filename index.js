const express = require('express'); const admin = require('firebase-admin'); const app = express();

app.use(express.json());

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const PORT = process.env.PORT || 3000;

app.post('/st-webhook', async (req, res) => { console.log("SmartThings signal received:", req.body);

});

app.listen(PORT, '0.0.0.0', () => { console.log('Server is running on port ' + PORT); });
