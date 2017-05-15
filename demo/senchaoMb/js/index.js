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
}