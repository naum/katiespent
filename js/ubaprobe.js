$(document).ready(function() {

    test("UBA initialized", function() {
        ok(UBA, "no UBA defined");
    });

    test("UBA loaded", function() {
        UBA.genesis();
        equal(UBA.data.clubs.length, 32, 
            "total clubs: " + UBA.data.clubs.length);
    });

});
