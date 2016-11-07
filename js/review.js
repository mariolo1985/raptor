import React from 'react';
import { render } from 'react-dom';
import FileDisplay from '../build/FileDisplay/FileDisplay.js';
import {MainNav} from '../build';

window.onload = function () {
    render(
        (
            <MainNav />
        ),
        document.getElementById('main-nav')
    );
    getPendingElements();

}


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
                    Filter: "BY_SETID",
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

