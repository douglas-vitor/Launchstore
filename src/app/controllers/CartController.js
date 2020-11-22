const Cart = require("../../lib/cart")

const LoadProductService = require("../services/LoadProductService")

module.exports = {
    async index(req, res) {
        try {
            const product = await LoadProductService.load('product', {where: {id: 3}})

            let { cart } = req.session

            //gerenciador de carinho
            cart = Cart.init(cart).addOne(product)

            return res.render("cart/index", {cart})
        } catch (err) {
            console.log(err)
        }
    }
}