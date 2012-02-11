var League = Backbone.Model.extend({
});

$(document).ready(function() {
    var hout = '';
    for (var i = 0; i < 9; i += 1) {
        var m = UBA.Man.spawn();
        hout += UBA.Man.display(m) + '<br>';
    }
    $('#pagecanvas').html('<div class="mono">' + hout + '</div>');
});
