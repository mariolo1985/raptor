import React, { Component } from 'react';
import { DisplaySet } from '../';


class FileDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sets:[]
        }

        this.getPendingElements = this.getPendingElements.bind(this);
        this.updateSets = this.updateSets.bind(this);

        this.getPendingElements();// GET PENDING ELEMENTS
    }
    getPendingElements(){
        getPendingElements(this.updateSets);
    }    
    updateSets(sets){
        this.setState({
            sets: sets
        })
    }
    render() {
        return (
            <div className='file-display-wrapper'>
                <h1>({this.state.sets.length}) Pending Sets In Review</h1>
                {
                    this.state.sets.length > 0 ?
                     this.state.sets.map((set, i) => {
                        return (
                            <DisplaySet set={set} key={i} refresh={this.getPendingElements}/>
                        );
                    })
                     : null
                }
            </div>
        )
    }
}

export default FileDisplay;