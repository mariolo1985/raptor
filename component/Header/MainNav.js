import React, { Component } from 'react';

class MainNav extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount(){

        var path = window.location.pathname;
        var index = path.lastIndexOf("/")+1;''
        var pageUrl = path.substring(index);

        $('.menu-item .menu-link[href*="' + pageUrl + '"]').parents('.menu-item').addClass('selected');
    }
    render() {
        return (
            <section className='header-wrapper clear'>
                <div className='logo-header header-content'>
                    <div className='title-wrapper'>
                        <span className='header-title'>RAPTOR</span>
                    </div>
                    <div className='logo'>
                        <a href='/raptor' className='header-logo-link'>
                            <img src='./images/raptor.png' className='header-img' alt='raptor.com' />
                        </a>                        
                    </div>
                </div>

                <div className='menu-wrapper header-content'>
                    <ul className='menu clear'>
                        <li className='menu-item'>
                            <a href='./index.html' className='menu-link'><img className='menu-icon' src='./images/addelementicon.png'/></a>
                        </li>
                        <li className='menu-item'>
                            <a href='./review.html' className='menu-link'><img className='menu-icon' src='./images/reviewicon.png'/></a>
                        </li>
                        <li className='menu-item'>
                            <a href='./history.html' className='menu-link'><img className='menu-icon' src='./images/historyicon.png'/></a>
                        </li>

                    </ul>
                </div>
            </section>
        )
    }
}
export default MainNav;