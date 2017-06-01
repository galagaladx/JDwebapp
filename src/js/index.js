/**
 * Created by Administrator on 2017/3/7.
 */
import '../css/index.styl';
import '../../index.html';

(function (window) {
    window.onload = function () {
        initHeaderSearchBg();
        initSecondKill();
        initSlideImg();
    };
    var initHeaderSearchBg = function () {
        var header_box = document.getElementsByClassName('jd-header-box')[0];
        var slide = document.getElementsByClassName('jd-slide')[0];
        var slideH = slide.offsetHeight;
        window.onscroll = function () {
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            if (slideH < scrollTop) {
                header_box.style.backgroundColor = 'rgba(201,21,35,0.8)';
            } else {
                var op = scrollTop / slideH * 0.85;
                console.log(op);
                header_box.style.backgroundColor = 'rgba(201,21,35, ' + op + ')';
            }
        }
    }

    var initSecondKill = function () {
        var timeList = document.getElementsByClassName('num');
        var timer = null;
        var timeObj = {
            h: 3,
            m: 6,
            s: 13
        }
        var timeStr = toDouble(timeObj.h) + toDouble(timeObj.m) + toDouble(timeObj.s);
        for (var i = 0; i < timeList.length; i++) {
            timeList[i].innerHTML = timeStr[i];
        }
        timer = setInterval(function () {
            timeObj.s--;
            if (timeObj.s == -1) {
                timeObj.s = 59;
                timeObj.m--;
            }
            if (timeObj.m == -1) {
                timeObj.m = 59;
                timeObj.h--;
            }
            if (timeObj.h == -1) {
                timeObj.h = 0;
                timeObj.m = 0;
                timeObj.s = 0;
                clearInterval(timer);
            }
            timeStr = toDouble(timeObj.h) + toDouble(timeObj.m) + toDouble(timeObj.s);
            for (var i = 0; i < timeList.length; i++) {
                timeList[i].innerHTML = timeStr[i];
            }
        }, 1000);
        function toDouble(num) {
            if (num < 10) {
                return '0' + num;
            } else {
                return '' + num;
            }
        }
    }

    var initSlideImg = function () {
        var oUl = document.getElementsByClassName('oUl')[0];
        var oList = oUl.children;
        var point = document.getElementById('point').children;
        var viewW = oList[0].clientWidth;
        var nowTrn = 1;
        var start = null;
        var move = null;
        var timer = null;
        // 循环给每个img添加tuoch事件
        for (var i = 1; i < oList.length - 1; i++) {
            var oImgs = oList[i].getElementsByTagName('img')[0];
            oImgs.addEventListener('touchstart', function (e) {
                start = e.touches[0].clientX;
            }, false);
            oImgs.addEventListener('touchmove', function (e) {
                // 获取到移动的距离
                e.preventDefault();
                move = e.touches[0].clientX - start;
                // 若移动的距离为负 则表示图片向左
                oUl.style.transform = 'translate(' + (- nowTrn * viewW + move) + 'px,0px)';
            }, false);
            oImgs.addEventListener('touchend', function (e) {
                // 判断若move为正且大于view * .1 则表示当前图片向右边
                if (move > viewW * .1) {
                    nowTrn--;
                } else if (move < -viewW * .1) {
                    nowTrn++;
                }
                oUl.style.transition = 'transform .3s ease 0s';
                oUl.style.transform = 'translate(' + (-nowTrn * viewW) + 'px, 0px)';
                oUl.addEventListener('transitionend', function () {
                    this.style.transition = 'none';
                    if (nowTrn == 0) {
                        nowTrn = 8;
                    } else if (nowTrn == 9) {
                        nowTrn = 1;
                    }
                    for (var i = 0; i < 8; i++) {
                        point[i].className = 'blur';
                    }
                    point[nowTrn - 1].className = 'active';
                    oUl.style.transform = 'translate(' + (-nowTrn * viewW) + 'px,0px)';
                    move = null;
                    start = null;
                }, false);
            }, false);
        }

        // 自动轮播
        timer = setInterval(function () {
            nowTrn++;
            oUl.style.transition = 'transform .3s ease 0s';
            oUl.style.transform = 'translate(' + (-nowTrn * viewW) + 'px, 0px)';
            oUl.addEventListener('transitionend', function () {
                this.style.transition = 'none';
                if (nowTrn > 8) {
                    nowTrn = 1;
                }
                for (var i = 0; i < 8; i++) {
                    point[i].className = 'blur';
                }
                point[nowTrn - 1].className = 'active';
                oUl.style.transform = 'translate(' + (-nowTrn * viewW) + 'px,0px)';
            }, false);
        }, 3000);

    }
})(window);