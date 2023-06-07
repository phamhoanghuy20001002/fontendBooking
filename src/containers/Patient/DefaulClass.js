import React, { Component } from 'react';
import { connect } from "react-redux";



class DefaulClass extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }




    async componentDidUpdate(preProps, preState, snapshot) {


    }



    render() {

        return (
            <div>default default</div>
        );
    }
}

const mapStateToProps = state => {
    return {

        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaulClass);
