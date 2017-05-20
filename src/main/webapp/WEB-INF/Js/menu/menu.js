// JavaScript Document
$(document).ready(function () {
    $('#Top .Toolbar1 .CentreBox .Menu .List1 li').mouseenter(function () {
        var index = $(this).parent().children().index(this);
        $(this).parent().children().each(function () {
            if ($(this).hasClass('Select')) {
                $(this).removeClass('Select');
            }
        });
        $(this).addClass('Select');

        $('#Top .Toolbar2 .CentreBox .Menu').each(function () {
            if (!$(this).hasClass('Hide')) {
                $(this).addClass('Hide');
            }
        });
        $('#Top .Toolbar2 .CentreBox .Menu').eq(index).removeClass('Hide');
    });

    $('#Top .Toolbar2 .CentreBox .Menu ul li a').mouseenter(function () {
        var index = $('#Top .Toolbar2 .CentreBox .Menu ul li a').index(this);
        $('#Top .Toolbar2 .CentreBox .Menu ul li').each(function () {
            if ($(this).hasClass('Select')) {
                $(this).removeClass('Select');
            }
        });
        $(this).parent().addClass('Select');
        
        var threeindex = $(this).attr("target");
        $('#Top .Toolbar3 .CentreBox .Menu').each(function () {
            if (!$(this).hasClass('Hide')) {
                $(this).addClass('Hide');
            }
        });
        if (threeindex) {
        	threeindex = parseInt(threeindex);
        	$('#Top .Toolbar3 .CentreBox .Menu').eq(threeindex).removeClass('Hide');
        }
       
    });
    
});

function mouseOnOneMenu() {
	var num = GetQueryString("o");
	if (num) {
		$('#Top .Toolbar1 .CentreBox .Menu .List1 li:eq('+num+')').mouseenter();
	}
}

function mouseOnTwoMenu() {
	var onum = GetQueryString("o");
	var tnum = GetQueryString("t");
	if (onum && tnum) {
		$('#Top .Toolbar2 .CentreBox .Menu:eq('+onum+') ul li:eq('+tnum+') a').mouseenter();
	}
}

function initUserName() {
	executeAjaxUrlForResult("action/login/getUser",{}, function(result) {
		$(".UserInfo>.NickName>a").text(result.data);
	});
}

function initMenu() {
	
	var exclusionList = ["智慧水务大平台", "APP下载"];
	var secExclusionList = [];
	
	executeAjaxUrlForResult("functionMenu/listJson", {async:false}, function(result) {
		$(".List1").empty();
		$(".Toolbar2 .CentreBox").empty();
		$.each(result[0].children, function(i, n) {
			if (!isExclude(exclusionList, n.name)) {
				$(".List1").append('<li><a href="'+n.url+'">'+n.name+'</a></li>');
				if (!isExclude(secExclusionList, n.name)) {
					setSecondMenu(n.children);
				}
				
			}
			
		});
	});
	
}
//二次菜单
function setSecondMenu(objs) {
	var menu = $('<div class="Menu Hide">');
	var ul = $('<ul>');
	menu.append(ul);
	$(".Toolbar2 .CentreBox").append(menu);
	if (objs) {
		$.each(objs, function(i, n) {
			ul.append('<li><a href="'+n.url+'">'+n.name+'</a></li>');
		});
	}
	
}
//判断是是否排除
function isExclude(list, name) {
	var flag = false;
	for (var i=0; i < list.length; i++) {
		if (name == list[i]) {
			flag = true;
			break;
		}
	}
	return flag
}

function logout() {
	var logoutUrl = 'http://10.10.28.14:8881/cas/logout';
	var apphostname = window.location.hostname  
	var appport = window.location.port;  
	  
	//var callbackurl='?service=http%3A%2F%2F'+apphostname +'%3A'+appport + '%2Fwater-emergency%2FHtml%2Findex.jsp'; 
	var callbackurl='?service=http://10.10.28.14:8881/cas';
	window.location = logoutUrl+ callbackurl;  
}
