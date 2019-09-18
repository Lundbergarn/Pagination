const router = require('express').Router();
const faker = require('faker');
const Product = require('../models/product');

router.get('/add-product', (req, res) => {
    res.render('main/add-product')
});

// router.get('/generate-fake-data', function(req, res, next) {
//     for (var i = 0; i < 48; i++) {
//         var product = new Product()

//         product.category = faker.commerce.department()
//         product.name = faker.commerce.productName()
//         product.price = faker.commerce.price()
//         product.cover = faker.image.image()

//         product.save(function(err) {
//             if (err) throw err
//         })
//     }
//     res.redirect('/add-product')
// })

router.post('add-product', (req, res) => {
    let product = new Product();

    let { category_name, product_name, product_price } = req.body;

    product.category = category_name;
    product.name = product_name;
    product.price = product_price;
    product.cover = faker.image.image();

    product.save((err) => {
        if(err) throw err;
        res.redirect('/add-product');
    });
})


router.get('/products/:page', function(req, res, next) {
    var perPage = 9
    var page = req.params.page || 1

    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err, products) {
            Product.count().exec(function(err, count) {
                if (err) return next(err)
                res.render('main/products', {
                    products: products,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
})

module.exports = router;