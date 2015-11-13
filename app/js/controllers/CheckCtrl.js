app.controller('CheckCtrl',CheckCtrl);

function CheckCtrl(productService,$uibModal,$state,toastr){
	
	this.productService = productService;
	this.products = this.productService.products;
	this.$uibModal=$uibModal;
	this.$state = $state;
	this.toastr=toastr;
	this.cart = this.productService.cart;
	console.log(this.cart);
	this.final_total=0;
	this.total=0;
	this.tax=0;
	this.customerinfo={};
	this.infoSubmitted= false;


	this.calculate();
}

CheckCtrl.prototype.addInfo = function(firstname,lastname,address,addressl2,city,province,postalcode,telephone,billfirstname,billcreditcard,billmonth,billyear,billcvc){
		this.customerinfo = {

		firstname:firstname,
		lastname:lastname,
		address:address,
		addressl2:addressl2,
		city:city,
		province:province,
		postalcode:postalcode,
		telephone:telephone,
		billfirstname:billfirstname,
		billcreditcard:billcreditcard,
		billmonth:billmonth,
		billyear:billyear,
		billcvc:billcvc
		
	}
	console.log(this.customerinfo);
	
	console.log(this.cart);
 	this.toastr.success('Your information has been submitted!', 'Success');
	this.infoSubmitted=true;
	//this.customerinfo.splice();
	
}
CheckCtrl.prototype.addOrder = function(){
	//create the api request that makes the product on the backend
	//as part of your response you need to add it to your current
	//product array using the product service

	var request_body = {
		cart:this.cart,
		total:this.total.toString(),
		tax:this.tax.toString(),
		final_total:this.final_total.toString()
		
	}
	console.log(request_body);

	this.productService.addOrder(request_body);

}


CheckCtrl.prototype.calculate = function(){

	for(i=0;i<this.cart.length;i++){
		console.log("hi");
		this.total = this.total + (this.cart[i].customerQuantity *this.cart[i].price);
	
		// this.total = parseFloat(Math.round(this.total * 100) / 100).toFixed(2);
	}


	this.tax = this.total*0.13;
	this.final_total = this.tax + this.total;
	this.final_total = Number(this.final_total);
	console.log(this.final_total);
	




}

CheckCtrl.prototype.open = function(){

	if(this.infoSubmitted==false){
		 this.toastr.error('Submit your information!', 'Error!');
		return;
	}

	if(this.cart.length ==0){
			 this.toastr.error('Cart is empty!', 'Error!');
			this.$state.go("home");
			return;
	}
	

	for(var i=0;i<this.cart.length;i++){
				if(Number(this.cart[i].quantity) < this.cart[i].customerQuantity){
					this.toastr.error("We only have " + this.cart[i].quantity+" "+this.cart[i].name+ "s left, please change your quantity in cart", "Error!");
					return;
				}
	}
	
	for(var j=0;j<this.cart.length;j++){

			this.productService.productID = this.cart[j].productId;

			var quan = (this.cart[j].quantity - this.cart[j].customerQuantity);

			if(quan==0){
				this.cart[j].status="Inactive";
			}

			var request_body = {

			name:this.cart[j].name,
			description:this.cart[j].description,
			price:this.cart[j].price,
			category:this.cart[j].category,
			image: this.cart[j].image,
			quantity:quan,
			status:this.cart[j].status
		}

		this.productService.EditProduct(request_body);
	}
	
	console.log("passed for both fors");
	this.cart.unshift(this.customerinfo);

	
	var request_body = {
		cart:this.cart,
		total:this.total.toString(),
		tax:this.tax.toString(),
		final_total:this.final_total.toString()
		
	}
	console.log(request_body);
	console.log(this.cart.length);
	
	this.productService.addOrder(request_body);

	this.productService.products = null;
	this.productService.orders = null;

//confirm modal
	  this.$uibModal.open({
      animation: true,
      templateUrl: 'templates/order_confirmation.html',
      controller: 'OrderConfirmCtrl as Ctrl',
      size: "lg"
      
    });
}

