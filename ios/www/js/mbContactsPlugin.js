/*
 * SwiperPlus 基于Swiper 1.5.5的个性化修改,效果参见http://demo.mobiscroll.com/listview/listviewworkorders/#
 * 1.以百分比取代像素
 * 2.增加遮罩层，主要用于联系人滑动打电话、发短信
 * 3.用于滑动登录效果
 * base Swiper 1.5.5 - Mobile Touch Slider
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2012, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Updated on: October 20, 2012
*/
(function($) {
 
    var SwiperPlus = function(element, options) {
        var _this = this ;
		this.touches = {};
        this.positions = {
            current: 0
        };
        this.times = {};
        this.isTouched = false;
		this.overlayVisible = false;
		this.hasPhoneNum = false;
		 
        //Default Params and Vars
        var direction;
		this.touchEvents = {
				touchStart: _this.isSupportTouch() ? 'touchstart': 'mousedown',
				touchMove: _this.isSupportTouch() ? 'touchmove': 'mousemove',
				touchEnd: _this.isSupportTouch() ? 'touchend': 'mouseup'
			};
 
        this.init('swiperPlus', element, options);
	 
						  
    }

    SwiperPlus.prototype = {

        constructor: SwiperPlus,

        init: function(type, element, options) {
            this.type = type;
			this.opts = this._getOptions(options);
            this.$element = $(element);
         	
			//设置overlay
			if (this.$element.find(".overlay").length == 0){
				this.$overlay = $("<div class='overlay' style='top:0;height:0;'><div class='overlay-icon overlay-icon-left'></div><div class='overlay-icon overlay-icon-right'></div><div class='overlay-text'></div></div>").prependTo(this.$element);
			}
			
			this._bindEvent();
 
        },
        _getOptions : function(options) {

            return $.extend({}, $.fn[this.type].defaults, options);
        },
		_bindEvent : function() {
			var that = this;
			function getPositionX(e) {
				return that.isSupportTouch() ? (e.originalEvent ? e.originalEvent.changedTouches[0].pageX : e.changedTouches[0].pageX) : e.pageX;
			}
			function getPositionY(e) {
				return that.isSupportTouch() ? (e.originalEvent ? e.originalEvent.changedTouches[0].pageY : e.changedTouches[0].pageY) : e.pageY;
			}
			
			//鼠标悬停,弹出个人详情
			that.tapHolderTimer = null;
			
			/*this.$element.on("touchstart" , "li:not(.ui-li-divider)" , function(event) {
				console.log("1-touchstart");
			}).on("vmouseover" , "li:not(.ui-li-divider)" , function(event) {
				console.log("2-vmouseover");
			}).on("vmousedown" , "li:not(.ui-li-divider)" , function(event) {
				console.log("3-vmousedown");
			}).on("touchmove" , "li:not(.ui-li-divider)" , function(event) {
				console.log("4-touchmove");
			}).on("vmousemove" , "li:not(.ui-li-divider)" , function(event) {
				console.log("5-vmousemove");
			}).on("touchend" , "li:not(.ui-li-divider)" , function(event) {
				console.log("6-touchend");
			}).on("vmouseup" , "li:not(.ui-li-divider)" , function(event) {
				console.log("7-vmouseup");
			}).on("vclick" , "li:not(.ui-li-divider)" , function(event) {
				console.log("8-vclick");
			}).on("vmouseout" , "li:not(.ui-li-divider)" , function(event) {
				console.log("9-vmouseout");
			}).on("vmousecancel" , "li1:not(.ui-li-divider)" , function(event) {
				console.log("vmousecancel");
			}).on("touchcancel" , "li1:not(.ui-li-divider)" , function(event) {
				console.log("touchcancel");
			});*/
			
			
			
			
			
			
			
			
			
			this.$element.on(this.touchEvents.touchStart , "li:not(.ui-li-divider)" , function(event) {
				
				//event.preventDefault();
				//event.stopImmediatePropagation();
				console.log("start1" , that.isTouched);
				if (that.isTouched) {
					return false;
				}
				
				that.deepTouched = false;
				
				
 				//设置touch标记
				that.isTouched = true;
				
//				console.log("start2" , that.isTouched);
				
				//设置overlay标记
				that.overlayVisible = false;
				
				//获取X轴鼠标位置
				that.touches.start = that.touches.current = getPositionX(event);
				that.touches.startY = that.touches.currentY = getPositionY(event); 
				
				//设置过度时间为0
				that.setTransition.call(this, 0);
	
				//设置当前位置为0
				that.positions.start = that.positions.current = 0;
				

				clearTimeout(that.tapHolderTimer);
				
 				that.tapHolderTimer = setTimeout(function(){
					 //查看个人详情
					 //$.mobile.changePage("#contactsDetail" , {transition : "slide"});
 					
 					if(that.opts.showDetail) {
						that.opts.showDetail( this );	
					}
 					
				},1000);
				 
				//设置开始时间touchStartTime
				var tst = new Date();
				that.times.start = tst.getTime();

			})
			.on(this.touchEvents.touchMove , "li:not(.ui-li-divider)" , function(event) {

				if (!that.isTouched) {
					return false;
				}
				clearTimeout(that.tapHolderTimer);
				
				var tempX = getPositionX(event);
				var tempY = getPositionY(event);
				var absX = Math.abs(tempX - that.touches.start);
				var absY = Math.abs(tempY - that.touches.startY);
				
				if (absY > absX) {//vertical
					return false;
				}
				
				
				
 
				//获取X轴鼠标位置
				that.touches.current = getPositionX(event);
				
				//获取移动距离
				that.positions.current = that.touches.current - that.touches.start ;
				
				//获取移动位移百分比,超过50%,验证号码
				var currentAbs = Math.abs(that.positions.current/window.innerWidth*100);
				
//				console.log("currentAbs" , currentAbs,"that.overlayVisible",that.overlayVisible,"currentAbs" , getPositionY(event),"hover",$(this).hasClass("ui-btn-hover-c"));
				
				//当开始move时,显示overlay
				if (that.overlayVisible) {
					event.preventDefault();
					event.stopImmediatePropagation();
				} else {
					//获取li的top和height
					var _top = $(this).position().top,
						_height = $(this).outerHeight(true);
						
					//设置overlay	
					that.$overlay.css({
						top				:	_top,
						height			:	_height,
						backgroundImage	: 	'none'
					});
					//设置moving标记
					that.overlayVisible = true;
				}
				
				 
				if (currentAbs > 10) {
					
					//设置位置转换
					that.setTransform.call(this, that.positions.current, 0, 0);
					
					//设置背景渐变
					if ( that.positions.current > 0 ) {//向右滑动
						
						that.setRightGradient(that.positions.current , 0);
						
					} else {//向左滑动
					
						that.setLeftGradient(that.positions.current , 0);
						
					}

				}
				
				
				
				if (currentAbs >50 ) { 
					//如果没有号码,提示"无号码"
					 
					if (! $(this).data("num")){
						that.$overlay.find(".overlay-text").html("无号码");
					}
					//如果有号码,号码格式不正确,提示"无效号码"
					//if (! $(this).data("hasphonenum")){
//						that.$overlay.find(".overlay-text").html("无号码");
//					}	
						
				}
			 
			})
			.on(this.touchEvents.touchEnd , "li:not(.ui-li-divider)" , function(event) {
				 
				if (!that.isTouched ) {
					return false;
				}
				//设置touch标记
				that.isTouched = false;
				
				
				//event.preventDefault();

				clearTimeout(that.tapHolderTimer);	

				

				// TouchEndTime
				var tet = new Date();
				that.times.end = tet.getTime();
				
				//时间差
				var timeDiff = that.times.end - that.times.start;
				
				
				//时间差小于200ms并且overlayVisible为false时 触发tap
				if (timeDiff < 200 && !that.overlayVisible ) {
					 //查看个人详情
					//$.mobile.changePage("#contactsDetail" , {transition : "slide"});
					
					if(that.opts.showDetail) {
						that.opts.showDetail( this );	
					}
					
				}
				
				
				// 没有move,模拟tap vlick
				if (!that.overlayVisible) {
					
				}
				
				//that.overlayVisible = false;
				
				

				//Check for Current Position
				if (!that.positions.current && that.positions.current !== 0) {
					that.positions.current = that.positions.start;
				}
	
				//For case if slider touched but not moved
				that.setTransform.call(this, that.positions.current, 0, 0);
				
			 
				that.positions.diff = that.positions.current - that.positions.start;  
				that.positions.abs = Math.abs(that.positions.diff / window.innerWidth *100);
	
				var diff = that.positions.diff;
				var diffAbs = that.positions.abs;
				
				//如果滑动距离超过100%
				if (diffAbs > 100) {
					that.swipeReset(this);
					return;
				}
	  
//	  			if (! $(this).data("hasphonenum")){
//					that.swipeReset(this);
//					return;
//				}
	  
				//Direction
				direction = diff < 0 ? "left" : "right";
				

				//Short Touches
				if (direction == "right" && timeDiff <= 300 ) {
					if (diffAbs < 30) { 
						that.swipeReset(this);
					} else {
						that.swipeRight(this);
					}
				}
	
				if (direction == "left" && timeDiff <= 300) {
					if (diffAbs < 30) {
						that.swipeReset(this);
					} else {
						that.swipeLeft(this);
					}
				}
	
				//Long Touches
				if (direction == "right" && timeDiff > 300 ) {
					if (diffAbs >= 70) {
						that.swipeRight(this);
					} else {
						that.swipeReset(this);
					}
				}
				if (direction == "left" && timeDiff > 300 ) {
					if (diffAbs >= 70) {
						that.swipeLeft(this);
					} else {
						that.swipeReset(this);
					}
				}
		 
			});
 
		}, // end _bindEvent
        //Touch Support
        isSupportTouch: function() {
            return ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;
        },
 		swipeRight : function(target){
 
            this.setTransform.call(target, 0, 0, 0);
			
			this.setRightGradient(window.innerWidth , 0);

			//this.$overlay.css({opacity:1});
			this.resetGradient();
			
            this.setTransition.call(target,300);

			this.execCallBack("right" , target);
			
            return true;
		},
		swipeLeft : function(target) {
 
            this.setTransform.call(target,0, 0, 0);
			
			this.setLeftGradient( 0 , - window.innerWidth );
			
			//this.$overlay.css({opacity:1});
			this.resetGradient();
			
            
			this.setTransition.call(target,300);
			
			this.execCallBack("left" , target);
			
            return true;
        },
		swipeReset : function(target) {
           
			this.setTransform.call(target,0, 0, 0); 
			
			this.resetGradient();
			
			this.setTransition.call(target,300);
            
			return true;
        },
		resetGradient : function () {
			this.$overlay.css({
					top				:	0,
					height			:	0,
					backgroundImage	: 	'none'
			});
			this.$overlay.find(".overlay-icon-hide").removeClass("overlay-icon-hide")
						 .end()
						 .find(".overlay-text").html("");
		},
		setRightGradient : function(x){
			this.$overlay.css({
				backgroundImage : "-webkit-gradient(linear,0 0,100% 100%,color-stop(0,#3ED16D),color-stop(" + x/window.innerWidth + ",#99E9B3),to(#538E9D))"
			});
			this.$overlay.find(".overlay-icon").removeClass("overlay-icon-hide");
			this.$overlay.find(".overlay-icon-left").toggleClass("overlay-icon-hide");
		},
		setLeftGradient : function(x){ 
			this.$overlay.css({
				backgroundImage : "-webkit-gradient(linear, 0 0, 100% 100%, from(#538E9D), color-stop(" + (window.innerWidth + x)/window.innerWidth + ", #BAEB21), to(#D4F179))"
			});
			this.$overlay.find(".overlay-icon").removeClass("overlay-icon-hide");
			this.$overlay.find(".overlay-icon-right").toggleClass("overlay-icon-hide");
		},
        //Set Transform
        setTransform: function(x, y, z) {
            var es = this.style;
			x = x || 0;
            y = y || 0;
            z = z || 0;
            if (this.use3D) {
                es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(' + x/window.innerWidth*100 + '%, ' + y + '%, ' + z + '%)'
            } else {

                es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate(' + x/window.innerWidth*100 + '%, ' + y + '%)'
                if (this.ie8) es.filter = 'progid:DXImageTransform.Microsoft.Matrix(Dx=' + x + '%,Dy=' + y + '%)';
            }
        },
		execCallBack : function( direction , ui) {
			if(this.opts.onTouchEnd) {
				
				direction = direction == "right" ? "phone" : "message" ;
 
				this.opts.onTouchEnd( direction , ui );	
			}	
		},
		//GetTranslate
        getTranslate: function(axis) {
            var el = this;
            var matrix;
            var curTransform;
            if (window.WebKitCSSMatrix) {
                var transformMatrix = new WebKitCSSMatrix(window.getComputedStyle(el, null).webkitTransform);
				matrix = transformMatrix.toString().split(',');
            } else {
                var transformMatrix = window.getComputedStyle(el, null).MozTransform || window.getComputedStyle(el, null).OTransform || window.getComputedStyle(el, null).MsTransform || window.getComputedStyle(el, null).msTransform || window.getComputedStyle(el, null).transform || window.getComputedStyle(el, null).getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
                matrix = transformMatrix.toString().split(',');

            }
            if (axis == 'x') {
                //Crazy IE10 Matrix
                if (matrix.length == 16) curTransform = parseInt(matrix[12], 10)
                //Normal Browsers
                else curTransform = parseInt(matrix[4], 10)

            }

            if (axis == 'y') {
                //Crazy IE10 Matrix
                if (matrix.length == 16) curTransform = parseInt(matrix[13], 10)
                //Normal Browsers
                else curTransform = parseInt(matrix[5], 10)
            }

            return curTransform;
        },
        //Set Transition
        setTransition: function(duration) {
            var es = this.style;
			es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = duration / 1000 + 's'
		}
        
    }

    var old = $.fn.swiperPlus

    $.fn.swiperPlus = function(option) {

        return this.each(function() {
            var $this = $(this),
            	data = $this.data('swiperPlus'),
            options = typeof option == 'object' && option;
			
            if (!data) {
                $this.data('swiperPlus', (data = new SwiperPlus(this, options)));
            }
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.swiperPlus.Constructor = SwiperPlus;

    $.fn.swiperPlus.defaults = {

}
 

$.fn.swiperPlus.noConflict = function() {
	$.fn.swiperPlus = old;
	return this;
}

} (window.jQuery));