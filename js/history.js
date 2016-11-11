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

}