## 栈内存

JS的变量保存在栈内存中,值与值之间是独立存在的，修改一个变量不会影响其他变量

如下代码

```javascript
var a = 123;

var b = a;

a++;
```

输出a=124,b仍然等于123.

栈内存如图所示：

| 变量 |  值   |
| :--: | :---: |
| obj  | 0x123 |
|  b   |  123  |
| obj2 | 0x123 |
|  a   |  123  |

## 堆内存

```javascript
var obj = new Object();
// obj是一个变量，存在堆内存中
//new关键字，在堆内存中开辟一个新的空间（有一个内存地址）保存obj的值
//obj在栈内存的值是堆内存的地址（对象的引用）
var obj2 = obj;
//两个对象保存同一个引用，修改一个，另一个也会发生变化

obj = null;
//设置obj为null，obj断开和引用的联系，obj2并不受影响
//只有修改引用所在的位置的内存里的东西，才会一起变

```

比较两个对象是否相等，看的是两个对象是否指向同一内存空间（内存地址）

比较两个基本数据对象，比较的就是值。

## 对象字面量

```javascript
//使用对象字面量创建对象,直接指定属性（kv对）
//属性名可以加引号可以不加
//出现大括号，就代表一个对象已经创建了，不需要var关键字

var obj = {};//大括号就是字面量
var obj ={
    name:"猪八戒",
    age:"28",
    test:{}//test是一个属性，属性值是一个空对象

}
```

### 使用工厂方法创建对象（大批量生产对象）

 

```javascript
function createPerson(name,age,gender)
{
    //创建一个新对象并返回
    var obj = new Object();
    //添加属性
    obj.name = name;
    obj.age = age;
    obj.gender = gender;
    return obj;
}
var obj2 = createPerson("猪八戒",28,"男");
```

### 构造函数

- 构造函数就是一个普通的函数，创建方式和普通的函数没有区别，不同的是，**构造函数习惯性首字母大写**

- 使用同一个构造函数创建的对象，称为一**类**对象，也将一个构造函数称为一个类，将通过一个构造函数创建的对象，称为**实例**。

- 使用**instanceof**可以检查一个对象是否为一个类的实例，是返回true，否返回false。

    语法：**对象 instanceof 类**

  **所有对象都是Object的后代**，任何对象 instanceof Object 都返回true

- 构造函数与普通函数的区别就是调用方式，

  ​	**普通函数是直接调用**

  ​	**构造函数使用new关键字来调用**

- 构造函数的执行流程
  1. 立刻创建一个新的对象
  2. **将新建的对象设置为函数中的this，在构造函数中可以使用this引用新建的对象**
  3. 逐行执行函数中的代码
  4. 将新建的对象作为返回值返回

```javascript
//Person是一个构造函数（用new调用），调用后新建一个对象per，Person里的this立刻指向per，执行函数中的代码，返回新的对象per.
//构造函数内部创建了一个函数sayname,构造函数每执行一次，就会创建一个函数，
//这样就导致创建了大量的一样的函数，这是完全没有必要的，可以使所有对象共享同一个方法。
function Person(name,age,gender)
{
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = function(){
        alert("hello，我是"+this.name);
    }
}
var per = new Person();


//将sayname方法在全局作用域中定义即可
//定义在全局作用域中，污染了全局作用域的命名空间，且不安全
function Person(name,age,gender)
{
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.sayName = fun;
}
function fun(){
        alert("hello，我是"+this.name);
    }
per.sayName();
//向原型中添加sayName,所有的对象都可以访问，且不在全局作用域
//将共有的属性和方法统一添加到原型对象里，每个对象都具有这样的属性和方法
function Person(name,age,gender)
{
    this.name = name;
    this.age = age;
    this.gender = gender;
}
Person.prototype.sayName = function(){
        alert("hello，我是"+this.name);
    }
per.sayName();
```



## 函数

- 函数也是对象

- 函数可以封装功能，需要时可以执行

- 创建函数：字符串传递，函数声明，函数表达式

