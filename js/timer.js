/**
 * Created with JetBrains WebStorm.
 * User: Администратор
 * Date: 8/1/13
 * Time: 8:47 PM
 * To change this template use File | Settings | File Templates.
 */
function Timer(){
    this.time = null;
    this.init = function(){

        document.getElementById('hh').innerHTML = timer.checkNull(new Date().getHours()) +':';
        document.getElementById('mi').innerHTML = timer.checkNull(new Date().getMinutes())+':';
        document.getElementById('ss').innerHTML = timer.checkNull(new Date().getSeconds());
        setTimeout(function(){
            timer.init();
        },500)
    }

    this.checkNull = function(val){
        if(val<10){
            return '0'+val
        }else{
            return val;
        }
    }
}
var timer = new Timer();
