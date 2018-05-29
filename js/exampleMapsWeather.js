var iconData = {
  "us": { width: 24, height: 14 },
  "ca": { width: 24, height: 14 },
  "flag-shadow": { width: 40, height: 30 },
  "house": { width: 32, height: 32 },
  "house-shadow": { width: 59, height: 32 },
  "headquarters": { width: 32, height: 32 },
  "headquarters-shadow": { width: 59, height: 32 }
};

var officeLayer = [
  {
    "zoom": [0, 3],
    "places": [
      {
        "name": "USA Offices",
        "icon": ["us", "flag-shadow"],
        "posn": [40, -97]
      },
      {
        "name": "Canadian Offices",
        "icon": ["ca", "flag-shadow"],
        "posn": [58, -101]
      },
    ]
  },
  {
    "zoom": [4, 6],
    "places": [
      {
        "name": "Headquarters",
        "icon": ["headquarters", "headquarters-shadow"],
        "posn": [37.423021, -122.083739]
      },
      {
          "name": "Headquarters",
          "icon": ["headquarters", "headquarters-shadow"],
          "posn": [37.423023, -122.083742]
        },
      {
        "name": "New York Sales & Engineering Office",
        "icon": ["house", "house-shadow"],
        "posn": [40.754606, -73.986794]
      },
      {
        "name": "Atlanta Sales &amp; Engineering Office",
        "icon": ["house", "house-shadow"],
        "posn": [33.781506, -84.387422]
      },
      {
        "name": "Dallas Sales Office",
        "icon": ["house", "house-shadow"],
        "posn": [36.4724385, -101.044637]
      },
      {
        "name": "Cambridge Sales & Engineering Office",
        "icon": ["house", "house-shadow"],
        "posn": [42.362331, -71.083661]
      },
      {
        "name": "Chicago Sales Office",
        "icon": ["house", "house-shadow"],
        "posn": [41.889232, -87.628767]
      },
      {
        "name": "Denver & Boulder Offices",
        "icon": ["house", "house-shadow"],
        "posn": [39.563011, -104.868962]
      },
      {
        "name": "Detroit Sales Office",
        "icon": ["house", "house-shadow"],
        "posn": [42.475482, -83.244587]
      },
      {
        "name": "Santa Monica & Irvine Offices",
        "icon": ["house", "house-shadow"],
        "posn": [33.715585, -118.177435]
      },
      {
        "name": "Phoenix Sales & Engineering Office",
        "icon": ["house", "house-shadow"],
        "posn": [33.411782, -111.926247]
      },
      {
        "name": "Pittsburgh Engineering Office",
        "icon": ["house", "house-shadow"],
        "posn": [40.444541, -79.946254]
      },
      {
        "name": "Seattle Engineering & Sales Offices",
        "icon": ["house", "house-shadow"],
        "posn": [47.664261, -122.274308]
      },
      {
        "name": "Canada Sales Office",
        "icon": ["house", "house-shadow"],
        "posn": [43.645478, -79.378843]
      },
    ]
  },
  {
    "zoom": [7, 17],
    "places": [
      {
        "name": "Headquarters",
        "posn": [37.423021, -122.083739]
      },
      {
        "name": "New York Sales & Engineering Office",
        "posn": [40.754606, -73.986794]
      },
      {
        "name": "Atlanta Sales &amp; Engineering Office",
        "posn": [33.781506, -84.387422]
      },
      {
        "name": "Boulder Sales & Engineering Office",
        "posn": [40.018520, -105.276882]
      },
      {
        "name": "Cambridge Sales & Engineering Office",
        "posn": [42.362331, -71.083661]
      },
      {
        "name": "Chicago Sales Office",
        "posn": [41.889232, -87.628767]
      },
      {
        "name": "Dallas Sales Office",
        "posn": [32.925355, -96.816087]
      },
      {
        "name": "Denver Sales Office",
        "posn": [39.563011, -104.868962]
      },
      {
        "name": "Detroit Sales Office",
        "posn": [42.475482, -83.244587]
      },
      {
        "name": "Irvine Sales & Engineering Office",
        "posn": [33.660021, -117.860142]
      },
      {
        "name": "Phoenix Sales & Engineering Office",
        "posn": [33.411782, -111.926247]
      },
      {
        "name": "Pittsburgh Engineering Office",
        "posn": [40.444541, -79.946254]
      },
      {
        "name": "Santa Monica Sales & Engineering Office",
        "posn": [34.019388, -118.494728]
      },
      {
        "name": "Seattle Engineering Office",
        "posn": [47.678415, -122.195713]
      },
      {
        "name": "Seattle Sales Office",
        "posn": [47.650106, -122.352903]
      },
      {
        "name": "Toronto Sales Office",
        "posn": [43.645478, -79.378843]
      },
    ]
  }
];



