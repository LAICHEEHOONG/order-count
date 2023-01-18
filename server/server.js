const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config(); 
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`;
const path = require('path');

const stockRoute = require('./routes/api/stock');
const remarkRoute = require('./routes/api/remark');
const historyRoute = require('./routes/api/history');
const userRoute = require('./routes/api/user');
const verifyRoute = require('./routes/api/verify');
mongoose.connect(mongoUri);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());


app.use('/api/stock',stockRoute);
app.use('/api/remark',remarkRoute);
app.use('/api/history',historyRoute);
app.use('/api/user', userRoute);
app.use('/api/verify',verifyRoute);



app.use(express.static('client/build'));

if (process.env.NODE_ENV === 'production') {
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  })
}





const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Connect port: ${port}`)
})


//heroku login
//git add .
//git commit -am ""
//git push heroku master