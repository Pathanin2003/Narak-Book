const express = require('express');
const path = require('path');
const router = require('./route/route');
const app = express(); 
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'imgs')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false}));
app.use(router);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});