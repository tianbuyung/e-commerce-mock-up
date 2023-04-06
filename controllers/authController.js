const { User } = require("../models");
const bcrypt = require("bcryptjs");

class AuthController {
  //HARUSNYA DI AUTH, TAPI ERROR TRUS, KYKNYA SALAH DI ROUTINGNYA - RHEN

  static registerForm(request, response) {
    const { role } = request.session
    const errors = request.query.errors
    response.render("register", { role, errors });
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
          response.redirect(`/register?errors=${err}`)
          return
        }
        response.send(err);
      });
  }
  
  static loginForm(request, response) {
    const { role } = request.session
    const { error } = request.query;
    response.render("loginForm", { error, role });
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

  static getLogout(request, response) {
    request.session.destroy((err) => {
      if (err) {
        response.send(err);
      } else {
        response.redirect("/");
      }
    });
  }
}

module.exports = AuthController;