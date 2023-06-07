import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi'
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userServices';
import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
            isShowModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }
    async componentDidMount() {
        let { language } = this.props
        let allDays = this.getArrDays(language);
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }

        this.setState({
            allDays: allDays,
        })
    }



    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getArrDays = (language) => {
        let allDays = []
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (language === LANGUAGES.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD-MM');
                    let today = `Hôm nay - ${ddMM}`;
                    object.label = today;
                } else {
                    let labelVi = moment(new Date()).add(i, 'days').format('dddd-DD-MM');
                    object.label = this.capitalizeFirstLetter(labelVi)
                }


            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD-MM');
                    let today = `Today - ${ddMM}`;
                    object.label = today;
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd-DD-MM');

                }

            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
            allDays.push(object);
        }
        return allDays;

    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (this.props.language !== preProps.language) {
            let allDays = this.getArrDays(this.props.language);
            this.setState({
                allDays: allDays
            })
        }
        if (this.props.doctorIdFromParent !== preProps.doctorIdFromParent) {
            let allDays = this.getArrDays(this.props.language);

            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTime: res.data ? res.data : []
            })
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let dotorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(dotorId, date);

            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTime: res.data ? res.data : []
                })

            }

        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isShowModalBooking: true,
            dataScheduleTimeModal: time
        })
        //  console.log('time:', time)
    }
    closeBookingModal = () => {
        this.setState({
            isShowModalBooking: false,

        })
    }

    render() {

        let { allDays, allAvailableTime, isShowModalBooking, dataScheduleTimeModal } = this.state
        let { language } = this.props
        //  console.log(allAvailableTime)
        return (
            <>
                <div className='doctor-schedule-container'>
                    <div className='all-schedule'>

                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 &&
                                allDays.map((item, index) => {
                                    return (
                                        <option value={item.value}
                                            key={index}>
                                            {item.label}
                                        </option>
                                    )
                                })

                            }


                        </select>
                    </div>
                    <div className='all-available-item'>
                        <div className='text-calendar'>
                            <i className='fas fa-calendar-alt'> <span >Lịch khám</span></i>

                        </div>
                        <div className='time-content'>
                            {allAvailableTime && allAvailableTime.length > 0 ?
                                <>
                                    <div className='time-content-btns'>
                                        {
                                            allAvailableTime.map((item, index) => {
                                                let timedisplay = language === LANGUAGES.VI ?
                                                    item.timeTypeData.valueVi : item.timeTypeData.valueEn
                                                return (
                                                    <button key={index}
                                                        onClick={() => this.handleClickScheduleTime(item)}
                                                        className={language === LANGUAGES.VI ? 'btn-vi' : 'btn-en'}
                                                    >{timedisplay}</button>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className='book-free'>
                                        <span> Chọn <i className='fas fa-hand-point-up'></i> và đặt (miễn phí)</span>
                                    </div>
                                </>
                                : <div>
                                    Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác.
                                </div>}


                        </div>
                    </div>
                </div>
                <BookingModal
                    isShowModalBooking={isShowModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleTimeModal={dataScheduleTimeModal}
                ></BookingModal>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
