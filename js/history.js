import React from 'react';
import {render} from 'react-dom';
import {MainNav, ImpFileDisplay} from '../build';

render(
    (
        <MainNav/>
    ),
    document.getElementById('main-nav')
);

function getImplementedJson(done_callback){
    $.ajax({
        url:'./services/getfiles.php',
        type:'GET',
        data:{
            Filter:'BY_ELEMENT_VERSION'
        }
    })
    .done(function(result){
        done_callback(result);
    })
    .fail(function(a,b,c){
        console.log(a);
        console.log(b);
        console.log(c);
    });
}

$(document).ready(function(){
    getImplementedJson(renderSets);
});

function renderSets(Sets){
    render(
        (
            <ImpFileDisplay Sets={Sets} />
        ),
        document.getElementById('file-display')
    )
}