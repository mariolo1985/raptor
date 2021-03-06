import React, { Component } from 'react'

class FilePreview extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var key = this.props.childKey;
        var fileCounter = key + 1;
        var file = this.props.file,
            filename = file.name,
            extIndex = filename.lastIndexOf("."),
            fileExt = filename.substring(extIndex + 1);
        var isSketchFile = false;


        if (fileExt.toLowerCase() == "sketch") {
            isSketchFile = true;
        }

        return (
            <div className='attachment-item'>
                <div className='center-helper'>
                    <h3 className='attachment-counter'>File {fileCounter}</h3>
                    <i className='file-icon fa fa-file-image-o' />
                    <span className='attachment-filename'>{file.name}</span>
                </div>
            </div>
        )
    }
}

export default FilePreview

