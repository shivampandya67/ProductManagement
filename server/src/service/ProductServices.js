const express = require('express');
const Boom = require('boom');
const _ = require('lodash');
const Product = require('../models/ProductModels');

const validateProduct = async (req, res, next) => {

    const name = req.body.name;
    const price = Number(req.body.price);
    const description = req.body.description;
    const quantity = Number(req.body.quantity);

    if (name === '') {
        return next(Boom.badRequest('Name can not be an empty string'));
    } else if (description === '') {
        return next(Boom.badRequest('Description can not be an empty string'));
    } else if (!price) {
        return next(Boom.badRequest('price can not be an empty string'));
    } else if (!quantity) {
        return next(Boom.badRequest(' quantity can not be an empty string'));
    }

    if (_.isNumber(name)) {
        return next(Boom.badRequest('Name must be in string'));
    } else if (_.isNumber(description)) {
        return next(Boom.badRequest('Description must be in string'));
    } else if (_.isString(price)) {
        return next(Boom.badRequest('price must be a numeric value'));
    } else if (_.isString(quantity)) {
        return next(Boom.badRequest(' quantity must be a numeric value'));
    }

    if (_.isUndefined(name)) {
        return next(Boom.badRequest('Please enter Name'));
    } else if (_.isUndefined(price)) {
        return next(Boom.badRequest('Please enter Price'));
    } else if (_.isUndefined(description)) {
        return next(Boom.badRequest('Please enter Description'));
    } else if (_.isUndefined(quantity)) {
        return next(Boom.badRequest('Please enter Quantity'));
    }

    if (_.isNull(name)) {
        return next(Boom.badRequest('Name can not be null'));
    } else if (_.isNull(price)) {
        return next(Boom.badRequest('Price can not be null'));
    } else if (_.isNull(description)) {
        return next(Boom.badRequest('Description can not be null'));
    } else if (_.isNull(quantity)) {
        return next(Boom.badRequest('Quantity can not be null'));
    }
    next();
};

/*
* Adding Product and storing it in the database.
*/
const AddProduct = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const quantity = req.body.quantity;

        const data = await Product.create({
            userId: userId,
            name: name,
            price: price,
            description: description,
            quantity: quantity
        });
        res.status(200).send(data);
    }
    catch (err) {
        next(Boom.badRequest('Product is not added successfully'));
        return res.status(400).send('Product is not added successfully');
    }
};

/*
* Update records by it's Id and storing it in the database
*/
const UpdateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const updatedAt = req.body.updatedAt;
        const record = await Product.findOne({ where: { id: id, userId: req.user.id } });
        if (!record) {
            return next(Boom.badRequest('product not found'));
        }
        else {
            await Product.update({
                name: name,
                price: price,
                description: description,
                quantity: quantity,
                updatedAt: updatedAt
            }, { where: { id } });
            res.json({ message: 'Product is successfully updated' });
        }
    }
    catch (err) {
        return next(Boom.badRequest('Wasn\'t able to update the product'));
    }
};

/*
* Delete product by it's Id
*/
const DeleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log('For deleting a record the id will be :', id);
        const record = await Product.findOne({ where: { id: id, userId: req.user.id } });
        if (!record) {
            res.json({ message: 'There are no records to delete of this Id' });
        }
        else if (record) {
            await Product.update({
                isDeleted: true
            }, { where: { id } });
            res.status(200).json({ message: 'Product is removed' });
        }
    }
    catch (err) {
        return next(Boom.badRequest('Wasn\'t able to delete the Product'));
    }
};

/*
* Getting all the data of the same user and sorting it by its Price or name in (asc/desc) order
*/
const GetProduct = async (req, res, next) => {
    try {
        // const Page = Number(req.query.page);
        const Sort_By = 'price';
        const AscDesc = 'DESC';
        // const Offset = (Page - 1) * 2 || 0;
        // limit: Page ? 2 : null, offset: Offset,
        const data = await Product.findAndCountAll({ where: { userId: req.user.id, isDeleted: false }, order: [[Sort_By, AscDesc]] });
        if (data) {
            return res.status(200).json(data);
        }
        else {
            res.json({ message: 'There is no such data by this Id' });
        }
    }
    catch (err) {
        return next(Boom.badRequest('Something went wrong fetching the data'));
    }
};

/*
* Searching Product by its Name from the database.
*/
const SearchProduct = async (req, res, next) => {
    try {
        const id = req.user.id;
        const name = req.body.name;
        const data = await Product.findOne({ where: { userId: id, name: name, isDeleted: false } });
        if (data) {
            return res.status(200).json(data);
        }
        else {
            res.status(400).json({ message: 'There is no such data by this Name' });
        }
    }
    catch (err) {
        return next(Boom.badRequest('Something went wrong fetching the data'));
    }
};

module.exports = {
    validateProduct,
    AddProduct,
    GetProduct,
    SearchProduct,
    DeleteProduct,
    UpdateProduct
};