$( document ).ready(function() {
    // Initial call
    resizeWindow();

    $(window).resize(function() {
          resizeWindow()
    });

    function calculatepercent(position) {
        var a = position;

        $('div.main-top').height(position);
        $('div.main-bottom').height($("#mainContent").height() - (position + 20));
    };

    $( "#draggableH" ).draggable({ 
        axis: "y",
        start: function(start) {
            calculatepercent(start.target.offsetTop);
            console.log('Start: '+ start.target.offsetTop);
        },
        drag: function(drag) {
            calculatepercent(drag.target.offsetTop);
            console.log('Drag: '+ drag.target.offsetTop);
        },
        stop: function(stop) {
            calculatepercent(stop.target.offsetTop);
            console.log('Stop: '+ stop.target.offsetTop);
        }
    });

    function resizeWindow(){
        $("#mainContent").height($("body").height() - $(".header").height());

        var height = (($("body").height() - $(".header").height())/2)-10;

        $("#draggableH").css({
           'top'	: height,
           'min-height': '10px'
        });

        $(".main-top").css({
           'height'	: height,
           'min-height': '10px'
        });

        $(".main-bottom").css({
           'height'	: height,
           'min-height': '10px'
        });
    };
});
