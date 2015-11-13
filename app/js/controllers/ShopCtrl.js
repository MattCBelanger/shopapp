app.controller('ShopCtrl', ShopCtrl);


function ShopCtrl(productService,$state,products,$uibModal,toastr){
	var self = this;

	//services
	this.$state=$state;
	this.productService = productService;
	this.products = products;
	console.log(this.products);
	this.$uibModal = $uibModal;
	this.cart = this.productService.cart;
	this.cat = "";

	this.Weapons = "Weapons";
	this.Tech = "Tech";
	this.Food = "Food";
	this.Health = "Health";
	this.All = "";
	this.toastr = toastr;

	if(this.productService.homeClickSearch==this.Health){
		this.cat = this.Health;
	}else if(this.productService.homeClickSearch==this.Tech){
		this.cat = this.Tech;
	}else if(this.productService.homeClickSearch==this.Food){
		this.cat = this.Food;
	}else if(this.productService.homeClickSearch==this.Weapons){
		this.cat = this.Weapons;
	}

	//navbar search
	// this.searchBar = this.productService.searchBar;

	


    this.sortOptions = [
   {label: 'Name', sortField: 'name', reverse: false},
   {label: 'Price Low - High', sortField: 'price', reverse:false},
   {label: 'Price High - Low', sortField: 'price', reverse: true}
 ]

  this.selectedOption= this.sortOptions[0];


};

ShopCtrl.prototype.changeID = function(product) {
	console.log(product);
	this.productService.setProductView(product);
	this.$state.go('product');
};

ShopCtrl.prototype.addToCart= function(product){
	var shopItem = product;

	for(var i = 0; i<this.cart.length;i++){
		if(shopItem.productId==this.cart[i].productId){
			this.cart[i].customerQuantity++;
			this.toastr.success('Your '+ shopItem.name +' quantity has been increase!', 'Success!');
			// alert("product quantity increased!");
			return
		}
	}
	shopItem.customerQuantity =1;
	
	console.log(shopItem.customerQuantity);
	this.productService.addToCart(shopItem);
	// alert("product added!");
	this.toastr.success('Your '+ shopItem.name +' has been added.', 'Success!');
	
};

ShopCtrl.prototype.open = function(){
	  this.$uibModal.open({
      animation: true,
      templateUrl: 'templates/cart.html',
      controller: 'CartCtrl as Ctrl',
      size: "lg"
      
    });

}

ShopCtrl.prototype.choosecategory = function (string){
	this.cat = string;
}

