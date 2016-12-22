"use strict";
define(['js/moduleController.js', "module/ymetrika/local-starage.js" ], function (ModuleController, LocalStorage) {

    function FileUpload() {
        this.navTabs = 8;
        this.el = null;
        this.elLi = null;
        this._init = function () {
            var s = this;
            
            var localStorage = new LocalStorage();
            

            var form = document.getElementById('file-form');

            var elSelectFile = form.getElementsByTagName('button')[0];

            var fileSelect = document.getElementById('file-select');
            var uploadButton = document.getElementById('upload-button');
            var files = null;
            var formData;
            var fileName = null;


            fileSelect.addEventListener('change', function (e) {
                if(!this.files.length) return;
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
                s.progressLoader.fadeTo(222, 1)

                files = fileSelect.files;
                formData = new FormData();
                formData.append('afile', files[0], localStorage.hash );
                //formData.append('hash', localStorage.hash);
                post();
                uploadButton.innerHTML = 'Загрузка...';

            };



            function post() {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', form.action, true);
                //xhr.setRequestHeader('Content-Type','image/gif');
                xhr.upload.onprogress = function (event) {

                    s.progressBar.css({
                        width: (100*event.loaded / event.total) + '%'
                    });
                    //console.log(event.loaded + ' / ' + event.total);
                };
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        try {
                            var res = JSON.parse(xhr.response);
                            if(isNumber(res.n)){
                                replaceImg(parseInt(res.n));
                                fileSelect.value = '';
                                uploadButton.innerHTML = 'Отправить';
                                s.progressLoader.fadeTo(222, 0, function () {
                                    s.progressBar.css({
                                        width: '0'
                                    });
                                });
                                elSelectFile.innerHTML = 'Выбрать файл';

                            }else{
                                alert('An error occurred!');
                            }
                            
                        }catch (e){
                            console.error(e)
                        }
                        console.log();
                        
                    } else {
                        alert('An error occurred!');
                    }
                };
                xhr.send(formData);
            }

            var imgContainer =  this.el[0].getElementsByClassName('images-bg-container')[0];

            $(imgContainer).on('click', 'img', function () {
                var attrSrc = $(this).attr('src');
                $('.background-image').fadeTo(222,0, function () {
                    $(this).css('background-image', 'url(' + attrSrc+')');
                    $(this).fadeTo(222,1)
                });
            });

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
                try {
                    var img = imgContainer.getElementsByTagName('img')[n];
                    img.src = img.src+'?'+new Date().getTime();
                }catch(err){
                    console.err(n, err)
                }
            }

            function isNumber (o) {
                return ! isNaN (o-0) && o !== null && o !== "" && o !== false;
            }
        }

    }

    FileUpload.prototype = ModuleController;

   return new FileUpload();

});

