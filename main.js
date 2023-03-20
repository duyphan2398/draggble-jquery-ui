$( document ).ready(function() {
    const dragContainer = $("#drag-container");
    const dragBar = $("#drag-bar");
    const topComponent = $('div.main-top');
    const bottomComponent =  $('div.main-bottom');

    const maxHeightDragContainer = $("body").height() - $(".header").height() - $(".footer").height() + dragBar.height();
    

    let levelOfDraggingPositions = [
        {
            'start': maxHeightDragContainer, 
            'end': maxHeightDragContainer / 2
        },  // From: full panel -> To: middle panel
        {
            'start': maxHeightDragContainer / 2, 
            'end': 0
        }  // From: middle panel  -> To: close panel
    ];

    /**
     * Pre-Set height of top and bottom components
     * 
     * @param {*} positionBottom 
     */
    function calculatepercent(positionBottom) {
        topComponent.height(maxHeightDragContainer - positionBottom);
        bottomComponent.height(positionBottom);
    };

    /**
     *  Check drag distance and back to levels df dragging position
     * 
     * @param {*} target 
     * @param {*} top 
     */
    function checkBackingPosition(target, positionBottom) {
        let levelOfDraggingPosition = {};

        for (const levelOfDraggingPositionItem of levelOfDraggingPositions) {
            if(levelOfDraggingPositionItem.start >= positionBottom && levelOfDraggingPositionItem.end <= positionBottom) {
                levelOfDraggingPosition = { ...levelOfDraggingPositionItem };
            }
        }

        let centerOfLevelOfDraggingPosition = levelOfDraggingPosition.end + (levelOfDraggingPosition.start - levelOfDraggingPosition.end) / 2;
        
        let newTopComponentHeight = newBottomComponentHeight = newDragBarBottom = 0;
        debugger;
        if( positionBottom > centerOfLevelOfDraggingPosition ) {
            if(levelOfDraggingPosition.start === maxHeightDragContainer) {
                newTopComponentHeight  = maxHeightDragContainer - levelOfDraggingPosition.start;
                newBottomComponentHeight = levelOfDraggingPosition.start - dragBar.height();
                newDragBarBottom = levelOfDraggingPosition.start - dragBar.height();
            }else {
                newTopComponentHeight  = maxHeightDragContainer - levelOfDraggingPosition.start;
                newBottomComponentHeight = levelOfDraggingPosition.start;
                newDragBarBottom = levelOfDraggingPosition.start;
            }
        } else {
            newTopComponentHeight = maxHeightDragContainer - levelOfDraggingPosition.end;
            newBottomComponentHeight = levelOfDraggingPosition.end
            newDragBarBottom = levelOfDraggingPosition.end;
        }
        debugger
        topComponent.height(newTopComponentHeight);
        bottomComponent.height(newBottomComponentHeight);
        dragBar.css({
            'top'	: newDragBarBottom - dragBar.height()
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
            'top'	: originalComponentHeight - dragBar.height()
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
            console.log(start.target.offsetTop);
            calculatepercent(maxHeightDragContainer - start.target.offsetTop - dragBar.height());
        },
        drag: function(drag, ui) {
            console.log(drag.target.offsetTop);
            calculatepercent(maxHeightDragContainer - drag.target.offsetTop - dragBar.height());
        },
        stop: function(stop, ui) {
            // Check height of position
            checkBackingPosition(stop.target, maxHeightDragContainer - stop.target.offsetTop - dragBar.height());
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
