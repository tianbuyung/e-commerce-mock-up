const { Product, Category } = require("../models");

class HomeController {
  static homePage(request, response) {
    const { role } = request.session
    let productData = null

    Product.findAll()
      .then((products) => {
        productData = products
        return Category.findAll()
      })
      .then((categories) => {
        response.render("homePage", { products: productData, categories, role } );
      })
      .catch((err) => {
        response.send(err);
      });
  }
}

module.exports = HomeController;