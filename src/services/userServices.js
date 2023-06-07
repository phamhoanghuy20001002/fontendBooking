import axios from "../axios"
const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post(`/api/create-new-user`, data)
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    })
}
const editUserService = (inputData) => {
    return axios.put('/api/update-user', inputData);
}

const getAllCodeService = (inputtype) => {
    return axios.get(`/api/get-allcodes?type=${inputtype}`)

}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)

}
const getAllDoctor = () => {
    return axios.get('/api/get-all-doctor')

}
const saveDetailDoctor = (data) => {
    return axios.post(`/api/save-info-doctor`, data)
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`)
}
const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}
const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}
const getExtraInforDoctorById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}
const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}
const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}
const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-speciality`, data)
}
const getAllSpeciality = () => {
    return axios.get(`/api/get-all-speciality`)
}
const getAllDetailSpecialityById = (id, location) => {
    return axios.get(`/api/get-detail-speciality-by-id?id=${id}&location=${location}`)
}
const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}
const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`)
}
const getAllDetailClinicById = (id) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${id}`)
}
const getListPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}
const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}
export {
    handleLoginApi, getAllUsers, getScheduleDoctorByDate,
    createNewUserService, deleteUserService, getAllSpeciality,
    editUserService, getAllCodeService, getDetailInforDoctor,
    getTopDoctorHomeService, getAllDoctor, saveDetailDoctor, saveBulkScheduleDoctor,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookAppointment,
    postVerifyBookAppointment, createNewSpecialty, getAllDetailSpecialityById,
    createNewClinic, getAllClinic, getAllDetailClinicById, getListPatientForDoctor
    , postSendRemedy
}