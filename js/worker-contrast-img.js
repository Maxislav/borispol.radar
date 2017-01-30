"use strict";
onmessage = (e)=>{
  const arrData = e.data[0]
  for (let i = 0; i<arrData.length; i+=4){
    for(let k = 0; k<3; k++){
      const x = arrData[i+k];
      arrData[i+k] = x - ((1 - x/255))*x
    }
  }
  postMessage([arrData]);
  close()
};
