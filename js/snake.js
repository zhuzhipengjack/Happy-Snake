/**
 * Created by yoyo on 2017-11-05.
 */

//snake模块也可以依赖food模块，书写方式与效果都是一样的。
define(["food"], function (food) {
  console.log(food);
  
  function Snake(options) {
    //分析小蛇对象需要哪些属性？
    //宽 高 背景色 坐标 放置位置 运动方向
    
    //将宽高设置为统一的值，其他的坐标等属性进行分别设置
    this.width = options.width || 20;
    this.height = options.height || 20;
    
    //设置坐标:采用一种较为复杂的结构，目的是保存蛇身内每个小盒子的坐标值
    this.body = [
      //当前设置的为小蛇初始的坐标与颜色
      {x: 3, y: 1, color: "red"},//蛇头
      {x: 2, y: 1, color: "orange"},//蛇身
      {x: 1, y: 1, color: "orange"},//蛇身
    ];
    //设置放置位置
    this.map = options.map;
    //设置运动方向
    this.direction = options.direction || "right";
    
    //设置一个属性，用于保存蛇身的所有结构(DOM对象)，目的为删除时可以找到对应的元素
    this.elements = [];
  }
  
  //设置小蛇的显示的方法：
  Snake.prototype.init = function () {
    //当我们要进行绘制之前，先将旧的蛇身结构进行删除
    //要删除的是每个标签的结构,先进行遍历操作
    
    //可以提前对this.elements进行内容检测，但是没有必要
//      if(this.elements.length !== 0){}
    for (var i = 0; i < this.elements.length; i++) {
      //要删除的是每个标签的结构
      this.map.removeChild(this.elements[i]);
      //还需要进行数据的删除
    }
    this.elements = [];
    
    
    //1 创建小蛇中的每个部分（遍历this.body中的所有对象）
    //--- 每次创建完毕后，将蛇身保存到this.elements数组中
    var div, body;
    for (i = 0; i < this.body.length; i++) {
      div = document.createElement("div");
      div.style.width = this.width + "px";
      div.style.height = this.height + "px";
      
      body = this.body[i];
      div.style.backgroundColor = body.color;
      //设置left top
      div.style.left = body.x * this.width + "px";
      div.style.top = body.y * this.height + "px";
      this.map.appendChild(div);
      this.elements.push(div);
    }
//      console.log(this.elements);
  };
  
  //设置小蛇运动的方法：
  Snake.prototype.move = function () {
    //分析：
    //小蛇移动时，需要内部的每个盒子都进行移动，移动是通过坐标的修改实现
    //除蛇头以外，其余的蛇身中的每个部分都可以使用上一个蛇身的坐标值
    //蛇头根据运动方向进行判断判断设置即可
    var body;//用于保存蛇身中的某个对象
    
    //遇到的问题是：如果使用正向遍历的方式，导致所有的蛇身坐标均为蛇头的坐标值了
    /*for (var i = 1; i < this.body.length; i++) {
     //body表示蛇身中的某一个盒子的所有坐标
     body = this.body[i];
     //获取前一项的坐标值即可
     body.x = this.body[i - 1].x;
     body.y = this.body[i - 1].y;
     }*/
    
    //需要使用反向遍历的方式：内部的代码不需修改
    for (var i = this.body.length - 1; i >= 1; i--) {
      //body表示蛇身中的某一个盒子的所有坐标
      body = this.body[i];
      //获取前一项的坐标值即可
      body.x = this.body[i - 1].x;
      body.y = this.body[i - 1].y;
    }
    
    
    //给蛇头的坐标进行单独设置
    //---后期添加的功能，根据当前操作的按键，设置不同的运动方向
    //判断this.direction的值
    switch (this.direction) {
      case "left":
        this.body[0].x--;
        break;
      case "right":
        this.body[0].x++;
        break;
      case "up":
        this.body[0].y--;
        break;
      case "down":
        this.body[0].y++;
        break;
    }
    
    //小蛇body中的所有坐标值更新后，需要进行重新的绘制操作
    //this.init();
  };
  
  return Snake;
});