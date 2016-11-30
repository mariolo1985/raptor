import React, {Component} from 'react';
import {ImpItem} from './';

class ImpFileDisplay extends Component{
    constructor(props){
        super(props);
    }// end construtor
    render(){

        return(
            <div className='file-display-wrapper'>
                {
                    this.props.Sets.length > 0 ?
                    this.props.Sets.map((set,i) =>{
                        return(
                            <ImpItem key={i} Set={set}/>
                        );
                    })
                    : null
                }
            </div>
        );
    }// end render
}

export default ImpFileDisplay;
