
function FileUpload() {
    this.navTabs = 8;
    this.el = null;
    this._init = function () {
        var form = document.getElementById('file-form');

        var elSelectFile = form.getElementsByTagName('button')[0];

        var fileSelect = document.getElementById('file-select');
        var uploadButton = document.getElementById('upload-button');
        var files = null;
        var formData;

        fileSelect.addEventListener('change', function (e) {
            console.log(this.files[0].name)
            //elFileName.innerHTML = this.files[0].name
            elSelectFile.innerHTML = this.files[0].name

        });
        elSelectFile.addEventListener('click', selectFile)
        function selectFile(e) {
            e.preventDefault();
            this.parentElement.getElementsByTagName('input')[1].click()
        }

        form.onsubmit = function(event) {
            event.preventDefault();
            console.log('send');

            files = fileSelect.files;
            formData = new FormData();
            formData.append('afile', files[0]);
            post();
            uploadButton.innerHTML = 'Загрузка...';

        };
        
       

        function post() {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', form.action, true);
            //xhr.setRequestHeader('Content-Type','image/gif');

            xhr.onload = function () {
                if (xhr.status === 200) {
                    console.log(xhr.response);
                    uploadButton.innerHTML = 'Отправить';

                } else {
                    alert('An error occurred!');
                }
            };
            xhr.send(formData);
        }
    }

}

FileUpload.prototype = ModuleController;

var fileupload = new FileUpload();

