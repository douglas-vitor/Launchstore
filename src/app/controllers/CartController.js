const { addOne } = require("../../lib/cart")
const Cart = require("../../lib/cart")

const LoadProductService = require("../services/LoadProductService")

module.exports = {
    async index(req, res) {
        try {
            let { cart } = req.session

            //gerenciador de carinho
            cart = Cart.init(cart)

            return res.render("cart/index", {cart})
        } catch (err) {
            console.log(err)
        }
    },
    async addOne(req, res) {
        // pegar o id do produto e o id do produto
        const { id } = req.params

        const product = await LoadProductService.load('product', {where: { id }})

        // pegar carrinho da sessao
        let { cart } = req.session

        // adicionar o produto ao carrinho(usando nosso gerenciados de carrinho)
        cart = Cart.init(cart).addOne(product)

        // atualizar carrinho da sessao
        req.session.cart = cart

        // redirecionar usuario para tela do carrinho
        return res.redirect("/cart")
    }
}