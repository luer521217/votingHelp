var hostUrl = 'http://127.0.0.1:3001';
$('.goback').on('click',function(){
    window.location.href = '/index.html';
});


// 支持多选开关点击之后显示最多可投几项栏目
(function () {
    var i = 1;
    $('.isDuoXuan').on('click', function () {
        if (i == 1) {
            $(this).addClass('on');
            $('.zuiduo').show();
            i = -i;
        } else {
            $(this).removeClass('on');
            $('.zuiduo').hide();
            i = -i;
        }
    });
})();
// $(".duoxuan").click(function () {
//     if ($(".duoxuan").is(':checked')) {
//         $(".zuiduo").show();
//     } else {
//         $(".zuiduo").hide();
//     }
// });

//图片投票或文字投票事件
(function () {
    var i = 1;
    $('.isImgVote').on('click', function () {
        if (i == 1) {
            $(this).addClass('on');
            $(".wzxx1").hide();
            $(".tpxx1").show();          
            i = -i;
        } else {
            $(this).removeClass('on');
            $(".wzxx1").show();
            $(".tpxx1").hide();
            i = -i;
        }
    });
})();

$(".submit").on('click',function () {
    submit(id);
})

function submit(id) {
    var biaoti = $("#biaoti").val();
    var miaoshu = $("#miaoshu").val();
    var isDuoXuan = $(".isDuoXuan").hasClass("on");
    var shuru = $("#shuru").val();
    var isImgVote = $(".isImgVote").hasClass("on");
}