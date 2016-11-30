import React from 'react';
import { render } from 'react-dom';
import {MainNav,FileDisplay} from '../build';

render(
    (
        <MainNav />
    ),
    document.getElementById('main-nav')
);

$(document).ready(function(){
    getPendingElements(renderElements);
});


// COMPONENT
function renderElements(elements) {

    render(
        (
            <FileDisplay sets={elements} />
        ),
        document.getElementById('file-display')
    );
}