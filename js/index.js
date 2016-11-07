import React from 'react';
import { render } from 'react-dom';
import { MainNav, Attachment } from '../build';

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