- 函数内部可以声明函数

  ```javascript
  //创建函数对象
  var fun = new function();
  //可以将要封装的代码通过字符串传递给函数,在函数被调用的时候执行
  var fun = new function("hello");
  //调用函数，传入实际参数，赋值给函数对应的形式参数
  function();
  //函数对象具有所有普通对象的功能，开发中很少上述方法创建函数对象
  
  //使用函数声明创建对象
  function name([arg1,arg2,...])//[]表示[]中的内容可有可无，形式参数
  {
      statement;
  }
  //使用函数表达式创建函数，原理：创建匿名函数赋值给一个对象
  var fun3 = function([arg1,arg2,...])
  //匿名函数
  function(){
      console.log("我是匿名函数");
      
  }
  //赋值
  var fun3 = function()
  {
      console.log("我是匿名函数");
  }
  ```

  ### 参数

  调用函数时，解析器不会检查实参的类型，所以要注意是否有可能接收到非法参数

  调用函数式，解析器不会检查实参的数量，多余实参不会被赋值

  实参可以是任意的数据类型，参数过多时，可封装到对象中，把对象作为参数

  实参可以是函数

  ```javascript
  function fun(a){
      console.log("a"+a);
      a(obj);
  }
  function sayHello(obj){
      console.log("hello");
  }
  //函数作为实参
  fun(sayHello);
  //函数的返回值作为参数
  fun(sayHello(obj));
  //匿名函数作为实参
  fun(function(){alert("world")});
  ```

  sayHello-对象，使用的就是函数

  sayHello(obj)-函数，使用的是函数的返回值

  ### 返回值

  return;

  不写return；

  这两种情况都会返回undefined。

  返回值可以是任意的数据类型，也可以是数据对象，函数。

  ### 立即执行函数

  函数定义完，立即执行一次，一般仅仅执行一次（没有变量保存；）

  ```javascript
  //创建匿名函数，用括号括起来作为整体’
  (
  	function(){
          alert("匿名");
      }
  )//整体，就是一个函数对象
  //调用函数：函数名（）
  (
  	function(){
          alert("匿名");
      }
  )();
  
  ```

  ### 方法（函数作为对象的属性，称该函数为方法）

  对象的属性值可以是任意属性值，可以是函数

```javascript
var obj;
obj.sayName = function(){alert("123")};//匿名函数作为属性值
obj.sayName();//调用函数
//sayName就是obj的方法，和函数一样，只是名称的区别
```

### 枚举对象中的属性

使用for in 语句，在属性中，有几个属性，就执行几次，每次执行时会将属性名赋值给n

```javascript
var obj = {
    name:"pig",
    sex:"male",
    age:"3"
}
for var n in obj{
    console.log(n);//这里n其实是key，索引
    console.log(obj[n]);//不能用obj.n，会把n这个字母当成属性名
}//会输出所有的属性名


```

### 作用域

两种作用域：

1. **全局作用域**：

​	直接编写在script标签里的代码，都在全局作用域

​	在页面打开时创建，页面关闭时销毁

​	在页面的任意部分都可以访问，是全局变量

​	在全局作用域中有一个全局对象Window(代表浏览器窗口，直接由浏览器创建)，可以直接使用

​	**在全局作用域中创建的变量，都会作为window对象的属性保存，创建的函数都是window的方法**

```javascript
var a = 10;
var b = 20;
//a，b是wndow的属性
console.log(window.a);//输出a的值
```

**变量声明提前** 使用var声明的变量，会在所有代码执行之前被声明（但不会提前赋值），若不使用var声明，则不会提前

使用**函数声明形式**（function name(){}）创建的函数，会在所有代码执行之前就被创建，所以可以在声明前调用

使用**函数表达式**（var fun = function(){}）创建的函数，会被提前声明（但未赋值），是一个undefined，不能在赋值之前调用

2. **函数作用域**（小全局，短命，范围小）

   **调用**函数时创建函数作用域，函数结束作用域销毁。

   每调用一次，就创建一次。

   函数作用域中可以访问到全局变量，全局作用域里不能访问函数作用域的变量

   当函数作用域中访问变量，会先在自身作用域中寻找，如果有就直接寻找，若没有就向**上一级作用域**（不一定是全局）寻找，直到找到全局作用域，如果全局作用域依然没有，则报错**ReferenceError**->*就近原则*

   若在函数里面想访问全局的变量，使用window.a

   在函数作用域中，也有**声明提前**的特性。

   

   **函数中没有用var声明的变量，都是全局变量**

   ```javascript
   //函数中没有用var声明的变量，都是全局变量
   var c= 33;
   function fun(){
       console.log(c);//没有c，找全局的c
       c = 10;//全局的c，相当于window.c
       d =20;//全局d
   }
   console.log(c);//输出10
   console.log(d);//输出20
   ```

   **定义形参，就相当于在函数内部用var声明一个局部变量**

