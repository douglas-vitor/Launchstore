const express = require('express')
const routes = express.Router()
const HomeController = require("../app/controllers/HomeController")

const users = require('./users')
const products = require('./products')
const cart = require('./cart')
const orders = require('./orders')

routes.get("/", HomeController.index)

routes.use('/products', products)
routes.use('/users', users)
routes.use('/cart', cart)
routes.use('/orders', orders)

//Alias
routes.get("/ads/create", function(req, res) {
    return res.redirect("/products/create")
})

routes.get("/accounts", function(req, res) {
    return res.redirect("/users/login")
})
routes.get("/teste", function(req, res) {
    return res.render("orders/error")
})

module.exports = routes