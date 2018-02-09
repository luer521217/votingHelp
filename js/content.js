$(function(){
    // **************************************************************************************************************投票详情页面底部的投票选项功能content.html
    // 顶部点击更多显示弹出框以及遮罩层
    $(".special").click(function () {
        $(".shanchu").show();
        $(".mask").show();
        // 防止点击穿透
        $("body").addClass("chuantou");
    })

    // 编辑       // 可以编辑结束时间、描述（）不管是活动的前中后都只能编辑时间与描述
    $("#bianji").click(function () {
        // 编辑时需要进行数据回填，将现有的详情页面的数据回填到发起页面或新页面中
        if (confirm("您确认要修改该投票活动吗？")) { //会刷新页面
            $("#bianji").find("a").attr("href", "add.html"); //如果确认编辑，则让页面跳转至列表页
        }
    })

    // 删除
    $("#shanchu").click(function () {
        if (confirm("您确认要删除该投票活动吗？")) { //会刷新页面
            $("#shanchu").find("a").attr("href", "list.html"); //如果确认删除，则让页面跳转至列表页
        }
    })

    // 置顶
    $("#zhiding").click(function () {
        if (confirm("您确认要置顶该投票活动吗？")) { //会刷新页面
            $("#zhiding").find("a").attr("href", "list.html"); //如果确认置顶，则让页面跳转至列表页
        }
    })

    // 取消
    $("#quxiao").click(function () {
        $(".shanchu").hide();
        $(".mask").hide();
        $("body").removeClass("chuantou");
    })

    // 单选与多选通过类名进行区分，单选时类名为dan，多选时类名为duo
    if ($(".niming").find(".dan").length) {
        //图片类型的单选
        if ($(".tup-xuanxiang").length) {
            $(".tup-xuanxiang").find("li").map(function () {
                $(this).click(function () {
                    $(this).toggleClass("xz").siblings("li").removeClass("xz");
                    if ($(this).hasClass("xz")) {
                        $(this).find(".fuceng").find("img").attr("src", "../image/yxz.png"); //选中
                        $(this).siblings("li").find(".fuceng").find("img").attr("src", "../image/wxz.png"); //未选中
                    } else {
                        $(this).find(".fuceng").find("img").attr("src", "../image/wxz.png"); //未选中
                    }
                });
            });
        }
        // 文字类型的单选
        if ($(".wenzi-xuanxiang").length) {
            $(".wenzi-xuanxiang").find("li").map(function () {
                $(this).click(function () {
                    $(this).addClass("xz").siblings("li").removeClass("xz");
                    $(this).find(".check").addClass("active");
                    $(this).siblings("li").find(".check").removeClass("active");
                });
            });
        }
    } else if ($(".niming").find(".duo").length) {
        //图片类型的多选
        if ($(".tup-xuanxiang").length) {
            $(".tup-xuanxiang").find("li").map(function () {
                $(this).click(function () {
                    $(this).toggleClass("xz");
                    if ($(this).hasClass("xz")) {
                        $(this).find(".fuceng").find("img").attr("src", "../image/yxz.png"); //选中
                    } else {
                        $(this).find(".fuceng").find("img").attr("src", "../image/wxz.png"); //未选中
                    }
                });
            });
        }

        // 文字类型的多选
        if ($(".wenzi-xuanxiang").length) {
            $(".wenzi-xuanxiang").find("li").map(function () {
                $(this).click(function () {
                    $(this).addClass("xz");
                    $(this).find(".check").addClass("active");
                });
            });
        }
    };

    // 点击我要投票按钮时，如果没有被选中的选项则出现提示，有没有被选中的选项是通过li上有没有类名为xz进行区分的
    $(".toupiao").click(function () {

        // 图片
        if ($(".tup-xuanxiang").length) {
            if ($(".tup-xuanxiang").find(".xz").length) {
                $(".xuanxiang-desc").show();
                $(".fuceng").hide();
                $(".toupiao").hide();
            } else {
                alert("请选择");
            }
        }

        // 文字
        if ($(".wenzi-xuanxiang").length) {
            if ($(".wenzi-xuanxiang").find(".xz").length) {
                $(".xuanxiang-desc").show();
                $(".check").hide();
                $(".toupiao").hide();
            } else {
                alert("请选择");
            }
        }
    });
})