import React, {Component} from 'react';

class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: null
        }
    }

    onFormSubmit(e) {
        e.preventDefault()
        this.fileUpload(this.state.file).then((response) => {
            console.log(response.data);
        })
    }

    onChange(e) {
        this.setState({file: e.target.files[0]})
    }

    fileUpload(file) {
        const url = 'http://example.com/file-upload';
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h6>File Upload</h6>
                <input type="file" onChange={this.onChange}/>
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default FileUpload;