<template>
	<div :class="layout" :ref="layout=='vertical'||layout=='horizontal'?'contentbox':''" :style="{width:cWidth,height:cHeight}">
		<!-- 纵向滚动条内容-->
		<div class="scrollContent" ref="scrollcontent" :style="{width:layout=='vertical'&&vertical_flag?'calc(100% - 7px)':'100%'}" v-if="layout=='vertical'">
			<slot name="content"></slot>
		</div>
		<!-- 纵向滚动条 -->
		<div ref="vscrollBox" class="scrollBar" v-show="(layout=='vertical'||layout=='vertical-horizontal')&&vertical_flag">
			<div class="scroll" ref="scrollbox" :style="{height:layout=='vertical-horizontal'&&horizontal_flag?'calc(100% - 7px)':'100%'}">
				
			</div>
			<p :class="['bar',type]" :style="{height:barHeight+'px'}" ref="scrollbar">
				<i v-if="type=='grain'"></i>
				<i v-if="type=='grain'"></i>
				<i v-if="type=='grain'"></i>
			</p>
		</div>
		<!-- 横向滚动条内容 -->
		<div class="scrollContent" ref="scrollcontent" :style="{height:layout=='horizontal'&&horizontal_flag?'calc(100% - 7px)':'100%'}" v-if="layout=='horizontal'">
			<slot name="content"></slot>
		</div>
		<!-- 横纵向滚动条内容 -->
		<div class="scrollContent"  :style="{height:layout=='vertical-horizontal'&&horizontal_flag?'calc(100% - 7px)':'100%',width:layout=='vertical-horizontal'&&vertical_flag?'calc(100% - 7px)':'100%'}" v-if="layout=='vertical-horizontal'" :ref="layout=='vertical-horizontal'?'contentbox':''">
			<div class="v_content" ref="scrollcontent">
				<slot name="content"></slot>
			</div>
		</div>
		<!-- 横向滚动条 -->
		<div ref="xscrollBox" class="x_scrollBar" v-show="(layout=='horizontal'||layout=='vertical-horizontal')&&horizontal_flag">
			<div class="x_scroll" ref="x_scrollbox" :style="{width:layout=='vertical-horizontal'&&vertical_flag?'calc(100% -  7px)':'100%'}" >
				
			</div>
			<p :class="['bar',type]" :style="{width:barWidth+'px'}" ref="x_scrollbar">
				<i v-if="type=='grain'"></i>
				<i v-if="type=='grain'"></i>
				<i v-if="type=='grain'"></i>
			</p>
		</div>
	</div>
	
</template>


