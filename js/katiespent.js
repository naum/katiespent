var Shape = Backbone.Model.extend({
    defaults: { x:50, y:50, width:150, height:150, color:'red' },
    setDim: function(w, h) {
        this.set({ width:w, height:h });
    },
    setTopLeft: function(x, y) {
        this.set({ x:x, y:y });
    }
});

var shape = new Shape();
shape.bind('change', function() { alert('changed!'); });
shape.bind('change:width', function() { alert('width changed! ' + shape.get('width')); });

shape.set({ width:170 });
shape.setTopLeft(100, 100);
