const models = require('../models/models');
const router = require('express').Router();


router.get('/', (req, res, next) => {
    res.render('index', {title: ''})
})


router.get('/home', (req, res, next) => {
    res.render('index', {title: 'Home'})
})


router.get('/about', (req, res, next) => {
    res.render('about', {title: 'About'})
})

router.get('/contact', (req, res, next) => {
    res.render('contact', {title: 'Contact'})
})


router.get('/portfolio', (req, res, next) => {
    res.render('portfolio', {title: 'Protfolio'})
})

router.get('/cart', (req, res, next) => {
    res.render('cart', {title: 'Cart'})
})


router.get('/portfolio/project', (req, res, next) => {
    res.render('single-portfolio', {title: 'Protofolio'})
})

router.get('/blog', (req, res, next) => {
    res.render('blog', {title: 'Blog'})
})

router.get('/nubia', (req, res, next) => {
    res.render('nubia-team', {title: 'Nubia Team'})
})

router.get('/nubia/products', (req, res, next) => {
    res.render('nubia', {title: 'Nubia Product'})
})

router.get('/checkout', (req, res, next) => {
    res.render('checkout', {title: 'Checkout'})
});

// getting id param and load the data on the blog post
router.get('/blog/post_number=:id', (req, res) => {
    global.postIdUrl = req.params.id;

    models.post.findOne({_id: postIdUrl})
        .populate('comments')
        .exec(function(err, data){
            if(err) return console.error(err);
            // console.log(data.postTitle)
            res.render('post', {
                title: 'Post',
                postTitle: data.postTitle,
                postPic: data.postPic,
                postDate: data.postDate,
                postEditor: data.postEditor,
                postTopic: data.postTopic,
                postSubTitle: data.postSubTitle,
                subTitleTopic: data.subTitleTopic,
                comments: data.comments
            });


        });

})

// getting id param and load the data on the blog post
router.get('/nubia/products/product_number=:id', (req, res) => {
    global.shopIdUrl = req.params.id;

    models.nubiaProduct.findOne({_id: shopIdUrl}, function(err, data){
        if(err) return console.error(err);

        // console.log(data.postTitle)
        res.render('shop', {
            tilte: 'Shop',
            prodName: data.prodName,
            prodPic: data.prodPic,
            prodPrice: data.prodPrice,
            prodDesc: data.prodDesc
        });


    });

})


module.exports.getPages = router;