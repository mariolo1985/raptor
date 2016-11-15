import React from 'react';
import { render } from 'react-dom';
import {MainNav,FileDisplay} from '../build';

render(
    (
        <MainNav />
    ),
    document.getElementById('main-nav')
);
getPendingElements();




// GETS PENDING ELEMENTS
function getPendingElements() {

    $.ajax({
        //  THIS CALLS THE DB ON PENDING ELEMENTS TABLE
        url: './services/getfiles.php',
        type: 'GET',
        dataType: 'json',
        data: {
            Filter: "PENDING_ELEMENTS"
        }
    })
        .done(function (result) {
            $.ajax({
                // GET EACH SET FILE IN A SET
                url: './services/getfiles.php',
                type: 'GET',
                dataType: 'json',
                data: {
                    Filter: "BY_SETS",
                    Sets: result
                }
            })
                .done(function (result) {
                    renderElements(result);
                })
                .fail(function (a, b, c) {
                    console.log('Failed BY_SETID POST');
                    console.log(a);
                    console.log(b);
                    console.log(c);
                });
        })
        .fail(function (a, b, c) {
            console.log('Failed PENDING_ELEMENTS POST');
            console.log(a);
            console.log(b);
            console.log(c);
        })

}


// COMPONENT
function renderElements(elements) {

    render(
        (
            <FileDisplay sets={elements} />
        ),
        document.getElementById('file-display')
    );
}

