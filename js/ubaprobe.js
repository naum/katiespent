$(document).ready(function() {

    test("UBA initialized", function() {
        ok(UBA, "no UBA defined");
    });

    UBA.genesis();
    var totfa = UBA.data.freeagents.length;
    test("UBA loaded " + totfa + " freeagents", function() {
        equal(UBA.data.freeagents.length, UBA.TOTALCLUBS * 13, 
            "total freeagents: " + UBA.data.freeagents.length);
    });

    var meanskill = calcMeanSkill();
    test("Mean skill within bounds", function() {
        ok(meanskill > 0.95 && meanskill < 1.05,
            'mean skill: ' + meanskill + ', not within 5%'); 
    });

});

var calcMeanSkill = function() {
    var skcount = 0, sktotal = 0;
    $.each(UBA.data.freeagents, function(i, fa) {
        $.each(fa.skill, function(sk, skrank) {
            skcount += 1;
            sktotal += skrank;
        });
    });
    console.log('skcount: ' + skcount + ', sktotal: ' + sktotal);
    return (sktotal / skcount);
};
