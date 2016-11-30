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
        var item = jSet[0];

        var comments,
            tempComments;
        
        comments = item['Comments'];
        comments = this.createMarkup(comments);

        var SetInfo = {}
        SetInfo.SetId = item['SetId'];
        SetInfo.UploadDate = this.makeDate(item['UploadDate']);
        SetInfo.WorkflowStatus = item['WorkflowStatus'];
        SetInfo.Comments = comments;
        SetInfo.Filenames = item['Filenames'];

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

        uploadDate = info.UploadDate;
        setId = info.SetId;
        wfStatus = info.WorkflowStatus;
        comments = info.Comments;        
        filenames = info.Filenames;

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
                                var fn = item['filename'];
                                var link = './pending_elements/' + setId + '/' + fn;
                                return (
                                    <div className='file-item' key={i}>
                                        <a className='file-link' href={link}>{fn}</a>
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