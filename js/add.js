var hostUrl = 'http://127.0.0.1:3001';
$('.goback').on('click',function(){
    window.location.href = '/index.html';
});




$(function(){

    var biaoti = $("#biaoti").val();
    var miaoshu = $("#miaoshu").val();
    var canRead = $("#canRead").hasClass("selected");
    console.log(canRead);
    //var shuru = $("#shuru").val();
    var canRead1 = $("#canRead1").hasClass("selected");

    //添加投票信息
        //   fetch('http://127.0.0.1:3000/api/addVote', {
        //         method: 'POST',
        //         headers: new Headers({
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         }),
        //         body: JSON.stringify({
        //             vtitle:'6666',
        //             name:'yanglu',
        //             phone:'17612908650',
        //             vDesc:'hhhh',
        //             v_type:0,
        //             //select_max:2,
        //             img_type:0,
        //             sel_txt:['11','22','33','44','55'],
        //             start_time:nowTime.format('YYYY-MM-DD HH:mm:ss'),
        //             end_time:nowTime.add(3,'d').format('YYYY-MM-DD HH:mm:ss'),
        //             status:0
                    
        //         })

        //     })
        //     .then((res) => {
        //         return res.text()
        //     })
        //     .then((res) => {
        //         console.log(res)
        //     })















// 投票标题的字数限制
$(".add-top").on("blur", "#biaoti", function () {
    if ($(this).val().length > 15) {
        alert("最多只能输入十五个字");
        $(this).val($(this).val().substring(0, 15));
    }
});

// 详情描述中插入图片的事件处理
$("#tupian1").on("change", function () {
    
    // 获取文件的名称
    var file = $("#tupian1").val()
    var filename = file.replace(/.*(\/|\\)/, "");

    //获取的图片文件
    var fileList = $(this)[0].files;

    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(tupian1.files[i]),
            $img = '';
        $img += '<li class="z_addImg"><a class="x">删除照片</a><img src="' + imgUrl + '" /></li>'
        $('#tp').append($img);

        // 上传的图片数目不能多于8张，若多出则删除
        $(".z_addImg").map(function (i) {
            if ($(".z_addImg").length > 7) {
                $("#upload").hide();
            } else {
                $("#upload").show();
            }
            if ($(this).index() > 7) {
                $(this).remove();
            }
        });
    };
});

// 删除详情描述上传的图片
$(".add-miaoshu").on("click",".x",function(){
    $(this).parents(".z_addImg").remove();
    $("#upload").show();

});


// 统计输入框textarea的字数 
$("#miaoshu").on('blur keyup input', function () {
    var text = $("#miaoshu").val(); //用来存储textarea的value
    var counter = text.length;
    $(".txt-num").text(counter);
});

// 支持多选点击之后显示最多可投几项栏目
$(".duoxuan").click(function () {
    $("#canRead").toggleClass("selected");
    if($("#canRead").hasClass("selected")){
        $(".zuiduo").show();
    }else {
        $(".zuiduo").hide();
    }
});

//图片投票或文字投票事件
var tupian;
$(".tupian").click(function () {
    $("#canRead1").toggleClass("selected");
    if($("#canRead1").hasClass("selected")){
        $("#xuanxiang").hide();
        tupian = true; //选中
        $(".wzxx1").hide();
        $(".tpxx1").show();
        $("#xuanxiang").find(".ts").remove();
    }else {
        $("#xuanxiang").show();
        tupian = false; //未选中   
        $(".tpxx1").hide();
        $(".wzxx1").show();
        $("#xuanxiangt").find("li").remove();
    }
});

// 新建文字类型的投票选项
$(".add-list").click(function () {
    // 新建文字类型的选项
    if (!tupian) {
        var newDom = "<li class='ts'><input type='text' placeholder='请输入选项内容'><span class='close'></span></li>";
        $("#xuanxiang").append(newDom);
        $("#xuanxiang").find("li").find("input").focus();
    }
});

// 投票选项的字数限制
$("#xuanxiang").on("blur", "input", function () {
    if ($(this).val().length > 15) {
        alert("最多只能输入十五个字");
        $(this).val($(this).val().substring(0, 15));
        // 通过substring对字符串进行截取，同时将超出部分进行人为删除
    }
});

