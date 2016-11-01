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
        this.postFiles = this.postFiles.bind(this);
    }
    onDrop(results) {
        this.setState({
            files: results
        })
    }
    postFiles() {
        console.log('post file called');
        console.log(this.state.files);

        var fd = new FormData();
        for (var i = 0; i < this.state.files.length; i++) {
            fd.append('file_' + i+1, this.state.files[i]);
        }
        console.log(fd);
        
        $.ajax({
            url: './services/putfile.php',
            type: 'POST',
            cache: false,
            contentType: false,
            processData: false,
            data: fd
        })
            .done(function (a, b, c) {
                console.log('Success POST');
                console.log(a);
                console.log(b);
                console.log(c);
            })
            .fail(function (a, b, c) {
                console.log('Failed POST');
                console.log(a);
                console.log(b);
                console.log(c);
            });
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
                        <EditorBox onPostFiles={this.postFiles} />
                    </div>
                    : null}
            </div>
        )
    }
}

export default Attachment;