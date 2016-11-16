import React, { Component } from 'react';

class DisplaySet extends Component {
    constructor(props) {
        super(props);

        this.updateWorkflowStatus = this.updateWorkflowStatus.bind(this);        
    }
    createMarkup(html) {
        // CREATE MARKUP FOR HTML INJECTION
        return { __html: html };
    }
    makeDate(uploadDate){
        // PARSE DATE AND RETURN AS READABLE STRING
        uploadDate = new Date(uploadDate);

        var hours = uploadDate.getHours();
        var minutes = uploadDate.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        uploadDate = (uploadDate.getMonth() + 1) + '/' + uploadDate.getDate() + '/' + uploadDate.getFullYear() + ' ' + strTime;

        return uploadDate;
    }
    updateWorkflowStatus(setid,status){
        // DB UPDATE SUCCESS        
        $.ajax({
            url:'./services/updatestatus.php',
            type:'POST',
            data:{
                SetId:setid,
                Status:status
            }
        })
        .done(function(result){
            this.props.refresh();
        }.bind(this));
    }
    parseSetJson(jSet){
        var uploadDate,
            setId,
            wfStatus,
            comments = "",
            filenames = [];

        jSet.map((item, i) => {
            if (item['Upload Date']) {
                // PARSE UPLOAD DATE IN READABLE FORMAT
                uploadDate = item['Upload Date'];
                uploadDate = this.makeDate(uploadDate);

            }else if (item['WorkflowStatus']){  
                // GET WORKFLOW STATUS
                wfStatus = item['WorkflowStatus'];
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


         var SetInfo = {
            'SetId':setId,
            'UploadDate':uploadDate,
            'WorkflowStatus':wfStatus,
            'Comments':comments,
            'filenames':filenames
        }

        return SetInfo;

    }
    render() {
        var jSet;
        jSet = JSON.parse(this.props.set);

        var info = this.parseSetJson(jSet);
        var uploadDate,
            setId,
            wfStatus,
            comments = "",
            filenames = [];

        uploadDate = info['UploadDate'];
        setId = info['SetId'];
        wfStatus = info['WorkflowStatus'];
        comments = info['Comments'];
        filenames = info['filenames'];

        var setTitle = "Uploaded: " + uploadDate;
        var isPending = wfStatus=="PENDING"? true:false;
        var statusRowClass= isPending ? 'file-status-row pending' : 'file-status-row approved';
        return (
            <div className='file-set-container' data-setid={setId}>
                <div className='file-row clear'>
                    <div className={statusRowClass}>
                        <span className='file-status'>{wfStatus}</span>
                    </div>
                    <div className='file-set'>
                        <p className='file-set-title'>{setTitle}</p>
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
                    </div>
                    <div className='file-comments-container'>
                        <span className='file-comments-heading'>Comments:</span>
                        <div className='file-comments' dangerouslySetInnerHTML={comments}>
                        </div>
                    </div>
                    <div className='file-action'>
                        <button className='btn btn-reset'>Reject</button>
                        {
                            isPending ?
                                <button className='btn btn-checkin' onClick={() => this.updateWorkflowStatus(setId,'APPROVED')}>Approve</button>          
                                : 
                                <button className='btn btn-checkin' onClick={() => this.updateWorkflowStatus(setId,'IMPLEMENTED')}>Implement</button>   
                        }             
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplaySet;