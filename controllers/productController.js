const { Op } = require('sequelize');
const { Product, Category } = require('../models');

class ProductController {
  static readProducts(req, res) {
    const { search } = req.query;
    const { role } = req.session
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
        res.render('productsUser', { title: "Products", products: productData, notification, role })
      })
      .catch((err) => {
        res.send(err)
      })
  }
}

module.exports = ProductController;