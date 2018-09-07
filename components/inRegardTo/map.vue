<template>
	<div id="map">
		<!--百度地图容器-->
  		<div style="width:697px;height:550px;border:#ccc solid 1px;" id="dituContent"></div>
	</div>
</template>

<script>
	//标注点数组
    var markerArr = [
    					{
    						title:"深圳市荣灿金融控股有限公司",
    						content:"深圳市宝安区西乡银田路4号宝安智谷H栋7楼",
    						point:"113.865538|22.589638",
    						isOpen:1,
    						icon:{w:23,h:25,l:46,t:21,x:9,lb:12}
    					}
    				];
    var map=null;
	export default{
		mounted(){
			this.initMap();
		},
		methods:{
			//创建和初始化地图函数：
	    	initMap(){
		        map = new BMap.Map("dituContent");//在百度地图容器中创建一个地图
		        var point = new BMap.Point(113.864913,22.589696);//定义一个中心点坐标
		        map.centerAndZoom(point,18);//设定地图的中心点和坐标并将地图显示在地图容器中
		        
		        this.fsetMapEvent();//设置地图事件
		        this.addMapControl();//向地图添加控件
		        this.addMarker();//向地图中添加marker
		    },
//		    //地图事件设置函数：
		    fsetMapEvent(){
		        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)
		        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
		        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)
		        map.enableKeyboard();//启用键盘上下左右键移动地图
		    },
		    //地图控件添加函数：
		    addMapControl(){
		        //向地图中添加缩放控件
				var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
				map.addControl(ctrl_nav);
			        //向地图中添加缩略图控件
				var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});
				map.addControl(ctrl_ove);
			        //向地图中添加比例尺控件
				var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
				map.addControl(ctrl_sca);
		    },
		    //创建marker
		    addMarker(){
		        for(var i=0;i<markerArr.length;i++){
		            var json = markerArr[i];
		            var p0 = json.point.split("|")[0];
		            var p1 = json.point.split("|")[1];
		            var point = new BMap.Point(p0,p1);
					var iconImg = this.createIcon(json.icon);
					//console.log(json.icon,'???')
					//console.log(iconImg,'图片形状')
		            var marker = new BMap.Marker(point);
					var iw = this.createInfoWindow(i);
					var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});
					marker.setLabel(label);
					
					//console.log(marker,'坐标红点')
		            map.addOverlay(marker);
		            label.setStyle({
		                        borderColor:"#808080",
		                        color:"#333",
		                        cursor:"pointer"
		            });
					
					this.test(i,marker,label,json);
		        }
		    },
		    test(i,marker,label,json){
				var index = i;
				var _iw = this.createInfoWindow(i);
				var _marker = marker;
				_marker.addEventListener("click",function(){
				    this.openInfoWindow(_iw);
			    });
			    _iw.addEventListener("open",function(){
				    _marker.getLabel().hide();
			    })
			    _iw.addEventListener("close",function(){
				    _marker.getLabel().show();
			    })
				label.addEventListener("click",function(){
				    _marker.openInfoWindow(_iw);
			    })
				if(!!json.isOpen){
					label.hide();
					_marker.openInfoWindow(_iw);
				}
			},
		    //创建InfoWindow
		    createInfoWindow(i){
		        var json = markerArr[i];
		        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
		        return iw;
		    },
		    //创建一个Icon
		    createIcon(json){
		        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
		        return icon;
		    }
		}
	}
</script>

<style>
	.iw_poi_title {color:#CC5522;font-size:14px;font-weight:bold;overflow:hidden;padding-right:13px;white-space:nowrap}
    .iw_poi_content {font:12px arial,sans-serif;overflow:visible;padding-top:4px;white-space:-moz-pre-wrap;word-wrap:break-word}
</style>