<script>
	/*
        time : 2017-5-23
        author : chenzhihao
        desc : 滚动条组件
        props : {
            type : 组件的类型，有green、blue、grain三种类型，默认green
            width:组件宽度,可以传数值、px以及%
            height:组件的高度，同上
            layout:组件的布局，有vertical(纵向)，horizontal(横向)，vertical-horizontal(横纵向)三种
        },
        computed :{
        	cWidth:将传进来的宽度进行计算,
        	cHeight:将传进来的高度进行计算
        }
        data:{
			barHeight:null,		//手柄高度
			barWidth:null,			//横向滚动条手柄宽度
			vertical_flag:true, 		//纵向滚动条flag
			horizontal_flag:true 	//横向滚动条flag
        }
    */
	export default{
		name:"scrollbar",
		props:{
			width:{
			},
			height:{
			},
			type:{
				default:"default"
			},
			layout:{
				default:"vertical"
			},
			changing:{

			},
			offx:{
				default:0
			},
			offy: {
				default:0
			}
		},
		data(){
			return {
				barHeight:null,		//手柄高度
				barWidth:null,			//横向滚动条手柄宽度
				vertical_flag:false, 		//纵向滚动条flag
				horizontal_flag:false 	//横向滚动条flag
			}
		},
		watch:{
			vertical_flag(){
				if(!this.vertical_flag){
					this.$refs.scrollcontent.style.left=0;
					this.$refs.scrollcontent.style.top=0;
					this.$refs.scrollbar.style.left=0;
					this.$refs.scrollbar.style.top=0;
				}
				
			},
			horizontal_flag(){
				if(!this.horizontal_flag){
					this.$refs.x_scrollbar.style.left=0;
					this.$refs.x_scrollbar.style.top=0;
				}
			},
			//滚动条组件更新
			changing(){
				
				if(this.layout=="vertical"){
					var content=this.$refs.scrollcontent.offsetHeight;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						scrollbar.style.display="block"
						this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
						this.vertical_flag=true;
					}else{
						this.vertical_flag=false;
					}
					this.$nextTick(function(){
						this.getScroll();
					})
					
				}
				if(this.layout=="horizontal"){
					var content=this.$refs.scrollcontent.offsetWidth;
					var cHeight=this.$refs.contentbox.offsetWidth;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						x_scrollbar.style.display="block";
						this.$refs.scrollbox.style.height="calc(100% - 7px)";
						this.horizontal_flag=true;
					}else{
						this.horizontal_flag=false;
					}
					this.$nextTick(function(){
						this.getXScroll();
					})
				}
				if(this.layout=="vertical-horizontal"){
					var content=this.$refs.scrollcontent.offsetHeight;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						scrollbar.style.display="block"
						this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
						this.$refs.contentbox.style.height="calc(100% - 7px)";
						this.vertical_flag=true;
					}else{
						this.vertical_flag=false;
					}
					this.$nextTick(function(){
						this.getScroll();
					})

					var x_content=this.$refs.scrollcontent.offsetWidth;
					var x_cHeight=this.$refs.contentbox.offsetWidth;
					if(x_content>x_cHeight){//判断滚动条是否加载
						x_scrollbar.style.display="block";
						this.$refs.scrollbox.style.height="calc(100% - 7px)";
						this.$refs.contentbox.style.width="calc(100% - 7px)";
						this.horizontal_flag=true;
					}else{
						this.horizontal_flag=false;
					}
					this.$nextTick(function(){
						this.getXScroll();
					})
				}
			},
			offx(){
				this.$nextTick(function(){
					//计算滚动条停的位置
					var scale;
					var cHeight=this.$refs.contentbox.offsetWidth;
					var content=this.$refs.scrollcontent.offsetWidth;
					var bar =this.$refs.x_scrollbar.offsetWidth;
					var scroll=this.$refs.x_scrollbox.offsetWidth;
					scale=this.offx/(content-cHeight);
					this.$refs.scrollcontent.style.left=-1*this.offx+"px";
					if(this.offx>0){
						if(this.offx<content-cHeight){
							
						}else{
							this.$refs.scrollcontent.style.left=-1*(content-cHeight)+"px";
						}
					}
					if((scroll-bar)*scale>=0){
						if((scroll-bar)*scale<scroll-bar){
							this.$refs.x_scrollbar.style.left=(scroll-bar)*scale+"px";
						}else{
							this.$refs.x_scrollbar.style.left=scroll-bar+"px";
						}
					}
					
				})
			},
			offy(){
				console.log(this.offy)
				this.$nextTick(function(){
					//计算滚动条停的位置
					var scale;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var content=this.$refs.scrollcontent.offsetHeight;
					var bar =this.$refs.scrollbar.offsetHeight;
					var scroll=this.$refs.scrollbox.offsetHeight;
					scale=this.offy/(content-cHeight);
					this.$refs.scrollcontent.style.top=-1*this.offy+"px";
					if(this.offy>0){
						if(this.offy<content-cHeight){
							
						}else{
							this.$refs.scrollcontent.style.top=-1*(content-cHeight)+"px";
						}
					}
					if((scroll-bar)*scale>=0){
						if((scroll-bar)*scale<scroll-bar){
							this.$refs.crollbar.style.top=(scroll-bar)*scale+"px";
						}else{
							this.$refs.scrollbar.style.top=scroll-bar+"px";
						}
					}
					
				})
			}
		},
		computed:{		
		//对传入的宽高进行computed，可以传100||100px|100%
			cWidth(){	
				if(this.width.indexOf("px")!=-1){
					return this.width;
				}else if(this.width.indexOf("%")!=-1){
					return this.width;
				}else{
					return this.width+"px";
				}
			},
			cHeight(){
				if(this.height.indexOf("px")!=-1){
					return this.height
				}else if(this.height.indexOf("%")!=-1){
					return this.height
				}else{
					return this.height+"px"
				}
			}
		},
		mounted(){
			
			if(this.layout=="vertical"){
				var content=this.$refs.scrollcontent.offsetHeight;
				var cHeight=this.$refs.contentbox.offsetHeight;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				if(content>cHeight){//判断滚动条是否加载
					scrollbar.style.display="block"
					this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
					this.vertical_flag=true;
				}else{
					this.vertical_flag=false;
				}
				if(this.vertical_flag){
					this.getScroll();
				}
			}
			if(this.layout=="horizontal"){
				var content=this.$refs.scrollcontent.offsetWidth;
				var cHeight=this.$refs.contentbox.offsetWidth;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				if(content>cHeight){//判断滚动条是否加载
					x_scrollbar.style.display="block";
					this.$refs.scrollbox.style.height="calc(100% - 7px)";
					this.horizontal_flag=true;
				}else{
					this.horizontal_flag=false;
				}
				if(this.horizontal_flag){
					this.getXScroll();
				}
			}
			if(this.layout=="vertical-horizontal"){
				var content=this.$refs.scrollcontent.offsetHeight;
				var cHeight=this.$refs.contentbox.offsetHeight;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				if(content>cHeight){//判断滚动条是否加载
					scrollbar.style.display="block"
					this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
					this.$refs.contentbox.style.height="calc(100% - 7px)";
					this.vertical_flag=true;
				}else{
					this.vertical_flag=false;
				}
				if(this.vertical_flag){
					this.getScroll();
				}

				var x_content=this.$refs.scrollcontent.offsetWidth;
				var x_cHeight=this.$refs.contentbox.offsetWidth;
				if(x_content>x_cHeight){//判断滚动条是否加载
					x_scrollbar.style.display="block";
					this.$refs.scrollbox.style.height="calc(100% - 7px)";
					this.$refs.contentbox.style.width="calc(100% - 7px)";
					this.horizontal_flag=true;
				}else{
					this.horizontal_flag=false;
				}
				if(this.horizontal_flag){
					this.getXScroll();
				}
			}

			this.$nextTick(function(){
				
				if(this.layout=="vertical"){
					var content=this.$refs.scrollcontent.offsetHeight;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						scrollbar.style.display="block"
						this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
						this.vertical_flag=true;
					}else{
						this.vertical_flag=false;
					}
					if(this.vertical_flag){
						this.getScroll();
					}
				}
				if(this.layout=="horizontal"){
					var content=this.$refs.scrollcontent.offsetWidth;
					var cHeight=this.$refs.contentbox.offsetWidth;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						x_scrollbar.style.display="block";
						this.$refs.scrollbox.style.height="calc(100% - 7px)";
						this.horizontal_flag=true;
					}else{
						this.horizontal_flag=false;
					}
					if(this.horizontal_flag){
						this.getXScroll();
					}
				}
				if(this.layout=="vertical-horizontal"){
					var content=this.$refs.scrollcontent.offsetHeight;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var scrollbar=this.$refs.vscrollBox;
					var x_scrollbar=this.$refs.xscrollBox;
					if(content>cHeight){//判断滚动条是否加载
						scrollbar.style.display="block"
						this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
						this.$refs.contentbox.style.height="calc(100% - 7px)";
						this.vertical_flag=true;
					}else{
						this.vertical_flag=false;
					}
					if(this.vertical_flag){
						this.getScroll();
					}

					var x_content=this.$refs.scrollcontent.offsetWidth;
					var x_cHeight=this.$refs.contentbox.offsetWidth;
					if(x_content>x_cHeight){//判断滚动条是否加载
						x_scrollbar.style.display="block";
						this.$refs.scrollbox.style.height="calc(100% - 7px)";
						this.$refs.contentbox.style.width="calc(100% - 7px)";
						this.horizontal_flag=true;
					}else{
						this.horizontal_flag=false;
					}
					if(this.horizontal_flag){
						this.getXScroll();
					}
				}
			})

			this.$nextTick(function(){
					//计算滚动条停的位置
					var scale;
					var cHeight=this.$refs.contentbox.offsetHeight;
					var content=this.$refs.scrollcontent.offsetHeight;
					var bar =this.$refs.scrollbar.offsetHeight;
					var scroll=this.$refs.scrollbox.offsetHeight;
					scale=this.offy/(content-cHeight);
					this.$refs.scrollcontent.style.top=-1*this.offy+"px";
					if(this.offy>0){
						if(this.offy<content-cHeight){
							
						}else{
							this.$refs.scrollcontent.style.top=-1*(content-cHeight)+"px";
						}
					}
					if((scroll-bar)*scale>=0){
						if((scroll-bar)*scale<scroll-bar){
							this.$refs.scrollbar.style.top=(scroll-bar)*scale+"px";
						}else{
							this.$refs.scrollbar.style.top=scroll-bar+"px";
						}
					}
					
				})

		},
		updated(){
			if(this.layout=="vertical"){
				var content=this.$refs.scrollcontent.offsetHeight;
				var cHeight=this.$refs.contentbox.offsetHeight;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				// console.log("content:"+content)
				// console.log("cHeight:"+cHeight)
				if(content>cHeight){//判断滚动条是否加载
					scrollbar.style.display="block"
					this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
					this.vertical_flag=true;
				}else{
					scrollbar.style.display="none";
					this.$refs.x_scrollbox.style.width="100%";
					this.vertical_flag=false;
				}
				if(this.vertical_flag){
					this.getScroll();
				}
			}
			if(this.layout=="horizontal"){
				var content=this.$refs.scrollcontent.offsetWidth;
				var cHeight=this.$refs.contentbox.offsetWidth;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				if(content>cHeight){//判断滚动条是否加载
					x_scrollbar.style.display="block";
					this.$refs.scrollbox.style.height="calc(100% - 7px)";
					this.horizontal_flag=true;
				}else{
					this.horizontal_flag=false;
				}
				if(this.horizontal_flag){
					this.getXScroll();
				}
			}
			if(this.layout=="vertical-horizontal"){
				var content=this.$refs.scrollcontent.offsetHeight;
				var cHeight=this.$refs.contentbox.offsetHeight;
				var scrollbar=this.$refs.vscrollBox;
				var x_scrollbar=this.$refs.xscrollBox;
				if(content>cHeight){//判断滚动条是否加载
					scrollbar.style.display="block"
					this.$refs.x_scrollbox.style.width="calc(100% - 7px)";
					this.$refs.contentbox.style.height="calc(100% - 7px)";
					this.vertical_flag=true;
				}else{
					this.vertical_flag=false;
				}
				if(this.vertical_flag){
					this.getScroll();
				}

				var x_content=this.$refs.scrollcontent.offsetWidth;
				var x_cHeight=this.$refs.contentbox.offsetWidth;
				if(x_content>x_cHeight){//判断滚动条是否加载
					x_scrollbar.style.display="block";
					this.$refs.scrollbox.style.height="calc(100% - 7px)";
					this.$refs.contentbox.style.width="calc(100% - 7px)";
					this.horizontal_flag=true;
				}else{
					this.horizontal_flag=false;
				}
				if(this.horizontal_flag){
					this.getXScroll();
				}
			}
		},
		methods:{
			getScroll(){
				var bar =this.$refs.scrollbar;
				var scroll=this.$refs.scrollbox;
				var box=this.$refs.contentbox;
				var cHeight=box.offsetHeight;
				var content=this.$refs.scrollcontent;
				this.barHeight=cHeight/content.offsetHeight*cHeight;//判断手柄的高度
				bar.style.height=cHeight/content.offsetHeight*cHeight+"px";
				var that=this;
				scroll.onclick=function(ev){	//滚动槽点击滚动事件
					var e=ev||window.event;
			        if (e.preventDefault) {
			            e.preventDefault();
			        } else{
			            e.returnValue=false;
			        };
			        var offy=e.clientY-bar.offsetTop;
			        var top=e.offsetY;        		        
			        if(top<=0){
			        	top=0;
			        }
			        if(top>=scroll.offsetHeight-bar.offsetHeight){
		        		top=scroll.offsetHeight-bar.offsetHeight;
		        	}
		        	var scale=top/(scroll.offsetHeight-bar.offsetHeight);
		        	var ctop=(content.offsetHeight-cHeight)*scale;//内容滑动的距离
		        	bar.style.top=top+"px";
		        	content.style.top=-ctop+"px";

				}
				bar.onmousedown=function (ev) { //手柄按下
					var e=ev||window.event;
			        if (e.preventDefault) {
			            e.preventDefault();
			        } else{
			            e.returnValue=false;
			        };
			        var offy=e.clientY-bar.offsetTop;
			        document.onmousemove=function(ev){ //按下手柄后滑动
			        	var e=ev||window.event;
			        	var top=e.clientY-offy;
			        	if(top<=0){
			        		top=0;
			        	}
			        	if(top>=scroll.offsetHeight-bar.offsetHeight){
			        		top=scroll.offsetHeight-bar.offsetHeight;
			        	}
			        	var scale=top/(scroll.offsetHeight-bar.offsetHeight);
			        	var ctop=scale*(content.offsetHeight-cHeight);
			        	bar.style.top=top+"px";
			        	content.style.top=-ctop+"px";
			        }
			        document.onmouseup=function (){ //放开手柄
			            document.onmousemove=null;
			        }
				}
				var str=window.navigator.userAgent.toLowerCase(); //浏览器
				if(content.offsetHeight>cHeight){//超过才可以滑动
					if(str.indexOf("firefox")!=-1){		//火狐浏览器

						box.addEventListener("DOMMouseScroll",function(e){//火狐下的滚轮事件
							e.preventDefault();//阻止窗口默认的滚动事件
							if(e.detail<0){
								var t=content.offsetTop+20;
					            if (t>=0) {
					                t=0;
					            };
					            if (t<=-(content.offsetHeight-cHeight)) {
					                t=-(content.offsetHeight-cHeight);
					            };
					            var scale=t/(content.offsetHeight-cHeight);
					            var top=scale*(scroll.offsetHeight-bar.offsetHeight);
					            content.style.top=t+'px';
					            bar.style.top=-top+'px';
							}

							if(e.detail>0){
								var t=content.offsetTop-20;
								if (t>=0) {
					                t=0;
					            };
					            if (t<=-(content.offsetHeight-cHeight)) {
					                t=-(content.offsetHeight-cHeight);
					            };
					            var scale=t/(content.offsetHeight-cHeight);
					            var top=scale*(scroll.offsetHeight-bar.offsetHeight);
					            content.style.top=t+'px';
					            bar.style.top=-top+'px';
							}
						},false)
						
					}else{			//非火狐浏览器
						box.onmousewheel=function(ev){//非火狐下的滚轮事件
							var e=ev||window.event;
				            if (e.preventDefault) {
				                e.preventDefault();
				            } else{
				                e.returnValue=false;
				            };
				            if (e.wheelDelta>0) {
				            var t=content.offsetTop+20;
				            if (t>=0) {
				                t=0;
				            };
				            if (t<=-(content.offsetHeight-cHeight)) {
				                t=-(content.offsetHeight-cHeight);
				            };
				            var scale=t/(content.offsetHeight-cHeight);
				            var top=scale*(scroll.offsetHeight-bar.offsetHeight);
				            content.style.top=t+'px';
				            bar.style.top=-top+'px';
				        };
				        if (e.wheelDelta<0) {
				            var t=content.offsetTop-20;
				            if (t>=0) {
				                t=0;
				            };
				            if (t<=-(content.offsetHeight-cHeight)) {
				                t=-(content.offsetHeight-cHeight);
				            };
				            var scale=t/(content.offsetHeight-cHeight);
				            var top=scale*(scroll.offsetHeight-bar.offsetHeight);
				            content.style.top=t+'px';
				            bar.style.top=-top+'px';
				        };
						}
					}
				}else{//没超过就不能滑动
					if(str.indexOf("firefox")!=-1){		//火狐浏览器

						box.addEventListener("DOMMouseScroll",function(e){//火狐下的滚轮事件
							e.preventDefault();//阻止窗口默认的滚动事件
							return false;
						},false)
						
					}else{			//非火狐浏览器
						box.onmousewheel=function(ev){//非火狐下的滚轮事件
							var e=ev||window.event;
				            return false;
						}
					}
				}
			},
			getXScroll(){
				var bar =this.$refs.x_scrollbar;
				var scroll=this.$refs.x_scrollbox;
				var box=this.$refs.contentbox;
				var cWidth=box.offsetWidth;
				var content=this.$refs.scrollcontent;
				this.xWidth=cWidth/content.offsetWidth*cWidth;//判断手柄的高度
				bar.style.width=cWidth/content.offsetWidth*cWidth+"px";
				var that=this;
				scroll.onclick=function(ev){	//滚动槽点击滚动事件
					var e=ev||window.event;
			        if (e.preventDefault) {
			            e.preventDefault();
			        } else{
			            e.returnValue=false;
			        };
			        var offy=e.clientX-bar.offsetLeft;
			        var top=e.offsetX;        		        
			        if(top<=0){
			        	top=0;
			        }
			        if(top>=scroll.offsetWidth-bar.offsetWidth){
		        		top=scroll.offsetWidth-bar.offsetWidth;
		        	}
		        	var scale=top/(scroll.offsetWidth-bar.offsetWidth);
		        	var ctop=(content.offsetWidth-cWidth)*scale;//内容滑动的距离
		        	bar.style.left=top+"px";
		        	content.style.left=-ctop+"px";

				}
				bar.onmousedown=function (ev) { //手柄按下
					var e=ev||window.event;
			        if (e.preventDefault) {
			            e.preventDefault();
			        } else{
			            e.returnValue=false;
			        };
			        var offy=e.clientX-bar.offsetLeft;
			        document.onmousemove=function(ev){ //按下手柄后滑动
			        	var e=ev||window.event;
			        	var top=e.clientX-offy;
			        	if(top<=0){
			        		top=0;
			        	}
			        	if(top>=scroll.offsetWidth-bar.offsetWidth){
			        		top=scroll.offsetWidth-bar.offsetWidth;
			        	}
			        	var scale=top/(scroll.offsetWidth-bar.offsetWidth);
			        	var ctop=scale*(content.offsetWidth-cWidth);
			        	bar.style.left=top+"px";
			        	content.style.left=-ctop+"px";
			        }
			        document.onmouseup=function (){ //放开手柄
			            document.onmousemove=null;
			        }
				}
			}
		}
	}