var map;
var mgr;
var icons = {};
var allmarkers = [];

function load() {                
  var myOptions = {
    zoom: 3,
    center: new google.maps.LatLng(50.62504, -100.10742),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map'), myOptions);

  mgr = new MarkerManager(map);
  
  google.maps.event.addListener(mgr, 'loaded', function(){
    setupOfficeMarkers();
    google.maps.event.addListener(map, 'zoom_changed', function() {
      updateStatus(mgr.getMarkerCount(map.getZoom()));
    });
  });                
}

function getIcon(images) {
  var icon = false;
  if (images) {
    if (icons[images[0]]) {
      icon = icons[images[0]];
    } else {                    
        var iconImage = new google.maps.MarkerImage('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markermanager/examples/images/us.png',
          new google.maps.Size(iconData[images[0]].width, iconData[images[0]].height),
          new google.maps.Point(0,0),
          new google.maps.Point(0, 32));
        
        var iconShadow = new google.maps.MarkerImage('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/markermanager/examples/images/us.png',
          new google.maps.Size(iconData[images[1]].width, iconData[images[1]].height),
          new google.maps.Point(0,0),
          new google.maps.Point(0, 32));
        
        var iconShape = {
          coord: [1, 1, 1, 32, 32, 32, 32, 1],
          type: 'poly'
        };

        icons[images[0]] = {
          icon : iconImage,
          shadow: iconShadow,
          shape : iconShape
        };
    }
  }
  return icon;
}

function setupOfficeMarkers() {
  allmarkers.length = 0;
  for (var i in officeLayer) {
    if (officeLayer.hasOwnProperty(i)) {
      var layer = officeLayer[i];
      
      var markers = [];
      for (var j in layer["places"]) {
        if (layer["places"].hasOwnProperty(j)) {
          var place = layer["places"][j];
          var icon = getIcon(place["icon"]);
          
          var title = place["name"];
          var posn = new google.maps.LatLng(place["posn"][0], place["posn"][1]);
          var marker = createMarker(posn, title, getIcon(place["icon"]));
          markers.push(marker);
          allmarkers.push(marker);
        }
      }
      mgr.addMarkers(markers, layer["zoom"][0], layer["zoom"][1]);
    }
    
  }
  mgr.refresh();
  updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function createMarker(posn, title, icon) {
  var markerOptions = {
    position: posn,
    title: title
  };
  if(icon !== false){
    markerOptions.shadow = icon.shadow;
    markerOptions.icon   = icon.icon;
    markerOptions.shape  = icon.shape;
  }
    
  var marker = new google.maps.Marker(markerOptions);

  google.maps.event.addListener(marker, 'dblclick', function() {
    mgr.removeMarker(marker)
    updateStatus(mgr.getMarkerCount(map.getZoom()));
  });
  return marker;
}

function showMarkers() {
  mgr.show();
  updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function hideMarkers() {
  mgr.hide();
  updateStatus(mgr.getMarkerCount(map.getZoom()));
}



function clearMarkers() {
  mgr.clearMarkers();
  updateStatus(mgr.getMarkerCount(map.getZoom()));
}

function reloadMarkers() {
  setupOfficeMarkers();
}

function updateStatus(html) {
  //document.getElementById("status").innerHTML = html;
}

//]]>
load();