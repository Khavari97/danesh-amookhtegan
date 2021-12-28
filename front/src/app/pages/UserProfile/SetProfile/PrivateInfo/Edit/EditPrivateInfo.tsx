import React, {Component} from 'react';
import Style from './../../SetProfile.module.scss'
import {Button} from "../../../../../components/material-ui"
import {Formik, FormikProps, FormikValues} from "formik";
import CustomInputs from "../../../../../components/customs/input/input";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    IconButton,
    ListItem
} from '@material-ui/core';
import images from './../../../../../assets/images/userProfile'
import Select from './../../../../../components/customs/select/select';
import {connect} from 'react-redux'
import {GetProfile, ProvinceApi} from "../../../../../redux/User/Profile/Actions";
import {rootState} from "../../../../../redux/RootReducer";
import {apiClient} from './../../../../../api/_api'
import * as yup from "yup";
import Snackbar from "./../../../../../components/material-ui/Snackbar/SnackbarUtils";

interface IState {
    fields?: object | any;
    emailModal: boolean;
    initial: object | any

}

interface IProps {
    forwardedRef: any
    provinces: any
    cities: any
    GetProfile: typeof GetProfile
    universities: any
    data: any
    description: string
    postData?:any
}

const mapStateToProps = (state: rootState) => {
    return {
        provinces: state.userProfile.provinces,
        universities: state.userProfile.universities,
        cities: state.userProfile.cities,
        data: state.userProfile.data,
        description: state.userProfile.description
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        ProvinceApi: () => dispatch(ProvinceApi()),
        GetProfile: () => dispatch(GetProfile())
    }
}


class PrivateInfo extends Component<IProps, IState> {
    private formRef: any;

    constructor(props: IProps) {
        super(props);
        this.formRef = React.createRef()
        this.state = {
            fields: [
                [{
                    id: 'signInputs',
                    type: "text",
                    name: "firstName",
                    label: "نام",
                    placeholder: "",
                },
                    {
                        id: 'signInputs',
                        type: "text",
                        name: "lastName",
                        label: "نام خانوادگی",
                        placeholder: "",
                    },
                ],
                {
                    id: 'signInputs',
                    type: "text",
                    name: "gender",
                    label: "جنسیت",
                    items: [{name: "مرد", id: "MALE"}, {name: "زن", id: "FEMALE"}],
                    placeholder: "",
                },
                {
                    id: 'signInputs',
                    type: "text",
                    name: "username",
                    label: "نام کاربری",
                    placeholder: "",
                },
                {
                    id: 'signInputs',
                    type: "email",
                    name: "email",
                    label: "ایمیل",
                    placeholder: "",
                    value: ''
                },
                [
                    {
                        id: 'signInputs',
                        type: "text",
                        name: "province",
                        label: "استان",
                        placeholder: "",
                        items: this.props.provinces,
                    },
                    {
                        id: 'signInputs',
                        type: "text",
                        name: "city",
                        label: "شهر",
                        placeholder: "",
                        items: this.props.cities,
                    },
                ],
                {
                    id: 'signInputs',
                    type: "text",
                    name: "university",
                    label: "دانشگاه",
                    placeholder: "",
                    items: this.props.universities,
                },
                {
                    id: 'signInputs',
                    type: "text",
                    name: "phoneNumber",
                    label: "شماره تلفن",
                    placeholder: "",
                    value: '+98'
                },
            ],
            emailModal: false,
            initial: {
                firstName: this.props.data?.firstName,
                lastName: this.props.data?.lastName,
                email: this.props.data?.email,
                username: this.props?.data.username,
                province: this.props?.data.provinceObject,
                city: this.props.data?.cityObject,
                university: this.props.data?.universityObject,
                phoneNumber: (this.props.data?.phoneNumber == null || this.props.data.phoneNumber == '')
                    ? '+98' : this.props.data?.phoneNumber,
                description: this.props?.description,
                gender: this.props.data?.gender
            }
        }
    }

    componentDidUpdate() {
        if (this.state.fields[4][1].items != undefined) {
            if (!this.arraysAreEqual(this.props.cities, this.state.fields[4][1].items)) // Check if it's a new user, you can also use some unique property, like the ID  (this.props.user.id !== prevProps.user.id)
            {
                let fields = [...this.state.fields]
                fields[4][1].items = this.props.cities
                this.setState({fields: fields})
            }
        }
    }

    arraysAreEqual = (ary1: any, ary2: any) => {
        return (ary1.join('') == ary2.join(''));
    }
    handleModalOpen = () => {
        this.setState({emailModal: !this.state.emailModal})
    }

