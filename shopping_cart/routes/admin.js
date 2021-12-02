var express = require('express');
const { render } = require('../app')
var router = express.Router();
var productHelper = require('../helpers/product-helpers')


/* GET home page of  admin. */
router.get('/', function(req, res, next) {
  productHelper.getAllProducts().then((products)=>{
    res.render('admin/view-products',{products,admin:true})

  })

});

router.get('/add-product',function(req,res){
  res.render('admin/add-products')
})

router.post('/add-product',(req,res)=>{
  console.log(req.body)
  console.log(req.files.image)

  productHelper.addProduct(req.body,(id)=>{
    let image = req.files.image
    image.mv('./public/product-images/'+id+'.jpg',(err)=>{
      if(!err){
        res.render('admin/add-products')
      }else{
        console.log(err)
      }
    })
  })
})

module.exports = router;
