//放大镜效果
bigImg()
function bigImg(){
	var content = document.querySelector(".zoom-content");
	var moveZoom = document.getElementById("J_moveZoom");
	var moveLayer = document.getElementById("J_moveLayer");
	var moveImg = document.getElementById("J_moveImg");
	var bigImg = moveImg.firstElementChild;
	moveZoom.onmouseover=function(){
		jquery.show(moveLayer);
		jquery.show(moveImg);
	}
	moveZoom.onmouseout=function(){
		jquery.hide(moveLayer);
		jquery.hide(moveImg);
	}
	moveLayer.onmouseover = function(ev){
		var ev = ev || window.event;
		content.onmousemove = function(ev){
			var ev = ev || window.event;
			moveLeft = ev.pageX - content.offsetLeft - moveLayer.offsetWidth/2;
			moveTop = ev.pageY- content.offsetTop - moveLayer.offsetHeight/2;
			var maxLeft = content.offsetWidth- moveLayer.offsetWidth;
			var maxTop = content.offsetHeight- moveLayer.offsetHeight;
			moveLeft = moveLeft < 0 ? 0 : moveLeft;
			moveLeft = moveLeft >  maxLeft ?  maxLeft : moveLeft;
			moveTop = moveTop < 0 ? 0 : moveTop;
			moveTop = moveTop >  maxTop ?  maxTop : moveTop
			moveLayer.style.left = moveLeft + "px";
			moveLayer.style.top = moveTop + "px";
			
			// w,h为移动比例
			//move块现在的坐标占可移动范围的比例
			var w = moveLeft/maxLeft;
			var h = moveTop/maxTop;
			
			var H = (bigImg.offsetHeight - moveImg.offsetHeight)*h;
			var W = (bigImg.offsetWidth - moveImg.offsetWidth)*w;
			
			bigImg.style.top = -H + "px";
			bigImg.style.left = -W + "px";
			
		}
	}
}


//选择商品，改变价格
changePrice()
function changePrice(){
	//壹-for循环
	var standardsList = document.getElementById("J_standardsList");
	var spanPrice = document.getElementById("J_prices");
	var lisTag = document.querySelectorAll(".specs-list");
	for(var i=0;i<lisTag.length;i++){
		lisTag[i].onclick = function(){
			var price = this.getAttribute("data-price");
			spanPrice.innerHTML = price + ".00";
			jquery.removeClass(lisTag,"seled");
			jquery.addClass(this,"seled");
		}
	}
	//贰-事件绑定
		
		
	//叁 -jquery
	//	$(function(){
	//		$("#J_standardsList").on("click","span", function(){
	//			$("#J_standardsList .specs-list").removeClass("seled");
	//			$(this).addClass("seled");
	//			$("#J_prices").text($(this).attr("data-price"));
	//		})
	//	})
}


//改变商品数量
changeNum();
function  changeNum(){
	 var num = 1;
	 var spanPrice = document.getElementById("J_prices");
	 var price = spanPrice.innerHTML;
	 var stock = document.getElementById("J_stock");
	 var nm_stock = stock.getAttribute("data-stock")
	 var coomodityNumber = document.getElementById("J_coomodityNumber");
	 document.querySelector(".btn-left").onclick = function(){
	 	if(num<=1){
	 		num=1
	 	}else{
	 		num --;
	 		coomodityNumber.value = parseInt(num);
			var totalPrice = price*num;
			spanPrice.innerHTML = totalPrice;
			stock.innerHTML = parseInt(nm_stock)-parseInt(num);
	 	}
	 }
	 document.querySelector(".btn-right").onclick = function(){
	 	if(num<nm_stock){
	 		num ++;
			coomodityNumber.value = parseInt(num);
		
			var totalPrice = price*num;
			spanPrice.innerHTML = totalPrice;
			stock.innerHTML = parseInt(nm_stock)-parseInt(num);
	 	}else{
	 		alert("已售空");
	 	}
	 }
}


//var nd_stock = document.getElementById("J_stock");
//var nd_number = document.getElementById("J_coomodityNumber");
////获取商品数量
//var nd_value = parseInt(nd_number.value);
////获取库存
//var data_stock = parseInt(nd_stock.getAttribute("data-stock"));
//
//function numberOperate(type){
//	if(type==1){
//		k
//	}
//	if(type==2){
//		
//	}
//}



//吸顶效果
fixed();
var tabList = document.getElementById("J_tabList");
var tabListTop = tabList.offsetTop;
var Top = tabListTop;
function fixed(){
	document.onscroll = function(){
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if(scrollTop>=Top){
			if(!jquery.hasClass(tabList,"resp-tabs-list-fixed")){
				jquery.addClass(tabList,"resp-tabs-list-fixed");
			}
		}else{
			if(jquery.hasClass(tabList,"resp-tabs-list-fixed")){
				jquery.removeClass(tabList,"resp-tabs-list-fixed");
			}
		}
	}
}

//商品详情选项卡
commodityTab()
function commodityTab(){
	var lis = document.querySelectorAll(".resp-tabs-list li");
	var goodscontab = document.querySelectorAll(".goods-contab");
	var tabList = document.getElementById("J_tabList");
	var tabListTop = tabList.offsetTop;
	console.log(lis);
	for(var i=0;i<lis.length;i++){
		lis[i].index = i;
		lis[i].onclick = function(){
			if(!jquery.hasClass(this,"on")){
				jquery.removeClass(lis,"on");
				jquery.addClass(this,"on");
				jquery.removeClass(goodscontab,"product-desc");
				//滚动条位置滚动到点击元素的位置
				document.body.scrollTop = tabListTop -80;
				if(goodscontab[this.index]){
					jquery.addClass(goodscontab[this.index],"product-desc");
				}
				
			}
		}
	}
}


