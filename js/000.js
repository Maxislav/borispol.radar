vipanel.on('click', '.glyphicon-play',
    function () {
        if (!s.irState.play) {
            s.viState.plat = true;
            $(this).addClass('active');
            require(['vi'], function (r) {
                vi.play();
            })
        }
    }).on('click', '.glyphicon-step-backward',
    function () {
        $(this).addClass('active')
        s.viState.back = true;
        require(['vi'], function (r) {
            vi.back();
        })
    }).on('click', '.glyphicon-step-forward',function () {
        $(this).addClass('active')
        s.viState.forward = true;
        require(['vi'], function (r) {
            vi.forward();
        })
    }).on('click', '.glyphicon-refresh', function () {

        $(this).addClass('active');
        app.mask.show($('.small-images.vi'))
        require(['vi'], function () {
            vi.refresh();
        })
    })