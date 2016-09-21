require.config({
    paths:{
        "jquery":"lib/jquery.min"
    },
    shim:{
        'jquery':{
            exports:'Jquery'
        }
    }
});
require(["jquery"],function($){
    //图片预加载，防止图片闪动
    var imgar = [];
    function eightimg(){
        for(i=1;i<5;i++){
            //创建一个img标签，将其赋值给imgar[i]
            imgar[i] = new Image();
            imgar[i].src = "../images/background_green"+i+".jpg";
        }
    }
    eightimg();
    var open = false;
    var divid = document.getElementsByClassName('center_two')[0];
    $(".hover span").on("click",function(){
        //获取按钮获取下标
        open = true;
        var index = $(this).index()+1;

        function eight(){
            function bimg(){
                divid.style.backgroundImage = 'url("'+imgar[index].src+'")';
                console.log(divid.style.backgroundImage)
            }
            bimg();
        }
        eight();
        //按钮变色
        var arr = ["#77d7a9","#7bceff","#ff7e7f","#fdd269"]
        var arrIndex = arr[index-1];
        $(".login").css({"background":""+arrIndex+""})
        //运用localStorage保存图片和按钮的颜色变化
        if(open == true){
            localStorage.setItem("backgroundImage",imgar[index].src);
            localStorage.setItem("buttonBack",arrIndex);
        }
    });
    //获取图片和按钮的颜色
    var backImg = localStorage.getItem("backgroundImage");
    var buttonBack = localStorage.getItem("buttonBack");
    //刷新页面时做到是上次点击变换图片和按钮时的颜色
    divid.style.backgroundImage = 'url("'+backImg+'")';
    $(".login").css({"background":""+buttonBack+""})
});
