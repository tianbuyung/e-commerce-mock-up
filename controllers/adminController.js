const { Op } = require('sequelize');
const { Product, Category } = require('../models');
const sendEmail = require('../helpers/sendEmail');

class AdminController {
  static readProducts(req, res) {
    const { search } = req.query;
    let options = {}
    let productData = null;

    if (search) {
      options = {
        name: {
          [Op.iLike]: `%${search}%`
        }
      }
    }

    Product.findAll({
      where: options,
      include: Category
    })
      .then((data) => {
        productData = data
        return Product.homeNotification();
      })
      .then((notification) => {
        res.render('admin/products', { title: "Dashboard", data: productData, notification })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static createProductForm(req, res) {
    const { errors } = req.query;
    let errorsMessage = '';
    
    if (errors) {
      errorsMessage = errors;
    }

    Category.findAll()
      .then((data) => {
        res.render('admin/addProduct', { title: "Add Product", data, errors: errorsMessage })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static createProduct(req, res) {
    const { name, description, price, imageUrl, stock, CategoryId } = req.body
    const { userId } = req.session;

    Product.create({ name, description, price, imageUrl, stock, CategoryId, UserId: userId })
      .then((data) => {
        res.redirect('/admin/products')
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map(error => error.message);
          res.redirect(`/admin/products/add?errors=${errors}`)
          return;
        }
        res.send(err)
      })
  }

  static updateProductForm(req, res) {
    const { id } = req.params;
    const { errors } = req.query;
    let errorsMessage = '';
    let categories = null;
    
    if (errors) {
      errorsMessage = errors;
    }

    Category.findAll()
      .then((data) => {
        categories = data;
        return Product.findOne({
          where: {
            id
          }
        })
      })
      .then((product) => {
        res.render('admin/editProduct', { title: 'Edit Product', data: categories, product, errors: errorsMessage })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static updateProduct(req, res) {
    const { id } = req.params
    const { name, description, price, imageUrl, stock, CategoryId } = req.body

    Product.update({
      name, description, price, imageUrl, stock, CategoryId
    },
    {
      where: { id }
    })
      .then((data) => {
        res.redirect('/admin/products')
      })
      .catch((err) => {
        if (err.name === "SequelizeValidationError") {
          const errors = err.errors.map(error => error.message);
          res.redirect(`/admin/products/${id}/edit?errors=${errors}`)
          return;
        }
        res.send(err)
      })
  }

  static deleteProduct(req, res) {
    const { id } = req.params
    
    Product.destroy({
      where: {
        id
      }
    })
      .then((data) => {
        res.redirect('/admin/products')
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static sendEmailForm(req, res) {
    res.render('admin/sendEmail', { title: 'Send Email' })
  }

  static sendEmail(req, res) {
    const { sendTo, subjectEmail, bodyEmail } = req.body;

    sendEmail(sendTo, subjectEmail, bodyEmail)
      .then((data) => {
        console.log(data)
        res.redirect('/admin/products/email')
      })
      .catch(console.error);
  }
}

module.exports = AdminController;