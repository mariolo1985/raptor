import React, { Component } from 'react';
import { DisplaySet } from '../';


class FileDisplay extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <div className='file-display-wrapper'>
                <h1>({this.props.sets.length}) Pending Sets In Review</h1>
                {
                    this.props.sets.map((set, i) => {
                        return (
                            <DisplaySet set={set} key={i} />
                        );
                    })
                }
            </div>
        )
    }
}

export default FileDisplay;