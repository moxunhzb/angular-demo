app.controller("myCtrl", function($scope, dishes,LocalStorageService) {
    $scope.hasMore = true;
    dishes.then(function(res) {
        LocalStorageService.setLocalStorageObject('dishes',res.data);
        var dishes =  LocalStorageService.getLocalStorageObject('dishes');
        if(dishes.goods[0].foods.length <= 4) {
            $scope.dish = dishes.goods[0].foods;
        }else{
            $scope.dish =dishes.goods[0].foods.slice(0, 4);
        }
       
        $scope.loadMore = function() {
            if($scope.dish.length ===   dishes.goods[0].foods.length) {
                $scope.hasMore = false;
            } else {
                if(( dishes.goods[0].foods.length - $scope.dish.length) >= 4) {
                    $scope.dish = dishes.goods[0].foods.slice(0, $scope.dish.length + 4);
                } else {
                    $scope.dish = dishes.goods[0].foods;
                }
            }
        };
        
       init=function(){
            $scope.count=new Array(10)
            $scope.money=new Array(10)
            for(let i=0;i<dishes.goods[0].foods.length;i++){
                if(LocalStorageService.getLocalStorage('number')){
                    $scope.count[i]=parseInt(LocalStorageService.getLocalStorage('number').split(',')[i])
                }
                else{
                    $scope.count[i]=0;
                }               
            }
            LocalStorageService.setLocalStorage('number',$scope.count);
            LocalStorageService.setLocalStorage('money',$scope.count);
            var cost=function(){
                for(let i=0;i< dishes.goods[0].foods.length;i++){
                $scope.money[i]=$scope.count[i]* dishes.goods[0].foods[i].price||parseInt(LocalStorageService.getLocalStorage('money').split(',')[i]);
             
                }
            LocalStorageService.setLocalStorage('money',$scope.money);
            // $scope.cost=LocalStorageService.getLocalStorage('cost')||0;
            }
            cost();
            $scope.minus=function(index){
                if($scope.count[index]>=1){
                    $scope.count[index]-=1;
                }
                cost();
                LocalStorageService.setLocalStorage('number',$scope.count);  
            }
            $scope.add=function(index){ 
                $scope.count[index]+=1;
                cost();
                LocalStorageService.setLocalStorage('number',$scope.count);
               
            }
               
    
        }
        init();
   
        
        
        

       

    })
 


    $scope.buy=function(){
        
      
    }
   
 
   
}).config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider.when("/menu", {
        templateUrl: "menu.html",
        controller: "myCtrl"
    })
    .when("/login", {
        templateUrl: "login.html",
        controller: "loginCtrl"
    }).when("/money", {
        templateUrl: "money.html",
        controller: "moneyCtrl"
    }).otherwise({
        redirectTo: "/login"
    });
}).controller("loginCtrl", function($scope, $location,LocalStorageService) {
    localStorage.clear();
    $scope.jump = function(path) {
        $location.path(path);
    };
}).controller("moneyCtrl", function($scope, $location,LocalStorageService) {
    $scope.jump = function(path) {
        $location.path(path);
    }
    $scope.money=new Array(10)
    $scope.money=new Array(10)
    $scope.total=0;
    var dishes=LocalStorageService.getLocalStorageObject('dishes');
    if(LocalStorageService.getLocalStorage('number'))
                {
                    $scope.num=LocalStorageService.getLocalStorage('number').split(',');
                }else{
                    $scope.num=[0,0,0,0,0,0,0,0,0,0]
                }
    if(LocalStorageService.getLocalStorage('money'))
                {
                    $scope.money=LocalStorageService.getLocalStorage('money').split(',');
                }else{
                    $scope.money=[0,0,0,0,0,0,0,0,0,0]
                }
                for(let i=0;i< $scope.money.length;i++){
                    $scope.total+= parseInt($scope.money[i]);
                }
  
    $scope.dish=dishes.goods[0].foods;
})