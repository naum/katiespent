
var ATTRLIST = [ 'A', 'D', 'H', 'O' ];
var CITYPOOL = [
    'New York', 'Los Angeles', 'Chicago', 'Dallas',
    'Philadelphia', 'Houston', 'Washington', 'Miami',
    'Atlanta', 'Boston', 'San Francisco', 'Detroit',
    'Riverside', 'Phoenix', 'Seattle', 'Minneapolis',
    'San Diego', 'St. Louis', 'Tampa', 'Baltimore',
    'Denver', 'Pittsburgh', 'Portland', 'Sacramento',
    'San Antonio', 'Orlando', 'Cincinnati', 'Cleveland',
    'Kansas City', 'Las Vegas', 'San Jose', 'Columbus'
];
var SKILLMATRIX = {
    'F': [ 'W', 'K', 'P', 'R', 'G', 'T' ],
    'H': [ 'W', 'K', 'P', 'R' ],
    'P': [ 'W', 'K', 'P', 'G', 'T' ]
};
var SKILLPLANE = [
    0, 1, 3, 6, 10, 15, 21, 26, 30, 33, 35, 36
];

var rng = function(n) {
    return Math.floor(Math.random() * n);
};

var UBA = {
    
    TOTALCLUBS: 32,

    data: {
        clubs: [],
        draftneeds: [],
        freeagents: [],
        namepool: [],
        passkey: null,
        retired: [],
        seasonnum: 0
    },

    advanceSeason: function() {
        this.fluctuateManSkills();
        this.ageMan();
        this.restockMan();
        UBA.data.seasonnum += 1;
    },

    ageMan: function() {
        var m, nfal = [], t, x, z;
        while (m = UBA.data.freeagents.pop()) { 
            t = SKILLPLANE[m.attr['A'] + 2];
            x = rng(36) + 1;
            if (x <= t) {
                UBA.data.retired.push(m);
                UBA.data.draftneeds.push(m.pos);
            } else {
                z = rng(12) + 1;
                if (z <= 1) { m.attr['A'] += 1; }
                nfal.push(m); 
            }
        }
        UBA.data.freeagents = nfal;
    },

    fluctuateManSkills: function() {
        var a, i, m, o, skminmark, skplumark, 
            totfa = UBA.data.freeagents.length, x;
        for (i = 0; i < totfa; i += 1) {
            m = UBA.data.freeagents[i];
            a = (1 - m.attr['A']) + 3;
            skplumark = SKILLPLANE[a] * SKILLPLANE[m.attr['D'] + 2];
            o = (1 - m.attr['O']) + 3;
            skminmark = SKILLPLANE[m.attr['A'] + 2] * SKILLPLANE[o];
            $.each(m.skill, function(sk) {
                x = rng(1296) + 1;
                if (x <= skplumark) { 
                    m.skill[sk] += 1; 
                }
                x = rng(1296) + 1;
                if (x <= skminmark) { 
                    m.skill[sk] -= 1; 
                }
            });
        }
    },

    genesis: function() {
        var i;
        for (i = 0; i < UBA.TOTALCLUBS; i += 1) {
            $.each(UBA.Club.ROSTERMATRIX, function(p, r) {
                _.times(r.slots, function() {
                    UBA.data.freeagents.push(UBA.Man.spawn(p));
                });
            });
        }
    },

    restockMan: function() {
        var p;
        while (p = UBA.data.draftneeds.pop()) {
            UBA.data.freeagents.push(UBA.Man.spawn(p));
        }
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
            'A': [ 'y', '', 'V', '~' ],
            'D': [ 'z', '', 'I', '>' ],
            'H': [ 'd', '', 'L', '=' ],
            'O': [ 'b', '', 'H', '$' ]
        },
        SKILLMARK: {
            'W': [ 'w', '', 'C', '^' ],
            'K': [ 'm', '', 'K', '#' ],
            'P': [ 'n', '', 'P', '!' ],
            'R': [ 's', '', 'R', '+' ],
            'G': [ 'e', '', 'G', '&' ],
            'T': [ 'x', '', 'T', '@' ]
        },
        displayAttrCard: function(m) {
            var dout = '';
            $.each(m.attr, function(sk, v) {
                if (v < 0) {
                    var r = 0 - v + 1;
                    _.times(r, function() { 
                        dout += UBA.Man.ATTRMARK[sk][0];
                    });
                } else if (v <= 3) {
                    dout += UBA.Man.ATTRMARK[sk][v];
                } else {
                    var r = v - 3 + 1;
                    _.times(r, function() { 
                        dout += UBA.Man.ATTRMARK[sk][3];
                    });
                }
            });
            return dout;
        },
        displaySkillCard: function(m) {
            var dout = '';
            $.each(m.skill, function(sk, v) {
                if (v < 0) {
                    var r = 0 - v + 1;
                    _.times(r, function() { 
                        dout += UBA.Man.SKILLMARK[sk][0];
                    });
                } else if (v <= 3) {
                    dout += UBA.Man.SKILLMARK[sk][v];
                } else {
                    var r = v - 3 + 1;
                    _.times(r, function() { 
                        dout += UBA.Man.SKILLMARK[sk][3];
                    });
                }
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
            //console.log('mancard=' + JSON.stringify(mancard));
            return mancard;
        },
        worth: function(m) {
            var t = 0, tsk = 0;
            $.each(m.skill, function(s, sv) {
                t += 1;
                tsk += sv;
            });
            return (tsk / t);
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
                //url: '/words.txt', 
                url: '/words7.txt', 
                async: false, 
                success: function(d) {
                    var wordlist = d.split('\n');
                    UBA.data.namepool = _.shuffle(wordlist);
                }
            });
        }
    }

} //END UBA
