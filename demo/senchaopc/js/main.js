//封装jquery简单方法
var jquery = {
	//封装添加类方法
	addClass:function(ele,className){
		ele.className+=' '+ className;
	},
	//封装移除类方法
	removeClass:function(ele,className){
		//ie8以上
		//ele.classList.remove(className);
		//如果传入的元素是一个数组
		if(ele.length>0){
			for(var i=0;i<ele.length;i++){
				ele[i].className =  ele[i].className.replace(new RegExp('(^| )'+className+'( |$)'),'');
			}
		}else{
			ele.className = ele.className.replace(new RegExp('(^| )'+className+'( |$)'),'');
		}
		
	},
	//显示
	show:function(ele){
		ele.style.display="block";
	},
	//隐藏
	hide:function(ele){
		//如果传入的是一个数组，走if循环
		if(ele.length>0){
			for(var i=0;i<ele.length;i++){
				if(jquery.css(ele[i],'display')){
					ele[i].style.display="none";
				}
			}
		}else{
			ele.style.display="none";
		}
		
	},
	/*获取生效css样式*/
	css:function(ele,attribute){
		//ie8 以下版本不能使用getComputeStyle方法，而要用currentStyle方法，用currentStyle
		return ele.currentStyle?ele.currentStyle[attribute]:window.getComputedStyle(ele,false)[attribute];
	},
	/*封装hasClass方法*/
	hasClass:function(ele,className){
		return ele.className.split(" ").indexOf(className) >=0 ? true : false;
	},
	//移动动画效果
	paddingMove : function(cur,moveNum){
		clearInterval(cur.timers);
		cur.timers = setInterval(function(){
			var pLeft = parseInt(cur.style.paddingLeft) || 0;
			var speed = 0;
			if(moveNum > 0){
				speed = parseInt(pLeft + 10) / 10;
				if(pLeft >= moveNum){
					clearInterval(cur.timers);
					return;
				}
			}else{
				speed = -parseInt(pLeft + 10)/10;
				if(pLeft <= moveNum){
					clearInterval(cur.timers);
					return;
				}
			}
			speed = speed > 0 ? Math.floor(speed) : Math.ceil(speed);
			cur.style.paddingLeft = (pLeft + speed) + "px";
		},20)
			
	},
}