```javascript
function fun(e){
    alert(e);
}
fun();//undefined

/*function fun(e){
    alert(e);
}等价于以下代码*/
function fun(){
    var e;
    alert(e);
}
//e声明了，但是没有赋值，输出undefined
```

###  this

解析器（浏览器）在**每次调用**函数时，都会向函数内部传入一个隐含参数

这个隐含的参数就是this

this指向的是函数执行的上下文对象，根据函数的**调用方式**(not创建方式)不同，this会指向不同的对象（始终指向调用函数的那个对象）

1.以**函数方式**（fun()）调用，this永远指向window

2.以**方法**形式(obj.sayName())调用，this指向调用方法的对象

3.以**构造函数**形式调用时，this是新创建的那个对象

4.事件的**响应函数**中，响应函数是给谁绑定的，this就是谁

```javascript
function fun(){
    console.log(this);//输出[object window]
}
var obj={
    name:"孙悟空",
    sayName:fun
};
obj.sayName();//输出[object object]
fun();//输出[object window]
```

this举例

```javascript
var name = "全局";
function fun(){
    console.log(name);
}
var obj = {
    name:"孙悟空",
    sayName:fun
};
var obj2 = {
    name:"猪八戒",
    sayName:fun
};
obj.sayName();//obj调用fun函数，fun里没有name属性，向上寻找，找到全局name，故输出 全局
//若希望不同的对象调用同一个fun，输出自己的那么属性，应该将fun的name改成this.name
```

## 原型prototype

我们所创建的**每一个函数**，解析器都会向函数中添加一个属性prototype

这个属性对应着一个对象，prototype就是原型对象（占有一个内存空间），prototype的内容是原型对象的地址

1.如果函数作为普通函数调用，prototype没有用

2.当函数通过构造函数调用，它所创建的对象中都会有一个**隐含属性(\__proto__)**指向该构造函数的原型对象，

通过\__proto____来访问该属性，被构造函数创建的实例对象，自带一个指向prototype的指针 即__proto__

**原型对象就相当于一个公共区域，所有同一个类的实例都可以访问到这个原型对象，我们可以将对象中共有的内容，统一设置到原型对象中**

原型对象也是对象，原型对象也有原型对象

**当我们访问一个对象的属性或方法时，**

  先在自身对象里面找，有就使用，

  没有就去原型里面找，

  还没有，就去原型的原型里找，直到找到Object对象的原型，Object对象的原型没有原型，

  如果依然没有，返回undefined。

```javascript
//向MyClass()的原型对象中添加属性name
function MyClass(){
    
}
var mc = new MyClass();
MyClass.prototype.name = "123";
//函数也是对象，对象中可以有对象（对象作为函数的一个属性），会有属性
//向MyClass()的原型对象中添加方法
MyClass.prototype.sayHello = function(){alert("hello")};
//使用in检查对象中是否有某个属性时，如果对象中没有但是原型中有，也会返回true
console.log("name" in  mc);//true
//可以使用对象的hasOwnProperty()来检查对象自身是否有属性
console.log(mc.hasOwnProperty("name"));//false

```

#### 原型总结

函数是对象，对象有属性，prototype是函数的一个属性，内容是一个指针，指向函数的原型对象。

当函数作为构造函数被调用时，原型对象会自动生成一个constructor属性，指向这个构造函数。

其余属性均从Object对象继承。

构造函数被调用时，生成一个新的对象，新的对象中有一个隐含属性\__proto__，这是一个指针，指向的和构造函数prototype属性指向的位置相同，就是构造函数的原型对象。

当我们访问一个对象的属性，

1.先在对象本身找，如果没有，找他的原型（obj.\__proto__）

2.如果它的原型里没有，找原型的原型（object的原型）（obj.\__proto\__.\__proto__）

3.如果还是没有就是没有了，在网上找指向的是null（object的原型没有原型）

### toString()->object的原型里的方法

当我们直接在页面中打印一个对象时，打印的是它的toString（）方法的返回值

如果我们不希望在打印对象时输出[object Object]，可以为对象添加一个toString（）方法，只修改了一个实例的属性

