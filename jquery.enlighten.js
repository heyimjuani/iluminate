(function($) {
 
    $.fn.enlighten = function( options ) {

        var settings = $.extend({
            size         : 100,
            dropoffStart : 0.6
        }, options);

        return this.each( function() {
            var elSize = $(this).height();

            // parent bg color will determine the shadow color
            var bg = $(this).parent().css("background-color");
            var darkerBG = $.xcolor.opacity(bg, 'black', 0.05);

            // generate shadows and offset
            var shadows = [];
            var shadowSize = settings.size;
            var dropoffStart = Math.ceil(shadowSize*settings.dropoffStart);

            for (var i = 0; i < shadowSize; i++) {

                if (i <= dropoffStart) {
                    var tweenedBG = $.xcolor.gradientlevel(darkerBG, bg, dropoffStart-i, dropoffStart);
                    shadow = (shadowSize - i) + "px " + (shadowSize - i) + "px " + tweenedBG;
                }
                else {
                    shadow = (shadowSize - i) + "px " + (shadowSize - i) + "px " + darkerBG;
                }

                shadows.push(shadow);
            }

            // get the shadows on a string so we can use them later
            var shadowString = shadows.reverse().join();

            // we'll need this element's background to set the text shadow color
            var txc = $(this).css("background-color");
            var darkerTX = $.xcolor.opacity(txc, 'black', 0.05);
            var convertedTX = darkerTX.getRGB();
            var RGBarrayTX = [];
            $.each(convertedTX, function(key, value){
                RGBarrayTX.push(value);
            });
            var RGBvaluesTX = RGBarrayTX[0] + ", " + RGBarrayTX[1] + ", " + RGBarrayTX[2];

            // generate shadows and offset
            var textShadows = [];
            for (var i = 0; i < elSize/2; i++) {
                textShadow =  " " + (elSize/2 - i) + "px " + (elSize/2 - i) + "px rgb(" + RGBvaluesTX + ")";
                textShadows.push(textShadow);
            }

            // get the shadows on a string so we can use them later
            var textShadowString = textShadows.reverse().join();

            // apply shadows
            $(this).css("box-shadow", shadowString);
            $(this).find("span").css("text-shadow", textShadowString);
        });
 
    };
 
}(jQuery));
