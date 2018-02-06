
$(document).ready(function(){


    //*************************************************************************************************************** 首页index.html
    // tab切换
    $(".index-tab-ul").find("li").click(function(){
        $(".index-tab-ul").find("li").eq($(this).index()).addClass("selected").siblings("li").removeClass("selected");
        $(".list").find("ul").eq($(this).index()).addClass("active").siblings("ul").removeClass("active");
    }); 

    // 搜索功能
    var select = $("select").val();
    $("select").change(function(){
        select = $("select").val();
    })
    $(".search").click(function(){
        if($(".search-btn").val() == "" && select == ""){ //当select未选中并且输入框中的内容为空时，出现提示框
            alert("请选择查询类型或输入查询关键词");
        }else{
            $(".search").attr("href","list.html");
        }
    });


    // // **************************************************************************************************************我的页面中为中间的li添加边框my.html
    // // 待完善
    // $(".my-spe").find("li").map(function(i){//一行放三个图标，为中间的图标添加左右边框2.5.8/1.4.7
    //     if(i==1){
    //         $(this).css("borderLeft","1px solid #eee");
    //         $(this).css("borderRight","1px solid #eee");
    //     }
    // });    


    // **************************************************************************************************************投票详情页面底部的投票选项功能content.html
    // 顶部点击更多显示弹出框以及遮罩层
    $(".special").click(function(){
        $(".shanchu").show();
        $(".mask").show();
        // 防止点击穿透
        $("body").addClass("chuantou");
    })

    // 编辑       // 可以编辑结束时间、描述（）不管是活动的前中后都只能编辑时间与描述
    $("#bianji").click(function(){
        // 编辑时需要进行数据回填，将现有的详情页面的数据回填到发起页面或新页面中
        if(confirm("您确认要修改该投票活动吗？")){//会刷新页面
            $("#bianji").find("a").attr("href","add.html");//如果确认编辑，则让页面跳转至列表页
        }  
    })

    // 删除
    $("#shanchu").click(function(){
       if(confirm("您确认要删除该投票活动吗？")){//会刷新页面
           $("#shanchu").find("a").attr("href","list.html");//如果确认删除，则让页面跳转至列表页
       }
    })

    // 置顶
    $("#zhiding").click(function(){
       if(confirm("您确认要置顶该投票活动吗？")){//会刷新页面
           $("#zhiding").find("a").attr("href","list.html");//如果确认置顶，则让页面跳转至列表页
       }
    })

    // 取消
    $("#quxiao").click(function(){
        $(".shanchu").hide();
        $(".mask").hide();
        $("body").removeClass("chuantou");
    })

    // 单选与多选通过类名进行区分，单选时类名为dan，多选时类名为duo
    if($(".niming").find(".dan").length){
        //图片类型的单选
        if($(".tup-xuanxiang").length){
            $(".tup-xuanxiang").find("li").map(function(){
                $(this).click(function(){
                    $(this).toggleClass("xz").siblings("li").removeClass("xz");
                    if($(this).hasClass("xz")){
                        $(this).find(".fuceng").find("img").attr("src","../image/yxz.png");//选中
                        $(this).siblings("li").find(".fuceng").find("img").attr("src","../image/wxz.png");//未选中
                    }else{
                        $(this).find(".fuceng").find("img").attr("src","../image/wxz.png");//未选中
                    }
                });
            });
        }
        // 文字类型的单选
        if($(".wenzi-xuanxiang").length){
            $(".wenzi-xuanxiang").find("li").map(function(){
                $(this).click(function(){
                    $(this).addClass("xz").siblings("li").removeClass("xz");
                    $(this).find(".check").addClass("active");
                    $(this).siblings("li").find(".check").removeClass("active");
                });
            });
        }
    }else if($(".niming").find(".duo").length){
        //图片类型的多选
        if($(".tup-xuanxiang").length){
            $(".tup-xuanxiang").find("li").map(function(){
                $(this).click(function(){
                    $(this).toggleClass("xz");
                    if($(this).hasClass("xz")){
                        $(this).find(".fuceng").find("img").attr("src","../image/yxz.png");//选中
                    }else{
                        $(this).find(".fuceng").find("img").attr("src","../image/wxz.png");//未选中
                    }
                });
            });
        }
        
        // 文字类型的多选
        if($(".wenzi-xuanxiang").length){
            $(".wenzi-xuanxiang").find("li").map(function(){
                $(this).click(function(){
                    $(this).addClass("xz");
                    $(this).find(".check").addClass("active");
                });
            });
        }
    };

    // 点击我要投票按钮时，如果没有被选中的选项则出现提示，有没有被选中的选项是通过li上有没有类名为xz进行区分的
    $(".toupiao").click(function(){

        // 图片
        if($(".tup-xuanxiang").length){
            if($(".tup-xuanxiang").find(".xz").length){
                $(".xuanxiang-desc").show();
                $(".fuceng").hide();
                $(".toupiao").hide();
            }else{
                alert("请选择");
            }
        }
        
        // 文字
        if($(".wenzi-xuanxiang").length){
            if($(".wenzi-xuanxiang").find(".xz").length){
                $(".xuanxiang-desc").show();
                $(".check").hide();
                $(".toupiao").hide();
            }else{
                alert("请选择");
            }
        }
    });
    

    // **************************************************************************************************************发起投票页面add.html
    
    //开始时间
    var begin;
    $("#begin").change(function(){
        var startTime = $("#begin").val();
        begin=new Date(startTime.replace("-", "/").replace("-", "/"));  
    });

    // 结束时间 
    var end;
    $("#end").change(function(){
        var endTime = $("#end").val();
        end=new Date(endTime.replace("-", "/").replace("-", "/")); 
    });
    
    // 点击发布按钮进行投票发布
    var tag;
    $(".submit").click(function(){
        var txt=0;
        var xx_item=[];
        $("#xuanxiang").find("input").map(function(i){
            xx_item.push($(this).val());
            if($(this).val() != ""){    //统计选项有值的数量，至少要有2个选项不能为空
                txt++;
            }
        })
        if($("#biaoti").val() == ""){
            tag=0;
        }else if($("#miaoshu").val() == ""){
            tag=1;
        }else if(txt == 0){
            tag=2;
        }else if(txt == 1){
            tag=3;
        }else if($("#begin").val() == ""){
            tag=4;
        }else if($("#end").val() == ""){
            tag=5;
        }else if(begin > end){
            tag=6;
        }else{
            tag=7;
        }
        console.log(xx_item);
        for(let i = 0 ;i<xx_item.length;i++){
            for(let j = i+1 ;j<xx_item.length;j++){
                if(xx_item[i] == xx_item[j]){
                    // alert('投票选项不能相同')
                    // return false;
                    tag = 8;
                }
            }
        }
        switch(tag){
            case 0:alert("请输入投票标题");break;
            case 1:alert("请输入投票描述");break;
            case 2:alert("请输入投票选项");break;
            case 3:alert("投票的选项不能少于2个");break;
            case 4:alert("开始时间不能为空");break;
            case 5:alert("结束时间不能为空");break;
            case 6:alert("开始时间不能大于结束时间");break;
            case 8:alert("投票选项不能相同");break;
            case 7:fbcg();break;
            // case 8:console.log('投票选项不能相同');break;
        }
        
    });

    // 统计输入框textarea的字数 
    $("#miaoshu").on('blur keyup input',function(){  
        var text=$("#miaoshu").val();  //用来存储textarea的value
        var counter=text.length;  
        $(".txt-num").text(counter);  
    });

    // 支持多选点击之后显示最多可投几项栏目
    $(".duoxuan").click(function(){
        if($(".duoxuan").is(':checked')){
            $(".zuiduo").show();
        }else{
            $(".zuiduo").hide();
        }
    });

    //最多可投几项的事件 
    var k=0;
    // 一,减少（如果输入框的输入为空时，点击减号会将输入框的值设置为1，当再次点击减号时又会将输入框的值设置为placeholder）
    $("#jian").click(function(){
        if(!$("#shuru").val()){
            $("#shuru").val("1");
        }else if($("#shuru").val() == 1){
            $("#shuru").val("");
        }else{
            k--;
            $("#shuru").val(k);
        }
    });
    // 二,增加
    $("#jia").click(function(){
        k++;
        $("#shuru").val(k);
    });
    // 三,自行输入
    var reg=/\d+/;
    $("#shuru").blur(function(){
        if(!reg.test($("#shuru").val())){
            alert("请输入数字");
            $("#shuru").val("");
        }
    });
    
    //图片投票或文字投票事件
    var tupian;
    $("#tupian").click(function(){
        if($("#tupian").is(':checked')){
            $("#xuanxiang").hide();
            tupian = true;//选中
            $(".add-list").attr("type","file");
        }else{
            $("#xuanxiang").show();
            tupian = false;//未选中   
            $(".add-list").attr("type","button");
        }
    });
    
    // 投票选项的字数限制
    $("#xuanxiang").on("blur","input",function(){
        if($(this).val().length > 15){
            alert("最多只能输入十五个字");
            $(this).val($(this).val().substring(0,15));
            // 通过substring对字符串进行截取，同时将超出部分进行人为删除
        }
    });

    // 新建投票选项
    var i=$("#xuanxiang").find("li").length;
    $(".add-list").click(function(){
        if(!tupian){
            i++;
            var newDom = "<li><input type='text' id='txt"+i+"'placeholder='请输入选项内容'><span class='close'>x</span></li>";
            $("#xuanxiang").append(newDom);
            $("#xuanxiang").find("li").find("input").focus();
        }
    });
    
    //删除多余的投票选项 (最少含两个选项)
    $("#xuanxiang").on("click",".close",function(){
        if($(".close").length > 2){
            $(this).parents("li").remove();
            i--;
        }
    });

    // 高级选项下拉
    $(".add-bottom").find(".gaoji").click(function(){
        $(".gaoji-xuanx").slideToggle(300);
        $(".gaoji").toggleClass("gaoji-2");
    });


// **************************************************************************************************************用户列表页面yonghulist.html
    // 全选以及全不选
    // 向下选择
    $(".list-qx").click(function(){
        $(this).toggleClass("qx");
        if($(this).hasClass("qx")){
            $(".yonghu-list").find(".inp").map(function(){
                $(this).addClass("xz-inp");
                $(".list-qx").text("全不选");
            });
        }else{
            $(".yonghu-list").find(".inp").map(function(){
                $(this).removeClass("xz-inp");
                $(".list-qx").text("全选");
            });
        }
    });

    // 单个选中
    $(".inp").click(function(){
        $(this).toggleClass("xz-inp");
        qbxz();
    });

});

