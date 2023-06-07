import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfor.scss';
import moment from 'moment';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';

import { getExtraInforDoctorById } from '../../../services/userServices'
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: false,
            extraInfo: {}
        }
    }
    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0)
                this.setState({
                    extraInfo: res.data
                })
        }
    }




    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
            if (res && res.errCode === 0)
                this.setState({
                    extraInfo: res.data
                })
        }

    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }


    render() {
        let { isShowDetailInfor, extraInfo } = this.state
        let { language } = this.props
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>ĐỊA CHỈ KHÁM </div>
                    <div className='name-clinic'>
                        {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}
                    </div>

                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false &&
                        <div className='short-infor'>GIÁ KHÁM:
                            {extraInfo && extraInfo.priceData && language === LANGUAGES.VI
                                &&
                                <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueVi}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'VND'}

                                />
                            }
                            {extraInfo && extraInfo.priceData && language === LANGUAGES.EN
                                && <NumberFormat
                                    className='currency'
                                    value={extraInfo.priceData.valueEn}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    suffix={'$'}

                                />
                            }


                            <span className='detail'
                                onClick={() => this.showHideDetailInfor(true)}> Xem chi tiết

                            </span> </div>
                    }
                    {isShowDetailInfor === true &&
                        <>
                            <div className='title-price'>GIÁ KHÁM: </div>
                            <div className='detail-infor'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>
                                        {extraInfo && extraInfo.priceData && language === LANGUAGES.VI
                                            &&
                                            <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceData.valueVi}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'VND'}

                                            />
                                        }
                                        {extraInfo && extraInfo.priceData && language === LANGUAGES.EN
                                            && <NumberFormat
                                                className='currency'
                                                value={extraInfo.priceData.valueEn}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={'$'}

                                            />
                                        }
                                    </span>
                                </div>
                                <div className='note'>
                                    {extraInfo && extraInfo.note ? extraInfo.note : ''}

                                </div>
                            </div>
                            <div className='payment'>
                                Người bệnh có thể thanh toán chi phí bằng hình thức:
                                {extraInfo && extraInfo.paymentData ? extraInfo.paymentData.valueVi : ''}

                            </div>
                            <div className='hide-price'>
                                <span
                                    onClick={() => this.showHideDetailInfor(false)}> Ẩn bảng giá

                                </span>
                            </div>
                        </>
                    }


                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
