"use strict"
define(()=>{

  return (url)=>{
    return new Promise((resolve, reject)=>{
      const img = new Image();

      const load = ()=>{
        resolve(img);
        off();
      };
      const error = (e)=>{
        reject(e.message);
        off();
      };

      const off = () =>{
        img.removeEventListener('load', load);
        img.removeEventListener('error', error );
        img.parentNode.removeChild(img);
      };



      img.addEventListener('load', load);
      img.addEventListener('error', error );

      img.style.display = 'none';
      img.src = url

      document.body.appendChild(img)

    })
  }

});
