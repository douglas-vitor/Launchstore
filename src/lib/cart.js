const {formatPrice} = require("./utils")

const Cart = {
    init(oldCart) {
        if(oldCart) {
            this.items = oldCart.items
            this.total = oldCart.total
        } else {
            this.items = []
            this.total = {
                quantity: 0,
                price: 0,
                formatedPrice: formatPrice(0)
            }
        }
        return this
    },
    addOne(product) {
        let inCart = this.items.find(item => item.product.id == product.id)
        if(!inCart) {
            inCart = {
                product: {
                    ...product,
                    formatedPrice: formatPrice(product.price)
                },
                quantity: 0,
                price: 0,
                formatedPrice: formatPrice(0)
            }

            this.items.push(inCart)
        }

        if(inCart.quantity >= product.quantity) return this

        inCart.quantity++
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formatedPrice = formatPrice(inCart.price)

        this.total.quantity++
        this.total.price += inCart.product.price
        this.total.formatedPrice = formatPrice(this.total.price)

        return this
    },
    removeOne(productId) {
        //pegar item do carrinho
        const inCart = this.items.find(item => item.product.id == productId)

        if(!inCart) return this

        //atualizar o item
        inCart.quantity--
        inCart.price = inCart.product.price * inCart.quantity
        inCart.formatedPrice = formatPrice(inCart.price)

        //atualizar carrinho
        this.total.quantity--
        this.total.price -= inCart.product.price
        this.total.formatedPrice = formatPrice(this.total.price)

        if(inCart.quantity < 1) {
            this.items = this.items.filter(item => 
                item.product.id != inCart.product.id)
                
            return this
        }

        return this
    },
    delete(productId) {}
}

const product = {
    id: 1,
    price: 199,
    quantity: 2
}
const product2 = {
    id: 2,
    price: 229,
    quantity: 1
}
console.log('add first product')
let oldCart = Cart.init().addOne(product)
console.log(oldCart)

console.log('add second product')
oldCart = Cart.init(oldCart).addOne(product)
console.log(oldCart)

console.log('add thirt product')
oldCart = Cart.init(oldCart).addOne(product2)
console.log(oldCart)


console.log('remove onde item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)
console.log('remove onde item')
oldCart = Cart.init(oldCart).removeOne(product.id)
console.log(oldCart)
module.exports = Cart