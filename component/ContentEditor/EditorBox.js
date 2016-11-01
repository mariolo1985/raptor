import React, { Component } from 'react';

class EditorBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editor: null
        }

        this.componentDidMount = this.componentDidMount.bind(this);
        this.onEditorFocus = this.onEditorFocus.bind(this);
        this.onEditorCancel = this.onEditorCancel.bind(this);
        this.onEditorCheckin = this.onEditorCheckin.bind(this);
        this.onEditorSaved = this.onEditorSaved.bind(this);

    }
    onEditorFocus() {
        console.log('focus fired');
        var editor = this.state.editor;
        editor.start();

        this.setState({
            editor: editor
        })
    }
    onEditorCancel() {
        console.log('editor cancel');
        var editor = this.state.editor;
        editor.stop(false);

        this.setState({
            editor: editor
        })
    }
    onEditorCheckin() {
        console.log('editor checkin');
        this.props.onPostFiles();

        var editor = this.state.editor;
        editor.save(true);// TRIGGER SAVED EVENT LISTENER

        // do not update state yet
        // set state from oneditorsaved
    }
    onEditorSaved(regions) {
        console.log('on editor saved');
    }
    componentDidMount() {

        // CREATE EDITOR / RICH TEXT BOX
        var DEFAULT_TOOLS = [
            [
                'bold',
                'italic'
            ],
            [
                'align-left',
                'align-center',
                'align-right'
            ],
            [
                'unordered-list',
                'ordered-list'
            ],
            [
                'indent',
                'unindent',
            ]
        ];
        ContentTools.DEFAULT_TOOLS = DEFAULT_TOOLS;

        var editor = null;
        editor = ContentTools.EditorApp.get();
        editor.init('*[data-editable]', 'data-name');// INIT EDITOR

        // EDITOR SAVED EVENT
        editor.addEventListener('saved', function (ev) {
            var regions = ev.detail().regions;
            console.log(regions);
            //this.onEditorSaved(regions);// when "saved" pass to onEditorSaved
        })

        this.setState({
            editor: editor
        })
    }
    render() {

        return (
            <div className='attachment-editor-wrapper'>
                <div className='attachment-editor' tabIndex='-1' data-editable data-name="main-content" onFocus={this.onEditorFocus}>
                    <input type='text' disabled placeholder='Enter Check-In Comments here....' className='editor-placeholder' />
                    <p className='editor-input'></p>
                </div>
                <div className='action-buttons'>
                    <button className='btn btn-cancel' onClick={this.onEditorCancel}>Cancel</button>
                    <button className='btn btn-reset'>Reset Form</button>
                    <button className='btn btn-checkin' onClick={this.onEditorCheckin}>Check In</button>
                </div>
            </div>
        )
    }
}

export default EditorBox;