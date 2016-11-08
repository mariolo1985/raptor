import React from 'react';
import { render } from 'react-dom';
import { MainNav, Attachment } from '../build';


function putFile(formdata) {
    $.ajax({
        url: './services/putfile.php',
        type: 'POST',
        cache: false,
        processData: false,
        contentType: false,
        data: formdata
    })
        .done(function (result, b, c) {
            // ONCE UPLOADED THAN ADD METADTA TO DB

            $.ajax({
                url: './services/addfilemeta.php',
                type: 'POST',
                data:
                {
                    SetId: result
                }
            })
                .done(function (result, b, c) {
                    console.log('Success POST addfilemeta');
                    window.location = './review.html';
                })
                .fail(function (a, b, c) {
                    console.log('Failed POST');
                    console.log(a);
                    console.log(b);
                    console.log(c);
                });

        })
        .fail(function (a, b, c) {
            console.log('Failed POST');
            console.log(a);
            console.log(b);
            console.log(c);
        });

}


render(
    (
        <MainNav />
    ),
    document.getElementById('main-nav')
);
render(
    (
        <Attachment />
    ),
    document.getElementById('attachment-here')
);