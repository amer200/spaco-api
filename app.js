require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;
var cors = require('cors');
app.use(cors())
/********************************************************************************* */
app.use(express.static('public'));
app.use(bodyParser.json());

/********************************************************************************* */

// const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/product');
app.use('/products', productRoutes);
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