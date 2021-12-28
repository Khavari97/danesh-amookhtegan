import React from "react";
import ReactAvatarEditor from 'react-avatar-editor'
import style from "./Avatar.module.scss";
import images from './../../../../assets/images/userProfile'
import { Avatar, Button, Modal } from '@material-ui/core/';
import { apiClient, defaultConfig } from './../../../../api/_api'
import { connect } from 'react-redux'
import { rootState } from "./../../../../redux/RootReducer";
import { GET_AVATAR } from "./../../../../redux/User/Profile/ActionTypes";
import Popover from './../../../../components/customs/Popover/Popover'
import enums from './../../enums'
import Snackbar from './../../../../components/material-ui/Snackbar/SnackbarUtils';

interface IProps{
    GetAvatar: any
    avatar: string | null
}

interface IState {
    borderRadius: number
    rotate: number,
    allowZoomOut: boolean,
    image: string,
    position: any,
    scale: number,
    preview: any,
    width: number
    height: number
    openModal: boolean,
    croppedImg: any
}

const mapStateToProps = (state: rootState) => {
    return {
        avatar: state.userProfile.avatar
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetAvatar: (avatar: string) => dispatch({ type: GET_AVATAR, avatar: avatar })
    }
}

class AvatarUpload extends React.Component<IProps, IState> {
    public inputRef: any;
    public editorRef: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            borderRadius: 50,
            rotate: 0,
            allowZoomOut: false,
            image: '',
            position: { x: 0.5, y: 0.5 },
            scale: 1,
            preview: null,
            width: 130,
            height: 130,
            openModal: false,
            croppedImg: this.props.avatar
        };
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleBorderRadius = this.handleBorderRadius.bind(this);
        this.handleRotate = this.handleRotate.bind(this);
        this.handleScale = this.handleScale.bind(this);
        this.editorRef = React.createRef();
        this.inputRef = React.createRef()
    }


    componentDidUpdate() {
        if (this.props.avatar != this.state.croppedImg) {
            this.setState({
                croppedImg: this.props.avatar
            });
        }
    }


    /**open modal*/
    handleOpen = () => {
        this.setState({ openModal: true });
    };
    /**close modal */
    handleClose = () => {
        this.setState({ openModal: false });
    };

    postData = () => {
        const canvasScaled = this.editorRef.current.getImageScaledToCanvas();
        const croppedImg = canvasScaled.toDataURL();
        let fileImage = this.dataURLtoFile(croppedImg, 'image')
        const formData = new FormData();
        formData.append('avatar', fileImage)
        apiClient.post('user/profile/avatar/',
            { data: formData, headers: { ...defaultConfig.headers, 'Content-Type': 'multipart/form-data' } })
            .then((response: any) => {
                this.setState({
                    croppedImg: croppedImg
                });
                this.props.GetAvatar(croppedImg)
            })
            .catch((err) => {
            })
    }

    handleBorderRadius(e: any) {
        e.preventDefault();
        this.setState({ borderRadius: parseInt(e.target.value) })
    }

    handleRotate(e: any) {
        e.preventDefault();
        this.setState({ rotate: parseInt(e.target.value) })
    }

    handleAllowZoomOut = ({ target: { checked: allowZoomOut } }: any) => {
        this.setState({ allowZoomOut })
    }


    handleScale(e: any) {
        e.preventDefault();
        this.setState({ scale: parseFloat(e.target.value) }, function () {

        })
    }


    handleFileChange = (event: any) => {
        this.setState({ image: event.target.files[0], openModal: true });
    }

    handlePositionChange = (position: any) => {
        this.setState({ position: position })
    }

    onUpload = () => {
        this.postData()
        this.setState({ openModal: false })
    }

    dataURLtoFile = (dataurl: any, filename: any) => {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        let dataType = dataurl.substring("data:image/".length, dataurl.indexOf(";base64"))
        return new File([u8arr], filename + '.' + dataType, { type: mime });
    }
    deleteAvatar = () => {
        apiClient.delete("user/profile/avatar/").then((response: any) => {
            Snackbar.success('عکس پروفایل با موفقیت پاک شد')
            this.props.GetAvatar("")
        }).catch(() => {
        })
    }

    render() {
        return (
            <div>
                <form encType='multipart/form-data'>
                    <div style={{ position: 'relative' }}>
                        <Avatar src={this.state.croppedImg} style={{ width: '150px', height: '150px' }} />
                        <div className={style.deleteButton} onClick={this.deleteAvatar}>
                            <Popover title={enums.popover.delete_avatar}>
                                <img className={style.img} src={images.deleteAvatar} alt={"avatar"} />
                            </Popover>
                        </div>

                        <div className={style.uploadButton} onClick={() => {
                            this.inputRef.current.click()
                        }}>
                            <Popover title={enums.popover.edit_avatar}>
                                <img className={style.img} src={images.upload} alt={"avatar"} />
                            </Popover>

                        </div>

                        <input ref={this.inputRef} className={style.fileUpload}
                            name="newImage" type="file" accept="image/x-png,image/jpeg,image/jpg"
                            onChange={this.handleFileChange} />
                        <Modal
                            open={this.state.openModal}
                            onClose={this.handleClose}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                        >
                            <div className={style.modalBody}>
                                <ReactAvatarEditor
                                    scale={this.state.scale}
                                    width={this.state.width}
                                    height={this.state.height}
                                    position={this.state.position}
                                    onPositionChange={this.handlePositionChange}
                                    ref={this.editorRef}
                                    borderRadius={this.state.width / (100 / this.state.borderRadius)}
                                    rotate={(this.state.rotate)}
                                    image={this.state.image}
                                    className="editor-canvas"
                                />

                                <div>
                                    چرخش: <input style={{ marginBottom: "5px" }} type="number" value={this.state.rotate}
                                        onChange={this.handleRotate} />
                                    <br />
                                    بزرگنمایی:
                                    <input
                                        name='scale'
                                        type='range'
                                        onChange={this.handleScale}
                                        min={this.state.allowZoomOut ? '0.1' : '1'}
                                        max='2.5'
                                        step='0.01'
                                        defaultValue='1'
                                    />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <Popover title={enums.popover.save_avatar}>
                                        <Button size="large" type="submit" onClick={this.onUpload} variant="contained"
                                            color="primary">ذخیره </Button>
                                    </Popover>
                                </div>
                            </div>
                        </Modal>
                    </div>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload)