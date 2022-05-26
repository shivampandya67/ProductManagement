const express = require('express');
const productService = require('../service/ProductServices');
const { authentication } = require('../middleware/authJwt');

const Router = express.Router();

/*
*  Add Product.
*/
Router.post('/product', authentication, [productService.validateProduct, productService.AddProduct]);

/*
*  Get Product.
*/
Router.get('/product', authentication, [productService.GetProduct]);

/*
* Update Product.
*/
Router.put('/product/:id', authentication, [productService.validateProduct, productService.UpdateProduct]);

/*
* Delete Product.
*/
Router.delete('/product/:id', authentication, [productService.DeleteProduct]);

/*
* Search Product.
*/
Router.post('/SearchProduct', authentication, [productService.SearchProduct]);

module.exports = Router;