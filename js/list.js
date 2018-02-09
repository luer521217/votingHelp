//获取投票信息
fetch('http://127.0.0.1:3001/api/getVoteList', {
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
    console.log(res.voteList.length);
    var dom1 ='';
    var dom2 ='';
    var dom3 ='';
    var dom4 ='';
    if(res.voteList.length){
        $(res.voteList).each(function(){
            var nowTime = moment().format("YYYY-MM-DD HH:mm:ss");
            var now=new Date(nowTime).getTime();
            var s_t = new Date(this.start_time).getTime();
            var e_t = new Date(this.end_time).getTime();
            // var y=now.format("YYYY-MM-DD HH:mm").split('-')[0];
		    // var m=now.format("YYYY-MM-DD HH:mm").split('-')[1];
            // var d = now.format("YYYY-MM-DD HH:mm").split('-')[2].split(' ')[0];
            dom4 += '<li><a href="content.html"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：10</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';

            $(".all-list").html('').append(dom4);
            $(".all-num").html('('+ res.voteList.length +')');

            if(now - s_t >= 0 && e_t - now >= 0){
                //console.log('进行中');
                dom1 += '<li><a href="content.html"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：10</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".now-list").html('').append(dom1);
                var ll = $(".now-list").children("li").length;
                $(".now-num").html('('+ ll +')');
            }else if(now < s_t){
                //console.log('未开始');
                dom2 += '<li><a href="content.html"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：10</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".will-list").html('').append(dom2);
                var ll2 = $(".will-list").children("li").length;
                $(".will-num").html('('+ ll2 +')');
            }else if(now > e_t){
                //console.log('已完成');
                dom3 += '<li><a href="content.html"><p class="top"><img src="image/biaotitu.png" class="title-img"><span class="biaotitu">已投票：10</span></p><h5 class="title">' + this.vtitle + '</h5><p class="time"><span class="begin">开始时间：<span>'+ this.start_time.split(' ')[0]+'</span></span><span class="end">结束时间：' + this.end_time.split(' ')[0] +'</span></p><p class="desc">'+this.vDesc+'</p></a></li>';
                $(".old-list").html('').append(dom3);
                var ll3 = $(".old-list").children("li").length;
                $(".old-num").html('('+ ll3 +')');
            }
                
        })
    }
    else{
        dom = '<h3>暂无对应投票！</h3>'
    }
    // $(".all-list").html('').append(dom);
})
