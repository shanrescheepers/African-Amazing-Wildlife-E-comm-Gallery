const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const productRoute = require('./routes/product');
const artistRoute = require('./routes/artist');
const userRoute = require('./routes/user');
const ordersRoute = require('./routes/orders');
require('dotenv/config');

const app = express();
// connect hier met ander localhost
app.use(cors({
    origin: 'http://localhost:3003'
}));

// image middleware hier
app.use('/wildlifeGalleryImages', express.static('wildlifeGalleryImages'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productRoute);
app.use(artistRoute);
app.use(userRoute);
app.use(ordersRoute);

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'wildlife',
}).then(() => console.log("Connected to wildlife DB"))
    .catch((err) => {
        console.log("No Connection. Reason: " + err);
    });

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => { console.log(`Server started on port: ${PORT}`) });