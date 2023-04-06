const { User, Product, Category } = require("../models");
const { Op, where } = require("sequelize");
const bcrypt = require("bcryptjs");

class HomeController {
  static homePage(request, response) {
    let { name } = request.query;
    console.log(request.session);

    Product.findAll({
      where: name ? { name: { [Op.like]: `%${name}%` } } : {},
      include: [Category],
    })
      .then((products) => {
        response.render("homePage", { products, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
      })
      .catch((err) => {
        response.send(err);
      });
  }

//HARUSNYA DI AUTH, TAPI ERROR TRUS, KYKNYA SALAH DI ROUTINGNYA - RHEN

  static registerForm(request, response) {
    const errors = request.query.errors
    response.render("register", { isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false, errors });
  }

  static submitRegister(request, response) {
    let { username, email, password, role } = request.body;
    User.create({ username, email, password, role })
      .then((res) => {
        response.redirect("/login");
      })
      .catch((err) => {
        if (err.name == "SequelizeValidationError") {
          err = err.errors.map(el => el.message)
      }
        response.send(err);
      });
  }
  
  static loginForm(request, response) {
    const { error } = request.query;
    response.render("loginForm", { error, isLogin: request.session.userId ? true : false, isAdmin: request.session.userId && request.session.role === "admin" ? true : false });
  }
  
  static submitLoginUser(request, response) {
    const { username, password } = request.body;
    User.findOne({ where: { username } })
      .then((user) => {
        if (user) {
          const isvalidPassword = bcrypt.compareSync(password, user.password);
          if (isvalidPassword) {
            request.session.userId = user.id;
            request.session.role = user.role;
            return response.redirect("/");
          } else {
            const error = "invalid username/password";
            return response.redirect(`/login?error=${error}`);
          }
        } else {
          const error = "invalid username/password";
          return response.redirect(`/login?error=${error}`);
        }
      })
      .catch((err) => {
        response.send(err);
      });
  }

  static getlogout(request, response) {
    request.session.destroy((err) => {
      if (err) {
        response.send(err);
      } else {
        response.redirect("/");
      }
    });
  }
}

module.exports = HomeController;