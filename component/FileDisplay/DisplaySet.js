import React, { Component } from 'react';

class DisplaySet extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var jSet = JSON.parse(this.props.set);
        var uploadDate,
            setId;
        var filenames = [];
        jSet.map((item, i) => {
            if (item['Upload Date']) {
                uploadDate = item['Upload Date'];

                uploadDate = new Date(uploadDate);
                var hours = uploadDate.getHours();
                var minutes = uploadDate.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;

                uploadDate = (uploadDate.getMonth() + 1) + '/' + uploadDate.getDate() + '/' + uploadDate.getFullYear() + ' ' + strTime;

            } else if (item['SetId']) {
                setId = item['SetId'];
            } else if (item['filename']) {
                filenames.push(item['filename']);
            }
        });
        return (
            <div className='file-set-container' data-setid={setId}>
                <div className='file-row clear'>
                    <div className='file-set'>
                        <h2>Uploaded on {uploadDate} for review:</h2>
                        {
                            filenames.map((item, i) => {
                                return (
                                    <div className='file-item'>
                                        <p key={i}>{item}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className='file-action'>
                        <button className='btn btn-checkin'>Approve</button>
                        <button className='btn btn-reset'>Reject</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplaySet;