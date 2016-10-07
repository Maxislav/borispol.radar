
function FileUpload() {
    this.navTabs = 8;
    this.el = null;
    this.elLi = null;
    this._init = function () {

        var form = document.getElementById('file-form');

        var elSelectFile = form.getElementsByTagName('button')[0];

        var fileSelect = document.getElementById('file-select');
        var uploadButton = document.getElementById('upload-button');
        var files = null;
        var formData;
        var fileName = null;


        fileSelect.addEventListener('change', function (e) {
            console.log(this.files[0].name);
            elSelectFile.innerHTML = this.files[0].name;
            fileName = this.files[0].name;
            if(!fileName.match(/(\.jpg)|(\.JPG)$/)){
                alert('Разрешен только jpg')
            }
        });
        elSelectFile.addEventListener('click', selectFile);
        function selectFile(e) {
            e.preventDefault();
            this.parentElement.getElementsByTagName('input')[1].click()
        }

        form.onsubmit = function(event) {
            event.preventDefault();
            if(!fileName.match(/(\.jpg)|(\.JPG)$/)){
                alert('Разрешен только jpg')
                return;
            }

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
                    if(isNumber(xhr.response)){
                        console.log(xhr.response);
                        replaceImg(parseInt(xhr.response));
                    }
                    uploadButton.innerHTML = 'Отправить';

                } else {
                    alert('An error occurred!');
                }
            };
            xhr.send(formData);
        }

        var imgContainer =  this.el[0].getElementsByClassName('images-bg-container')[0];

        var i = 1;

        while (i<9){

            (function (i) {
                var elContainer = document.createElement('div');




                elContainer.setAttribute('class', 'img-container');
                var elImg = document.createElement('img');
                elImg.src = 'img/bg/'+i+'.jpg?'+new Date().getTime();
                elImg.style.opacity = 0;
                elImg.onload = function () {
                    $(elImg).fadeTo(222, 1);
                    app.mask.hide($(elContainer));
                };
                imgContainer.appendChild(elContainer);
                elContainer.appendChild(elImg);

                app.mask.show($(elContainer));

            })(i);

            i++;
        }

        function replaceImg(n) {
            var img = imgContainer.getElementsByTagName('img')[n];
            img.src = img.src+'?'+new Date().getTime();
        }

        function isNumber (o) {
            return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
        }
    }

}

FileUpload.prototype = ModuleController;

var fileupload = new FileUpload();

