/*jslint browser: true*/
/*global $, jQuery, alert*/

//           console.log(jQuery);

var scrolling = {
    getWindowHeight : function () {
        'use strict';
        return jQuery(window).height();
    },
    setPanelHeight : function () {
        'use strict';
        var windowHeight = scrolling.getWindowHeight(),
            $selectRightPanel = jQuery('.bvn-wrapper-right-panel'),
            $selectLeftPanel = jQuery('.bvn-wrapper-left-panel'),
            $selectBottomButtonRow = jQuery('.bvn-bottom-buttons-row'),
            rightPanelOffsets = $selectRightPanel.position(),
            rightPanelHeight = windowHeight - rightPanelOffsets.top,
            rightPanelWidth = $selectRightPanel.outerWidth(true),
            bottomButtonsHeight;
        if ($selectBottomButtonRow.length) {
            bottomButtonsHeight = $selectBottomButtonRow.height();
            $selectRightPanel.height(rightPanelHeight - bottomButtonsHeight);
            $selectLeftPanel.height(rightPanelHeight);
            $selectBottomButtonRow.css({"left": rightPanelOffsets.left, "width": rightPanelWidth, "bottom": "0"});
        } else {
            $selectRightPanel.height(rightPanelHeight);
            $selectLeftPanel.height(rightPanelHeight);
        }
        //console.log("On LOAD window's height:" + windowHeight + " and rightPanel's Height " + rightPanelHeight);
            
    },
    addResultPanelHeight : function () {
        'use strict';
        var windowHeight = scrolling.getWindowHeight(),
            $selectSearchResult = jQuery('.bvn-wrapper-search-result'),
            $selectFilter = jQuery('.bvn-filter-content'),
            resultPanelOffsets = $selectSearchResult.position(),
            resultPanelHeight;
        if (($selectSearchResult.length) || ($selectFilter.length)) {
            resultPanelHeight = windowHeight - resultPanelOffsets.top;
            $selectSearchResult.height(resultPanelHeight);
            $selectFilter.height(resultPanelHeight - 4);
            //console.log("On RESIZE window's height:" + windowHeight + " and ResultPanel's Height: " + resultPanelHeight);
        } else {
            return false;
        }
    
    }
},
    headerBanner = {
        bannerWithLogo : function () {
            'use strict';
            var $selectBannerWrapper = jQuery(".bvn-banner-wrapper"),
                $selectBanner = jQuery(".bvn-banner"),
                $selectClientLogo = jQuery(".bvn-client-logo"),
                bannerWidth = $selectBannerWrapper.width(),
                bannerLogoWidth = $selectClientLogo.outerWidth(true);

            if (jQuery(".bvn-client-logo")) {
                $selectBanner.width(bannerWidth - bannerLogoWidth);
                $selectClientLogo.css({"margin-top": 100 - ($selectClientLogo.height() / 2)});
            } else {
                $selectBanner.width(bannerWidth);
            }
        }

    },
    
    showHideBanner = {
        bannerToggle : function () {
            'use strict';
            var $selectClickButton = jQuery(".bvn-banneritem .bvn-icon"),
                check = 0;
            jQuery(".bvn-banneritem a").click(function (e) {
                e.preventDefault();
                jQuery(".bvn-banner-wrapper").slideToggle({
                    duration : 400,
                    step : function () {
                        scrolling.setPanelHeight();
                        scrolling.addResultPanelHeight();
                    },
                    complete : function () {if (check === 0) {
                        $selectClickButton.removeClass("icon-arrow-up").addClass("icon-arrow-down");
                        check = 1;
                    } else {
                        $selectClickButton.removeClass("icon-arrow-down").addClass("icon-arrow-up");
                        check = 0;
                    }
                                            }
                });
                
            });
        }
    };







jQuery(function () {
    'use strict';
    setTimeout(function () {
        scrolling.setPanelHeight();
        scrolling.addResultPanelHeight();
        headerBanner.bannerWithLogo();
        showHideBanner.bannerToggle();
    }, 1000);
    jQuery(window).resize(function () {
        scrolling.setPanelHeight();
        scrolling.addResultPanelHeight();
        headerBanner.bannerWithLogo();
    });
    


    
}
      );