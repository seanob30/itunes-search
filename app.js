
function urlEncode(el) {
    var holder = '';
    for (var key in el) {
        holder += encodeURIComponent(key) + '=' + encodeURIComponent(el[key]) + '&';
    }
    if (holder.length > 0) {
        holder = holder.substr(0, holder.length - 1);
    }

    return (holder);
}

function performSearch() {
    var parameters = {
        term: encodeURIComponent(jQuery('#search-keyword').val()),
        country: 'US',
        media: 'music',
        entity: 'musicTrack',
        limit: 20,
        callback: 'handleiTunesSearchResults'
    };
    var parameters = urlEncode(parameters);

    var url = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?' + parameters;
    var html = '<script src="' + url + '"><\/script>';
    jQuery('head').append(html);
}

function handleiTunesSearchResults(arg) {
    var results = arg.results;
    var html = '';
    for (var i = 0; i < results.length; i++) {
        var el = results[i];
        var jObject = {
            source: 0,
            track_id: el.trackId,
            track_name: el.trackCensoredName,
            track_url: el.trackViewUrl,
            artist_name: el.artistName,
            artist_url: el.artistViewUrl,
            collection_name: el.collectionCensoredName,
            collection_url: el.collectionViewUrl,
            genre: el.primaryGenreName
        };
        results[i] = jObject;

        html += '<div class="songs-search-result">';
        html += '<span class="track">{0}&nbsp;</span>'.replace("{0}", jObject.track_name);
        html += '<span class="artist"><a href="{0}" target="_blank">{1}</a><br /></span>'.replace("{0}",  jObject.artist_url).replace("{1}", jObject.artist_name);
        html += '<a href="{0}" target="_blank">Preview</a>&nbsp;●&nbsp;'.replace("{0}", el.previewUrl);
        html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;'.replace("{0}", jObject.track_url);
        html += '</div>';
    }
    jQuery('#itunes-results').html(html);
}

