import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from '../../../utils';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';//format ngay thang nam
import { toast } from 'react-toastify';
import _ from 'lodash';
import { saveBulkScheduleDoctor } from '../../../services/userServices'
import FormattedDate from '../../../components/Formating/FormattedDate';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);


        this.state = {
            listDoctor: [],
            selectedDoctor: {},
            currentDate: '',
            rangeTime: [],
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();
    }
    buildDataInputSelec = (inputData) => {
        let result = [];
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;

                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }
    componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.allDoctor !== this.props.allDoctor) {
            let dataSelect = this.buildDataInputSelec(this.props.allDoctor)
            this.setState({
                listDoctor: dataSelect
            })
        }
        if (preProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item,
                    isSelected: false

                }))
            }
            this.setState({
                rangeTime: data
            })
        }

        // if (preProps.language !== this.props.language) {
        //     let dataSelect = this.buildDataInputSelec(this.props.allDoctor)
        //     this.setState({
        //         listDoctor: dataSelect
        //     })
        // }
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });

    };
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (time) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }
    handleSaveSchedule = async () => {
        let result = [];
        let { rangeTime, selectedDoctor, currentDate } = this.state
        if (!currentDate) {
            toast.error('🦄 Invalid Date!!!');
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error('🦄 Invalid Doctor!!!');
            return;
        }
        //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER)
        // = moment(currentDate).unix();
        let formatedDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let seletedTime = rangeTime.filter(item => item.isSelected === true);
            if (seletedTime && seletedTime.length > 0) {
                seletedTime.map(schedule => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formatedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object)
                })
            } else {
                toast.error('🦄 Invalid !!!');
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formatedDate: formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success('Save infor successed')

        } else {
            toast.error('errror save bulk schedule doctor');
            console.log('errr save bulk>>>res:', res)
        }
    }
    render() {
        let { rangeTime } = this.state
        let { language } = this.props
        console.log(this.state)
        const { isLoggedIn } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

        return (
            <div className='manage-schedule-container'>

                <div className='s-m-title'>
                    <FormattedMessage id='manage-schedule.title'></FormattedMessage>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6'>
                            <label>Chon bac sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctor}
                            />                        </div>
                        <div className='col-4'>
                            <label>Chon ngay</label>
                            <DatePicker
                                onChange={this.handleOnchangeDatePicker}
                                className='form-control'
                                value={this.state.currentDate}
                                selected={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length > 0 &&
                                rangeTime.map((item, index) => {
                                    return (
                                        <button

                                            onClick={() => this.handleClickBtnTime(item)}
                                            className={item.isSelected === true ? 'btn btn-schedule active' : 'btn btn-schedule'} key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })}

                        </div>
                        <div className='col-12'>
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className='btn btn-warning btn-save-schedule'>SAVE</button>

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
        allDoctor: state.admin.allDoctor,
        language: state.app.language,
        allScheduleTime: state.admin.allScheduleTime,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
