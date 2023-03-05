require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); //to start from scratch and delete other previous data in the db
    await Product.create(jsonProducts);
    console.log('SUCESSS!!!');
    process.exit(0); //to exit the process(terminal) and stop the code from running after successful
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
