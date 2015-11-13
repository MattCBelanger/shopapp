app.controller('NavCtrl', NavCtrl);

function NavCtrl(productService,$state,$uibModal){
	this.productService = productService;
	this.$state = $state;
	this.$uibModal=$uibModal;

	}


NavCtrl.prototype.open = function(){
	  this.$uibModal.open({
      animation: true,
      templateUrl: 'templates/cart.html',
      controller: 'CartCtrl as Ctrl',
      size: "lg"
      
    });

}
