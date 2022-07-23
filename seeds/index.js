const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62d978435f52acff087e2645',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero laudantium totam',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                url: 'https://res.cloudinary.com/dbhrj50jo/image/upload/v1658609161/YelpCamp/rishabh-pandoh-m1PFxGQ-5x0-unsplash_mxqtbs.jpg',
                filename: 'YelpCamp/rishabh-pandoh-m1PFxGQ-5x0-unsplash_mxqtbs'
                },
                {
                url: 'https://res.cloudinary.com/dbhrj50jo/image/upload/v1658609163/YelpCamp/dave-hoefler-a3e7yEtQxJs-unsplash_gxsfyq.jpg',
                filename: 'YelpCamp/dave-hoefler-a3e7yEtQxJs-unsplash_gxsfyq'
                }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});