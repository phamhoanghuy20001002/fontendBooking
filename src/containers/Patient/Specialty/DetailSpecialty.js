import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailSpecialty.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialityById, getAllCodeService } from '../../../services/userServices'

import HomeFooder from '../../HomePage/HomeFooder';

import { LANGUAGES } from '../../../utils'
import _ from 'lodash';

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
            listProvince: []
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailSpecialityById(id, 'ALL');

            let resProvince = await getAllCodeService('PROVINCE')
            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    console.log('arr:', arr)

                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }
                let dataProvince = resProvince.data;
                console.log('dataProvince', dataProvince)
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn Quốc'
                    })
                }
                console.log('dataProvince', dataProvince)

                this.setState({
                    dataDetailSpecialty: res.data,
                    listProvince: dataProvince ? dataProvince : [],
                    arrDoctorId: arrDoctorId

                })
            }


        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getAllDetailSpecialityById(id, location);

            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];

                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty;
                    console.log('arr:', arr)

                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }


                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId

                })
            }

        }
    }




    async componentDidUpdate(preProps, preState, snapshot) {


    }



    render() {

        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props
        console.log('state:', this.state)
        return (
            <div className='detail-specialty-container'>
                <HomeHeader></HomeHeader>
                <div className='detail-specialty-body'>
                    <div className='description-specialty'>

                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            &&
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>

                        }

                    </div>
                    <div className='search-sp-doctor' >
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince && listProvince && listProvince.length > 0 &&

                                listProvince.map((item, index) => {
                                    return (

                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }

                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDesDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //  dataScheduleTimeModal={dataScheduleTimeModal}
                                            />
                                        </div>

                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>


                                </div>
                            )
                        })
                    }
                </div>
                <HomeFooder />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
