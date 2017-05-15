window.onload = function(){
	//首页大轮播图配置
	$(".carousel").slide({
		titCell:".num ul",  	//导航元素对象（鼠标的触发元素对象）
		autoPage:true,			//轮播自动分页，需结合titCell使用
		mainCell:'.buypicul',	//
		effect:'fold',
		autoPlay:true,
		delayTime:500,
		interTime:2000
	});
	//section里面内容所有轮播
	$(".flex-viewport").slide({
		titCell:".sliders-ol",
		autoPage:'<li></li>',
		mainCell:'.sliders',
		effect:'fold',
		autoPlay:true,
		delayTime:500,
		interTime:2000
	});
	
	//通过ajax获取城市列表
	//$.ajax({
	//	type:'get',
	//	url:'data/index.json',
	//	async:true,
	//	success:function(result){
	//		var dict = result.data.city;
	//		//console.log(dict);
	//		var $span = '';
	//		for(var i in dict){
	//			$span += '<span>' + dict[i].cityname + '</span>';
	//		}
	//		$(".city-list").append($span);
	//	}
	//})
	

	//xml获取数据渲染
		xmlAjax()
		function xmlAjax(){
			$.ajax({
				type:'get',
				url:'data/index.xml',
				success:function(data){
					var cityName = data.querySelector("city").querySelectorAll("cityName");
					var htmlStr = "";
					//for循环遍历
					for(var i=0;i<cityName.length;i++){
						htmlStr += '<span>' + cityName[i].innerHTML + '</span>'
					}
						$(".city-list").html(htmlStr);
				}
			})
		}
}


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
		//第一种
		//var arr = ele.className.split("");
		//for(var i=0;i<arr.length;i++){
		//	if(arr[i]==hClass){
		//	return true;
		//		}
		//	}
		//	return false;
		//简化
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
	}
}



//1.城市列表功能
cityList();
function cityList(){
	//获取城市最外层
	var cityWarp = document.getElementById("J_cityWarp");
	//获取城市名称
	var cityName = document.getElementById("J_cityName");
	//获取城市列表
	var cityList = document.getElementById("J_moreCity");
	
	var spanTags = cityList.getElementsByTagName('span');
	
	//保存原来的class值
	var classPlay = cityName.className;
	//鼠标移入
	cityWarp.onmouseover = function(){
		jquery.addClass(cityName,'city-active');
		//cityList.style.display='block';
		jquery.show(cityList);
	}
	//鼠标移出
	cityWarp.onmouseout = function(){
		//cityName.classList.remove("city-active");
		//cityName.className = cityName.className.replace('city-active','');
		//cityName.className = classPlay;
		jquery.removeClass(cityName,'city-active');
		//cityList.style.display = "none";
		jquery.hide(cityList);
	}
	
	//for循环绑定事件
	//for(var i=1;i<spanTags.length;i++){
	//spanTags[i].onclick = function(){
	//var currentcity = this.innerHTML;
	//	cityName.innerHTML = currentcity;
	//	spanTags[0].innerHTML = "当前城市：" + currentcity;
	//	 }
	//	}

	//事件委托绑定事件
	cityList.onclick = function(ev){
		ev = ev || window.event;
		var target = ev.srcElement || ev.target;
		if(target.nodeName.toLowerCase()=="span"){
			var currentcity = target.innerHTML;
			cityName.innerHTML = currentcity;
			spanTags[0].innerHTML = "当前城市：" + currentcity;
			jquery.removeClass(cityName,'city-active');
			jquery.hide(cityList);
		}
	}
}


//2.购物车功能
 cartShow();
function cartShow(){
	var cartWarp = document.getElementById("J_mycartWarp");
	var mycartArea = document.getElementById("J_mycartArea");
	var mycart = document.getElementById("J_mycart");
	
	
	cartWarp.onmouseover = function(){
		mycartArea.className+=' '+'carthover';
		//jquery.addClass(mycartArea,'carthover');
		//mycart.style.display='block';
		jquery.show(mycart);
	}
	cartWarp.onmouseout = function(){
		mycartArea.classList.remove("carthover");
		//jquery.removeClass(mycartArea,'carthover');
		//mycart.style.display='none';
		jquery.hide(mycart);
	}

	var spbtndelBtns = document.getElementsByClassName('spbtndel');
	for(var j=0;j<spbtndelBtns.length;j++){
		spbtndelBtns[j].onclick = function(){
			var liTag = this.parentNode;
			var ulTag = liTag.parentNode;
			ulTag.removeChild(liTag);
		}
	}
}


