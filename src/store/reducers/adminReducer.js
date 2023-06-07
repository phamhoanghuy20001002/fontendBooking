import actionTypes from '../actions/actionTypes';

const initialState = {
    isloadingGender: false,
    isloadingRole: false,
    isloadingPosition: false,
    genders: [],
    roles: [],
    position: [],
    users: [],
    topDoctor: [],
    allDoctor: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isloadingGender = true;
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isloadingGender = false;
            state.genders = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isloadingGender = false;
            return {
                ...state
            }


        case actionTypes.FETCH_POSITION_START:
            state.isloadingPosition = true;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isloadingPosition = false;
            state.position = action.data;//action.data tu ben adminAction chuyen qua

            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.isloadingPosition = false;
            state.position = [];
            return {
                ...state
            }


        case actionTypes.FETCH_ROLE_START:
            state.isloadingRole = true;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isloadingRole = false;
            state.roles = action.data;

            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isloadingRole = false;
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_FAILDER:
            state.users = [];
            return {
                ...state
            }





        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctor = action.dataDoctor;
            return {
                ...state
            }

        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctor = ['132'];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctor = action.dataDr;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.topDoctor = [];
            return {
                ...state
            }


        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state
            }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED:
            state.allScheduleTime = [];
            return {
                ...state
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;