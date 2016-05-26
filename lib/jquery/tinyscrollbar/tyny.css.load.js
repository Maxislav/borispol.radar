/**
 * Created by mars on 5/26/16.
 */
(function(){
        require([
            'text' + '!' + 'lib/jquery/tinyscrollbar/tinyscrollbar.css'
        ], function(css){
            //$(document).tooltip()
            if (!app.css['tiny']) {
                $('head').append('<style name="tinyscrollbar">' + css + '</style>');
                app.css['tiny'] = true;
            }
        });
})();