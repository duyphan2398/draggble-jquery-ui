$( document ).ready(function() {
    const heightDragBar = $("#drag-bar").height();
    const maxHeightDragContainer = $("body").height() - $(".header").height() - $(".footer").height();

    let levelOfPositions = [
        {
            'top': 0, 
            'bottom': maxHeightDragContainer / 2
        },  // full panel -> middle panel

        {
            'top': maxHeightDragContainer / 2, 
            'bottom': maxHeightDragContainer
        }  // middle panel  -> close panel
    ];


    function calculatepercent(position) {
        console.log('Position: '+ position);
        $('div.main-top').height(position);
        $('div.main-bottom').height($("#drag-container").height() - position);
    };

    $( "#drag-bar" ).draggable({ 
        axis: "y",
        containment : ".drag-container",
        cursor: 'row-resize',
        // grid: [ 0, 100 ],
        start: function(start, ui) {   
            calculatepercent(ui.position.top);
            console.log('Start: '+ start.target.offsetTop);
        },
        drag: function(drag, ui) {

            calculatepercent(ui.position.top);
            console.log('Drag: '+ drag.target.offsetTop);
        },
        stop: function(stop, ui) {
            // Check height of position
            checkBackingDistance(stop.target, ui.position.top);

            //calculatepercent(stop.target, ui.position.top);
            console.log('Stop: '+ stop.target.offsetTop);
        }
    });

    function checkBackingDistance(target, top) {
        let levelOfPosition = {};

        for (const levelOfPositionItem of levelOfPositions) {
            if(levelOfPositionItem.top <= top && levelOfPositionItem.bottom >= top) {
                levelOfPosition = { ...levelOfPositionItem };
            }
        }

        let centerOfLevelOfPosition = (levelOfPosition.bottom - levelOfPosition.top) / 2;


        if( top < centerOfLevelOfPosition ){
            // Near start 
            $('div.main-top').height(levelOfPosition.top);
            $('div.main-bottom').height($("#drag-container").height() - (levelOfPosition.top));
            
            $("#drag-bar").css({
                'top'	: levelOfPosition.top
            });

        } else {
            // Near end

            // Checking at the close panel
            if(levelOfPosition.bottom === maxHeightDragContainer) {
                $('div.main-top').height(levelOfPosition.bottom - heightDragBar);
                $('div.main-bottom').height($("#drag-container").height() - (Math.floor(levelOfPosition.bottom - heightDragBar)));
                
                $("#drag-bar").css({
                    'top'	: levelOfPosition.bottom - heightDragBar
                });
            } else {
                $('div.main-top').height(levelOfPosition.bottom);
                $('div.main-bottom').height($("#drag-container").height() - (Math.floor(levelOfPosition.bottom)));
                
                $("#drag-bar").css({
                    'top'	: levelOfPosition.bottom
                });
            } 
        }
        
    }

    function resizeWindow(){
        $("#drag-container").height($("body").height() - $(".header").height() - $(".footer").height());
        var height = (($("body").height() - $(".header").height() - $(".footer").height())/2);

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


    $(window).resize(function() {
        resizeWindow()
    });

    function init() {
        // Initial call
        resizeWindow();
    }
   

    init();
});
