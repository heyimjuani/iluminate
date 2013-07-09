iluminate
=========

Add those trendy flat shadows on stuff. Needs https://github.com/infusion/jQuery-xcolor to work.

```$(".enlighten").iluminate({
  direction    : "bottomRight",		// "top", "topLeft", "topRight", "left", "right","bottom", "bottomLeft". defaults to "bottomRight"
  size         : 100, 				// box-shadow distance, in pixels
  textSize     : 100,				// text-shadow distance, in pixels
  fade         : 0.6,				// point at which the box-shadow starts to fade-out. 0-1
  fadeText     : 0.6,				// point at which the text-shadow starts to fade-out. 0-1
  alpha        : 0.05,				// box-shadow opacity. 0-1
  textAlpha    : 0.05, 				// text-shadow opacity. 0-1
  includeText  : true,				// if false, only text wrapped by spans will have a shadow
  textOnly     : false				// use to only get shadows on text
});```

Demo: http://sandbox.juan-i.com/flat/
