$(function(){
    // **************************************************************************************************************用户列表页面yonghulist.html
    // 全选以及全不选
    // 向下选择
    $(".list-qx").click(function () {
        $(this).toggleClass("qx");
        if ($(this).hasClass("qx")) {
            $(".yonghu-list").find(".inp").map(function () {
                $(this).addClass("xz-inp");
                $(".list-qx").text("取消全选");
            });
        } else {
            $(".yonghu-list").find(".inp").map(function () {
                $(this).removeClass("xz-inp");
                $(".list-qx").text("全选");
            });
        }
    });

    // 单个选中
    $(".inp").click(function () {
        $(this).toggleClass("xz-inp");
        qbxz();
    });
})


// 向上选中
function qbxz() {
    var Li = $(".yonghu-list").find("li").length;
    var xzLi = $(".yonghu-list").find(".xz-inp").length;
    // console.log("Li"+Li);
    // console.log("xzLi:"+xzLi);
    if (Li == xzLi) {
        $(".list-qx").text("取消全选"); //全部选中
        if (!$(".list-qx").hasClass("qx")) {
            $(".list-qx").addClass("qx");
        }
    } else {
        $(".list-qx").text("全选"); //有个别人员未选中
        if ($(".list-qx").hasClass("qx")) {
            $(".list-qx").removeClass("qx");
        }

    }
}