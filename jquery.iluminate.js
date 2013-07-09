(function($) {
 
    $.fn.iluminate = function( options ) {

        var elSize = $(this).height();

        var settings = $.extend({
            size         : 100,
            direction    : "bottomRight",
            textSize     : elSize/2,
            fade         : null,
            fadeText     : null,
            includeText  : true,
            textOnly     : false,
            alpha        : 0.05,
            textAlpha    : 0.05
        }, options);

        return this.each( function() {

            // parent bg color will determine the shadow color
            var bg = $(this).parent().css("background-color");
            var darkerBG = $.xcolor.opacity(bg, 'black', settings.alpha);

            // generate shadows and offset
            var shadows = [];
            var shadowSize = settings.size;
            var fade = Math.ceil(shadowSize*settings.fade);

            for (var i = 0; i < shadowSize; i++) {
                if (settings.direction == "top") {
                    var shadowX = 0;
                    var shadowY = (shadowSize - i)*-1;
                } else if (settings.direction == "topRight") {
                    var shadowX = shadowSize - i;
                    var shadowY = (shadowSize - i)*-1;
                } else if (settings.direction == "right") {
                    var shadowX = shadowSize - i;
                    var shadowY = 0;
                } else if (settings.direction == "bottom") {
                    var shadowX = 0;
                    var shadowY = shadowSize - i;
                } else if (settings.direction == "bottomLeft") {
                    var shadowX = (shadowSize - i)*-1;
                    var shadowY = shadowSize - i;
                } else if (settings.direction == "left") {
                    var shadowX = (shadowSize - i)*-1;
                    var shadowY = 0;
                } else if (settings.direction == "topLeft") {
                    var shadowX = (shadowSize - i)*-1;
                    var shadowY = (shadowSize - i)*-1;
                } else {
                    var shadowX = shadowSize - i;
                    var shadowY = shadowSize - i;
                }
                var shadow = shadowX + "px " + shadowY + "px ";
                if ( settings.fade && i <= fade) {
                    var tweenedBG = $.xcolor.gradientlevel(darkerBG, bg, fade-i, fade);
                    shadow += tweenedBG;
                }
                else {
                    shadow += darkerBG;
                }
                shadows.push(shadow);
            }

            // get the shadows on a string so we can use them later
            var shadowString = shadows.reverse().join();

            // we'll need this element's background to set the text shadow color
            if ( $(this).css("background-color") == "rgba(0, 0, 0, 0)" ) {
                var txc = $(this).parent().css("background-color");
            } else {
                var txc = $(this).css("background-color");   
            }
            var darkerTX = $.xcolor.opacity(txc, 'black', settings.textAlpha);

            // generate shadows and offset
            var textShadows = [];
            var fadeText = Math.ceil(settings.textSize*settings.fadeText);

            for (var i = 0; i < settings.textSize; i++) {
                if (settings.direction == "top") {
                    var textX = 0;
                    var textY = (settings.textSize - i)*-1;
                } else if (settings.direction == "topRight") {
                    var textX = settings.textSize - i;
                    var textY = (settings.textSize - i)*-1;
                } else if (settings.direction == "right") {
                    var textX = settings.textSize - i;
                    var textY = 0;
                } else if (settings.direction == "bottom") {
                    var textX = 0;
                    var textY = settings.textSize - i;
                } else if (settings.direction == "bottomLeft") {
                    var textX = (settings.textSize - i)*-1;
                    var textY = settings.textSize - i;
                } else if (settings.direction == "left") {
                    var textX = (settings.textSize - i)*-1;
                    var textY = 0;
                } else if (settings.direction == "topLeft") {
                    var textX = (settings.textSize - i)*-1;
                    var textY = (settings.textSize - i)*-1;
                } else {
                    var textX = settings.textSize - i;
                    var textY = settings.textSize - i;
                }
                var textShadow = textX + "px " + textY + "px ";
                if ( settings.fadeText && i <= fadeText) {
                    var tweenedTX = $.xcolor.gradientlevel(darkerTX, txc, fadeText-i, fadeText);
                    textShadow += tweenedTX;
                }
                else {
                    textShadow += darkerTX;
                }
                textShadows.push(textShadow);
            }

            // get the shadows on a string so we can use them later
            var textShadowString = textShadows.reverse().join();

            // apply shadows
            if ( settings.includeText ) {
                $(this).css({
                    "box-shadow": shadowString,
                    "text-shadow": textShadowString,
                    "overflow": "hidden"
                });
            } else {
                $(this).css("box-shadow", shadowString);
                $(this).find("span").css("text-shadow", textShadowString);
            }

            if ( settings.textOnly ) {
                $(this).css({
                    "overflow": "initial",
                    "text-shadow": textShadowString,
                    "box-shadow": "none"
                });
            }
        });
 
    };
 
}(jQuery));
