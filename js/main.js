/*
* @Author: Administrator
* @Date:   2017-05-08 21:40:40
* @Last Modified by:   Administrator
* @Last Modified time: 2017-05-08 21:45:36
*/
var pTag = document.getElementsByTagName("p")[0];
 pTag.onclick = function(){
	if(pTag.style.backgroundColor == "yellow"){
		pTag.style.backgroundColor ="green";
	}else{
		pTag.style.backgroundColor = "yellow"
	}
}