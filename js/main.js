//页面功能所需要的主体代码会放入到main文件中。
//例如，对游戏对象的创建以及游戏开始操作。

//如果main入口文件代码的使用需要使用到其他的模块代码，需要产生对其他文件的依赖
//需要使用一个方法:requirejs提供的define方法


//参数设置：
//参数1数组：表明了要依赖的文件的文件名
//参数2函数：获取依赖后要执行的操作，以及接收被依赖的文件返回的内容

//设置完依赖的文件后，被依赖的文件还需要进行相应的处理(需要进行依赖数据的返回操作)

define(["food", "snake", "game"], function (Food, Snake, Game) {
  //依赖的文件加载后(依赖注入后),需要执行的代码，放入在这个函数中
   var map = document.getElementById("map");
   var game = new Game({
   map: map,
   //传入时需要考虑game功能的需求，需要操作的是实例对象的属性和方法，所以传入的也是实例对象
   snake: new Snake({map: map}),
   food: new Food({map: map})
   });
   //游戏开始：
   game.init();
  
});