// 发布成功时页面的跳转以及返回时清空添加页面中的输入内容
function fbcg(){
    alert("发布成功");
    $(".sub").attr("href","content.html");
    $(".article").find("input,textarea").map(function(){
        $(this).val("");
    });
}

// 向上选中
function qbxz(){
    var Li = $(".yonghu-list").find("li").length;
    var  xzLi = $(".yonghu-list").find(".xz-inp").length;
    // console.log("Li"+Li);
    // console.log("xzLi:"+xzLi);
    if(Li == xzLi){
        $(".list-qx").text("全不选");//全部选中
        if(!$(".list-qx").hasClass("qx")){
            $(".list-qx").addClass("qx");       
        }
    }else{
        $(".list-qx").text("全选");//有个别人员未选中
        if($(".list-qx").hasClass("qx")){
            $(".list-qx").removeClass("qx");
        }
        
    }
}

// **************************************************************************************************************现有bug梳理及更新
// 2018.02.02项目总结

    // 1，编辑功能。（数据回填尚未完成）
    // 2，删除功能，前台的的功能已经基本实现。（需要跟后台联调）
    // 3，置顶功能。（目前尚未实现，正在讨论实现的方式）
    // 4，首页的搜索功能，目前前台的功能已基本实现。（需要前后台联调）

    // 5，发起投票页面中当选择的投票选项类型为图片类型时，还需要再做修改（可能还有图片描述）。（未解决）。支持多个文件同时上传、限制文件上传格式只能为图片类型已解决


    
    // 6，发起投票页面中，当输入的选项内容一致时没有进行判断。（已解决）
    // 7，发起投票页面中，投票选项的内容进行字数限制。（已解决）
    // 8，发布成功后页面的跳转走向以及店家返回上一页时又跳回发起页面，此时需要进行清空。（已解决）
    // 9，发起投票页面中，开始时间以及结束时间的冲突问题以及必选问题，开始时间大于结束时间。(已解决)



    // 10，用户列表页面尚未进行绘制。（经商讨前期先不进行绘制）
    // 11，我的页面中1.4.7进行样式调整的js尚未完善。（暂时不用添加）
    

