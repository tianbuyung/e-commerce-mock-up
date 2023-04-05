'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'CategoryId' });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Name"
        },
        notEmpty: {
          msg: "Please Enter Name"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Description"
        },
        notEmpty: {
          msg: "Please Enter Description"
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Price"
        },
        notEmpty: {
          msg: "Please Enter Price"
        }
      }
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Image Url"
        },
        notEmpty: {
          msg: "Please Enter Image Url"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Stock"
        },
        notEmpty: {
          msg: "Please Enter Stock"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter User Id"
        },
        notEmpty: {
          msg: "Please Enter User Id"
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please Enter Category Id"
        },
        notEmpty: {
          msg: "Please Enter Category Id"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};