app.controller('adminProductCtrl',adminProductCtrl);

function adminProductCtrl(productService,$state,toastr){
	this.productService = productService;
	this.product = this.productService.productView;
	this.$state=$state;
	this.toastr = toastr;
	this.cart = this.productService.cart;
	
	
}
adminProductCtrl.prototype.addProduct = function(name,description,price,img,category,quantity,status){
	
	var request_body = {
		name:name,
		description:description,
		price:price,
		category:category,
		image:img,
		quantity:quantity,
		status:status
	}

	console.log(request_body);

	this.productService.addProduct(request_body);
	this.toastr.success('Your '+ request_body.name +' has been added.', 'Success!');
	this.$state.go('admin');
	
}




