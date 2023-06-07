import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';
import { CommonUtils } from '../../../utils';
class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imgBase64: ''

        }

    }

    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }
    async componentDidUpdate(preProps, preState, snapshot) {
        if (preProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }

    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.targer.value
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)

            this.setState({
                imgBase64: base64
            })
        }
    }
    handleSendRemedy = () => {
        this.props.sendRemedy(this.state)
    }
    render() {
        let { isOpenRemedyModal, closeRemedyModal } = this.props
        return (
            <Modal
                isOpen={isOpenRemedyModal}
                className={'booking-modal-container'}
                size='md'
                centered
            >
                <ModalHeader >Send remedy</ModalHeader>
                <ModalBody>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Email</label>
                            <input className='form-control'
                                type='email'
                                defaultValue={this.state.email}
                                onChange={(event) => this.handleOnChangeEmail(event)}
                            />
                        </div>
                        <div className='col-6 form-group'>
                            <label>Chon file don thuoc</label>

                            <input className='form-control' type="file"
                                onChange={(event) => this.handleOnChangeImage(event)} />
                        </div>
                    </div>



                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => { this.handleSendRemedy() }}>
                        Send
                    </Button>
                    <Button className='px-3' color="secondary" onClick={closeRemedyModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
