
    function getStyle(obj , name){
    return getComputedStyle(obj,null)[name]?getComputedStyle(obj,null)[name]:obj.getCurrentStyle[name];
    }

    function moveBox(obj,attr,speed,target,callback){
        clearInterval(obj.timer);
        var oldValue = parseInt(getStyle(obj,attr)); 
            // 向左
        if(oldValue > target)
            {
                speed = -speed;
            }
        obj.timer = setInterval(function(){
            oldValue = parseInt(getStyle(obj,attr));
            var newValue = oldValue + speed;
            if(speed < 0 && newValue < target || speed > 0 && newValue > target)
            {
                newValue = target;
            }
            obj.style[attr] = newValue + "px";
            if(newValue == target)
            {
                clearInterval(obj.timer);
                // 有回调函数就执行没有就算了
                callback && callback();
            }
        },30);   
    }

    // 定义一个函数，用来向一个指定元素中添加指定的class属性值(cn)
    function addClass(obj,cn){
        // 检查是否含有cn
        if(!hasClass(obj,cn)){
            obj.className += " "+cn;
        }
    }

    // 判断一个函数是否含有指定的属性值
    function hasClass(obj,cn){
        // var reg = /\bcn\b/;
        /* 
            上面那种写法是不行的，会直接判断有没有叫cn的单词，而不会取cn的值
            此时要用构造函数来创建reg
        */
       var reg = new RegExp("\\b"+cn+"\\b");
        return reg.test(obj.className);
    }

    // 删除元素中的指定class
    /* 将指定的cn替换为空串 */
    function deleteClass(obj,cn)
    {
        var reg = new RegExp("\\b"+cn+"\\b");
        obj.className = obj.className.replace(reg,"");
    }

    /* 
        切换一个类，有就删除，没有就加上
    */
    function toggleClass(obj,cn){
        if(hasClass(obj,cn)){
            deleteClass(obj,cn);
        }
        else{
            addClass(obj,cn);
        }
    }

 
