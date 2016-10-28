import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { FilePreview } from '../';
import { EditorBox } from '../ContentEditor'


class Attachment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }

        this.onDrop = this.onDrop.bind(this);

    }
    onDrop(results) {
        this.setState({
            files: results
        })
    }
    render() {
        var highDetails = this.state.files.length + " File(s) To Be Checked-In";
        return (

            <div className='attachment-wrapper'>
                <div className='attachment-zone'>
                    <h1 className='center-helper'>Attach New Elements For Preview</h1>
                    <Dropzone className='attachments' activeClassName="dragon" onDrop={this.onDrop} disableClick multiple>
                        <div className='default-msg'>
                            <p className='attachment-instructions'>Drop Files Here</p>
                            <i className='attachment-flair fa fa-anchor' />
                        </div>
                        <div className='dragged-msg'>
                            <p className='attachment-instructions'>Drop to upload</p>
                            <i className='attachment-flair fa fa-telegram' />
                        </div>
                    </Dropzone>
                </div>
                
                {this.state.files.length > 0 ?
                    <div className='attachment-preview clear'>
                        <h2 className='high-details'>{highDetails}</h2>
                        {this.state.files.map((file, i) => {
                            const opt = {
                                file: file,
                                childKey: i
                            };
                            return (
                                <FilePreview {...opt} key={i} />
                            )
                        }
                        )}
                        <EditorBox />
                    </div>
                    : null}
            </div>
        )
    }
}

export default Attachment;