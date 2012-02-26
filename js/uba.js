var UBA = {

    data: {
        freeagents: [],
        namepool: [],
        passkey: null,
        seasonnum: 0
    },

    genesis: function() {
    },

    Man: {
        ATTRCHART: {
            'A': [ 'y', '', 'V', '~', '~~' ],
            'D': [ 'z', '', 'I', '>', '>>' ],
            'H': [ 'd', '', 'L', '=', '==' ],
            'O': [ 'b', '', 'H', '$', '$$' ]
        },
        SKILLCHART: [ 'W', 'K', 'P', 'R', 'G', 'T' ],
        SKILLMARK: {
            'W': [ 'w', '', 'C', '^', '^^' ],
            'K': [ 'm', '', 'K', '#', '##' ],
            'P': [ 'n', '', 'P', '!', '!!' ],
            'R': [ 's', '', 'R', '+', '++' ],
            'G': [ 'e', '', 'G', '&', '&&' ],
            'T': [ 'x', '', 'T', '@', '@@' ]
        },
        displaySkillCard: function(m) {
            var dout = '';
            $.each(m.skill, function(sk, v) {
                dout += UBA.Man.SKILLMARK[sk][v];
            });
            return dout;
        },
        randSkill: function() {
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
        spawn: function() {
            var skdict = {};
            for (var i = 0; i < UBA.Man.SKILLCHART.length; i += 1) {
                skdict[UBA.Man.SKILLCHART[i]] = this.randSkill();
            }
            var mancard = {
                name: UBA.Namepool.draw(),
                skill: skdict
            }
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
