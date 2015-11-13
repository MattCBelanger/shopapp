app.controller('MainCtrl',MainCtrl);

function MainCtrl(productService,$state){
	this.productService=productService;
	this.$state=$state;
	
	this.Weapons = "Weapons";
	this.Tech = "Tech";
	this.Food = "Food";
	this.Health = "Health";
}


MainCtrl.prototype.homeSearch = function(input) {
	this.productService.homeClickSearch= input;
	this.$state.go('shop');
};