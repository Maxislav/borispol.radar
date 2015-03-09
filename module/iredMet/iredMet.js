var iredMet = {
    el: null,
    init: function(html){
        var s = this;
        if(!this.el){
            this.__proto__ = home;
            this.el = $(document.createElement('div'));
            this.el.attr('class', 'iredMet');
            s.el.append(html)
            $('.content').append(s.el);
            app.mask.show(s.el.find('.container-imgs'));
            s.events();
        }
        this.show();
        app.navTabs(2);
    },
    events: function(){
        var s = this;
        require([
            'module/iredMet/events'
        ], function(js){
            new js(s.el)
        })
    }
}