const Router = require('express').Router();
const Product = require('../models/product');


Router.post('/addProduct', async (req, res) => {
     // add the product to the database
     try {
          const { product_name, product_id, category, quantity } = req.body;
          const newProduct = new Product({
               product_name,
               product_id,
               category,
               quantity,
          });
          await newProduct.save();
          res.json({ message: 'Product added successfully' });
     } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
     }
}
);

module.exports = Router;

// give example json body for post :
// {
//      "product_name":"pen",
//      "product_id":123,
//      "category":"stationary",
//      "quantity":100
// }