//3.显示产品列表功能
menuPlan();
function menuPlan(){
	//获取整个菜单
	var warpMenu = document.getElementById("J_warpMenu");
	//获取菜单栏
	var menu = document.getElementById("J_menu");
	//获取菜单栏列表
	var menuList = menu.getElementsByTagName("li");
	//获取二级菜单
	var sonMenu = document.getElementById("J_sonMenu");
	//获取二级菜单列表
	var sonMenuList = sonMenu.querySelectorAll(".commonidty-son-detail");
	//三级菜单列表
	var homeList = document.getElementById("J_home").getElementsByTagName('li');
	//三级菜单子列表
	var sonHomeList = document.querySelectorAll('#J_sonHome ');

	
	//for循环绑定菜单列表鼠标移入移出事件
	for(var i=0;i<menuList.length;i++){
		//给每个元素赋index
		menuList[i].index=i;
		//给每个元素赋times
		menuList[i].times=null;
		menuList[i].onmouseover = function(){
			jquery.paddingMove(this,20);
			if(!jquery.hasClass(this,'lihoverstyle')){
				//显示二级子菜单
				jquery.show(sonMenu);
				//移除选中的class
				jquery.removeClass(menuList,'lihoverstyle');
				//给当前选中的添加class
				jquery.addClass(this,'lihoverstyle');

				//隐藏所有子菜单内容
				jquery.hide(sonMenuList);

				//判断当前子菜单是否有内容
				if(sonMenuList[this.index]){
					//显示对应的菜单内容
					jquery.show(sonMenuList[this.index]);
				}
			}
		};
		menuList[i].onmouseleave = function(){
			jquery.paddingMove(this,0);
		}
	}
	
	 //显示三级菜单
	  for(var j=0;j<homeList.length;j++){
	  	homeList[j].index = j;
	  		homeList[j].onmouseenter = function(){
	  		if(!jquery.hasClass(this,'active')){
	  			jquery.removeClass(homeList,'active');
	  			jquery.addClass(this,'active');

	  			jquery.hide(sonHomeList);
	  			if(sonHomeList[this.index]){
	  				jquery.show(sonHomeList[this.index]);
	  			}
	  		}
	  	}
	  }
		
	//绑定菜单栏最大区域鼠标移出事件
	warpMenu.onmouseleave = function(){
		jquery.hide(sonMenu);
		jquery.removeClass(menuList,'lihoverstyle');
	}


	//使用事件委托绑定事件
	//	J_menu.onmouseover = function(ev){
	//		ev = ev || window.event;
	//		var target = ev.srcElement || ev.target;
	//		if(target.nodeName.toLowerCase() == "li"){
	//			jquery.addClass(target,'lihoverstyle');
	//			target.paddingLeft="20px";
	//		}
	//	}
	//	J_menu.onmouseout = function(ev){
	//		ev = ev || window.event;
	//		var target = ev.srcElement || ev.target;
	//		if(target.nodeName.toLowerCase() == "li"){
	//			jquery.removeClass(target,'lihoverstyle');
	//		}
	//	}
}


//4.选项卡
tabChange();
function tabChange(){
	var uls = document.querySelectorAll(".tab-right-common");
	var lis;
	//	for(var j=0;j<uls.length;j++){
	//		var lis = uls[j].getElementsByTagName("li");
	//		for(var i=0;i<lis.length;i++){
	//			lis[i].onclick = function(){
	//				console.log(this);
	//				var lisTag = this.parentNode.children;
	//				console.log(lisTag);
	//				jquery.removeClass(lisTag,'active');
	//				jquery.addClass(this,"active");
	//			}
	//		}
	//	}
	
	//闭包 	函数自执行
	 for(var i=0,len = uls.length;i < len;i++){
	 	lis = uls[i].querySelectorAll('li');
	 	(function(ulDate){
	 		for(var j=0;j < ulDate.length;j++){
	 			ulDate[j].onclick = function(){
	 				if(!jquery.hasClass(this,'active')){
	 					jquery.removeClass(ulDate,'active');
	 					jquery.addClass(this,'active');
	 				}
	 			}
	 		}
	 	})(lis);
}
	
	
	//es6 let变量方法
//	 for(var i=0;i < uls.length;i++){
//	 	lis = uls[i].querySelectorAll('li');
//	 	for(let j=0,list = lis;j < list.length;j++){
//	 		lis[j].onclick = function(){
//	 			jquery.removeClass(list,'active');
//	 			jquery.addClass(this,'active');
//	 		}
//	 	}
//	 }

}


//ajax

//创建XMLHttpRequest对象
//ajax对象中的open方法配置请求
//通过ajax对象中的send方法发送请求
//通过ajax中的onreagystatechange监听响应状态
//创建
//var XML = new XMLHttpRequest();
////请求参数
//ajax.open('get','baidu.com',true);
//ajax.setRequestHeader();
////发送请求
//ajxa.send();
////监听
//ajax.onreadystatechange = function(){
//	
//}

