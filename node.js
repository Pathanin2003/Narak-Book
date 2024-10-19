const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // เปลี่ยน URL นี้ถ้าจำเป็น
const dbName = 'your_database_name';

async function connectToDatabase() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
        const db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ:', error);
    } finally {
        await client.close();
    }
}

connectToDatabase();

async function findBooks(query) {
    const db = await connectToDatabase();
    const books = await db.collection('books').find(query).toArray();
    return books;
}

async function bookBook(bookId) {
    const db = await connectToDatabase();
    const result = await db.collection('books').updateOne(
        { _id: bookId },
        { $set: { booked: true } } // ปรับให้เหมาะสมกับโครงสร้างข้อมูลของคุณ
    );
    return result.modifiedCount > 0; // คืนค่าผลลัพธ์ว่าการจองสำเร็จหรือไม่
}