//删除多余的文字类型投票选项 (最少含两个选项)
$("#xuanxiang").on("click", ".close", function () {
    if ($(this).parent("li").hasClass("ts")) {
        $(this).parents("li").remove();
    }
});

// 图片类型的选项的图片描述、图片预览、图片删除
$("#tupian2").on("change", function () {
    // 获取文件的名称
    var file = $("#tupian2").val();
    var filename = file.replace(/.*(\/|\\)/, "");

    //获取的图片文件
    var  fileList = $(this)[0].files;
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(tupian2.files[i]),
            $img = '';
        $img += '<li class="z_addImg1"><img src="' + imgUrl + '" /><input type="text" placeholder="请输入选项内容"><span class="close1"></span></li>'
        $('#xuanxiangt').append($img);
    };
});

// 删除图片类型选项上传的图片
$(".tpxx1").on("click",".close1",function(){
    $(this).parents(".z_addImg1").remove();
});

// 高级选项下拉
$(".add-bottom").find(".gaoji").click(function () {
    $(".gaoji-xuanx").slideToggle(300);
    $(".gaoji").find("img").toggleClass("active1");  
});

// 记名投票
$(".jiming1").click(function () {
    $("#canRead2").toggleClass("selected");
});


// 点击发布按钮进行投票发布判断所有的必填项

var sysDate = new Date();
console.log("bbbbbbbbbbb:"+sysDate);

//开始时间
var begin;
$("#begin").change(function () {
    var startTime = $("#begin").val();
    begin = new Date(startTime.replace("-", "/").replace("-", "/"));
});



// 结束时间 
var end;
$("#end").change(function () {
    var endTime = $("#end").val();
    end = new Date(endTime.replace("-", "/").replace("-", "/"));
});

// 判断文字选项的内容是否相同
var tf=false;
$("#xuanxiang").find("li").last().on("blur","input",function(){
    var xx_item = [];
    $("#xuanxiang").find("input").map(function (i) {
        xx_item.push($(this).val());
    });
    console.log('$("#xuanxiang").find("input"):'+$("#xuanxiang").find("input").length);
    console.log("xx_item:" + xx_item);
    for (var i = 0; i < xx_item.length; i++) {
        for (var j = i + 1; j < xx_item.length; j++) {
            if (xx_item[i] == xx_item[j]) {
                tf = true;
            }else{
                tf = false;
            }
        }
    }
});

// 点击发布按钮进行必填判断
(function () {
    var tag;
    $(".submit").click(function () {
        var txt = 0;

        // if(sysDate > begin){
        //     console.log("dayu");
        // }

        // 判断文字选项中已填选项的个数
        $("#xuanxiang").find("input").map(function (i) {
            // xx_item.push($(this).val());
            if ($(this).val() != "") { //统计选项有值的数量，至少要有2个选项不能为空
                txt++;
            }
        });

        if ($("#biaoti").val() == "") {
            tag = 0;
        } else if ($("#miaoshu").val() == "") {
            tag = 1;
        } else if (txt == 0) { //投票选项不能为空
            tag = 2;
        } else if (txt == 1) { //至少两个投票选项已填
            tag = 3;
        } else if (tf) {
            tag = 4;
        } else if ($("#begin").val() == "") {
            tag = 5;
        } else if(sysDate > begin){
            tag = 6;
        } else if ($("#end").val() == "") {
            tag = 7;
        } else if (begin > end) {
            tag = 8;
        } else {
            tag = 9;
        }
        switch (tag) {
            case 0:
                alert("请输入投票标题");
                break;
            case 1:
                alert("请输入投票描述");
                break;
            case 2:
                alert("请输入投票选项");
                break;
            case 3:
                alert("投票的选项不能少于2个");
                break;
            case 4:
                alert("投票选项的内容不能相同");
                break;
            case 5:
                alert("开始时间不能为空");
                break;
            case 6:
                alert("开始时间不能小于当前时间");
                break;
            case 7:
                alert("结束时间不能为空");
                break;
            case 8:
                alert("开始时间不能大于结束时间");
                break;
            case 9:
                fbcg();
                break;
        }
    });
})();

})
// 发布成功时页面的跳转以及返回时清空添加页面中的输入内容
function fbcg() {
alert("发布成功");
$(".sub").attr("href", "content.html");
$(".article").find("input,textarea").map(function () {
    $(this).val("");
});
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