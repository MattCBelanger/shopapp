app.controller('ProductCtrl',ProductCtrl);

function ProductCtrl(productService,$state,toastr){
	this.productService = productService;
	this.product = this.productService.productView;
	this.$state=$state;

	this.toastr = toastr;
	this.cart = this.productService.cart;
	
	if(this.product==""){
		this.$state.go('shop');
	}
}
// ProductCtrl.prototype.addProduct = function(name,description,price,img,category,quantity,status){
	
// 	var request_body = {
// 		name:name,
// 		description:description,
// 		price:price,
// 		category:category,
// 		image:img,
// 		quantity:quantity,
// 		status:status
// 	}

// 	this.productService.addProduct(request_body);
// 	this.toastr.success('Your '+ request_body.name +' has been added.', 'Success!');
// 	this,$state.go('admin');
	
// }


ProductCtrl.prototype.addToCart= function(product){

	var shopItem = product;

	for(var i = 0; i<this.cart.length;i++){
		if(shopItem.productId==this.cart[i].productId){
			this.cart[i].customerQuantity++;
			this.toastr.success('Your '+ shopItem.name +' quantity has been increase!', 'Success!');
	
			return
		}
	}
	
	this.product.customerQuantity = 1;
	console.log(this.product.customerQuantity);
	console.log(shopItem);
	this.productService.addToCart(shopItem);
	// alert("Product added!");
	this.toastr.success('Your '+ shopItem.name +' has been added.', 'Success!');
	

}

//Delete products 
// ProductCtrl.prototype.clearProduct = function(productId){
// 	console.log("This got printed!");
// 	var index = this.products.indexOf(product);
// 	if (index != - 1) {
// 		this.productService.splice(index, 1);
// 	}
// }

