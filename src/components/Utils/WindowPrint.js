import React, { Component } from 'react'
import {Button} from "react-bootstrap";

class WindowPrint extends Component {
    render() {
        return (
            <div>
                <Button className="m-2 btn-fill float-right" variant="info" size="sm" onClick={() => window.print()}>
                    Print
                </Button>
            </div>
        )
    }
}

export default WindowPrint