</script>



<style lang="scss" scoped>
	//纵向滚动条
	.vertical{
		overflow:hidden;
		position:relative;
		.scrollContent{
			height:auto;
			position:absolute;
			left:0;
			top:0;
		}
		.scrollBar{
			cursor:pointer;
			height:100%;
			position:absolute;
			top:0;
			right:0px;
			width:7px;
			.scroll{
				width:5px;
				height:100%;
				background:#5f5655;	
				border-radius:3px;
				margin: 0 auto;
			}
			.bar{
				cursor:pointer;
				width:7px;
				position:absolute;
				left:0;
				top:0;
				border-radius:4px;
				box-sizing:border-box;
			}
			.default{
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				border:1px solid #bbb5b4;
			}
			.light{
				background:linear-gradient(to bottom,#9fe4eb,#5eb5be);
				border:1px solid #4da4ac;
			}
			.orange{
				background:linear-gradient(to bottom,#f2c099,#cb7632);
				border:1px solid #c66634;
			}
			.grain{
				border:1px solid #bbb5b4;
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				i{
					position:absolute;
					left:50%;
					margin-left:-2px;
					display:block;
					width:4px;
					height:3px;
					background:#9e9d99;
					border-bottom:1px solid #ffffff;
				}
				i:nth-child(1){
					top:30%;
				}
				i:nth-child(2){
					top:50%;
				}
				i:nth-child(3){
					top:70%;
				}
			}
		}
	}
	//横向滚动条
	.horizontal{
		overflow:hidden;
		position:relative;
		.scrollContent{
			position:absolute;
			left:0;
			top:0;
			width:auto;
		}
		.x_scrollBar{
			cursor:pointer;
			height:7px;
			position:absolute;
			left:0;
			bottom:0px;
			width:100%;
			box-sizing:border-box;
			padding-top:1px;
			.x_scroll{
				width:100%;
				height:5px;
				background:#5f5655;	
				box-sizing:border-box;
				border-radius:5px;
			}
			.bar{
				height:7px;
				position:absolute;
				left:0;
				top:0;
				border-radius:7px;
			}
			.default{
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				border:1px solid #bbb5b4;
			}
			.orange{
				background:linear-gradient(to bottom,#f2c099,#cb7632);
				border:1px solid #c66634;
			}
			.light{
				background:linear-gradient(to bottom,#9fe4eb,#5eb5be);
				border:1px solid #4da4ac;
			}
			.grain{
				border:1px solid #bbb5b4;
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				i{
					position:absolute;
					top:50%;
					margin-top:-2px;
					display:block;
					height:4px;
					width:3px;
					background:#9e9d99;
					border-right:1px solid #ffffff;
				}
				i:nth-child(1){
					left:30%;
				}
				i:nth-child(2){
					left:50%;
				}
				i:nth-child(3){
					left:70%;
				}
			}
		}
	}
	//横纵向滚动条
	.vertical-horizontal{
		overflow:hidden;
		position:relative;
		.scrollContent{
			position:absolute;
			left:0;
			top:0;
			width:auto;
			height:auto;
			overflow:hidden;
			.v_content{
				position:absolute;
				left:0;
				top:0;
				width:auto;
				height:auto;
			}
		}
		.scrollBar{
			cursor:pointer;
			height:100%;
			position:absolute;
			top:0;
			right:0px;
			width:7px;
			.scroll{
				width:5px;
				height:100%;
				background:#5f5655;	
				border-radius:3px;
				margin: 0 auto;
			}
			.bar{
				cursor:pointer;
				width:7px;
				position:absolute;
				left:0;
				top:0;
				border-radius:4px;
				box-sizing:border-box;
			}
			.default{
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				border:1px solid #bbb5b4;
			}
			.light{
				background:linear-gradient(to bottom,#9fe4eb,#5eb5be);
				border:1px solid #4da4ac;
			}
			.orange{
				background:linear-gradient(to bottom,#f2c099,#cb7632);
				border:1px solid #c66634;
			}
			.grain{
				border:1px solid #bbb5b4;
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				i{
					position:absolute;
					left:50%;
					margin-left:-2px;
					display:block;
					width:4px;
					height:3px;
					background:#9e9d99;
					border-bottom:1px solid #ffffff;
				}
				i:nth-child(1){
					top:30%;
				}
				i:nth-child(2){
					top:50%;
				}
				i:nth-child(3){
					top:70%;
				}
			}
		}
		.x_scrollBar{
			cursor:pointer;
			height:7px;
			position:absolute;
			left:0;
			bottom:0px;
			width:100%;
			box-sizing:border-box;
			padding-top:1px;
			.x_scroll{
				width:100%;
				height:5px;
				background:#5f5655;	
				box-sizing:border-box;
				border-radius:5px;
			}
			.bar{
				height:7px;
				position:absolute;
				left:0;
				top:0;
				border-radius:7px;
			}
			.default{
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				border:1px solid #bbb5b4;
			}
			.orange{
				background:linear-gradient(to bottom,#f2c099,#cb7632);
				border:1px solid #c66634;
			}
			.light{
				background:linear-gradient(to bottom,#9fe4eb,#5eb5be);
				border:1px solid #4da4ac;
			}
			.grain{
				border:1px solid #bbb5b4;
				background:linear-gradient(to bottom,#f6f4f3,#c4bfbe);
				i{
					position:absolute;
					top:50%;
					margin-top:-2px;
					display:block;
					height:4px;
					width:3px;
					background:#9e9d99;
					border-right:1px solid #ffffff;
				}
				i:nth-child(1){
					left:30%;
				}
				i:nth-child(2){
					left:50%;
				}
				i:nth-child(3){
					left:70%;
				}
			}
		}
	}
</style>