**要想修改所有实例，就重写原型的属性**



## 垃圾回收

就像人生活的时间长了会产生垃圾，程序运行久了，也会产生垃圾。垃圾积攒过多会导致程序运行变慢。

所以我们需要一个垃圾回收机制来解决这个问题。

```javascript
obj = new Object();
obj = null;
```

当一个对象没有任何变量或属性对其进行引用，它就变成了垃圾。

这种对象过多，会占用大量内存空间，导致变慢。

JS中有自动回收机制，不需要也不能进行垃圾回收的操作。我们只需将不需要使用的对象设置为null

# 内建对象

## 数组（Array）

- 数组也是一个对象，和普通对象功能类似，用于存储某些值

- 不同的是，普通对象使用字符串作为属性，数组使用数字来作为索引操作元素

- 索引(index)：从0开始的整数

- 数组的存储性能优于普通对象

  ```javascript
  //创建数组对象
  var arr = new Array();//arr是一个空数组
  
  
  //添加元素
  //arr[索引] = 值;
  array[0] = 0;
  
  
  //读取元素,如果读取超出范围的索引，不会报错，会返回undefined
  console.log(arr[0]);
  
  //获取连续数组长度,利用length属性
  //对于非连续数组，使用length会返回最大索引+1，虽然没有赋值，但是开辟了空间没有用
  arr.length;
  //修改length,大于原长度，多出的部分会开辟多的空间；小于原长度，则多出的元素会被删除
  arr.length = 10;
  
  //向数组的末尾添加元素
  arr[arr.length] = 5;
  
  ```

  ### 使用字面量创建数组

  回忆字面量创建一个普通对象，var obj = {};这里是大括号

  字面量创建数组：var arr = [];和new效果是一样的

  使用字面量创建数组时，可以在创建时就指定元素

  var arr = [1,2,3,4,5,6]；

  和用下面构造函数创建是一样的

  var arr2 = new Array(1,2,3,4);

  

  

  创建一个数组，只有一个值

  var arr = [10]；

  

  创建长度为10的数组：

  var arr2 = new Array(10);

  

  

  - 数组中的元素可以是任意类型,也可以是对象，也可以是函数索引只能是数

    ```javascript
    var obj = {
        name = "sunwu"
    };
    //数组的元素可以是任意类型
    var arr = ["hello",1,null,obj,true,{sex:"男"}];//字符串，数，对象，对象，Boolean，对象
    //函数作为对象
    arr = [function(){alert(100)},function(){alert(200)}]
    arr[0]();//调用函数，记得写括号
    ```

  

### 数组的方法

```javascript
//创建数组
var arr = ["孙悟空"，"猪八戒","沙和尚"];

//push():向数组末尾添加一个或多个元素，并返回新的长度
//可以将要添加的元素作为方法的参数传递，这样这些元素会自动添加到数组的末尾
arr.push("唐僧","白骨精")

//pop():删除并返回数组的最后一个元素
arr.pop();

//unshift():向数组开头添加一个或多个元素，并返回新的长度，其他元素的索引也会依次调整
arr.unshift("牛魔王","二郎神");//["牛魔王","二郎神","孙悟空"，"猪八戒","沙和尚"];注意牛魔王和二郎神的顺序

//shift():删除并返回第一个元素
arr.shift();

//forEach():用于遍历，需要一个函数（不带括号）作为参数,一般是一个匿名函数
//像这种函数，由我们创建却不由我们调用，称为回调函数（浏览器调用）
//数组中有几个元素，函数就会执行几次，每次执行时，浏览器会将遍历到的元素以实参的形式传递进这个函数
//可以定义形参来读取这些内容
//浏览器会在回调函数中传入三个参数（遍历到的元素value，当前索引index，被遍历的数组）
arr.forEach(function(value,index,obj){
    console.log(value)
})
```

### 数组的遍历

```javascript
//创建数组
var arr = ["孙悟空"，"猪八戒","沙和尚"];
for(var i = 0;i < arr.length;i++)
    {
        console.log(arr[i]);
    }
function getAdult(perArr)
{
    var Adult = new Array[];
    for(var i = 0;i < perArr.length;i++)
        {
            if(perArr[i].age >= 18)
                {
                    Adult.push(perArr[i]);
                }
        }
    return Adult;
}
```

### slice

