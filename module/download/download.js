var download = {
    navTabs: 8,
    el: null,
    _init: function(){

        $('#fine-uploader').fineUploader({
            request: {
                endpoint: 'php/FineUploader.php'
            }
        })

    }
};
download.__proto__ = ModuleController;
