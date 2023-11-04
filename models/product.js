const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// product_name , product_id , category, quantity

const productSchema = new Schema({
     product_name: {
          type: String,
          required: true,
     },
     product_id: {
          type: Number,
          required: true,
     },
     category: {
          type: String,
          required: true,
     },
     quantity: {
          type: Number,
          required: true,
     },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;