    emailDialog = () => {
        return (
            <div>
                <IconButton aria-label="delete" onClick={this.handleModalOpen}>
                    <img style={{width: '20px'}} alt="" src={images.alert}/>
                </IconButton>
                <Dialog
                    open={this.state.emailModal}
                    onClose={this.handleModalOpen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{" توضیحات"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {" ایمیل شما به دلیل تایید و ذخیره در سایت غیر قابل تغییر است"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={this.handleModalOpen} color="primary">
                            فهمیدم
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }


    selectItems = (element: any, props: FormikProps<any>) => {
        return (
            <Select object={{
                ...element,
                data_test:element.name,
                value: props.values[element.name],
                setFieldValue: props.setFieldValue,
                onChange: props.handleChange
            }}></Select>
        )
    }


    inputs = (element: any, index: string, props: FormikProps<any>) => {
        if (element instanceof Array) {
            return element.map((item: any, index2: number) => {
                if (item.items !== undefined) {
                    return (
                        <Grid item className={Style.gridInputs} xs={12} md={5} key={index + index2}>
                            {this.selectItems(item, props)}
                        </Grid>
                    )

                } else {
                    return (
                        <Grid item className={Style.gridInputs} xs={12} md={5} key={index + index2}>
                            <CustomInputs items={{
                                ...item,
                                data_test:item.name,
                                error: Boolean(props.errors[item.name]),
                                helperText: (props.errors[item.name]),
                                value: props.values[item.name],
                                onChange: props.handleChange
                            }}/>
                        </Grid>
                    )
                }


            })
        } else {
            if (element.name === 'email') {
                return (
                    <React.Fragment key={index}>
                        <div key={index} data-testid={element.name}>
                            <ListItem><p className={Style.title}>{element.label}</p></ListItem>
                            <ListItem><p className={Style.description}>{this.props.data.email}</p></ListItem>
                        </div>
                        {this.emailDialog()}
                    </React.Fragment>
                )
            }
            if (element.items !== undefined) {
                return (
                    <Grid item className={Style.gridInputs} xs={12} md={5} key={index}>
                        {this.selectItems(element, props)}
                    </Grid>
                )

            } else {
                return (
                    <Grid xs={12} md={5} className={Style.gridInputs} item key={index}>
                        <CustomInputs items={{
                            ...element,
                            data_test:element.name,
                            error: Boolean(props.errors[element.name]),
                            helperText: (props.errors[element.name]),
                            value: props.values[element.name],
                            onChange: props.handleChange
                        }}/>
                    </Grid>
                )
            }


        }
    }

    items = (props: FormikProps<any>) => {
        return this.state.fields.map((element: any, index: number) => {
            return (
                <Grid key={index} style={{display: 'flex'}} container className={Style.gridItems} item xs={12} sm={6}>
                    {this.inputs(element, 'input' + index, props)}
                </Grid>

            )
        })
    }

    postData = (values: FormikValues) => {
        let data = {
            firstName: values.firstName,
            lastName: values.lastName,
            username: values.username,
            email: values.email,
            university: (values.university) ? values.university : null,
            city: (values.city) ? values.city : null,
            phoneNumber: (values.phoneNumber == '') ? null
                : (values.phoneNumber.startsWith('+98')) ? ((values.phoneNumber.substring(3) == '') ? null
                    : values.phoneNumber) :
                    '+98' + ((values.phoneNumber.startsWith('0')) ? values.phoneNumber :
                    values.phoneNumber.substring(0)),
            description: this.props.description,
            gender: (values.gender) ? values.gender : null,
        }
        apiClient.patch('user/profile/', {data: data})
            .then(() => {
                this.props.GetProfile()
            })
            .catch((err) => {
                console.log(err)
                if (err.status == 400) {
                    for (const [key, value] of Object.entries(err.data.detail)) {
                        Snackbar.error('' + value)
                    }
                }
            })
    }


    render() {
        return (
            <Formik innerRef={this.props.forwardedRef}
                    enableReinitialize
                    initialValues={this.state.initial}
                    validationSchema={yup.object({
                        firstName: yup
                            .string()
                            .required("پر کردن این فیلد اجباری است")
                            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
                            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
                            .matches(/^[\u0600-\u06FF\s]+$/, "تنها استفاده از حروف فارسی مجاز است"),
                        lastName: yup
                            .string()
                            .required("پر کردن این فیلد اجباری است")
                            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
                            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
                            .matches(/^[\u0600-\u06FF\s]+$/, "تنها استفاده از حروف فارسی مجاز است"),
                        username: yup
                            .string()
                            .required("پر کردن این فیلد اجباری است")
                            .max(30, "حداکثر 30 حرف میتوانید وارد کنید")
                            .min(1, "حداقل 1 حرف میتوانید وارد کنید")
                            .matches(/^[a-zA-Z0-9-_]+$/, "تنها استفاده از حروف انگلیسی مجاز است"),
                        phoneNumber: yup
                            .string()
                            .nullable(true)
                            .matches(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g, "شماره ی معتبر وارد کنید"),
                    })}
                    onSubmit={(values, actions) => {
                            this.props.postData(values)
                            this.postData(values)
                            actions.setSubmitting(false);
                    }}
            >
                {props => (
                    <form className={Style.formContainer} onSubmit={props.handleSubmit}>
                        <Grid className="animate__animated animate__fadeIn" container>
                            {this.items(props)}
                        </Grid>
                    </form>
                )}
            </Formik>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateInfo)
