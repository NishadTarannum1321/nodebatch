var products=[
    
       { id:1,brand:"nokia",model:"xyz",price:3000,instock:true},
       {id:2,brand:"sony",model:"experia",price:5000,instock:true},
       {id:3,brand:"samsung",model:"duos",price:6000,instock:true}
    
]

var ProductCtrl={
   // get(req,res){
    get:function (req,res){
        res.status(200);
        res.json(products);
    },
    getById: function(req,res){
        console.log(req.params);
        var id = +req.params.id;
        for(let i = 0 ; i < products.length; i++){
            if (products[i].id === id ) {
                res.status(200);
                res.json(products[i]);
            }
        }
    },
    save:function(req,res){

        var product = req.body;
        console.log(product,req.body);
        products.push(product);
        res.status(201);// created
        res.send(req.body);
    },
    delete:function(req,res){
        var id = +req.params.id;
        for(let i = 0 ; i < products.length; i++){
            if(products[i].id === id){
                products.splice(i,1);
                res.status(204);
                res.send();
            }
        }
    },
    update:function (req,res){
        var product = req.body;
        var id = +req.params.id;
        console.log(product, id);
        for(let i = 0; i < products.length; i++){
            if (products[i].id === id) {
                products[i].brand = product.brand;
                products[i].model = product.model;
                products[i].price = product.price;
                products[i].inStock = product.inStock;
                res.status(200);
                res.send();
            }
        }
    },
    patch:function(req,res){
        var product = req.body;
        var id = +req.params.id;
        console.log(product,id);
        for(var i = 0 ; i < products.length; i++){
            if(products[i].id === id){
                products[i].brand = product.brand || products[i].brand;
                products[i].model = product.model;
                products[i].price = product.price;
                products[i].inStock = product.inStock;
                res.status(200);
                res.send();
            }
        }
    }
}
module.exports=ProductCtrl;