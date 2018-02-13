//获取投票信息
fetch(hostUrl + '/api/getVoteList', {
    method: 'POST',
    headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
    })

})
.then((res) => {
    return res.json()
})
.then((res) => {
    var dom1 ='';
    var dom2 ='';
    var dom3 ='';
    var dom4 ='';
    var dom5 = '<h3 style="text-align:center;">暂无对应投票！</h3>';
    $(".all-list").html('').append(dom5);
    $(".all-num").html('('+ 0 +')');
    $(".now-list").html('').append(dom5);
    $(".now-num").html('('+ 0 +')');
    $(".will-list").html('').append(dom5);
    $(".will-num").html('('+ 0 +')');
    $(".old-list").html('').append(dom5);
    $(".old-num").html('('+ 0 +')');
    if(res.voteList.length){
        $(".all-list").html('');
        $(".now-list").html('');
        $(".will-list").html('');
        $(".old-list").html('');
        $(res.voteList).each(function(i){
            var nowTime = moment().format("YYYY-MM-DD");
            var now=new Date(nowTime).getTime();
            var s_t = new Date(moment(this.start_time).format("YYYY-MM-DD")).getTime();
            var e_t = new Date(moment(this.end_time).format("YYYY-MM-DD")).getTime();
            
            // var y=now.format("YYYY-MM-DD HH:mm").split('-')[0];
		    // var m=now.format("YYYY-MM-DD HH:mm").split('-')[1];
            // var d = now.format("YYYY-MM-DD HH:mm").split('-')[2].split(' ')[0];

            // dom4 += '<li><a href="content.html?id='+this._id+'"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：' + this.add_rs+'</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';

            // $(".all-list").html('').append(dom4);
            // $(".all-num").html('('+ res.voteList.length +')');

            
            var dom;
            if(s_t < now && now < e_t){
                console.log(res.voteList.length);
                //console.log('进行中');
                dom = '<li><a href="content.html?id='+this._id+'"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：' + this.add_rs+'</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".now-list").append(dom);
                var ll = $(".now-list").children("li").length;
                $(".now-num").html('('+ ll +')');
            }else if(now < s_t){
                //console.log('未开始');
                dom = '<li><a href="javascript:void(0);"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：' + this.add_rs+'</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".will-list").append(dom);
                var ll2 = $(".will-list").children("li").length;
                $(".will-num").html('('+ ll2 +')');
                $(".will-list").find("li").click(function(){
                    alert("投票活动暂未开始");
                    $(this).find("a").removeAttr("href");
                });
            }else if(now > e_t){
                //console.log('已完成');
                dom = '<li><a href="content.html?id='+this._id+'"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：' + this.add_rs+'</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".old-list").append(dom);
                var ll3 = $(".old-list").children("li").length;
                $(".old-num").html('('+ ll3 +')');
                // panduan1(i);
            }  
            
            $(".all-list").append(dom);
            $(".all-num").html('('+ res.voteList.length +')');
            // console.log("this.end_time.split(' ')[0]"+this.end_time.split(' ')[0]);
            // var nowTime = moment().format("YYYY-MM-DD");
            // var now=new Date(nowTime).getTime();
            // var e_t = new Date(moment(this.end_time).format("YYYY-MM-DD")).getTime();
            // console.log(e_t);
            // console.log(now);
            // console.log(i);
            // if(now > e_t){
                
            // }
        })
    }   
});
$(function(){
    $(".will-list").find("li").click(function(){
        alert("投票活动暂未开始");
        $(this).find("a").removeAttr("href");
    });
});
function panduan1(i){
    $(".all-list").find("li").eq(i).find("a").attr("href","javascript:void(0);");
    console.log("i-----------:"+i);    
}
//弹出自定义提示窗口
var showAlert= function(msg, url){
    //弹框存在
    if ( $("#alert_box").length > 0) {
        $('#pop_box_msg').html(msg);
    } else {
        var alertHtml = '<div id="alert_box">'
                    +       '<div class="cover"  id="cover_alert"  onclick="closeAlert()"></div>'
                    +       '<div class="pop_box" id="pop_box_alert" onclick="closeAlert()">'
                    +           '<div class="pop_center">'
                    +               '<span id="pop_box_msg">' + msg + '</span>'
                    +           '</div>'
                    +       '</div>'
                    +   '</div>';
        $("body").append(alertHtml);
    }
    $("#alert_box").show();
    if(url){
         setTimeout(function(){
            window.location.href = url + '?id=' + 10000*Math.random();
         } , 2000 );
    }else{
         setTimeout("$('#alert_box').hide();" , 2000);
    }
    }
    
    //重定义alert
    window.alert=showAlert;
