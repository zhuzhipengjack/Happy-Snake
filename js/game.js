/**
 * Created by yoyo on 2017-11-05.
 */
//游戏对象：用于操作food和snake进行结合，实现具体的游戏效果，规定了游戏的结束条件。。
define(function () {
  
  var that;
  function Game(options) {
    //需要的属性：  小蛇   食物   地图
    this.snake = options.snake;
    this.food = options.food;
    this.map = options.map;
    that = this;//保存当前实例对象，方便访问
    
  }
  
  //游戏初始化操作:
  Game.prototype.init = function () {
    //初始化食物
    this.food.init();
    //初始化小蛇
    this.snake.init();
    //设置小蛇跑动：让小蛇可以自动的进行move操作
    this.snakeRun();
    //设置键盘操作（改变小蛇的移动方向）
    this.changeDirection();
  };
  
  //设置小蛇的跑动方法：
  Game.prototype.snakeRun = function () {
    //设置一个定时器，间隔一段时间，让小蛇执行自身的move方法即可
    var timer = null;
    timer = setInterval(function () {
      var snake = that.snake;//保存了snake对象
      var food = that.food;//保存了food对象
      var sheBody = snake.body;//保存了snake的body属性
      
      //获取移动之前蛇尾的横纵坐标
      var lastX = sheBody[sheBody.length - 1].x;
      var lastY = sheBody[sheBody.length - 1].y;
      
      //设置小蛇的运动
      snake.move();
      
      //检测小蛇是否吃到了食物
      //使用蛇头的坐标，和食物的坐标进行对比，如果x和y均相等。说明吃到了食物，添加一个新的蛇身
      if (sheBody[0].x === food.x && sheBody[0].y === food.y) {
        //获取之前蛇尾（蛇身中的最后一个盒子）的坐标，设置为新的对象，放入到蛇的body属性中
        sheBody.push({x: lastX, y: lastY, color: "orange"});
        //创建一个新的食物
        food.init();
      }
      
      
      //检测游戏是否结束
      //1 如果小蛇撞墙了，游戏结束
      //蛇头的横坐标范围为  0-39
      //蛇头的纵坐标范围为  0-29
      var maxX = that.map.offsetWidth / food.width - 1;
      var maxY = that.map.offsetHeight / food.height - 1;
      
      if (sheBody[0].x < 0 || sheBody[0].x > maxX || sheBody[0].y < 0 || sheBody[0].y > maxY) {
        //清除定时器
        clearInterval(timer);
        alert("游戏结束");
        //检测时，运动已经执行完毕了，渲染小蛇的操作init也执行完毕了，所以死后，蛇会出到地图之外
        return;
      }
      
      
      //2 如果小蛇撞到了自己，游戏结束
      //前四个(含蛇头)都不可能被蛇头撞到，所以从第五个蛇身开始检测。i表示索引值，从4开始检测。
      for (var i = 4; i < sheBody.length; i++) {
        if (sheBody[0].x == sheBody[i].x && sheBody[0].y == sheBody[i].y) {
          alert("吃到自己了，游戏结束");
          clearInterval(timer);
          return;
        }
      }
      
      //在游戏结束后，不会画出移动到地图外的小蛇，也不会画出吃到自己的小蛇
      snake.init();
      
      
    }, 550);
    
  };
  
  //设置键盘操作：
  Game.prototype.changeDirection = function () {
    //给键盘设置操作:使用onkeydown事件，操作后的反应更自然
    document.onkeydown = function (e) {
      var e = e || window.event;
      
      //在点击按键时，返回某个按键的键盘码
      //我们需要的按键为:  37左 38上 39右 40下
      //console.log(e.keyCode);
      that.keyCode = e.keyCode;
      
      //获取小蛇当前的运动方向
      
      
      var snakeDirc = that.snake.direction;
      //根据点击后得到的键盘码，设置小蛇的不同运动方向
      switch (true) {
        case e.keyCode == 37 && snakeDirc != "right" :
          that.snake.direction = "left";
          break;
        case e.keyCode == 38 && snakeDirc != "down" :
          that.snake.direction = "up";
          break;
        case e.keyCode == 39 && snakeDirc != "left" :
          that.snake.direction = "right";
          break;
        case e.keyCode == 40 && snakeDirc != "up" :
          that.snake.direction = "down";
          break;
      }
      
      /*        var obj = {name: "jack"};
       var nameVal = obj.name;//保存了obj的name属性值
       console.log(nameVal);
       console.log(nameVal);
       console.log(nameVal);
       console.log(nameVal);
       
       nameVal = 100;
       
       */
    };
  };
 
  
  return Game;
});