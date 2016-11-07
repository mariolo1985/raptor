import React, { Component } from 'react';

class DisplaySet extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var jSet = JSON.parse(this.props.set);
        var uploadDate;
        var filenames= [];
        jSet.map((item, i) => {
            if (item['Upload Date']) {
                uploadDate = item['Upload Date'];
            } else if (item['filename']) {
                filenames.push(item['filename']);
            }
        });
        return (
            <div className='file-set'>
                <h2>{uploadDate}</h2>
                {
                    filenames.map((item, i) => {
                        return (
                            <p key={i}>{item}</p>
                        );
                    })
                }
            </div>
        )
    }
}

export default DisplaySet;