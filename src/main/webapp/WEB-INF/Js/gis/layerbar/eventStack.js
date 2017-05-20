(function(factory) {
  if (typeof define === 'function' && define.amd) {
    return define(['jquery','layerbar/layerbar'], function($) {
      return factory($, window, document);
    });
  } else {
    return factory(jQuery, window, document);
  }
})(function($, window, document){
	
	
	var eventArray = new Array();//事件堆栈
	
	var ruleArray = new Array();//共存规则
	
	
	var add = function(config){
		config = $.extend({
			id:'',
			destroy:function(){
				
			},
			init:function(){
				
			}
		},config)
		//添加删除窗口事件
		var temp=true;
		$(eventArray).each(function(){
			if(this.id == config.id){
				temp=false;
			}
		})
		if(temp)
			eventArray.push({"id":config.id,"flush":config.destroy,init:config.init});
		
		return this;
	}
	//清楚所有窗口
	var clear = function(){
		eventArray.each(function(){
			this.flush();
		})
		return this;
	};
	//清除某一个窗口
	var clearOne = function(id){
		$(eventArray).each(function(){
			if(this.id==id){
				this.flush();
			}
		})
	};
	//清除除了特殊依据的所有窗口
	var excClear = function(ids){
		ids = $.extend(new Array(),ids);
		//console.log(eventArray);
		$(eventArray).each(function(){//遍历所有的库存
			var temp = true;
			var id = this.id;
			$(ids).each(function(){//遍历所有的传入参数
				if(this==id){ //如果库存在传入参数之内
					temp=false //则状态为false
				}
			})
			if(temp){//如果库存不在传入参数之内，则清楚当前库存
				clearOne(this.id);
			}
		})
		return this;
	};
	//添加共存规则，当前是哪个菜单存入ID，当前菜单可以跟哪几个其他菜单的窗口共存存入open数组
	var addRule = function(config){
		config = $.extend({
			id:'',
			open:new Array()
		},config);
		
		var temp=true;
		$(ruleArray).each(function(){
			if(this.id == config.id){
				temp=false;
			}
		})
		if(temp)
			ruleArray.push({"id":config.id,"rule":config.open});
		return this;
	}
	//应用规则
	var applyRule = function(id){
		$(ruleArray).each(function(){//遍历所有的规则
			if(this.id==id){		//查找是当前id的规则
				if(this.rule[0]!='ALL'){  //判断当前窗口是否能跟所有窗口共存，如果不能则，如果能，则不删除其他窗口
					excClear(this.rule);//找出能与当前ID共存的规则，删除能共存的规则之外的窗口
				}
			}
		})
		return this;
	}
	
	var init = function(id) {
		$(eventArray).each(function(){
			if(this.id==id){
				this.init();
			}
		})
	}
	
	var contain = function(id) {
		var flag = false;
		$(eventArray).each(function(){
			if(this.id==id){
				flag = true;
			}
		});
		return flag;
	}
	return {
		add:add,
		clear:clear,
		clearOne:clearOne,
		init:init,
		excClear:excClear,
		addRule:addRule,
		applyRule:applyRule,
		contain:contain
		
	};
	
})