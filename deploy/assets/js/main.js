// Namespace
var GruntExample = GruntExample || {};

GruntExample.Core = (function () {
    var hasClicked = false;
    var $introMsg;
    var $outroMsg;

    function init() {
        $introMsg = $("#intro-msg");
        $outroMsg = $("#outro-msg");

        bind();
    }

    function bind() {
        $introMsg.bind('click', onClickHandler);
    }

    function onClickHandler() {
        if(hasClicked) return;

        hasClicked = true;

        TweenLite.to($introMsg, 0.6, {autoAlpha:0, delay:0.0, ease:Quad.easeOut});
        TweenLite.to($outroMsg, 0.6, {autoAlpha:1, delay:0.6, ease:Quad.easeOut});
    }

    return {
        init : init
    };

})();


$(document).ready(function () {
    GruntExample.Core.init();
});