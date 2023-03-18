$( document ).ready(function() {
    let currentDragBarTop = 0;

    // Initial call
    resizeWindow();

    $(window).resize(function() {
          resizeWindow()
    });

    function calculatepercent(position) {
        var a = position;

        $('div.main-top').height(position);
        $('div.main-bottom').height($("#drag-container").height() - (position));
    };

    $( "#drag-bar" ).draggable({ 
        axis: "y",
        containment : ".drag-container",
        cursor: 'row-resize',
        distance: 100,
        // grid: [ 0, 100 ],
        start: function(start, ui) {   
            calculatepercent(start.target.offsetTop);
            console.log('Start: '+ start.target.offsetTop);
        },
        drag: function(drag, ui) {
            calculatepercent(drag.target.offsetTop);
            console.log('Drag: '+ drag.target.offsetTop);
        },
        stop: function(stop, ui) {
            calculatepercent(stop.target.offsetTop);
            console.log('Stop: '+ stop.target.offsetTop);
        }
    });

    function resizeWindow(){
        $("#drag-container").height($("body").height() - $(".header").height() - $(".footer").height());
        var height = (($("body").height() - $(".header").height() - $(".footer").height())/2);
        
        currentDragBarTop = height;


        $("#drag-bar").css({
           'top'	: height,
           'min-height': '10px'
        });

        $(".main-top").css({
           'height'	: height,
        });

        $(".main-bottom").css({
           'height'	: height,
        });
    };
});
