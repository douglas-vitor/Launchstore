const { addOne, removeOne } = require("../../lib/cart")
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
    },
    removeOne(req, res) {
        // pegar id do produto
        let { id } = req.params
        // primeiro pegar carrinho da sessão
        let { cart } = req.session

        // se nao tiver carrinho, retornar
        if (!cart) return res.redirect("/cart")

        // iniciar carrinho (gerenciador de carinho) e remover
        cart = Cart.init(cart).removeOne(id)

        // atualizar carrinho da sessao, removendo 1 item
        req.session.cart = cart

        // redirecionamento para pagina cart
        return res.redirect("/cart")
    },
    delete(req, res) {
        let { cart } = req.session
        let { id } = req.params

        if(!cart) return

        req.session.cart = Cart.init(cart).delete(id)

        return res.redirect("/cart")
    }
}