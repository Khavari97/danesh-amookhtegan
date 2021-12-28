import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Style from './../SetProfile.module.scss'
import {ListItem} from "@material-ui/core";
import {connect} from 'react-redux'
import {rootState} from "../../../../redux/RootReducer";
import {GetProfile} from "../../../../redux/User/Profile/Actions";
import Loading from "./../../../../components/customs/Loading/Loading";

interface IState {
    fields?: object | any;
}

interface IProps {
    description: string
    data: any
    GetProfile: typeof GetProfile
    loading: boolean
}


const mapStateToProps = (state: rootState) => {
    return {
        province: state.userProfile.provinces,
        data: state.userProfile.data,
        description: state.userProfile.description,
        loading: state.userProfile.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetProfile: () => dispatch(GetProfile())
    }
}

class PrivateInfo extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.state = {
            fields: [
                [{
                    title: 'نام',
                    name: 'firstName',

                },
                    {
                        title: 'نام خانوادگی',
                        name: 'lastName',

                    }
                ],
                {
                    title: 'جنسیت',
                    name: 'genderDisplay',

                },
                {
                    title: 'نام کاربری',
                    name: 'username',

                },
                {
                    title: 'ایمیل',
                    name: 'email',

                },
                [{
                    title: 'استان',
                    name: 'province',
                    value: 'تهران'
                },
                    {
                        title: 'شهر',
                        name: 'city',

                    }],

                {
                    title: 'دانشگاه',
                    name: 'university',

                },
                {
                    title: 'شماره تلفن',
                    name: 'phoneNumber',

                }
            ]
        }
    }

    componentDidMount() {
        //this.props.GetProfile()
    }

    inputs = (element: any, index: number) => {
        if (element instanceof Array) {
            return element.map((item: any, index2: number) => {
                return (
                    <div key={index2}>
                        <ListItem><p className={Style.title}>{item.title}</p></ListItem>
                        <ListItem><p data-testid={item.name} className={Style.description}>{this.props?.data[item.name]}</p></ListItem>
                    </div>
                )
            })
        } else {
            return (
                <div key={index}><ListItem><p className={Style.title}>{element.title}</p></ListItem>
                    <ListItem><p data-testid={element.name}  className={Style.description}>{this.props?.data[element.name]}</p></ListItem></div>

            )
        }
    }

    items = () => {
        return this.state.fields.map((element: any, index: number) => {
            return (
                <Grid key={index} style={{display: 'flex'}} className={Style.gridItems} item xs={12} sm={6}>
                    {this.inputs(element, index)}
                </Grid>

            )
        })
    }


    render() {
        return (
            <Grid className={`${Style.privateInfo} animate__animated animate__fadeIn`} container>
                {(this.props.loading) ?
                    <Loading/>
                    :
                    this.items()
                }
            </Grid>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PrivateInfo)