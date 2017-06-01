/**
 * Created by Administrator on 2017/3/7.
 */
import '../css/cart.styl';
import '../../index.html';

(function (window) {
    window.onload = function () {
        initCheck();
        initRemoveProduct();
    }
    var initCheck = function () {
        var checkBox = document.getElementsByClassName('jd-check-box');
        for (var i = 0; i < checkBox.length; i++) {
            checkBox[i].addEventListener('click', function () {
                var check = this.getAttribute('checked');
                if (check !== null) {
                    this.removeAttribute('checked');
                } else {
                    this.setAttribute('checked', ' ');
                }
            }, false);
        }
    }
    var initRemoveProduct = function () {
        var deleteBox = document.getElementsByClassName('delete-box');
        var win = document.getElementsByClassName('jd-win')[0];
        var winBox = win.getElementsByClassName('jd-win-box')[0];
        for (var i = 0; i < deleteBox.length; i++) {
            deleteBox[i].addEventListener('click', function () {
                win.style.display = 'block';
                winBox.className = 'jd-win-box jumpOut';

                var deleteObj = this;
                var up = deleteObj.getElementsByClassName('box-top')[0];
                up.style.transition = 'all .3s ease 0s';
                up.style.transform = 'translateY(-5px) translateX(2px) rotate(45deg)';

                var cancel = winBox.getElementsByClassName('cancel')[0];
                var submit = winBox.getElementsByClassName('submit')[0];
                cancel.addEventListener('click', function () {
                    win.style.display = 'none';
                    winBox.className = 'jd-win-box';
                    up.style.transition = 'all .3s ease 0s';
                    up.style.transform = 'translateY(0) translateX(0) rotate(0)';
                }, false);
                submit.addEventListener('click', function () {
                    console.log('W_W');
                    win.style.display = 'none';
                    winBox.className = 'jd-win-box';
                    up.style.transition = 'all .3s ease 0s';
                    up.style.transform = 'translateY(0) translateX(0) rotate(0)'
                }, false);
            }, false);
        }
    }
})(window);