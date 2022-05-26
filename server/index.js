const express = require('express');
const UserRoute = require('./src/routes/UserRoutes');
const ProductRoute = require('./src/routes/ProductRoutes');
const { init } = require('./src/config/db/Relation');
const cors = require('cors');
const { handleError } = require('./src/config/Index');



require('dotenv').config();
const port = process.env.PORT;
const app = express();
app.use(cors());
init();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', UserRoute);
app.use('/', ProductRoute);


app.use(handleError);

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});