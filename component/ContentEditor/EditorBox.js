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
        var editor = this.state.editor;
        editor.save(true);

        this.setState({
            editor: editor
        })
    }
    componentDidMount() {
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
        editor.init('*[data-editable]', 'data-name');

        editor.addEventListener('saved', function (ev) {
            var regions = ev.detail().regions;
            console.log(regions);
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
                    <button className='btn btn-checkin' onClick={this.onEditorCheckin}>Check In</button>
                </div>
            </div>
        )
    }
}

export default EditorBox;