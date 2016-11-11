import React, { Component } from 'react';

class MainNav extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <section className='header-wrapper clear'>
                <div className='logo-header header-content'>
                    <div className='logo'>
                        <a href='/raptor' className='header-logo-link'>
                            <img src='./images/raptor.png' className='header-img' alt='raptor.com' />
                        </a>
                        <span>RAPTOR</span>
                    </div>
                </div>
                <div className='menu-wrapper header-content'>
                    <ul className='menu clear'>
                        <li className='menu-item'>
                            <a href='./index.html' className='menu-link'>Add Elements</a>
                        </li>
                        <li className='menu-item'>
                            <a href='./review.html' className='menu-link'>Review</a>
                        </li>
                        <li className='menu-item'>
                            <a href='./history.html' className='menu-link'>History</a>
                        </li>

                    </ul>
                </div>
                <div className='search-wrapper header-content'>
                    <button className='btn-search'>
                        <i className='fa fa-search'></i>
                    </button>
                </div>
            </section>
        )
    }
}
export default MainNav;