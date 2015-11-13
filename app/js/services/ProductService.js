app.service('productService',ProductService);

function ProductService(api){
	//services
	this.api = api;
	// storing cart across all views
	this.cart = [];
	//sotring product being viewed on product view
	this.productView = "";
	// passing product ID around for admin edit product
	this.productID = "";
	//passing product to be edited in admin edit
	this.editProd="";
	this.products = localStorage.getItem('products');
	this.orders = localStorage.getItem('orders');
	//global search varibale used in search bar
	this.searchBar = "";
	this.token ="";
	this.productEditing = "";
	
	this.homeClickSearch= "";

}


ProductService.prototype.retrieveProducts = function(){
	console.log("retrive products");
	var self = this;
	return this.api.request('/api/products/',{},'GET');
}

ProductService.prototype.retrieveOrders = function(){

	var self = this;
	return this.api.request('/api/orders/',{},'GET');
}

ProductService.prototype.setProducts = function(products){
	//store the products in local storage so you don't have to make an API
	//request each time you are on this page.
	localStorage.setItem('products',JSON.stringify(products));
	this.products = products;
}


ProductService.prototype.setOrders = function(orders){
	//store the products in local storage so you don't have to make an API
	//request each time you are on this page.
	localStorage.setItem('orders',JSON.stringify(orders));
	this.orders = orders;
}

ProductService.prototype.getProducts = function(){
	console.log("getproducts start");
	var self = this;
	//if there are no products stored in localStorage
	//grab them from the API,store them in localStorage
	//and pass back the products as a promise
	if(this.products == null){
		return this.retrieveProducts().then(function(response){
				self.setProducts(response.data);
				return response.data;
		   });
	}
	else{
		//console.log(self.products);
		console.log(typeof self.products);
		if (typeof self.products == "object"){
			console.log(self.products);
			return self.products;
		}else{
			console.log("json");
		return JSON.parse(self.products);
		}
	}
	
}

ProductService.prototype.getOrders = function(){
	var self = this;
	//if there are no products stored in localStorage
	//grab them from the API,store them in localStorage
	//and pass back the products as a promise
	if(this.orders == null){
		return this.retrieveOrders().then(function(response){
				self.setOrders(response.data.orders);
				return response.data.orders;
		   });
	}
	else{
		
		if (typeof self.orders == "object"){
			return self.orders;
		}else{
		return JSON.parse(self.orders);
		}
	}
}
ProductService.prototype.addProduct = function(product){
	var self = this;
 	//TODO: add the new product to the current product list and
 	//return the updated list
	return this.api.request('/api/products',product,'PUT')
			.then(function(response){
				console.log(response);
				//self.products.push(response.data);
			});;

}

ProductService.prototype.addOrder = function(order){
 	//TODO: add the new product to the current product list and
 	//return the updated list
	return this.api.request('/api/orders',order,'PUT')
			.then(function(response){
				console.log(response);
				//self.orders.push(response.data);
			});;

}

ProductService.prototype.addToCart = function(item){
 	
 	this.cart.push(item);
 	console.log(this.cart);

}

ProductService.prototype.getCart = function(){
 	return this.cart;
}

ProductService.prototype.setProductView = function(productView){
	this.productView = productView;

}

ProductService.prototype.EditProduct = function(product){
 	
 	return this.api.request('/api/products/'+this.productID,product,'POST')
 	.then(function(response){
				console.log(response);
			});;
}
