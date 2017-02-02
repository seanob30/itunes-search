$(function() {
    $("#search-button").on("click", function() {
    var parameter = $("#search-keyword").val();
    var url = 'http://itunes.apple.com/search?limit=20&term=' + parameter;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'jsonp',
        success: function(arg){
            console.log(arg);
            handleiTunesSearchResults(arg);
        }
    });
});
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
        html += '<span class="artist"><a href="{0}" target="_blank">{1}</a><br /></span>'.replace("{0}", jObject.artist_url).replace("{1}", jObject.artist_name);
        html += '<a href="{0}" target="_blank">Preview</a>&nbsp;●&nbsp;'.replace("{0}", el.previewUrl);
        html += '<a href="{0}" target="_blank">Full Song</a>&nbsp;'.replace("{0}", jObject.track_url);
        html += '</div>';
    }
    $('#itunes-results').html(html);
}});

