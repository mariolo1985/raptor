import React from 'react';
import {render} from 'react-dom';
import {MainNav} from '../build';

window.onload = function(){


    render(
        (
            <MainNav/>
        ),
        document.getElementById('main-nav')
    );

    
    var setid = getParameterByName('setid');
    if (setid!=null){
        // CALL GET SET ID
        $.ajax({
            url:'./services/getfiles.php',
            type:'GET',
            data:{
                Filter:'BY_SETID',
                SetId:setid
            }
        }).done(function(result){
            console.log(result);
        }).fail(function(a,b,c){
            console.log('failed');
            console.log(a);
            console.log(b);
            console.log(c);
        })
    }
}