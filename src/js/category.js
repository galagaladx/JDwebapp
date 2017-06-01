/**
 * Created by Administrator on 2017/3/7.
 */
import '../css/category.styl';
import '../../index.html';

(function (window) {
    window.onload = function () {
        initLeftCategory();
        initRightCatrgory();
    }
    function initLeftCategory() {
        var parentDom = document.getElementsByClassName('jd-category-left')[0];
        var childDom = parentDom.getElementsByClassName('jd-category-left-box')[0];
        var childList = childDom.getElementsByTagName('li');
        var parentH = parentDom.offsetHeight - 45;
        var childH = childDom.offsetHeight;
        var rightDom = document.getElementsByClassName('jd-category-right')[0];

        // 添加事件
        var startY = 0, moveY = 0, startTime = 0, endTime = 0;
        var currY = 0, dragDownT = 150, dragUpT = -(childH - parentH + 150);
        childDom.addEventListener('touchstart', function (e) {
            startTime = new Date().getTime();
            startY = e.touches[0].clientY;
        }, false);
        childDom.addEventListener('touchmove', function (e) {
            e.preventDefault();
            moveY = startY - e.touches[0].clientY;
            // 控制活动区间
            if ((currY - moveY) < dragDownT && (currY - moveY) > dragUpT) {
                childDom.style.transition = 'none   ';
                childDom.style.transform = 'translateY(' + (currY - moveY) + 'px)';
            }
        }, false);
        childDom.addEventListener('touchcancal', function (e) {
            if (currY - moveY > 0) {
                currY = 0;
                childDom.style.transition = 'all .3s ease 0s';
                childDom.style.transform = 'translateY(' + currY + 'px)';
            } else if (currY - moveY < -(childH - parentH)) {
                currY = -(childH - parentH);
                childDom.style.transition = 'all .3s ease 0s';
                childDom.style.transform = 'translateY(' + currY + 'px)'
            }
            startY = 0;
            moveY = 0;
        }, false);
        childDom.addEventListener('touchend', function (e) {
            endTime = new Date().getTime();
            if ((currY - moveY) > 0) {
                currY = 0;
                childDom.style.transition = 'all .2s ease 0s';
                childDom.style.transform = 'translateY(' + currY + 'px)';

            } else if ((currY - moveY) < -(childH - parentH)) {
                currY = -(childH - parentH);
                childDom.style.transition = 'all .2s ease 0s';
                childDom.style.transform = 'translateY(' + currY + 'px)';
                console.log(currY);
            } else {
                currY = currY - moveY;
            }
            if (moveY == 0 && endTime - startTime < 200) {
                var target = e.target.parentNode;
                for (var i = 0; i < childList.length; i++) {
                    childList[i].index = i;
                    childList[i].className = ' ';
                }
                target.className = 'now';
                var listH = target.index * 50;
                // 要让剩下的li 占满可视区域 listH 不能 超过 childH - parentH 
                if (listH < (childH - parentH)) {
                    childDom.style.transition = 'all .3s ease 0s';
                    childDom.style.transform = 'translateY(' + -listH + 'px)';
                } else {
                    childDom.style.transition = 'all .3s ease 0s';
                    childDom.style.transform = "translateY(" + (-(childH - parentH)) + "px)";
                    currY = -(childH - parentH);
                }
                // 模拟数据在加载
                rightDom.style.transition = 'all .2s ease 0s';
                rightDom.style.opacity = 0;
                setTimeout(function () {
                    rightDom.style.opacity = 1;
                }, 300);
            }
            startY = 0;
            moveY = 0;
        }, false);
    };

    var initRightCatrgory = function () {
        var rightDom = document.getElementsByClassName('jd-category-right')[0];
        var rightDomChild = rightDom.getElementsByClassName('jd-category-right-box')[0];
        var parentH = rightDom.offsetHeight;
        var childH = rightDomChild.offsetHeight;
        var startY = 0, moveY = 0, endTime = 0, startTime = 0, currY = 0, dragDownT = 150, dragUpT = -(childH - parentH + 150);
        rightDomChild.addEventListener('touchstart', function (e) {
            startY = e.touches[0].clientY;
            startTime = new Date().getTime();
        }, false);
        rightDomChild.addEventListener('touchmove', function (e) {
            e.preventDefault();
            moveY = startY - e.touches[0].clientY;
            if ((currY - moveY) > dragUpT && (currY - moveY) < dragDownT) {
                rightDomChild.style.transition = 'none';
                rightDomChild.style.transform = 'translateY(' + (currY - moveY) + 'px)';
            }
        }, false);
        rightDomChild.addEventListener('touchend', function (e) {
            endTime = new Date().getTime();
            if (moveY == 0 && endTime - startTime < 200) return;
            if ((currY - moveY) > 0) {
                currY = 0;
                rightDomChild.style.transition = 'all .3s ease 0s';
                rightDomChild.style.transform = 'translateY(' + currY + 'px)';
            } else {
                currY = -(childH - parentH);
                rightDomChild.style.transition = 'all .3s ease 0s';
                rightDomChild.style.transform = 'translateY(' + currY + 'px)';
            }
            startY = 0;
            moveY = 0;
        }, false);
    }
})(window);

