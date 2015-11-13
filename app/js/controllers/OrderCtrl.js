app.controller('OrderCtrl',OrderCtrl);

function OrderCtrl(productService,orders){
	
	this.orders = orders;
	console.log(this.orders);
	this.stringIt();
	// this.orders = orders;
	
	// this.productService = productService;
	// this.cart=[];
	

}



OrderCtrl.prototype.stringIt = function() {
	
	console.log(this.orders[0].cart);

	for(i=0;i<this.orders.length;i++){
		//console.log(i);
		
		this.orders[i].cart = JSON.parse(this.orders[i].cart);

	}
	console.log(this.orders);
	
};

