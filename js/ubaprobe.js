$(document).ready(function() {

    test("UBA initialized", function() {
        ok(UBA, "UBA exists");
    });

    UBA.genesis();
    var totfa = UBA.data.freeagents.length;
    test("UBA loaded " + totfa + " freeagents", function() {
        equal(UBA.data.freeagents.length, UBA.TOTALCLUBS * 13, 
            "total freeagents: " + UBA.data.freeagents.length);
    });

    test("Mean skill, mean attribute, mean age within bounds", function() {
        var meanskill = calcMeanSkill();
        ok(meanskill > 0.95 && meanskill < 1.05, 'mean skill: ' + meanskill); 
        var meanattr = calcMeanAttr();
        ok(meanattr > 0.95 && meanattr < 1.05, 'mean attr: ' + meanattr);
        var meanage = calcMeanAge();
        ok(meanage > 0.9166 && meanage < 1.0833, 'mean age: ' + meanage);
    });

    test("League aging", function() {
        var i;
        for (i = 0; i < 500; i += 1) {
            UBA.advanceSeason();
            equal(UBA.data.seasonnum, i + 1, 'seasonnum: ' + UBA.data.seasonnum);
            equal(UBA.data.freeagents.length, UBA.TOTALCLUBS * 13, 
                "total freeagents: " + UBA.data.freeagents.length);
            var meanskill = calcMeanSkill();
            ok(meanskill > 0.95 && meanskill < 1.05, 'mean skill: ' + meanskill); 
            var meanattr = calcMeanAttr();
            ok(meanattr > 0.95 && meanattr < 1.05, 'mean attr: ' + meanattr);
            var meanage = calcMeanAge();
            ok(meanage > 0.9 && meanage < 1.1, 'mean age: ' + meanage);
        }
    });

});

var calcMeanAge = function() {
    var attrcount = 0, agetotal = 0;
    $.each(UBA.data.freeagents, function(i, fa) {
        attrcount += 1;
        agetotal += fa.attr.A;
    });
    return (agetotal / attrcount);
};

var calcMeanAttr = function() {
    var attrcount = 0, attrtotal = 0;
    $.each(UBA.data.freeagents, function(i, fa) {
        $.each(fa.attr, function(a, attrmark) {
            attrcount += 1;
            attrtotal += attrmark;
        });
    });
    return (attrtotal / attrcount);
};

var calcMeanSkill = function() {
    var skcount = 0, sktotal = 0;
    $.each(UBA.data.freeagents, function(i, fa) {
        $.each(fa.skill, function(sk, skrank) {
            skcount += 1;
            sktotal += skrank;
        });
    });
    return (sktotal / skcount);
};
