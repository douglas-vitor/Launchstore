const Product = require("../models/Product")

const { formatPrice, date } = require("../../lib/utils")

async function getImages(productId) {
    try {
        let files = await Product.files(productId)
        files = files.map(file => ({
            ...file,
            src: `${file.path.replace("public", "").replace("\\", "\/").replace("\\", "\/")}`,
        })
        )
        if(!files.src) { files.src = '//placehold.it/500x360'}
        return files
    } catch (err) {
        console.log(err)
    }

}

async function format(product) {
    try {
        const files = await getImages(product.id)
        product.img = files[0].src
        product.files = files
        product.formatedOldPrice = formatPrice(product.old_price)
        product.formatedPrice = formatPrice(product.price)
    
        const { day, hour, minutes, month } = date(product.updated_at)
    
        product.published = {
            day: `${day}/${month}`,
            hour: `${hour}h${minutes}`,
        }
    
        return product
    
    } catch (err) {
        console.error(err)
    }
}

const LoadService = {
    load(service, filter) {
        this.filter = filter
        return this[service]()
    },
    async product() {
        try {
            const product = await Product.findOne(this.filter)

            return format(product)
        } catch (err) {
            console.log(err)
        }
    },
    async products() {
        try {
            const products = await Product.findAll(this.filter)
            const productsPromise = products.map(format)

            return Promise.all(productsPromise)
        } catch (err) {
            console.log(err)
        }
    },
    format
}

module.exports = LoadService