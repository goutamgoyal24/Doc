const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://goutam:Goutam2412@projects.dphdeae.mongodb.net/MobileDoc")
const connection = mongoose.connection;
connection.on('connected', () => {
    console.log('MongoDB is connected');
});
connection.on('error', (error) => {
    console.log('Error in MongoDB connection', error);
});
module.exports = mongoose;