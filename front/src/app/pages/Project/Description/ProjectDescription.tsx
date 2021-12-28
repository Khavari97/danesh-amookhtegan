import React, {Component} from 'react';
import {Chip, Container, Grid, Typography} from "@material-ui/core";
import ArrowToLeftIcon from "../../../assets/images/icons/ArrowToLeftIcon";
import styles from "./ProjectDescription.module.scss"
import {apiClient} from "../../../api/_api";
import Loading from "../../../components/customs/Loading/Loading";
import {IRootState} from "../../../redux/RootReducer";
import {connect} from "react-redux";
import moment from "jalali-moment";
import {Link} from "react-router-dom"

const mapStateToProps = (store: IRootState) => {
    return {
        slug: store.project.slug,
        username: store.userProfile.briefprofile.username
    }
}

interface IProps {
    slug: string,
    username: string
}

class ProjectDescription extends Component<IProps> {

    state = {
        loading: true,
        description: {
            amount: 0,
            name: "",
            skills: [],
            description: "",
            endDate: "",
            creator: "",
            url: "",
            creatorUrl: "",
            category: ""
        }
    }


    fetchProjectDescription(slug: string) {
        apiClient.get(`dashboard/projects/${slug}/`)
            .then((response) => {
                this.setState({
                        loading: false,
                        description: response
                    }
                )
            })
    }

    render() {
        return (
            <Container>
                {
                    this.state.loading ? <Loading/> :
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"inherit"} className={styles.title} data-test='creator'>
                                        سازنده پروژه
                                    </Typography>
                                </div>
                                <Typography className={styles.description} data-test='created'>
                                    ساخته شده توسط
                                    <Link to={this.state.description.creatorUrl}
                                          style={{color: "#7DC02F", marginRight: "5px"}}>
                                        {this.state.description.creator}
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"body1"} className={styles.title}
                                                style={{wordWrap: "break-word"}} data-test='des'>
                                        توضیحات پروژه
                                    </Typography>
                                </div>
                                <div>
                                    <Typography className={styles.description}>
                                        {this.state.description.description}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"inherit"} className={styles.title} data-test='endtime'>
                                        زمان اتمام پروژه
                                    </Typography>
                                </div>
                                <Typography className={styles.description}>
                                    {moment(this.state.description.endDate).locale("fa").format('YYYY/M/D - dddd')}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"body1"} className={styles.title}
                                                style={{wordWrap: "break-word"}} data-test='types'>
                                        دسته بندی پروژه
                                    </Typography>
                                </div>
                                <div>
                                    <Typography className={styles.description}>
                                        {this.state.description.category}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"inherit"} className={styles.title} data-test='skills'>
                                        مهارت های مورد نیاز
                                    </Typography>
                                </div>
                                <div>
                                    {
                                        this.state.description.skills.map((skill: any, index) => {
                                            return <Chip key={index} variant="outlined" color="primary"
                                                         label={skill.name}
                                                         clickable style={{marginLeft: 5, marginTop: 5}}/>
                                        })
                                    }
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className={styles.title}>
                                    <span><ArrowToLeftIcon/></span>
                                    <Typography component={"h1"} variant={"inherit"} className={styles.title} data-test='fund'>
                                        بودجه ی پروژه
                                    </Typography>
                                </div>
                                <Typography className={styles.description} data-test='toman'>
                                    {this.state.description.amount + " "}
                                    تومان
                                </Typography>
                            </Grid>
                        </Grid>

                }
            </Container>
        );
    }

    componentDidMount() {
        this.fetchProjectDescription(this.props.slug);
    }
}


export default connect(mapStateToProps)(ProjectDescription);