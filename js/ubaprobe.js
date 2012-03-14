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

});
