define(function(){
    return function(item){

        item.on('click','.button.play', function(){
            $.ajax({
                type: "POST",
                url: 'php/loadUkbbHistory.php',
                success: function(d){
                    console.log(d);
                },
                error: function(a,b,c){
                    console.log(b)
                }

            })
        });





    }
})
