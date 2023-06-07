import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
class HomeFooder extends Component {


    render() {

        return (
            <div className='HomeFooder'>
                <p>&copy; huy pham <a href='#'>more information</a></p>
            </div>
        );
    }

}

const mapStateToProps = state => {//redux
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooder);
