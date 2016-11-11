import React, { Component } from 'react';

class DisplaySet extends Component {
    constructor(props) {
        super(props);
    }
    createMarkup(html) {
        return { __html: html };
    }
    render() {
        var jSet = JSON.parse(this.props.set);// JSON THE SET RESULTS
        var uploadDate,
            setId,
            comments = "";
        var filenames = [];
        jSet.map((item, i) => {
            if (item['Upload Date']) {
                // PARSE UPLOAD DATE IN READABLE FORMAT
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

            } else if (item['Comments']) {
                // GET COMMENTS WHEN FILES WERE UPLOADED
                var tempComments;
                tempComments = item['Comments'];
                tempComments = $.parseHTML(tempComments);

                $.each(tempComments, function (i, el) {
                    comments += el.outerHTML;
                });
                comments = this.createMarkup(comments);
            } else if (item['SetId']) {
                setId = item['SetId'];
            } else if (item['filename']) {
                filenames.push(item['filename']);
            }
        });

        var setTitle = "Uploaded on " + uploadDate + " for review:";
        return (
            <div className='file-set-container' data-setid={setId}>
                <div className='file-row clear'>
                    <div className='file-set'>
                        <h2>{setTitle}</h2>
                        {
                            filenames.map((item, i) => {
                                var link = './pending_elements/' + setId + '/' + item;
                                return (
                                    <div className='file-item' key={i}>
                                        <a className='file-link' href={link}>{item}</a>
                                    </div>
                                );
                            })
                        }
                        <div className='file-comments-container'>
                            <span className='file-comments-heading'>Check-In Comments:</span>
                            <div className='file-comments' dangerouslySetInnerHTML={comments}>
                            </div>
                        </div>
                    </div>
                    <div className='file-action'>
                        <button className='btn btn-checkin'>Approve</button>
                        <button className='btn btn-reset'>Reject</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplaySet;