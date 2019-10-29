$(function () {

	table(9)

	var size = 50
	function setHtml(k) {
		size = $(window).width()/25
		// if(size<31.6){return}
		$("body").css({"background-size":$(window).width()+"px"})
		$("#myCanvas").attr({"height":size*(k+1)+"px","width":size*k+"px"})

		canvas(size,k-1)

		$("#qiPan").css({"margin":size+"px 0 0 "+(-(size*((k-1)/2)+size/2))+"px","width":size*k+"px"})
	    $("td").css({"height":size,"width":size})
	    $("td").css({"background-size":size+"px"})
	    $("img").css({"width":size*0.9+"px"})
	}
		
	setHtml(9)
	// $(window).resize(function(){
	// 	setHtml(9)
	// });
	
	overall(size)


	
	if(!window.sessionStorage){
        alert("浏览器不支持sessionStorage")
    }else{
        var storage = window.sessionStorage
        storage.setItem('arr','[]')
    }
	
	
	btns(size)
	
})

function table(k){
	let str = ""
	for (let i = 0; i <= k; i++) {
		str += "<tr>" 
		for (let j = 0; j < k; j++) {
			str+="<td></td>"
		}
		str += "</tr>"
	}
	$("table").html(str)
}

function canvas(x,k) {
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	ctx.strokeStyle="#000";
	for (let i = 0; i <= k ; i++) {
		if (i==0||i==k) {
			ctx.moveTo(x*i+x/2,x/2);
			ctx.lineTo(x*i+x/2,(k+1)*x+x/2);
			ctx.stroke();
		}else{
			ctx.moveTo(x*i+x/2,x/2);
			ctx.lineTo(x*i+x/2,(k+1)/2*x);
			ctx.stroke();

			ctx.moveTo(x*i+x/2,((k+1)/2+1)*x);
			ctx.lineTo(x*i+x/2,(k+1)*x+x/2);
			ctx.stroke();
		}
	}
	for (let i = 0; i <= k+1 ; i++) {
		ctx.moveTo(x/2,x/2+(i*x));
		ctx.lineTo(k*x+x/2,(i*x)+x/2);
		ctx.stroke();
	}

	ctx.font = x/2+"px Arial";
	ctx.fillText("界                   河",x*k/3,(k/2+1)*x+x/4.5);

	ctx.moveTo(x*3+x/2,x/2);
	ctx.lineTo(x*5+x/2,2*x+x/2);
	ctx.stroke();

	ctx.moveTo(x*5+x/2,x/2);
	ctx.lineTo(x*3+x/2,2*x+x/2);
	ctx.stroke();

	ctx.moveTo(x*3+x/2,7*x+x/2);
	ctx.lineTo(x*5+x/2,9*x+x/2);
	ctx.stroke();

	ctx.moveTo(x*5+x/2,7*x+x/2);
	ctx.lineTo(x*3+x/2,9*x+x/2);
	ctx.stroke();
}


function btns(size){
	let chess = ""
	let xy = []

	$("td").on("click", "img", function(){
		var storage = window.sessionStorage
		let arr = JSON.parse(storage.getItem('arr'))

		if(arr.length%2==0){
			let white = $(this).attr("name").split("-")[0]
			if(white=="x"){
				if($(this).is(".active")){
					$(this).removeClass("active")
					chess = ""
				}else{
					$(this).addClass(" active")
					let tr = $(this).parents("tr").index()
					let td = $(this).parent().index()
					let name = $(this).attr("name")

					chess = $(this).prop("outerHTML")
					xy = [name,tr,td]

					$("tr:eq("+tr+")").siblings().find("td img").removeClass("active")
					$("tr:eq("+tr+") td:eq("+td+")").siblings().find(" img").removeClass("active")
				}
			}else{
				// alert("当前不是黑方棋权")
			}
		}else{
			let black = $(this).attr("name").split("-")[0]
			if(black=="y"){
				if($(this).is(".active")){
					$(this).removeClass("active")
					chess = ""
				}else{
					$(this).addClass(" active")
					let tr = $(this).parents("tr").index()
					let td = $(this).parent().index()
					let name = $(this).attr("name")

					chess = $(this).prop("outerHTML")
					xy = [name,tr,td]

					$("tr:eq("+tr+")").siblings().find("td img").removeClass("active")
					$("tr:eq("+tr+") td:eq("+td+")").siblings().find(" img").removeClass("active")
				}
			}else{
				// alert("当前不是红方棋权")
			}
		}
				
	})


	$("td").click(function () {
		
		let child = $(this).children()

		if(child.length!=0)
			var k1 = child[0].name.split("-")[0]
			
		if(xy.length!=0)
			var k2 = xy[0].split("-")[0]

		let tr = $(this).parent().index()
		let td = $(this).index()


		if( chess != "" && (child.length == 0 || k1 != k2) && myMath(xy,[xy[0],tr,td]) ){
			$("table tr:eq("+tr+")> td:eq("+td+")").html("")
			$(this).addClass("add")
			$(this).html(chess)
			chess = ""
			$("table tr:eq("+xy[1]+")> td:eq("+xy[2]+")").html("")
			$("table tr:eq("+xy[1]+")> td:eq("+xy[2]+")").removeClass("add")
			var storage = window.sessionStorage
			let arr = JSON.parse(storage.getItem('arr'))
			if(child.length!=0){
				arr.push([xy,[xy[0],tr,td],[child[0].name,tr,td]])
			}else{
				arr.push([xy,[xy[0],tr,td]])
			}
			
			storage.arr = JSON.stringify(arr)
		}
	})

	$("#clear").click(function(){
		overall(size)
		var storage = window.sessionStorage
        storage.setItem('arr','[]')
	})

	$("#revocation").click(function(){
		var storage = window.sessionStorage
		let arr = JSON.parse(storage.getItem('arr')) 
		let x = arr.pop()
		$("table tr:eq("+x[1][1]+")> td:eq("+x[1][2]+")").removeClass("add")
		$("table tr:eq("+x[0][1]+")> td:eq("+x[0][2]+")").addClass("add")
		$("table tr:eq("+x[0][1]+")> td:eq("+x[0][2]+")").html("<img name= "+x[0][0]+" src='images/qizi/"+x[0][0]+".png' alt='' />")
		$("table tr:eq("+x[1][1]+")> td:eq("+x[1][2]+")").html("")
		if(x.length==3){
			$("table tr:eq("+x[2][1]+")> td:eq("+x[2][2]+")").addClass("add")
			$("table tr:eq("+x[2][1]+")> td:eq("+x[2][2]+")").html("<img name= "+x[2][0]+" src='images/qizi/"+x[2][0]+".png' alt='' />")
		}
		$("img").css({"width":size*0.9+"px"})
		storage.arr = JSON.stringify(arr)
	})
}
function overall(size){
	let arr = [
	["x-1",0,0],["x-2",0,1],["x-3",0,2],["x-4",0,3],["x-0",0,4],["x-4",0,5],["x-3",0,6],["x-2",0,7],["x-1",0,8],["x-5",2,1],["x-5",2,7],
	["x-6",3,0],["x-6",3,2],["x-6",3,4],["x-6",3,6],["x-6",3,8],
	["y-1",9,0],["y-2",9,1],["y-3",9,2],["y-4",9,3],["y-0",9,4],["y-4",9,5],["y-3",9,6],["y-2",9,7],["y-1",9,8],["y-5",7,1],["y-5",7,7],
	["y-6",6,0],["y-6",6,2],["y-6",6,4],["y-6",6,6],["y-6",6,8]]
	$("td").html("")
	$("td").removeClass("add")
	for (var i = 0; i < arr.length; i++) {
		$("table tr:eq("+arr[i][1]+")> td:eq("+arr[i][2]+")").addClass("add")
		$("table tr:eq("+arr[i][1]+")> td:eq("+arr[i][2]+")").html("<img name= "+arr[i][0]+" src='images/qizi/"+arr[i][0]+".png' alt='' />")
	}

	$("img").css({"width":size*0.9+"px"})
}

function myMath(arr1,arr2){

	//一步一步的走
	let flag  = ( (arr2[1]-arr1[1] == 1 || arr2[1]-arr1[1] == -1) && arr2[2]==arr1[2] ) || ( (arr2[2]-arr1[2]== 1|| arr2[2]-arr1[2] == -1) && 
			arr2[1]==arr1[1] )
	
	//判断所行中间有几个棋子
	function Count() {
		let count = 0
		if (arr1[1]==arr2[1]) {
			let x = arr2[2] - arr1[2]
			if (x>0) {
				for (var i = 1; i < x ; i++) {
					let child = $("table tr:eq("+arr1[1]+")> td:eq("+(arr1[2]+i)+")").is(".add")
					if(child){
						count++
					}
				}
			}else{
				for (var i = 1; i < -x ; i++) {
					let child = $("table tr:eq("+arr1[1]+")> td:eq("+(arr2[2]+i)+")").is(".add")
					if(child){
						count++
					}
				}
			}

		}else if (arr1[2]==arr2[2]) {
			let x = arr2[1] - arr1[1]
			if (x>0) {
				for (var i = 1; i < x ; i++) {
					let child = $("table tr:eq("+(arr1[1]+i)+")> td:eq("+arr1[2]+")").is(".add")
					if(child){
						count++
					}
				}
			}else{
				for (var i = 1; i < -x ; i++) {
					let child = $("table tr:eq("+(arr2[1]+i)+")> td:eq("+arr1[2]+")").is(".add")
					if(child){
						count++
					}
				}
			}
		}

		return count
	}

	

	let flag1,flag2,child
	switch(arr1[0])
	{
		case "x-0":
				child = $("table tr:eq("+(arr2[1])+")> td:eq("+arr2[2]+")").children()
				if(child.length>0){
					if( (child[0].name == "y-0") && (Count()==0) ){
						return true
					}
				}
				flag1 = ( 2 >= arr2[1] && arr2[1] >= 0 ) &&  ( 5 >= arr2[2] && arr2[2] >= 3)
				// console.log( flag ,  flag1 )
				return (flag && flag1)
			break;

		case "y-0":
				child = $("table tr:eq("+(arr2[1])+")> td:eq("+arr2[2]+")").children()
				if(child.length>0){
					if( (child[0].name == "x-0") && (Count()==0) ){
						return true
					}
				}
				flag1 = ( 9 >= arr2[1] && arr2[1] >= 7 ) &&  ( 5 >= arr2[2] && arr2[2] >= 3)
				// console.log( flag ,  flag1 )
				return (flag && flag1)
			break;

		case "x-4":
				flag  = ( (arr2[1]-arr1[1] == 1 || arr2[1]-arr1[1] == -1) && (arr2[2]-arr1[2]== 1 || arr2[2]-arr1[2] == -1) )
				flag1 = ( 2 >= arr2[1] && arr2[1] >= 0 ) &&  ( 5 >= arr2[2] && arr2[2] >= 3)
				// console.log( flag ,  flag1 )
				return (flag && flag1)
			break;

		case "y-4":
				flag  = ( (arr2[1]-arr1[1] == 1 || arr2[1]-arr1[1] == -1) && (arr2[2]-arr1[2]== 1 || arr2[2]-arr1[2] == -1) )
				flag1 = ( 9 >= arr2[1] && arr2[1] >= 7 ) &&  ( 5 >= arr2[2] && arr2[2] >= 3)
				return (flag && flag1)
			break;

		case "x-3":
				flag  = ( (arr2[1]-arr1[1] == 2 || arr2[1]-arr1[1] == -2) && (arr2[2]-arr1[2]== 2 || arr2[2]-arr1[2] == -2) ) && (4 >= arr2[1])
				if (arr2[1]-arr1[1] == 2 && arr2[2]-arr1[2]== 2) {
					flag1 = $("table tr:eq("+(arr1[1]+1)+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == 2 && arr2[2]-arr1[2]== -2) {
					flag1 = $("table tr:eq("+(arr1[1]+1)+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == -2 && arr2[2]-arr1[2]== 2) {
					flag1 = $("table tr:eq("+(arr1[1]-1)+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == -2 && arr2[2]-arr1[2]== -2) {
					flag1 = $("table tr:eq("+(arr1[1]-1)+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true
				}else{
					flag1 = false
				}
				return (flag && flag1)
			break;

		case "y-3":
				flag  = ( (arr2[1]-arr1[1] == 2 || arr2[1]-arr1[1] == -2) && (arr2[2]-arr1[2]== 2 || arr2[2]-arr1[2] == -2) ) && ( arr2[1] >= 5)
				if (arr2[1]-arr1[1] == 2 && arr2[2]-arr1[2]== 2) {
					flag1 = $("table tr:eq("+(arr1[1]+1)+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == 2 && arr2[2]-arr1[2]== -2) {
					flag1 = $("table tr:eq("+(arr1[1]+1)+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == -2 && arr2[2]-arr1[2]== 2) {
					flag1 = $("table tr:eq("+(arr1[1]-1)+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
				}else if (arr2[1]-arr1[1] == -2 && arr2[2]-arr1[2]== -2) {
					flag1 = $("table tr:eq("+(arr1[1]-1)+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true
				}else{
					flag1 = false
				}
				return (flag && flag1)
			break;

		case "x-6":
				if (arr2[1] >= 5) {
					flag = ( (arr2[1]-arr1[1] == 1) && arr2[2]==arr1[2] ) || ( (arr2[2]-arr1[2]== 1|| arr2[2]-arr1[2] == -1) && 
						arr2[1]==arr1[1] )
				}else{
					flag = ( (arr2[1]-arr1[1] == 1) && arr2[2]==arr1[2] )
				}
				return flag
			break;

		case "y-6":
				if (arr2[1] <= 4) {
					flag = ( (arr2[1]-arr1[1] == -1) && arr2[2]==arr1[2] ) || ( (arr2[2]-arr1[2]== 1|| arr2[2]-arr1[2] == -1) && 
						arr2[1]==arr1[1] )
				}else{
					flag = ( (arr2[1]-arr1[1] == -1) && arr2[2]==arr1[2] )
				}
				return flag
			break;

		default:
			let myName = arr1[0].split("-")[1]
			switch(myName)
			{
				case "1":
						flag = arr2[1]==arr1[1] || arr2[2]==arr1[2]
						flag1 = Count() == 0 ? true : false
						return flag&&flag1
					break;
				case "2":     
						flag = ( (arr2[1]-arr1[1] == 2) && (arr2[2]-arr1[2] == 1 || arr2[2]-arr1[2] == -1) ) || 
							( (arr2[1]-arr1[1] == -2) && (arr2[2]-arr1[2] == 1 || arr2[2]-arr1[2] == -1) ) ||
							( (arr2[1]-arr1[1] == 1) && (arr2[2]-arr1[2] == 2 || arr2[2]-arr1[2] == -2) ) ||
							( (arr2[1]-arr1[1] == -1) && (arr2[2]-arr1[2] == 2 || arr2[2]-arr1[2] == -2) )

						if(arr2[1]-arr1[1] == 2){
							flag1 = $("table tr:eq("+(arr1[1]+1)+")> td:eq("+arr1[2]+")").is(".add") ? false : true
						}else if(arr2[1]-arr1[1] == -2){
							flag1 = $("table tr:eq("+(arr1[1]-1)+")> td:eq("+arr1[2]+")").is(".add") ? false : true
						}else if(arr2[1]-arr1[1] == 1&&arr2[2]-arr1[2] == 2){
							flag1 = $("table tr:eq("+arr1[1]+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
						}else if(arr2[1]-arr1[1] == 1&&arr2[2]-arr1[2] == -2){
							flag1 = $("table tr:eq("+arr1[1]+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true

						}else if(arr2[1]-arr1[1] == -1&&arr2[2]-arr1[2] == 2){
							flag1 = $("table tr:eq("+arr1[1]+")> td:eq("+(arr1[2]+1)+")").is(".add") ? false : true
						}else if(arr2[1]-arr1[1] == -1&&arr2[2]-arr1[2] == -2){
							flag1 = $("table tr:eq("+arr1[1]+")> td:eq("+(arr1[2]-1)+")").is(".add") ? false : true
						}else{
							flag1 = false
						}
						return flag&&flag1
					break;
				case "5":
						flag = arr2[1]==arr1[1] || arr2[2]==arr1[2]
						if (Count() == 0) {
							flag1 = $("table tr:eq("+(arr2[1])+")> td:eq("+arr2[2]+")").is(".add") ? false : true
						}else if(Count() == 1){
							flag1 = $("table tr:eq("+(arr2[1])+")> td:eq("+arr2[2]+")").is(".add")
						}else{
							flag1 = false
						}
						return flag&&flag1
					break;
				default:
					return false
			}
	}	
}