- 从某个已有的数组**返回**选定的元素，该方法不会改变原数组，而是将截取出来的元素放在新数组中，返回新数组

- arr.slice(start,end);//start，end为位置**索引**,end为开区间，start为闭区间

  ```javascript
  var arr = ["孙悟空"，"猪八戒","沙和尚"];
  //提取孙悟空，猪八戒
  arr.slice(0,2);//前开后闭区间
  
  //省略end，表示从start之后的元素全部截取，start为闭区间[start,+无穷)
  arr.slice(1);//["猪八戒","沙和尚"]
  
  //索引传递一个负值,表示从后往前计算
  arr.slice(1,-1);//["猪八戒"]
  
  ```

### splice

用于删除数组中的指定元素,会影响原数组，**返回被删除的元素**

- 第一个参数：开始位置索引
- 第二个参数：**表示删除的个数**
- 第三个参数及以后：表示插入到**start位置**的前面的元素（替换）

```javascript
var arr = ["孙悟空"，"猪八戒","沙和尚"];
arr.splice(0,2);//原数组还剩["沙和尚"]，返回["孙悟空"，"猪八戒"]
//删除并插入（替换）
arr.splice(0,1,"牛魔王","铁扇公主")//原数组变成：["牛魔王","铁扇公主","猪八戒","沙和尚"]
//当第二个参数为0时，相当于在指定位置之前插入元素
```

### concat（）

返回两个或多个数组，并将新的数组返回，不会影响原数组

```javascript
 var arr = ["孙悟空","猪八戒","沙和尚"];     
 var arr2 = ["蜘蛛精","玉兔精"];
var arr3 = ["123"]
result = arr.concat(arr2,arr3,"牛魔");
console.log(result);
```

### join()

将数组转换为字符串，不会影响原数组，返回转换后的字符串

result = arr.join();//数组中的元素**默认以逗号连接**

在join中可以指定一个字符串作为连接符号

result = arr.join("");//没有连接符

result = arr.join("+");//加号连接

### reverse()

反转数组，**会改变原数组**

### sort()

可以用来对数组的元素进行排序，也会影响原数组

**默认按照unicode编码进行排序**，即使对于纯数字数组，也会按照unicode编码排序，会得到错误的结果

解决：

自己制定排序的规则，在sort中添加回调函数,回调函数需要有两个形参

浏览器将会分别使用数组中的元素作为实参去调用回调函数

使用哪个元素不确定，肯定的是a一定在b之前

- 浏览器会根据回调函数的返回值来决定元素的顺序，
  - 如果返回一个大于0的值，则会交换顺序
  - 若小于0，则不变
  - 等于0，则认为两个元素相等，也不变

```javascript
//升序排列的回调函数
arr.sort(function(a,b){
    if(a > b)
        return 1;
    else if(a < b)
        return -1;
    else 
        return 0;
})
简写：
arr.sort(function(a,b){
    return a - b
})
```

## 函数的方法

- 函数也是对象，也有方法；

- call()和apply()是函数对象的方法，需要用函数来调用

  

```javascript
function fun()
{
    
}
//对函数调用call和apply都会调用函数执行
//在调用call和apply时可以将一个对象指定为第一个参数，此时这个对象将会成为函数执行时的this，改变了this指向
var obj = {
    name:"obj",
    sayName:function(){
        alert(this.name)
    }
};
var obj2 = {name:"obj2"};
fun.call();//函数对象调用
fun.apply();

fun();//this是window

fun.call(obj);//this是obj

obj.sayName();//输出obj
obj.sayName.apply();//输出obj2
```

- call()方法可以将实参在对象之后依次传递

- apply()方法需要将实参封装到数组中统一传递

  ```javascript
  function fun(a,b){
      return a-b;
  }
  fun.call(obj,1,2);
  fun.apply(obj,[1,2]);
  ```

### arguments

调用函数时，浏览器每次都会传递两个隐藏的参数

1.函数的上下文对象this

2.封装实参的对象arguments

- arguments是一个类数组对象，也可以通过索引来操作数据，也可以获取长度
- 在调用函数时，我们多传递的实参都会在arguments中保存
- arguments.length可以用来获取实参长度
- 即使不定义形参，也可以通过arguments来使用实参
  - arguments[0]表示第一个参数
  - arguments[1]表示第2个参数
