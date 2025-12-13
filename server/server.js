const express = require('express');
const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//connect the config.env to allow pulling environment variables.
dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT_NO;
const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB, { })
  .then(() => console.log('DB connection successful!'));


app.listen(port || 5001, () => {
    console.log(`App listening on port ${port}`);
});