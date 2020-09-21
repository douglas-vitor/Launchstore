const { formatPrice } = require("../../lib/utils")

const Product = require("../models/Product")

module.exports = {
    async index(req, res) {
        let results = await Product.all()
        const Products = results.rows

        if(!Products) {
            return res.send("Products not found!")
        }

        async function getImage(productId) {
        let results = await Product.files(productId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)

        return files[0]
        }

        const productsPromise = Products.map(async product => {
            product.img = await getImage(product.id)
            product.oldprice = formatPrice(product.old_price)
            product.price = formatPrice(product.price)
            return product
        }).filter((product, index) => index > 2 ? false : true)

        const lastAdded = await Promise.all(productsPromise)
        return res.render("home/index", { products: lastAdded })
    }   
}