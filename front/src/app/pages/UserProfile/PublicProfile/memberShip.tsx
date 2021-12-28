import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from "../../../components/material-ui"
import Style from './../SetProfile/SetProfile.module.scss'
import { Avatar, ListItem, Typography } from "@material-ui/core";
import images from '../../../assets/images/userProfile'
import { Helmet } from 'react-helmet'
import { apiClient } from './../../../api/_api'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import ProjectCard from "../../../components/customs/ProjectCard/ProjectCard";
interface IState {
    fields: any
    data: any
    projects: any
}

interface IParams {
    slug: any;
    data_test?:string
}

interface IProps extends RouteComponentProps<IParams> {
    description: string
    data: any
    history: any
}


class MemberShipRequest extends Component<IProps, IState> {

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
            ],

            data: {
                username: "",
                firstName: "",
                lastName: "",
                university: null,
                genderDisplay: "",
                phoneNumber: "",
                resume: "",
                description: "",
                avatar: "",
                url: "",
                skills: [],

            },
            projects: []
        }
    }


    componentDidMount() {
        const slug = this.props.match.params.slug;
        apiClient.get(`dashboard/users/${slug}/`, {
            consoleMessage: true
        }).then((response) => {
            this.setState({ data: response })
            console.log(response)
        }).catch(() => {
            this.props.history.push('/*')
        })

        apiClient.get(`dashboard/users/${slug}/projects/`, {
            consoleMessage: true
        }).then((response) => {
            this.setState({ projects: response })
        }).catch(() => {
            //this.props.history.push('./*')
        })

    }

    inputs = (element: any, index: number) => {
        if (element instanceof Array) {
            return element.map((item: any, index2: number) => {
                return (
                    <div key={index2+index}>
                        <ListItem><p className={Style.title}>{item.title}</p></ListItem>
                        <ListItem><p data-test={item.name} className={Style.description}>{this.state.data[item.name]}</p></ListItem>
                    </div>
                )
            })
        } else {
            return (
                <div key={index}><ListItem><p className={Style.title}>{element.title}</p></ListItem>
                    <ListItem ><p className={Style.description}>{this.state.data[element.name]}</p></ListItem></div>

            )
        }
    }

    items = () => {
        return this.state.fields.map((element: any, index: number) => {
            return (
                <Grid key={index} style={{ display: 'flex' }} className={Style.gridItems} item xs={12} sm={6}>
                    {this.inputs(element, index)}
                </Grid>

            )
        })
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>{" پروفایل " + this.state.data.firstName + " " + this.state.data.lastName}</title>
                </Helmet>
                <div>
                    <Grid container className={Style.publicInfo}>
                        <Grid item xs={12}>
                            <Typography className="animate__animated animate__zoomIn"
                                style={{ marginBottom: "40px" }} component={"h1"}
                                variant={"h1"}>{" پروفایل " + this.state.data.firstName + " " + this.state.data.lastName}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Avatar data-test="avater" src={this.state.data.avatar} style={{ width: '100px', height: '100px' }} />
                        </Grid>
                        <Grid className={Style.infoGrid} item container xs={12}>
                            <Grid className={Style.header} item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}><img style={{ width: '30px' }} src={images.customer}
                                    alt="" />
                                    <Typography variant="body1" gutterBottom data-test='personal'>اطلاعات شخصی</Typography></ListItem>
                            </Grid>
                            <Grid container item xs={12}>
                                {this.items()}
                            </Grid>
                        </Grid>


                        <Grid className={Style.infoGrid} item container xs={12}>
                            <Grid className={Style.header} item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}><img style={{ width: '30px' }} src={images.new_topic}
                                    alt="" />
                                    <Typography variant="body1" data-test='about' gutterBottom>درباره ی من</Typography>
                                </ListItem>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}>
                                    <p className={Style.title}>{this.state.data.description}</p>
                                </ListItem>
                            </Grid>
                        </Grid>

                        <Grid className={Style.infoGrid} item container xs={12}>
                            <Grid className={Style.header} item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}><img style={{ width: '30px' }}
                                    src={images.development_skill} alt="" />
                                    <Typography variant="body1" gutterBottom>مهارت ها</Typography>
                                </ListItem>
                            </Grid>
                            {
                                this.state.data.skills.map((element: any, index: number) => {
                                    return (<div key={index} className={Style.skillChip}>
                                        {element.name}
                                    </div>)
                                })
                            }

                        </Grid>

                        <Grid className={Style.infoGrid} item container xs={12}>

                            <Grid className={Style.header} item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}><img style={{ width: '30px' }} src={images.attach}
                                    alt="" />
                                    <Typography variant="body1" gutterBottom>رزومه ضمیمه شده</Typography>
                                </ListItem>
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <ListItem>
                                    <img src={images.pdfFile} style={{ width: '40px', marginLeft: '4px' }} alt="" />
                                    <Typography style={{ wordBreak: 'break-all' }} variant="body1" gutterBottom>{
                                        (this.state.data.resume) ? this.state.data.resume.split('resume/')[1] : 'رزومه ای بارگزاری نشده است'}</Typography>
                                </ListItem>

                            </Grid>
                            <Grid style={{ textAlign: 'left' }} item xs={12} sm={6}>
                                <Button data-test="resume" disabled={!!!this.state.data.resume}
                                    onClick={() => window.location.href = this.state.data.resume}
                                    color="primary" variant="contained">
                                    دانلود رزومه </Button>
                            </Grid>

                        </Grid>

                        <Grid className={Style.infoGrid} item container xs={12}>
                            <Grid className={Style.header} item xs={12} sm={12}>
                                <ListItem style={{ padding: '0' }}>
                                    <img style={{ width: '30px' }} src={images.projects} alt="" />
                                    <Typography variant="body1" gutterBottom>پروژه ها</Typography>
                                </ListItem>
                            </Grid>
                            {
                                this.state.projects.map((project: any, index: number) => {
                                    return (
                                        <Grid key={index} style={{ padding: '5px' }} item sm={12} md={6} lg={4}>
                                            <ProjectCard {...project}
                                            />
                                        </Grid>
                                    )
                                })
                            }

                        </Grid>

                    </Grid>
                </div>
            </>
        );
    }

}


export default withRouter(MemberShipRequest)
