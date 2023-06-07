import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { getAllCodeService } from "../../../services/userServices"
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',
            isOpen: false,



            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            position: '',
            role: '',
            gender: '',
            avatar: '',
            action: '',
            userEditId: '',
        }
    }
    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

        //nt  this.props.dispatch(actions.fetchGenderStart())
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log("huy pham res", res);
        // } catch (error) {
        //     console.log(error)
        // }
    }

    componentDidUpdate(preProps, preState, snapshot) {
        // render =>didupdata
        //hien tai(this)  !== qua khu (prev)
        //render

        if (preProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''

            })
        }
        if (preProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux

            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''


            })
        }
        if (preProps.positionRedux !== this.props.positionRedux) {
            let arrposition = this.props.positionRedux
            this.setState({
                positionArr: arrposition,
                position: arrposition && arrposition.length > 0 ? arrposition[0].keyMap : ''


            })
        }
        if (preProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrposition = this.props.positionRedux;
            let arrRole = this.props.roleRedux;



            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                position: arrposition && arrposition.length > 0 ? arrposition[0].keyMap : '',
                previewImgURL: '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('base64 image', base64);
            console.log('data image', data);
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }

    }
    openPreviewImage = () => {
        if (!this.state.previewImgURL) return;
        this.setState({
            isOpen: true
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input is require:' + arrCheck[i])
                break
            }
        }
        return isValid
    }
    handleSaveUser = async () => {
        let isValid = this.checkValidateInput()
        let { action } = this.state;
        if (isValid === false) {
            return
        } else {
            if (action === CRUD_ACTIONS.CREATE) {
                this.props.createNewUser({
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar
                });
            }
            if (action === CRUD_ACTIONS.EDIT) {
                this.props.editUser({
                    id: this.state.userEditId,
                    email: this.state.email,
                    password: this.state.password,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phonenumber: this.state.phoneNumber,
                    gender: this.state.gender,
                    roleId: this.state.role,
                    positionId: this.state.position,
                    avatar: this.state.avatar
                })
                console.log('check ediit:', this.state)
            }
        }




        await this.props.fetchUserRedux()
    }
    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');

        }

        this.setState({
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            position: user.positionId,
            role: user.roleId,
            gender: user.gender,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgURL: imageBase64,
        })
    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isloadingGender = this.props.isloadingGender;

        let { email, password, firstName, lastName, phoneNumber, address, position,
            role, gender, avatar } = this.state;

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    React-Redux Huy pham
                </div>
                <div className="user-redux-body" >

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 '> {isloadingGender === true ? 'loading gender' : ''}</div>

                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-6'>
                                <label>Email</label>
                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label>Password</label>
                                <input
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}

                                    className='form-control' type='password'
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                />
                            </div>
                            <div className='col-6'>
                                <label>First Name</label>
                                <input className='form-control' type='text'
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-6'>
                                <label>Last name</label>
                                <input className='form-control' type='text'
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-6'>
                                <label>Phone number</label>
                                <input className='form-control' type='text'
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-6'>
                                <label>Address</label>
                                <input className='form-control' type='text'
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select className="form-control"

                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Position</label>
                                <select className="form-control"
                                    value={position}
                                    onChange={(event) => { this.onChangeInput(event, 'position') }}>

                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleID</label>
                                <select className="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}
                                    value={role}
                                >

                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return (
                                                <option value={item.keyMap} key={index} >{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>

                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label >Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label className='label-upload form-control' htmlFor='previewImg' >Up load<i className="fas fa-upload"></i></label>

                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.openPreviewImage()}>

                                    </div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveUser()}
                                >{this.state.action === CRUD_ACTIONS.EDIT ? 'Save' : 'Create'}
                                </button>

                            </div>
                            <div className='col-12 md-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}// key=value
                                    action={this.state.action}
                                />
                            </div>
                        </div>

                    </div>

                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgURL}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.position,
        isloadingGender: state.admin.isloadingGender,
        listUsers: state.admin.users


    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUser: (data) => dispatch(actions.editUser(data))
        //  processLogout: () => dispatch(actions.processLogout()),
        //changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
