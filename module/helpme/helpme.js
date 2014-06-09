helpme={
    init: function(html){
        var s = this;
        if(!this.el){
            this.__proto__ = home;
            this.el = $(document.createElement('div'));
            this.el.attr('class', 'helpme');
            s.el.append(html)
            $('.content').append(s.el);
          //  app.mask.show(s.el.find('.container-imgs'));
            s.events();
        }
        this.show();
        app.navTabs(5);
    }
}