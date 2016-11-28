$(function(){

    //导航条隐藏与显示
    function pageNav() {
        var timer = null;

        function hideIt() {
            $(".cateContent .hide").filter(":visible").stop(true, false).delay(500).slideUp(400);
            $(".category li").removeClass("changeRed");
            $(".category li i").addClass("active")

        }

        $(document).on("mouseenter", ".category li:lt(9)", function () {
           timer!=null? clearTimeout(timer) : timer=null;
                var $thisIndex = $(this).index();
            var $lastIndex=$(".category li.changeRed").index();
                if ($thisIndex == 0) {
                    $(".category li i").removeClass("active");
                }
                $(this).addClass("changeRed").siblings().removeClass("changeRed");
            console.log($lastIndex);
            $(".cateContent .hide").eq($lastIndex).stop(true, false).delay(500).slideUp(500);
                $(".cateContent .hide").eq($thisIndex).stop(true, true).delay(500).slideDown(500);
            })

            .on("mouseleave", ".category li:lt(9)", function () {
                timer = setTimeout(hideIt, 500)
            })
            .on("mouseenter", ".cateContent .hide", function () {
                clearTimeout(timer);
            })
            .on("mouseleave", ".cateContent .hide", function () {
                hideIt();
            });
    }
    pageNav();
       
//图片轮播

    function picSlide(){
        var i=0, a=0,b=3,count=$(".banner ul li").length,t;
        var slideWidth=$(".banner-list div").width();
        function slide(direction){
            var $this=$(".banner-list");
            if(direction=="left"){
                a=a<count-1? ++a:0;
                b=i=a;
                $this.stop(true,false).animate({left:-slideWidth},1500,function(){
                    $(this).css({left:0}).find("div:first-child").appendTo($(this)) ;
                })}
            else if(direction=="right"){
                b=b>0? --b: 2 ;
                a=i=b;
                $this.find("div:last-child").prependTo($this);
                $this.css({left:-slideWidth});
                $this.stop(true,false).animate({left:0},1500,function(){
                })
                }
            var _this=$(".banner ul li");
            _this.eq(i).children("div").addClass("white");
            _this.eq(i).siblings().children("div").removeClass("white");
        }

        function showAuto(){
            t=setInterval(function(){
               slide("right");
            },2000)
        }
        showAuto();
        $(".banner").hover(function(){
            clearInterval(t);
        },function(){
            showAuto();
        });

        $(".btn-next").click(function(){
            slide("left");
        });
        $(".btn-prev").click(function(){
            slide("right");
        });
    }
    picSlide();

//新闻滚动
    function newsSlide(){
        var sHeight=$(".news").height();
        function downSlide(){
            $(".news ul:nth-child(2)").animate({marginTop:-sHeight},500,function(){
                $(this).css({marginTop:0}).find("li:first-child").appendTo(this);
            })
        }
        function upSlide(){
            $(".news ul:nth-child(2)").stop(true,false).animate({marginTop:sHeight},500,function(){
                $(this).css({marginTop:0}).find("li:last-child").prependTo(this);
            })

        }
        var t=setInterval(function(){
            downSlide()
        },3000);
        $(".news .pre").click(function(){
            upSlide();
        });
        $(".news .next").click(function(){
            downSlide();
        });

        $(".news ul:nth-child(3)").hover(function(){
            clearInterval(t)
        },function(){
            t=setInterval(function(){
                downSlide()
            },3000);
        })
    }
    newsSlide();
//视频播放
    function playVideo(){
        $(".playBtn").click(function(){
            $(".videoPlay .hide").css({zIndex:2}).siblings().hide();
        })
    }
    playVideo();

    //侧边固定视口
    function sideIcon(){
        $('.rightIconbox').hide();
        $(window).on('scroll',function(){
            var $scrollTop=$(window).scrollTop();
            if($scrollTop>100 && $('.rightIconbox').is(':hidden')){
                $('.rightIconbox').fadeIn(500);
            }
            else if($scrollTop>=500){
                $('.goTop').stop().animate({opacity:0.8},500)
            }else{
                $('.goTop').stop().animate({opacity:0},500)
            }
        }).trigger('scroll');

}
 
    sideIcon();
//随机生成验证码
    function createStr(len){
        var seed=["abcdefghijklmnopqrstuvwxyz",'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            '0123456789'];
        var i,result='',index;
        for(i=0;i<len;i++){
            index=Math.floor(Math.random()*3);
            result+=seed[index].substr(Math.floor(Math.random()*seed[index].length),1);
        }
        $('.modal ul li .verification').val(result)
    }

    $('.modal ul li .verification').click(function(){
        createStr(4);
    }).trigger('click');
//弹出框表单验证
    function verify(){
        $(document).on('blur','.modal ul li #name, .modal ul li #comment',function(){
            if(this.value==""||this.value.length<6){
                var errorMsg="请输入至少6位必填项";
                $(this).parent().find('.tips').remove();
                $(this).parent().append('<div class="tips onError">'+errorMsg+'</div>');
                $(this).css({'border':'1px dotted red'})
            }else{
                $(this).parent().find('.tips').remove();
                $(this).css({'border':'none'})
            }
        });
        $(".modal ul li #email").blur(function(){
            if(this.value==''||(!(/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)))){
                var errorMsg="请输入正确的邮箱格式";
                $(this).parent().find('.tips').remove();
                $(this).parent().append('<div class="onError tips">'+errorMsg+'</div>');
                $(this).css({'border':'1px dotted red'})
            }else{
                $(this).parent().find('.tips').remove();
                $(this).css({'border':'none'});
            }
        });

        $('#send').click(function(){
            $("form .required:input").trigger('blur');
        })
    }
    verify();
//弹出框的显示与隐藏
    function showModal(){

        $(document).on("click",".close",function(){
            $(".modal").hide();
        });
        window.onclick=function(event){
            if(event.target==$('.modal')[0]){
                $(".modal").hide();
            }
        };
        $('.rightIconbox .text').click(function(){
            $('.modal').show()
        })

    }
    showModal();















    });
