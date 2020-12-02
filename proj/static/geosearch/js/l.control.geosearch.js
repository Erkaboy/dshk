/*
 * L.Control.GeoSearch - search for an address and zoom to its location
 * https://github.com/smeijer/L.GeoSearch
 */




L.GeoSearch = {};
L.GeoSearch.Provider = {};

L.GeoSearch.Result = function (x, y, label, bounds, details) {
    this.X = x;
    this.Y = y;
    this.Label = label;
    this.bounds = bounds;

    if (details)
        this.details = details;
};

L.Control.GeoSearch = L.Control.extend({
    options: {
        position: 'topleft',
        showMarker: true,
        showPopup: true,
        customIcon: false,
        retainZoomLevel: false,
        draggable: false
    },

    _config: {
        country: '',
        searchLabel: 'Enter address',
        notFoundMessage: 'Sorry, that address could not be found.',
        messageHideDelay: 3000,
        zoomLevel: 18
    },

    initialize: function (options) {
        L.Util.extend(this.options, options);
        L.Util.extend(this._config, options);
    },

    resetLink: function(extraClass) {
        var link = this._container.querySelector('a');
        link.className = 'leaflet-bar-part leaflet-bar-part-single' + ' ' + extraClass;
    },

    onAdd: function (map) {
        this._container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-geosearch');

        // create the link - this will contain one of the icons
        var link = L.DomUtil.create('a', '', this._container);
        link.href = '#';
        link.title = this._config.searchLabel;

        // set the link's icon to magnifying glass
        this.resetLink('glass');

        // create the form that will contain the input
        var form = L.DomUtil.create('form', 'displayNone', this._container);

        var searchbutton = L.DomUtil.create('input', null, form);
        searchbutton.type = 'button';
        searchbutton.setAttribute('id','main_geosearch_button');        
        searchbutton.value = 'search';
        this._searchbutton = searchbutton;

        var msgbox = L.DomUtil.create('div', 'leaflet-bar message displayNone', this._container);
        this._msgbox = msgbox;

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', function() {

                if (L.DomUtil.hasClass(form, 'displayNone')) {
                    L.DomUtil.removeClass(form, 'displayNone'); // unhide form
                } else {
                    L.DomUtil.addClass(form, 'displayNone'); // hide form
                }

            })
            .on(link, 'dblclick', L.DomEvent.stopPropagation);

        L.DomEvent
            .addListener(this._searchbutton, 'click', this._onClick, this);

        L.DomEvent.disableClickPropagation(this._container);

        return this._container;
    },

    geosearch: function (qry) {
        var that = this;
        try {
            var provider = this._config.provider;

            if(typeof provider.GetLocations == 'function') {
                provider.GetLocations(qry, function(results) {
                    that._processResults(results, qry);
                });
            }
            else {
                var url = provider.GetServiceUrl(qry);
                this.sendRequest(provider, url, qry);
            }
        }
        catch (error) {
            this._printError(error);
        }
    },

    cancelSearch: function() {
        var form = this._container.querySelector('form');
        // L.DomUtil.addClass(form, 'displayNone');
        this.resetLink('glass');

        // L.DomUtil.addClass(this._msgbox, 'displayNone');

        // this._map._container.focus();
    },

    startSearch: function() {
        // show spinner icon
        // this.resetLink('spinner');
        this.geosearch($('#input_geosearch').val());
    },

    sendRequest: function (provider, url, qry) {
        var that = this;

        window.parseLocation = function (response) {
            var results = provider.ParseJSON(response);
            that._processResults(results, qry);

            document.body.removeChild(document.getElementById('getJsonP'));
            delete window.parseLocation;
        };

        function getJsonP (url) {
            url = url + '&callback=parseLocation';
            var script = document.createElement('script');
            script.id = 'getJsonP';
            script.src = url;
            script.async = true;
            document.body.appendChild(script);
        }

        if (XMLHttpRequest) {
            var xhr = new XMLHttpRequest();

            if ('withCredentials' in xhr) {
                var xhr = new XMLHttpRequest();

                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            var response = JSON.parse(xhr.responseText),
                                results = provider.ParseJSON(response);

                            that._processResults(results, qry);
                        } else if (xhr.status == 0 || xhr.status == 400) {
                            getJsonP(url);
                        } else {
                            that._printError(xhr.responseText);
                        }
                    }
                };

                xhr.open('GET', url, true);
                xhr.send();
            } else if (XDomainRequest) {
                var xdr = new XDomainRequest();

                xdr.onerror = function (err) {
                    that._printError(err);
                };

                xdr.onload = function () {
                    var response = JSON.parse(xdr.responseText),
                        results = provider.ParseJSON(response);

                    that._processResults(results, qry);
                };

                xdr.open('GET', url);
                xdr.send();
            } else {
                getJsonP(url);
            }
        }
    },

    _processResults: function(results, qry) {
        
        if (results.length > 0) {
            var text='<ul>';
            for (var i in results){
            text+='<li class="geosearch_result_li" data-lat="'+results[i].X+'" data-lng="'+results[i].Y+'" data-bounds-1="'+results[i].bounds._northEast.lat+'" data-bounds-2="'+results[i].bounds._northEast.lng+'" data-bounds-3="'+results[i].bounds._southWest.lat+'" data-bounds-4="'+results[i].bounds._southWest.lng+'" >'+results[i].Label+'</li>';
            }
            text+='<ul>';
            $('#geosearch_results').html(text);
        }
         else {
            $('#geosearch_results').html("Topilmadi !!");
        }
    },

    _showLocation: function (location, qry) {
        if (this.options.showMarker == true) {
            if (typeof this._positionMarker === 'undefined') {
                this._positionMarker = L.marker(
                    [location.Y, location.X],
                    {draggable: this.options.draggable}
                ).addTo(this._map);
                if( this.options.customIcon ) {
                    this._positionMarker.setIcon(this.options.customIcon);
                }
                if( this.options.showPopup ) {
                   this._positionMarker.bindPopup(qry).openPopup();
                }
            }
            else {
                this._positionMarker.setLatLng([location.Y, location.X]);
                if( this.options.showPopup ) {
                   this._positionMarker.bindPopup(qry).openPopup();
                }
            }
        }
        if (!this.options.retainZoomLevel && location.bounds && location.bounds.isValid()) {
            this._map.fitBounds(location.bounds);
        }
        else {
            this._map.setView([location.Y, location.X], this._getZoomLevel(), false);
        }

        this._map.fireEvent('geosearch_showlocation', {
          Location: location,
          Marker : this._positionMarker
        });
    },

    _isShowingError: false,

    _printError: function(message) {
        this._msgbox.innerHTML = message;
        L.DomUtil.removeClass(this._msgbox, 'displayNone');

        this._map.fireEvent('geosearch_error', {message: message});

        // show alert icon
        this.resetLink('alert');
        this._isShowingError = true;
    },

    _onKeyUp: function (e) {
        var esc = 27;
        if (e.keyCode === esc) { // escape key detection is unreliable
            this.cancelSearch();
        }
     },
    _onClick: function(){

        this.startSearch();

    },
    _getZoomLevel: function() {
        if (! this.options.retainZoomLevel) {
            return this._config.zoomLevel;
        }
        return this._map._zoom;
    },

    _onInput: function() {
        if (this._isShowingError) {
            this.resetLink('glass');
            L.DomUtil.addClass(this._msgbox, 'displayNone');

            this._isShowingError = false;
        }
    },

    _onKeyPress: function (e) {
        var enterKey = 13;

        if (e.keyCode === enterKey) {
            e.preventDefault();
            e.stopPropagation();

            this.startSearch();
        }
    }
});
