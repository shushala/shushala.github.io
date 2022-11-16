$(function() {
    // 1.监听游戏规则的点击
    $(".rules").click(function() {
        $(".rule").stop().fadeIn(100);
    });

    // 2.监听关闭按钮的点击
    $(".close").click(function() {
        $(".rule").stop().fadeOut(100);
    });

    $(".start").click(function() {
        $(this).stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
    })


    $(".reStart").click(function() {
        $(".mask").stop().fadeOut(100);
        progressHandler();
        startWolfAnimation();
        $(".score").text(0);
    })

    function progressHandler() {
        $(".progress").css({
            width: 180
        })
        $(".progressWidth").css({
            with: 180
        })
        var timer = setInterval(function() {
            var progressWidth = $(".progress").width();
            progressWidth -= 10;
            $(".progress").css({
                width: progressWidth
            })
            if (progressWidth <= 0) {
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        }, 1000)
    }

    var wolfTimer;

    function startWolfAnimation() {
        var wolf_1 = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png'];
        var wolf_2 = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png'];

        var arrPos = [
            { left: "100px", top: "115px" },
            { left: "20px", top: "160px" },
            { left: "190px", top: "142px" },
            { left: "105px", top: "193px" },
            { left: "19px", top: "221px" },
            { left: "202px", top: "212px" },
            { left: "120px", top: "275px" },
            { left: "30px", top: "295px" },
            { left: "209px", top: "297px" }
        ];
        var $wolfImage = $("<img src='' class='wolfImage'>");
        var posIndex = Math.round(Math.random() * 8);
        var wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
        $wolfImage.css({
            position: "absolute",
            left: arrPos[posIndex].left,
            top: arrPos[posIndex].top
        })
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function() {
            if (wolfIndex > wolfIndexEnd) {
                $wolfImage.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImage.attr("src", wolfType[wolfIndex]);
            wolfIndex++;
        }, 130);
        $(".container").append($wolfImage);
        gameRules($wolfImage);
    }

    function gameRules($wolfImage) {
        $wolfImage.one("click", function() {
            // 修改索引
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;

            // 拿到当前点击图片的地址
            var $src = $(this).attr("src");
            // 根据图片地址判断是否是灰太狼
            var flag = $src.indexOf("h") >= 0;
            // 根据点击的图片类型增减分数
            if (flag) {
                // +10
                $(".score").text(parseInt($(".score").text()) + 10);
            } else {
                // -10
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }

    function stopWolfAnimation() {
        $(".wolfImage").remove();
        clearInterval(wolfTimer);
    }

});