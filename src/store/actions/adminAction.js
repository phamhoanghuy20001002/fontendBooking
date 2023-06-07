import actionTypes from './actionTypes';
import {
    getAllCodeService, getTopDoctorHomeService, saveDetailDoctor,
    getAllDoctor, editUserService, deleteUserService,
    getAllUsers, createNewUserService, getAllSpeciality, getAllClinic
} from "../../services/userServices"
import { toast } from 'react-toastify'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })
            let res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed());

            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('errorr', error);
        }
    }

};
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
});



export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_ROLE_START
            })
            let res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailed());

            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('errorr', error);
        }
    }

};
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
});



//position
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_POSITION_START
            })
            let res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed());

            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('errorr', error);
        }
    }

};
export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success('🦄Create a new user success!')
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());



            } else {
                dispatch(saveUserFailed());

            }
        } catch (error) {
            dispatch(saveUserFailed());
            console.log('saveUserFailed errorr', error);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILDER,
})


export const fetchAllUsersStart = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllUsers('ALL');

            if (res && res.errCode === 0) {

                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            } else {
                toast.error(' Get all user failed!')

                dispatch(fetchAllUsersFailer());

            }
        } catch (error) {
            toast.error(' Get all user failed!')

            dispatch(fetchAllUsersFailer());
            console.log('fetchAllUsersFailer errorr', error);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailer = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILDER,
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success('🗑️ Delete user success!')
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());

            } else {
                toast.error(' Delete user failed!')

                dispatch(deleteUserFailer());

            }
        } catch (error) {
            toast.error(' Delete user failed!')

            dispatch(deleteUserFailer());
            console.log('deleteUserFailer errorr', error);
        }
    }
}
export const deleteUserSuccess = (data) => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteUserFailer = () => ({
    type: actionTypes.DELETE_USER_FAILDER,
})



export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success('🗑️ Edit user success!')
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());

            } else {
                toast.error(' Edit user failed!')

                dispatch(editUserFailer());

            }
        } catch (error) {
            toast.error(' Edit user failed!')

            dispatch(editUserFailer());
            console.log('editUserFailer errorr', error);
        }
    }
}
export const editUserSuccess = (data) => ({
    type: actionTypes.EDIT_USER_SUCCESS,

})
export const editUserFailer = () => ({
    type: actionTypes.EDIT_USER_FAILDER,
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('');
            //console.log('res', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctor: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,

                })
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTORS_FAILED', error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,

            })
        }
    }
}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctor();
            //console.log('res', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,

                })
            }
        } catch (error) {
            console.log('FETCH_ALL_DOCTORS_FAILED', error)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,

            })
        }
    }
}

export const saveDetailDoctors = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success(' Save detail Doctor success!');
                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTORS_SUCCESS,
                })
            } else {
                toast.error(' Save detail error!');
                console.log('resssss:', res)
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,

                })
            }
        } catch (error) {
            toast.error(' Save detail error!');

            console.log('SAVE_DETAIL_DOCTORS_FAILED', error)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTORS_FAILED,

            })
        }
    }
}

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            //console.log('res', res)
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED,

                })
            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_HOUR_FAILED', error)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAILED,

            })
        }
    }
}

export const getAllRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })

            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");

            let resProvince = await getAllCodeService("PROVINCE");
            console.log('undefi:', resPrice)
            let resSpecialty = await getAllSpeciality();
            let resClinic = await getAllClinic();

            //console.log('res', res)
            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailed())

            }
        } catch (error) {
            console.log('FETCH_ALLCODE_SCHEDULE_HOUR_FAILED', error)
            dispatch(fetchRequiredDoctorInforFailed())

        }
    }
}
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,

})