import React, {Component} from 'react';

class ImpItem extends Component{
    constructor(props){
        super(props);
    }
    createMarkup(html) {
        // CREATE MARKUP FOR HTML INJECTION
        return { __html: html };
    }
    render(){
        var jSet = JSON.parse(this.props.Set);
        var item = jSet[0];
        
        var setObj = {};
        setObj.SetId = item['SetId'];
        setObj.VersionNum = item['VersionNum'];
        setObj.VersionDate = item['VersionDate'];
        setObj.Comments = this.createMarkup(item['Comments']);
        setObj.Filenames = item['Filenames'];


        return (
            <div className='file-set-container' data-setid={setObj.SetId}>
                <div className='file-row clear'>
                    <div className='file-status-row approved'>
                        <span className='file-status'>Version {setObj.VersionNum}</span>
                    </div>
                    <div className='file-set'>
                        {
                            setObj.Filenames.length>0?
                            setObj.Filenames.map((filename,i)=>{
                                var link = './implemented_elements/' + setObj.SetId + '/' + filename['filename'];
                                return(
                                    <div className='file-item' key={i}>
                                        <a className='file-link' href={link}>{filename['filename']}</a>
                                    </div>
                                )
                            }):
                            null
                        }
                    </div>
                    <div className='file-comments-container'>
                        <span className='file-comments-heading'>Comments:</span>
                        <div className='file-comments' dangerouslySetInnerHTML={setObj.Comments}></div>
                    </div>
                </div>
            </div>
        )
    }// end render
}

export default ImpItem;