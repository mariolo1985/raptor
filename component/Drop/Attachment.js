import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { FilePreview } from '../';


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

        var tempFiles = [];
        if (this.state.files.length > 0) {
            this.state.files.map((file) => {
                tempFiles.push(file);
            })
        }
        results.map((file) => {
            tempFiles.push(file);
        });
        this.setState({
            files: tempFiles
        })
    }
    postFiles() {
        var fd = new FormData();
        for (var i = 0; i < this.state.files.length; i++) {
            fd.append('file_' + i + 1, this.state.files[i]);
        }
        var comments = $('.editor').html();
        putFile(fd, comments);
    }
    componentDidUpdate() {
        createEditor();
    }
    render() {
        var highDetails = this.state.files.length + " File(s) To Be Checked-In";
        var resetClass = this.state.files.length > 0 ? "btn btn-reset" : "btn btn-reset disabled";
        var checkinClass = this.state.files.length > 0 ? "btn btn-checkin" : "btn btn-checkin disabled";
        return (

            <div className='attachment-wrapper'>
                <div className='attachment-zone'>
                    <h1 className='center-helper'>Attach New Elements For Review</h1>
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
                    </div>
                    :
                    null
                }

                {this.state.files.length > 0 ?
                    <div className='attachment-editor-wrapper'>
                        <h3>Enter Check-In Comments:</h3>
                        <div className='toolbar'></div>
                        <div className='editor'></div>
                        <div className='action-buttons'>
                            <button className={resetClass}>Reset Form</button>
                            <button className={checkinClass} onClick={this.postFiles}>Check In</button>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Attachment;