import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';


class Attachment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }

        this.onDrop = this.onDrop.bind(this);
    }
    onDrop(acceptedFiles, rejectedFiles) {
        this.setState({
            files: acceptedFiles
        })
    }
    render() {
        return (
            <div>
                <Dropzone onDrop={this.onDrop} disabledClick='true' multiple>
                    <p>Drop something here</p>
                </Dropzone>

                {this.state.files.length > 0 ?
                    <div>
                        {this.state.files.map((file) =>
                            <img src={file.preview} />
                        )}
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default Attachment;