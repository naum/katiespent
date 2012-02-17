var League = Backbone.Model.extend({
});

$(document).ready(function() {
    var hout = '';
    for (var i = 0; i < 9; i += 1) {
        var m = UBA.Man.spawn();
        hout += '<tr><td class="celtex">' +
            m.name +
            '<td class="celtex mono">' + 
            UBA.Man.displaySkillCard(m) +
            '</tr>';
    }
    $('#pagecanvas').html('<table>' + hout + '</table>');
});
