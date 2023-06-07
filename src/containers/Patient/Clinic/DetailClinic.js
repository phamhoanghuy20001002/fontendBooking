import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById } from '../../../services/userServices'

import HomeFooder from '../../HomePage/HomeFooder';

import { LANGUAGES } from '../../../utils'
import _ from 'lodash';

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},
        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinicById(id);
            console.log('clinic:', res)
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                console.log('data:', data)
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorClinic;
                    console.log('arr:', arr)

                    if (arr && arr.length > 0) {
                        arr.map((item, index) => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }


                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId

                })
            }


        }
    }






    async componentDidUpdate(preProps, preState, snapshot) {


    }



    render() {

        let { arrDoctorId, dataDetailClinic } = this.state;
        console.log('state:', this.state)
        return (
            <div className='detail-clinic-container'>
                <HomeHeader></HomeHeader>
                <div className='detail-clinic-body'>
                    <div className='detail-clinic-body-up'>
                        <div className='description-clinic'>
                            <div className='cl-content-left'
                                style={{ backgroundImage: `url(${dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image : ''})` }}

                            ></div>
                            <div className='cl-content-right'>
                                <div className='name-clinic'>{dataDetailClinic.name}</div>
                                <div className='address-clinic'>{dataDetailClinic.address}</div>
                            </div>




                        </div>
                        <div>
                            {dataDetailClinic && !_.isEmpty(dataDetailClinic)
                                &&
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>

                            }
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
