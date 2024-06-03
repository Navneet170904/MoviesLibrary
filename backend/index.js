const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors')
const authRoutes = require('./routes/auth');
require('dotenv').config()
require('./config/passport')(passport);
const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:3000'}))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));

const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors({ origin: "http://localhost:3000" }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/',require('./routes/playlist'));
app.use('/',require('./routes/addMovie'));

mongoose.connect(process.env.MONGO_DB_URI)
.then(()=>{
    console.log('Database connected.')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})





