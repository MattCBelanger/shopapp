app.controller('CartCtrl',CartCtrl);

function CartCtrl(productService,$modalInstance,$state,toastr){
	
	this.$modalInstance = $modalInstance;
	this.productService = productService;
	this.$state = $state;
	this.cart = this.productService.cart;
	this.toastr=toastr;
	
}


CartCtrl.prototype.ok = function () {
 			this.$modalInstance.close();
 		
  };


CartCtrl.prototype.checkOut = function () {
 			this.$modalInstance.close();
 			if((this.cart.length < 1) || (this.cart.length == null)){
 				this.toastr.error('No Items in Cart', 'Error!');
 				
 			}else{
			this.$state.go('check');
 			}
 			
 		
  };

 
 CartCtrl.prototype.removeItem = function (ID) {

 			for(var i=0;i<this.cart.length;i++){
 				if(this.cart[i].productId==ID){
 					console.log("removed");
 					this.cart.splice(i,1);
 				}
 			}
 		
  };

 