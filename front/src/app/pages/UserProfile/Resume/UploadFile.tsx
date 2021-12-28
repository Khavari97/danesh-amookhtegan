import React, {Component} from "react";
import Dropzone from 'react-dropzone-uploader'
import 'react-dropzone-uploader/dist/styles.css'
import LinearProgress, {LinearProgressProps} from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {rootState} from "../../../redux/RootReducer";
import {connect} from "react-redux";
import {GET_RESUME} from "../../../redux/User/Profile/ActionTypes";
import Snackbar from "../../../components/material-ui/Snackbar/SnackbarUtils";
import {apiClient, defaultConfig} from '../../../api/_api'

interface IProps {
    GetResume: any
}

interface IState {
    progress: any
}

const mapStateToProps = (state: rootState) => {
    return {
        resume: state.userProfile.resume,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetResume: (resume: string) => dispatch({type: GET_RESUME, resume: resume})
    }
}

//show progressbar
function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box display="flex" alignItems="center">
            <Box width="100%" mr={2}>
                <LinearProgress variant="determinate" {...props} color="secondary"
                                style={{height: '10px', borderRadius: '5px'}}/>
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

class UploadFile extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {progress: 0}
    }

    postData = (file: any, config: any) => {
        apiClient.post('user/profile/resume/', {
            data: file,
            headers: {...defaultConfig.headers, 'Content-Type': 'multipart/form-data'},
            onUploadProgress: (progressEvent: any) => {
                const {loaded, total} = progressEvent;
                const percent = Math.floor(loaded * 100 / total)
                if (percent < 100) {
                    this.setState({progress: percent})
                } else {
                    this.setState({progress: 100})
                }
            }
        })
            .then((response: any) => {
                this.props.GetResume(response.resume)
                Snackbar.success('فایل شما با موفقیت بارگذاری شد')
            })
            .catch((err) => {
                Snackbar.error(' متاسفانه به مشکل خوردیم')

            })
    }
    fileUpload = (file: any) => {
        const formData = new FormData();
        formData.append('resume', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return this.postData(formData, config)
    }

    // called every time a file's `status` changes
    handleChangeStatus = (file: any, status: any) => {
        if (status == 'done') {
            this.fileUpload(file.file)
        }
    }

    async componentDidMount() {
        apiClient.get('user/profile/resume/',
            {
                headers: {...defaultConfig.headers, 'Content-Type': 'application/pdf'},
                onUploadProgress: (progressEvent: any) => {
                    const {loaded, total} = progressEvent;
                    const percent = Math.floor(loaded * 100 / total)
                    if (percent < 100) {
                        this.setState({progress: percent})
                        console.log(percent)
                    } else {
                        this.setState({progress: 100})
                    }
                }
            })
            .then(async (response) => {
                this.props.GetResume(response.resume)
            })
            .catch((err) => {
            })
    }

    Progress = () => {
        return (
            <div style={{width: '92%', marginTop: '30px'}}>
                <LinearProgressWithLabel value={this.state.progress}/>
            </div>
        )

    }

    render() {
        return (
            <form encType='multipart/form-data'>
                <Dropzone
                    onChangeStatus={this.handleChangeStatus}
                    PreviewComponent={this.Progress}
                    maxFiles={1}
                    accept=".pdf"
                    styles={
                        {
                            dropzone: {
                                border: 'dashed 3px rgba(0,0,0,0.5)',
                                color: 'black',
                                borderRadius: '10px',
                                overflow: 'auto'

                            },
                            inputLabel: {
                                color: 'rgba(0,0,0,0.5)',
                                fontSize: '0.9rem',
                                fontFamily: 'shabnam'
                            },
                            inputLabelWithFiles: {
                                background: '#7DC02F',
                                color: 'white',
                                padding: '7px 20px',
                                borderRadius: '4px',
                                fontWeight: 300,
                                margin: '20px auto',

                            },
                            submitButton: {
                                display: 'none'

                            },
                            dropzoneActive: {
                                background: '#FFFFFF',
                                borderColor: '#046B00',
                                color: '#046B00'
                            },

                        }}
                    inputContent={'فایل مورد نظر خود را بکشید و دراین قسمت رها کنید '}
                    inputWithFilesContent={'انتخاب فایل'}
                    submitButtonContent={' آپلود فایل '}
                />
            </form>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(UploadFile)