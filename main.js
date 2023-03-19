$( document ).ready(function() {
    const dragContainer = $("#drag-container");
    const dragBar = $("#drag-bar");
    const topComponent = $('div.main-top');
    const bottomComponent =  $('div.main-bottom');

    const maxHeightDragContainer = $("body").height() - $(".header").height() - $(".footer").height() + dragBar.height();
    

    let levelOfDraggingPositions = [
        {
            'top': 0, 
            'bottom': maxHeightDragContainer / 2
        },  // From: full panel -> To: middle panel

        {
            'top': maxHeightDragContainer / 2, 
            'bottom': maxHeightDragContainer
        }  // From: middle panel  -> To: close panel
    ];

    /**
     * Pre-Set height of top and bottom components
     * 
     * @param {*} position 
     */
    function calculatepercent(position) {
        topComponent.height(position);
        bottomComponent.height(maxHeightDragContainer - position);
    };

    /**
     *  Check drag distance and back to levels df dragging position
     * 
     * @param {*} target 
     * @param {*} top 
     */
    function checkBackingPosition(target, top) {
        let levelOfDraggingPosition = {};

        for (const levelOfDraggingPositionItem of levelOfDraggingPositions) {
            if(levelOfDraggingPositionItem.top <= top && levelOfDraggingPositionItem.bottom >= top) {
                levelOfDraggingPosition = { ...levelOfDraggingPositionItem };
            }
        }

        let centerOfLevelOfDraggingPosition = levelOfDraggingPosition.top + (levelOfDraggingPosition.bottom - levelOfDraggingPosition.top) / 2;
        
        let newTopHeight = newBottomHeight = newDragBarTop = 0;
        if( top < centerOfLevelOfDraggingPosition ) {
            newTopHeight = levelOfDraggingPosition.top;
            newBottomHeight = maxHeightDragContainer - levelOfDraggingPosition.top
            newDragBarTop = levelOfDraggingPosition.top;
        } else {
            if(levelOfDraggingPosition.bottom === maxHeightDragContainer) {
                newTopHeight  = levelOfDraggingPosition.bottom - dragBar.height();
                newBottomHeight = maxHeightDragContainer - levelOfDraggingPosition.bottom;
                newDragBarTop = levelOfDraggingPosition.bottom - dragBar.height();
            }else {
                newTopHeight  = levelOfDraggingPosition.bottom;
                newBottomHeight = maxHeightDragContainer - levelOfDraggingPosition.bottom;
                newDragBarTop = levelOfDraggingPosition.bottom;
            }

        }

        topComponent.height(newTopHeight);
        bottomComponent.height(newBottomHeight);
        dragBar.css({
            'top'	: newDragBarTop
        });
    }

    /**
     * Set origin height for drag container, top component, bottom component and position of dragBar
     */
    function resizeWindow(){
        
        var originalComponentHeight = (maxHeightDragContainer)/2;

        dragContainer.height(maxHeightDragContainer);
        topComponent.height(originalComponentHeight);
        bottomComponent.height(originalComponentHeight);
        dragBar.css({
            'top'	: originalComponentHeight
         });
    };

    /**
     * Init Drag bar
     */
    dragBar.draggable({ 
        axis: "y",
        containment : ".drag-container",
        cursor: 'row-resize',
        // grid: [ 0, 100 ],
        start: function(start, ui) {   
            calculatepercent(ui.position.top);
            // console.log('Start: '+ start.target.offsetTop);
        },
        drag: function(drag, ui) {

            calculatepercent(ui.position.top);
            // console.log('Drag: '+ drag.target.offsetTop);
        },
        stop: function(stop, ui) {
            console.log(stop.target.offsetTop);
            // Check height of position
            checkBackingPosition(stop.target, stop.target.offsetTop);

            //calculatepercent(stop.target, ui.position.top);
            console.log('Stop: '+ stop.target.offsetTop);
        }
    });


    $(window).resize(function() {
        resizeWindow()
    });


    function init() {
        // Initial call
        resizeWindow();
    }
   

    init();
});
