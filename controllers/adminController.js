const { Op } = require('sequelize');
const { Product, Category } = require('../models');

class AdminController {
  static readProducts(req, res) {
    const { search } = req.query;

    let options = {}

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
        res.render('admin/products', { title: "Dashboard", data })
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
    Product.create({ name, description, price, imageUrl, stock, CategoryId })
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

  }

  static updateProduct(req, res) {

  }

  static deleteProduct(req, res) {

  }
}

module.exports = AdminController;