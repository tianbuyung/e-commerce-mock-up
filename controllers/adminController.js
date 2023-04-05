const { Product, Category } = require('../models');

class AdminController {
  static readProducts(req, res) {
    Product.findAll({
      include: Category
    })
      .then((data) => {
        res.render('admin/products', { data })
      })
      .catch((err) => {
        res.send(err)
      })
  }

  static createProductForm(req, res) {

  }

  static createProduct(req, res) {

  }

  static updateProductForm(req, res) {

  }

  static updateProduct(req, res) {

  }

  static deleteProduct(req, res) {

  }
}

module.exports = AdminController;