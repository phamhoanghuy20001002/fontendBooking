import React, { Component } from 'react';

import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { withRouter } from 'react-router'
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctor: []
        }
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.topDoctor !== this.props.topDoctor) {

            this.setState({
                arrDoctor: this.props.topDoctor

            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors()
    }
    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`)

        }
    }
    render() {
        let { language } = this.props;
        console.log('check prop', this.props.topDoctor)
        let allDoctors = this.state.arrDoctor
        //   allDoctors = allDoctors.concat(allDoctors).concat(allDoctors)
        return (
            <div>
                <div className='section-share section-outStanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                            <button className='btn-section'>Xem thêm</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>

                                {allDoctors && allDoctors.length > 0
                                    && allDoctors.map((item, index) => {
                                        let imageBase64 = ''
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');

                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className='section-customize'
                                                onClick={() => this.handleViewDetailDoctor(item)}
                                                key={index}>
                                                <div className='customize-border'>
                                                    <div className='outer-bg'>
                                                        <div className="bg-image section-outstanding-doctor"
                                                            style={{ backgroundImage: `url(${imageBase64})` }}

                                                        />
                                                        <div className='position text-center'>
                                                            <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                            <div>Da liêu</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }


                            </Slider>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctor: state.admin.topDoctor,
        language: state.app.language,


    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
