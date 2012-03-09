var League = Backbone.Model.extend({
});

$(document).ready(function() {
    var hout = '';
    UBA.genesis();
    hout += '<tr><th class="celtex">POS</th>' +
        '<th class="celtex">NAME</th>' +
        '<th class="celtex">ATTR</th>' +
        '<th class="celtex">SKILL</th>' + 
        '<th class="celnum">WORTH</th>' + '</tr>';
    var totfa = UBA.data.freeagents.length;
    UBA.data.freeagents.sort(function(a, b) {
        return UBA.Man.worth(b) - UBA.Man.worth(a);
    });
    for (var i = 0; i < totfa; i += 1) {
        var m = UBA.data.freeagents[i]; 
        hout += '<tr><td class="celtex">' +
            m.pos + '<td class="celtex">' + m.name +
            '<td class="celtex mono">' + 
            UBA.Man.displayAttrCard(m) +
            '<td class="celtex mono">' + 
            UBA.Man.displaySkillCard(m) +
            '<td class="celnum mono">' + 
            UBA.Man.worth(m).toFixed(2) +
            '</tr>';
    }
    $('#pagecanvas').html('<table class="cardchart">' + hout + '</table>');
});
