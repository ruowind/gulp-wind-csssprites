/**
 * Created by gengfeng on 2017/3/6.
 */

$(function () {
    navBar();
    cityBar();
    tabs();
    rule();
    hcBar();

    //页面楼层滚动定位
    function navBar() {
        var floors = $('.floor');
        var isAnimating = false;

        $(window).scroll(function () {
            if (isAnimating) return;
            doWhenScroll();
        });

        // var lastViewHeights = [];

        function doWhenScroll() {
            var thisIndex = -1;
            // var thisViewHeights = [];
            floors.each(function (index, item) {
                // thisViewHeights.push(genViewHeight($(item)));
                // console.log($(item).offset().top - $(window).scrollTop());
                if (($(item).offset().top - $(window).scrollTop()) < 100) {
                    thisIndex = index;
                }
            });
            if (thisIndex < 0) {
                thisIndex = 0
            }

            $('.nav-bar').find('li').eq(thisIndex).addClass('active').siblings('.active').removeClass('active');
        }

        $('.nav-bar').on('click', 'li', function () {
            var index = $(this).index();
            if (index === 9) {
                isAnimating = true;
                $('html,body').animate({scrollTop: 0}, 500, function () {
                    isAnimating = false;
                    doWhenScroll();
                });
                return;
            }
            var srcollTop = floors.eq(index).offset().top;
            isAnimating = true;
            $('html,body').animate({scrollTop: srcollTop - 50}, 500, function () {
                isAnimating = false;
                doWhenScroll();
            });
        });
    }

    // 出发地选择条滚动固定
    function cityBar() {
        var szCity = $('.top-banner'),
            cfddTop = szCity.offset().top;
        $(window).scroll(function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > cfddTop) {
                if (!szCity.hasClass('fix-top')) {
                    szCity.addClass('fix-top');
                }
            } else {
                if (szCity.hasClass('fix-top')) {
                    szCity.removeClass('fix-top');
                }
            }
        });
    }

    // 楼层tab切换
    function tabs() {
        $('.floor-tabs').on('click', 'li', function () {
            if ($(this).hasClass('active')) return;
            var index = $(this).index();
            $(this).addClass('active').siblings('.active').removeClass('active');
            $(this).parent().next().children('.tab-con').eq(index).addClass('active').siblings('.active').removeClass('active');
        });
    }

    function rule() {
        $('.rule').on('click', function (e) {
            $(this).children('.tips').show();
            e.stopPropagation();
        });
        $(window).on('click', function () {
            $('.rule').children('.tips').hide();
        })
    }

    // 会场导航条
    function hcBar() {
        $('.hc-bar').animate({
            left: 0
        }, 500);
    }


    $('.close-dlg').on('click',function () {
        $(this).parent().hide();
        $('.t-mask').hide();
    });
    window.lvma={
        showGetOKDlg:function () {
            $('.t-mask').show();
            $('.get-ok').show();
        },
        showGetErrDlg:function () {
            $('.t-mask').show();
            $('.get-err').show();
        }
    }

});

$(function () {
    $.expr[":"].loading = function (elt, index) {
        var height = $(window).height();
        var top = $(elt).offset().top;
        return top > $(window).scrollTop() && top < (height + $(window).scrollTop());
    };
    $.expr[":"].loaded = function (elt, index) {
        var height = $(window).height();
        var top = $(elt).offset().top;
        return top < height;
    };
    var loadImg = function () {
        this.src = $(this).css({'opacity': 0}).attr("data-src");
        $(this).removeAttr("data-src");
        var This = this;
        if ($(this).load()) {
            $(This).animate({'opacity': 1}, 300, function () {
                $(This).removeAttr('style');
            });
        }

        this.onerror = function () {
            this.src = "http://pic.lvmama.com/img/new_v/ui_scrollLoading/loading.gif"
        }
    };
    var imgTimeId = null;
    var scrollImgLoading = function () {
        clearTimeout(imgTimeId);
        imgTimeId = setTimeout(function () {
                $("img[data-src]:loading").each(function () {
                    loadImg.call(this);
                });
                if ($("img[data-src]").size() == 0) {
                    $(window).unbind('scroll', scrollImgLoading);
                }
            }
            , 200);
    };
    $(window).bind('scroll click', scrollImgLoading);
    $("img[to]:loaded").each(function () {
        loadImg.call(this);
    });
    setTimeout(function () {
            $("img[data-src]:loaded").each(function () {
                loadImg.call(this);
            });
        }
        , 1000);
});