- arguments属性callee，这个属性对应着一个函数对象，就是当前正在执行的函数对象

### Date对象,

###### 是一个构造函数，使用需要创建对象

- 在JS中使用date对象来表示一个时间

  ```javascript
  //创建一个Date对象
  //如果直接使用构造函数创建一个对象，则会封装为当前代码（创建语句）执行的时间
  var d = new Date();
              
  //创建指定时间，需要在构造函数中传入一个表示时间的字符串作为参数
  //注意遵守下面的日期格式：月/日/年 时:分:秒（北京时间，时区和系统有关）
  var d2 = new Date("12/03/2016 11:10:30")
  
  ```

  - getDate() 获取当前对象日期是几号
  - getDay()获取当前对象日期是一周中的第几天
    - **0表示周日**，其余正常
  - getMonth()/Hours() (0-59)/Minutes() (0-59)/Seconds() (0-59)
    - 0表示1月，1表示2月...
  - getFullYear()获取当前对象日期是什么年
  - getTime()获取当前对象日期的**时间戳**(从格林威治标准时间1970年0时0分0秒到该时间对象的**毫秒数**，计算机底层都用的时间戳)
  - Date.now()获取当前时间戳（可以用于测试程序运行时间）

###  Math，

###### 不是一个构造函数，是一个工具类，使用不需要创建对象

- 封装了数学的属性和方法
- 大写的属性都是常量，如Math.PI，圆周率，是一个常量
- Math.ceil() 向上取整，Math.floor()向下取整，Math.round()四舍五入
- Math.random() 生成一个0-1**之间**的随机数(**开区间**)

```javascript
//生成0-10的随机数（闭区间）

Math.round(Math.random()*10);

//生成x-y的随机数（闭区间）
Math.round(Math.random()*(y - x))+x;
```



- max(a,b,c,d,...) 获取多个数的最大值

- min(a,b,c,d,...) 获取多个数的最小值

  

### 包装类

- 基本数据类型

  String Number Boolean Null Undefined

- 引用数据类型

  Object

- 在JS中为我们提供了三个包装类，通过这三个包装类可以将基本数据类型的数据**转换为对象**（基本数据类型不能添加属性，对象功能更加强大 ）

  **String**

  - 可以将基本数据类型转换为String对象

  **Number**

  - 可以将基本数据类型转换为Number对象

  **Boolean**

  - 可以将基本数据类型转换为Boolean对象

- 注意，在开发中一般不会使用基本数据**对象**，因为在比较时可能会出错。

- 方法和属性只能添加给对象，不能添加给基本数据类型，当我们对一些基本数据类型的值调用一些属性和方法时，浏览器会使用包装类把基本数据类型的变量转换为对象，然后再调用对象的属性和方法，调用完以后再转换为基本数据类型

  ```javascript
  var s = 123;
  
  s.toString();//临时转换为一个对象，调用方法，然后销毁
  
  //s依然是基本数据类型
  
  s.hello = "nihao ";//转为对象，添加属性，销毁对象
  console.log(s.hello);//s又是基本数据类型了，要求其属性，转为对象（新的对象，和上一句的不是同一个），新的对象不具有hello属性，输出undefined，然后s再次变成基本数据类型
  ```

  var s = 123;

  s.toString();//临时转换为一个对象，调用方法，然后销毁

  s依然是基本数据类型



### 字符串的方法

- 在底层字符串是以**字符数组**的形式保存的,所以字符串的操作方法和数组的操作方法类似

- 可以用索引

- **length** 获取字符串长度 str.length

- **charAt(**)返回字符串中指定位置的字符，和str[]一样 str.charAt()

- **charCodeAt()**返回字符串中指定位置的字符的Unicode编码  str.charCodeAt()

- **fromCharCode()**根据字符编码获取字符(注意上面三个是通过实例的，这个要通过构造函数对象来调->静态方法)

  ```javascript
  result = String.fromCharCode(73);//不能写成str.fromCharCode()
  //result = H
  ```

- **concat()**用来连接两个或多个字符串，返回新的字符串

  result = str.concat("1"+"你好")；

- **indexOf()**检索一个字符串中是否含有指定内容,若有，返回其**第一次**出现的索引，若没有，返回-1

  - **第二个参数指定开始查找的位置**

  result = str.indexOf("h",1);

