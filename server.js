const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// เชื่อมต่อไปยัง MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('เชื่อมต่อกับ MongoDB สำเร็จ'))
.catch(err => console.log('การเชื่อมต่อ MongoDB ล้มเหลว: ', err));

// Routes ตัวอย่าง
app.get('/', (req, res) => {
    res.send('Welcome to the Book Store API');
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const bookRoutes = require('./routes/books');

app.use('/api/books', bookRoutes);
