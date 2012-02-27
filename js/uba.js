
var ATTRLIST = [ 'A', 'D', 'H', 'O' ];
var SKILLMATRIX = {
    'F': [ 'W', 'K', 'P', 'R', 'G', 'T' ],
    'H': [ 'W', 'K', 'P', 'R' ],
    'P': [ 'W', 'K', 'P', 'G', 'T' ]
};

var UBA = {
    
    TOTALCLUBS: 32,

    data: {
        freeagents: [],
        namepool: [],
        passkey: null,
        seasonnum: 0
    },

    genesis: function() {
    },

    Club: {
        ROSTERMATRIX: {
            'O': { slots:3, skillchart: SKILLMATRIX['F'] },
            'I': { slots:4, skillchart: SKILLMATRIX['F'] },
            'C': { slots:1, skillchart: SKILLMATRIX['F'] },
            'H': { slots:1, skillchart: SKILLMATRIX['H'] },
            'P': { slots:4, skillchart: SKILLMATRIX['P'] }
        }
    },

    Man: {
        ATTRMARK: {
            'A': [ 'y', '', 'V', '~', '~~' ],
            'D': [ 'z', '', 'I', '>', '>>' ],
            'H': [ 'd', '', 'L', '=', '==' ],
            'O': [ 'b', '', 'H', '$', '$$' ]
        },
        SKILLMARK: {
            'W': [ 'w', '', 'C', '^', '^^' ],
            'K': [ 'm', '', 'K', '#', '##' ],
            'P': [ 'n', '', 'P', '!', '!!' ],
            'R': [ 's', '', 'R', '+', '++' ],
            'G': [ 'e', '', 'G', '&', '&&' ],
            'T': [ 'x', '', 'T', '@', '@@' ]
        },
        displayAttrCard: function(m) {
            var dout = '';
            $.each(m.attr, function(sk, v) {
                dout += UBA.Man.ATTRMARK[sk][v];
            });
            return dout;
        },
        displaySkillCard: function(m) {
            var dout = '';
            $.each(m.skill, function(sk, v) {
                dout += UBA.Man.SKILLMARK[sk][v];
            });
            return dout;
        },
        randQuality: function() {
            var sk = null;
            var x = Math.floor(Math.random() * 432) + 1;
            if (x <= 125) {
                sk = 0;
            } else if (x <= 325) {
                sk = 1;
            } else if (x <= 415) {
                sk = 2;
            } else if (x <= 431) {
                sk = 3;
            } else if (x <= 432) {
                sk = 4;
            }
            return sk;
        },
        spawn: function(p) {
            var attrdict = {}, skdict = {};
            var l = UBA.Club.ROSTERMATRIX[p].skillchart.length;
            for (var i = 0; i < l; i += 1) {
                var sk = UBA.Club.ROSTERMATRIX[p].skillchart[i];
                skdict[sk] = this.randQuality();
            }
            for (var i = 0; i < ATTRLIST.length; i += 1) {
                attrdict[ATTRLIST[i]] = this.randQuality();
            }
            var mancard = {
                pos: p,
                name: UBA.Namepool.draw(),
                attr: attrdict,
                skill: skdict
            }
            console.log('mancard=' + JSON.stringify(mancard));
            return mancard;
        }
    },

    Namepool: {
        draw: function() {
            if (UBA.data.namepool.length == 0) {
                UBA.Namepool.replenish();
            }
            return UBA.data.namepool.pop();
        },
        replenish: function() {
            $.ajax({
                url: '/words.txt', 
                async: false, 
                success: function(d) {
                    var wordlist = d.split('\n');
                    UBA.data.namepool = _.shuffle(wordlist);
                }
            });
        }
    }

}