- **lastIndexOf()** 检索一个字符串中是否含有指定内容
  - **第二个参数指定开始查找的位置**
  - 用法和indexOf一样，但是这个函数是从后往前找

- **slice()**从字符串中截取指定内容,不会影响原字符串，返回截取到的内容

  result = str.slice(start,end);//前闭后开区间

  - 省略第二个参数，截取后边所有
  - -1：倒数第一个

- **subString()**和slice()类似，用法也一样

  result = str.subString(1,3);

  - 不同之处：这个方法**不能接收负值作为参数**

  - 如果接受到负值，默认负值为0

  - 而且会自动调整参数位置，若第二个参数 < 第一个参数，则参数自动交换

    str.subString(1,0);和str.subString(0,1);结果是一样的

- **subStr()**用来截取字符串

  result = str.subStr(start,截取长度（范围：1开始）);

- **split()**可以将一个字符串拆分为数组

  - 需要一个字符串作为参数，会根据该字符串来拆分数组

  ```javascript
  str = "abc,def,g";
  result = str.split(",");//返回数组["abc","def","g"]
  result = str.split("d");//返回数组["abc","efg"],d被去掉了
  ```

  

###  正则表达式（对象）

- 用于定义一些字符串的规则（给计算机看的）

- 计算机可以根据正则表达式来检查一个字符串是否符合规则，或者提取出符合规则的字符串

- 在构造函数中传递匹配模式作为第二个参数

  - i  忽略大小写
  - g  全局匹配模式

  ```javascript
  //构造函数创建正则表达式
  var reg = new RegExp("正则表达式","匹配模式");
  
  //检查一个字符串中是否含有a,严格区分大小写
  var reg1 = new RegExp("a");
  ```

- 正则表达式的一个方法：test(),使用这个方法可以检查一个字符串是否符合正则表达式规则，是返回true，不v符合返回false

  ```javascript
  var result = reg.test(str);
  ```

- 使用**字面量创建**正则表达式,更简单

  语法：var 变量 = /正则表达式/匹配模式

  ```javascript
  var reg3 =/a/i;
  ```

- 检查是否有a或b或c,竖线|表示或者

  ```javascript
  reg = /a|b|c/;
  ```

- 检查是否有字母,**[]里的内容也是或的关系**

  - [a-z]表示任意小写字母

  - [A-Z]表示任意大写字母
  - [A-z]表示任意字母
  - [0-9]表示任意数字

  ```javascript
  reg = /[a-z]/;
  ```

- 检查一个字符串中是否含有abc adc aec

  ```javascript
  reg = /a[bde]c/;
  ```

- [^ ]除了

  ```javascript
  reg = /[^ab]/;//除了a，b，字符串中只要有除了a或b以外的东西就是true
  reg.test("abc");//true
  reg.test("a");//false
  ```



### 字符串与正则表达式相关方法

- **split()**:将字符串拆分为一个数组
  - 根据任意字母来将字符串拆开，可以传达一个正则表达式作为参数去拆分。
  - **这个方法即使不指定全局匹配，也会自动全局**
- **search()**:搜索字符串中是否含有指定内容
  - 搜索到指定内容返回第一次出现的位置，没有搜到返回-1.
  - **即使设置了全局匹配，也只会返回第一**个
- **match():**可以根据正则表达式，从一个字符串中提取出符合条件的内容，
  - **返回一个所有匹配到的内容组成的数组**
  - 默认情况下，match只会找到第一个符合条件的内容，找到后即停
  - 可以设置正则表达式为**全局匹配模式**，这样就可以搜索到所有的内容
  - 可以为一个正则表达式设置多个匹配模式，且无所谓顺序
- **replace()**:可以将字符串中的指定内容替换为新的内容
  - **str.replace(被替换的内容（可以是正则表达式），新的内容)**
  - 默认只会替换第一个符合参数1的内容

```javascript
var str = "1a2b3c4d5e6f";

//根据任意字母来将字符串拆开
var str = "1a2b3c4d5e6f";
var result = str.split(/A-z/);

//搜索字符串中是否含有abc或adc或aec
result = =str.search(/a[bde]c/);

//提取出所有的字母
result = str.match(/a-z/gi);//gi(或ig)既忽略大小写又是全局匹配模式

//代替所有的字母为@_@
redult = str.replace(/a-z/gi,"@-@");
//删除所有字母
result = str.replace(/a-z/gi,"@-@");
                      
```

