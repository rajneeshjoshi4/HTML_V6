            
//           console.log(jQuery);

function windowResize() {
    'use strict';
    var h = {
        windowHeight: jQuery(window).height(),
        panelOffsets: jQuery('.bvn-wrapper-right-panel').position(),
        rightPanelwidth: 0,
        panelHeight : 0,
        tableoffsets : 0,
        searchResultsId: 0,
        bottomButtonsHeight : 0
    };
    h.panelHeight = h.windowHeight - h.panelOffsets.top;
    h.rightPanelwidth = jQuery('.bvn-wrapper-right-panel').outerWidth(true);
    //console.log(" Window's height: " + h.windowHeight + ". Panel height: " + panelHeight);
    if ((jQuery('#searchResultsId').length) || (jQuery('.bvn-filter-content').length)) {
        h.tableoffsets = jQuery('#searchResultsId').position();
        h.searchResultsId = h.windowHeight - h.tableoffsets.top;
        jQuery('#searchResultsId').height(h.searchResultsId);
        jQuery('.bvn-filter-content').height(h.searchResultsId - 3);
                
    }
    jQuery('.bvn-wrapper-left-panel').height(h.panelHeight);
    
    if (jQuery('.bvn-bottom-buttons-row').length) {
        h.bottomButtonsHeight = jQuery('.bvn-bottom-buttons-row').height();
        jQuery('.bvn-bottom-buttons-row').css({"left": h.panelOffsets.left, "width": h.rightPanelwidth, "bottom": "0"});
        
        jQuery('.bvn-wrapper-right-panel').height(h.panelHeight - h.bottomButtonsHeight);
    } else {
        jQuery('.bvn-wrapper-right-panel').height(h.panelHeight);
        
    }
}