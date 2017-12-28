/**
 * Created by yoyo on 2017-11-05.
 */


//如果一个模块不需要依赖其他的模块，就可以不设置第一个数组参数
//如果这个模块被其他的模块所依赖，可以在函数内直接使用return，将其他模块依赖的数据进行返回
define(function () {
  
  function Food(options) {
    //每个食物所必须的属性
    //宽 高 背景色 坐标 放置位置
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.bgColor = options.bgColor || "green";
    
    //坐标设置:只是为了在后期维护时，查看属性比較方便
    this.x = 0;
    this.y = 0;
    
    //放置位置
    this.map = options.map;
    
    //用于保存当前存在的食物盒子的DOM对象
    this.element = null;
  }
  
  //对食物进行初始化操作(设置盒子的显示效果)
  Food.prototype.init = function () {
    //删除旧的食物盒子
    if (this.element) {
      this.map.removeChild(this.element);
    }
    
    //1 创建食物盒子
    var div = document.createElement("div");
    //---为了在删除盒子时可以找到当前创建的盒子，先进行一次保存，保存在实例对象的属性中
    this.element = div;
    
    //2 设置样式
    div.style.width = this.width + "px";
    div.style.height = this.height + "px";
    div.style.backgroundColor = this.bgColor;
    //3 放入到地图中
    this.map.appendChild(div);
    
    //4 调用this的随机位置方法
    this.setRandomPos();
  };
  
  //设置食物盒子的随机位置
  Food.prototype.setRandomPos = function () {
    //先计算出随机的坐标值，再根据坐标值设置对应的left/top即可
    //1 先计算可以容纳的坐标最大值
    //this.map.offsetWidth / this.width
    //2 获取范围内的随机坐标
    this.x = Math.floor(Math.random() * this.map.offsetWidth / this.width);
    this.y = Math.floor(Math.random() * this.map.offsetHeight / this.height);
    
    //3 根据坐标设置left和top属性
    this.element.style.left = this.x * this.width + "px";
    this.element.style.top = this.y * this.height + "px";
  };
  
  /*//暴露操作：旧的方式
   window.Food = Food;*/
  
  return Food;
  
});