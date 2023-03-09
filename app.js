require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
var cors = require('cors');
app.use(cors())
/********************************************************************************** */
const store = new MongoDBStore({
    uri: dbUrl,
    collection: 'mySessions'
});
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store
}))
/********************************************************************************* */
app.use(express.static('public'));
app.use(bodyParser.json());

/********************************************************************************* */

// const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
const supplierRoutes = require('./routes/supplier');
const adminRoutes = require('./routes/admin');
app.use('/products', productRoutes);
app.use('/supplier', supplierRoutes);
app.use('/admin', adminRoutes);
/********************************************************************************* */
mongoose.connect(dbUrl)
    .then(resu => {
        console.log('db connection done !');
        app.listen(port, () => {
            console.log('app conneted on port ' + port)
        })
    })
    .catch(err => {
        console.log(err)
    })