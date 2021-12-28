import React, {Component} from 'react';
import Styles from "./Home.module.scss";
import MemberCard from "../../components/customs/MemberCard/MemberCard";
import ProjectsCard from "../../components/customs/ProjectsCard/ProjectsCard";
import {Grid} from "@material-ui/core";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import {IRootState} from "../../redux/RootReducer";
import {connect} from "react-redux";
import {GetEmployers, GetUsers} from "../../redux/Users/Actions";
import {GetProjects} from "../../redux/Projects/Actions";
import Loading from "../../components/customs/Loading/Loading";

const mapStateToProps = (state: IRootState) => {
    return {
        users: state.Users.users,
        employers: state.Users.employers,
        projects: state.Projects.projects,
        loading: state.Users.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetUsers: () => dispatch(GetUsers()),
        GetEmployers: () => dispatch(GetEmployers()),
        GetProjects: () => dispatch(GetProjects()),
    }
}

interface IState {
}

interface IProps {
    users: any;
    GetUsers: any;
    employers: any;
    GetEmployers: any;
    projects: any;
    GetProjects: any;
    loading?: boolean;
}

class SliderComponent extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    componentDidMount() {
        this.props.GetUsers();
        this.props.GetEmployers();
        this.props.GetProjects();
    }

    render() {

        const renderPrevButton = ({isDisabled}: any) => {
            return <span style={{
                opacity: isDisabled ? '0.5' : 1,
                position: 'absolute',
                top: '45%',
                cursor: 'pointer',
                transform: 'translateY(-50%)',
                left: '-25px',
                fontSize: '50px',
                fontWeight: 900,
                color: '#046B00',


            }}
            >&lt;</span>;
        };

        const renderNextButton = ({isDisabled}: any) => {
            return <span style={{
                opacity: isDisabled ? '0.5' : 1,
                position: 'absolute',
                top: '45%',
                cursor: 'pointer',
                transform: 'translateY(-50%)',
                right: '-25px',
                fontSize: '50px',
                fontWeight: 900,
                color: '#046B00',


            }}>&gt;</span>;
        };
        const responsive = {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1024: {
                items: 3
            }
        };

        return (

            <div>

                <Grid className={Styles.Card}>
                    <h2 data-test="our projects"> پروژه های موجود در سایت ما </h2>
                    <Grid className={Styles.carousel}>
                        {
                            this.props.loading ?
                                <Loading/>
                                :
                                <>
                                    <AliceCarousel
                                        data-test="AliceCarousel"
                                        responsive={responsive}
                                        autoPlayInterval={2000}
                                        autoPlayDirection="rtl"
                                        renderPrevButton={renderPrevButton}
                                        renderNextButton={renderNextButton}
                                    >
                                        {
                                            this.props.projects.map((proj: any, index: any) => {
                                                return <Grid
                                                    className={Styles.cardStyle}><ProjectsCard {...proj} /></Grid>
                                            })

                                        }

                                    </AliceCarousel>
                                    <Grid className={Styles.more}>
                                        <a href='/dashboard?tab=0' data-test="more projects"> مشاهده پروژه های بیشتر </a>
                                    </Grid>
                                </>
                        }
                    </Grid>

                </Grid>

                <Grid className={Styles.Card}>
                    <h2 data-test="our users"> کاربران موجود در سایت ما </h2>
                    <Grid className={Styles.carousel}>
                        {
                            this.props.loading ?
                                <Loading/>
                                :
                                <>
                                    <AliceCarousel
                                        responsive={responsive}
                                        autoPlayInterval={2000}
                                        autoPlayDirection="rtl"
                                        renderPrevButton={renderPrevButton}
                                        renderNextButton={renderNextButton}

                                    >
                                        {
                                            this.props.users.map((user: any, index: any) => {
                                                return <Grid
                                                    className={Styles.cardStyle}><MemberCard {...user} /></Grid>
                                            })

                                        }

                                    </AliceCarousel>

                                    <Grid className={Styles.more}>
                                        <a href='/dashboard?tab=1'> مشاهده افراد بیشتر </a>
                                    </Grid>
                                </>
                        }

                    </Grid>
                </Grid>

                <Grid className={Styles.Card}>
                    <h2 data-test="our employers" > کارفرماهای موجود در سایت ما </h2>
                    <Grid className={Styles.carousel}>
                        {
                            this.props.loading ?
                                <Loading/>
                                :
                                <>
                                    <AliceCarousel
                                        responsive={responsive}
                                        autoPlayInterval={2000}
                                        autoPlayDirection="rtl"
                                        renderPrevButton={renderPrevButton}
                                        renderNextButton={renderNextButton}

                                    >
                                        {
                                            this.props.users.status = "CREATOR" ?
                                                this.props.employers.map((employer: any, index: any) => {
                                                    return <Grid
                                                        className={Styles.cardStyle}><MemberCard {...employer} /></Grid>
                                                }) : null
                                        }

                                    </AliceCarousel>
                                    <Grid className={Styles.more}>
                                        <a href='/dashboard?tab=1'> مشاهده کارفرماهای بیشتر </a>
                                    </Grid>
                                </>
                        }

                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SliderComponent);
