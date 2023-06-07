import React, { Component } from 'react';

import { connect } from 'react-redux';
import './Speciality.scss'
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import { getAllSpeciality } from '../../../services/userServices';
import { withRouter } from 'react-router'

class Speciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }
    async componentDidMount() {
        let res = await getAllSpeciality();
        console.log('res:', res);
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : ''
            })
        }
    }
    handleViewSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`)

        }
    }

    render() {
        let { dataSpecialty } = this.state
        return (
            <div className='section-share section-speciality'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div key={index}
                                            onClick={() => this.handleViewSpecialty(item)}
                                            className='section-customize specialty-child'>
                                            <div className="bg-image section-specialtly"
                                                style={{ backgroundImage: `url(${item.image})` }}

                                            />
                                            <div className='specialty-name'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }




                        </Slider>
                    </div>

                </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality));