### 正则语法

- 量词，通过量词设置一个内容出现的次数
  - /内容{次数}/
  - {}只对前边一个内容起作用
    - **/ab{3}/** 搜索的是abbb
    - **/(ab){3}/**才是ababab
    - **/(ab){3}c/**  abbbc
    - **ab{1,3}**  出现一次到三次（1,2，3）次
    - **ab{3,}** 出现3次及以上
    - **/ab+c/** +表示1个或多个
    - **/ab*c/** *表示0个或多个
    - **/ab?c/** ?表示0个或1个
- **^**表示开头（注意在[]里表示否）
- \$表示结尾（/a$/）
- 如果在正则表达式中同时使用^\$则要求字符串必须完全符合正则表达式

```javascript
//创建一个正则表达式，检查字符串中是否含有aaa
var reg = /a{3}/;
//检查一个字符串是否以a开头
reg = /^a/;
reg.test(abc);
//检查一个字符串是否以a结尾
reg = /a$/;
//检查a既是开头又是结尾->字符串只能有一位
reg = /^a$/;//只有“a”符合条件
//检查是否以a开头或以a结尾
reg = /^a|a$/;

```

- 创建一个正则表达式检查一个字符串是否为一个合法手机号

  - 手机号规则：
    - 11位
    - 第一位是1
    - 第二位不能是0,1,2->[3-9]
    - 三位以后任意数字

  ```javascript
  var reg = /^1[3-9][0-9]{9}$/;
  ```

- 在一个字符串中找到合法手机号->上题去掉^ $

  ```javascript
  var reg = /1[3-9][0-9]{9}/;
  ```

- 检查一个字符串中是否含有.

  - . 表示任意字符
  - 使用转义字符\
  - 注意，使用构造函数时，由于它的参数是一个字符串，**而\是字符串的转义字符，如果要使用\则需要使用\\\来代替**

  ```javascript
   var reg = /\./;
  
  //是否含有\
   var reg = /\\/;
  //注意，字符串里面的\也需要转义。.不需要
  
  
  
  var reg = new RegExp("\.");//参数作为字符串后传入的是/\./,字符串里的\被当成转义字符，因此实际上执行的参数是/./
  //正确写法
  var reg = new RegExp("\\.");
  
  //检查是否有\\
  var reg = new RegExp("\\\\");
  ```

- 小写字母：含有就返回true,大写字母：不是全含有就返回true

- \w 任意字母数字和_ [A-z0-9_]

- \W 除了字母数字\_[\^A-z0-9_]

- \d任意数字[0-9]

- \D除了数字

- \s空格

- \S除了空格（只有空格返回false，含有空格返回true）

- **\b 单词边界** 检查独立单词

- \B除了单词边界

  ```javascript
  //检查字符串里是否含有child这个单词
  var str = "hello children";
  var reg = /child/;//返回true
  //这时候要用到单词边界
  var reg2 = /\bchild\b/;
  
  //接收用户输入
  var str =prompt( "请输入用户名：");
  //去除字符串空格:就使用""替换空格
  var str = "       admin    ";
  str = str.replace(/\s/g,"");//记住赋值和全局模式
  
  //去除字符串中开头和结尾的的空格
  //去除开头的
  str = str.replace(/^\s*/);
  //去除结尾的
  str = str.replace(/\s*$/);
  //整合:上面两个的并集，用|，并且要用全局模式
  str = str.replace(/^s*|\s*$/g);
  ```



### 邮件的正则

- hello .nihao   @  abc  .com.cn
- 任意的字母数字下划线(3位+) . 任意的字母数字下划线 @ 字母数字   .  任意字母（2-5位）.任意字母（2-5位）
- ​       \w{3,}      (\. \w{3,}+【.之后必须紧跟任意长的】)*【可有可无】@ [0-9A-z]+    \\.[A-z]{2,5}\\.[A-z]{2,5}

```javascript
var reg =/^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;//注意^开头$结尾
document.write(reg.test("714424628@qq.com"));

```

### 闭包

- 是什么？

  是嵌套的内部函数

  **内部函数中**包含被引用变量的对象（chrome可以查看）

- 产生条件？
  - 函数嵌套
  - 内部函数引用外部函数的变量
  - 执行外部函数，那么内部函数就会被声明，不一定要执行内部函数
  - 













