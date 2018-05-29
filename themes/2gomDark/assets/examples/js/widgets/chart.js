/*!
 * remark v1.0.6 (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
(function(document, window, $) {
  'use strict';
  var Site = window.Site;
  // widget chart
  $(document).ready(function(jQuery) {
    Site.run();



    //chart-bar-stacked
    var stacked_bar = new Chartist.Bar('#chartBarStacked .ct-chart', {
      labels: ['A', 'B', 'C', 'D', 'E', 'F'],
      series: [
        [11, 19, 17, 13, 2, 11],
        [6, 18, 7, 9, 26, 24],
        [9, 10, 22, 14, 23, 19]
      ]
    }, {
      stackBars: true,
      fullWidth: true,
      seriesBarDistance: 0,
      chartPadding: {
        top: -10,
        right: 0,
        bottom: 0,
        left: 0
      },
      axisX: {
        showLabel: true,
        showGrid: false,
        offset: 30
      },
      axisY: {
        showLabel: true,
        showGrid: true,
        offset: 30
      }
    });

    //chart-bar-stacked
    var stacked_bar = new Chartist.Bar('#chartBarStacked2 .ct-chart', {
      labels: ['A', 'B', 'C', 'D'],
      series: [
        [11, 19, 17, 13],
        [6, 18, 7, 9],
        [9, 10, 22, 14]
      ]
    }, {
      stackBars: true,
      fullWidth: true,
      seriesBarDistance: 0,
      chartPadding: {
        top: -10,
        right: 0,
        bottom: 0,
        left: 0
      },
      axisX: {
        showLabel: true,
        showGrid: false,
        offset: 30
      },
      axisY: {
        showLabel: true,
        showGrid: true,
        offset: 30
      }
    });



    //chart-bar-stacked
    var stacked_bar = new Chartist.Bar('#chartBarStacked3 .ct-chart', {
      labels: ['A', 'B', 'C', 'D'],
      series: [
        [11, 19, 17, 13],
        [6, 18, 7, 9],
        [9, 10, 22, 14]
      ]
    }, {
      stackBars: true,
      fullWidth: true,
      seriesBarDistance: 0,
      chartPadding: {
        top: -10,
        right: 0,
        bottom: 0,
        left: 0
      },
      axisX: {
        showLabel: true,
        showGrid: false,
        offset: 30
      },
      axisY: {
        showLabel: true,
        showGrid: true,
        offset: 30
      }
    });

   

  });

})(document, window, jQuery);
