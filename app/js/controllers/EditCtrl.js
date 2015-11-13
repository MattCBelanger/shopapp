app.controller('EditCtrl',EditCtrl);

function EditCtrl(productService,$state,toastr){
	this.productService = productService;
	this.$state=$state;
	this.test="test";
	this.toastr=toastr;
	this.fakeProd = this.productService.productEditing;
	this.request_body = {
		name:this.fakeProd.name,
		description:this.fakeProd.description,
		price:this.fakeProd.price,
		category:this.fakeProd.category,
		image: this.fakeProd.image,
		quantity:this.fakeProd.quantity,
		status:this.fakeProd.status
	}
	console.log("HI");
	console.log(this.fakeProd);
	console.log(this.request_body);
	if(this.fakeProd==""){
		this.$state.go('admin');
	}
};


EditCtrl.prototype.editProduct = function(name,description,price,img,category,quantity,status) {
	
	 var request_body = {
		name:name,
		description:description,
		price:price,
		category:category,
		image: img,
		quantity:quantity,
		status:status
	}

	this.productService.EditProduct(request_body);
	

	this.toastr.success(request_body.name +' Product has been edited!', 'Success!');
	
	for (i=0;i<this.productService.products.length;i++){
		
		if(this.productService.products[i].productId==this.productService.productID){
			console.log(this.productService.products[i].productId);
			
			this.productService.products[i].name = name;
			this.productService.products[i].description = description;
			this.productService.products[i].price = price;
			this.productService.products[i].image = img;
			this.productService.products[i].category=category;
			this.productService.products[i].quantity= quantity;
			this.productService.products[i].status = status;
		}
	};
	
	this.$state.go('admin');
};