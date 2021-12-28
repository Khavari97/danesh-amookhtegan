import React, {Component} from 'react';
import images from './../../../assets/images/userProfile'
import {connect} from 'react-redux'
import {GetParentSkills, GetSkills} from "../../../redux/User/Profile/Actions";
import {rootState} from "../../../redux/RootReducer";
import style from './Skills.module.scss'
import {Button, Grid, InputBase} from "@material-ui/core";
import {apiClient} from '../../../api/_api'
import Snackbar from "./../../../components/material-ui/Snackbar/SnackbarUtils";
import {GET_PARENT_SKILLS, GET_SKILLS} from "../../../redux/User/Profile/ActionTypes";
import {Helmet} from 'react-helmet'
import SkillsNotFound from './../../../components/customs/SkillsNotFound/SkillsNotFound'
import Popover from './../../../components/customs/Popover/Popover'
import enums from './../enums'
import {useSnackbar} from "notistack";

interface IState {
    parentSkills: any
    selectedSkills: any
    searching: string
    isSearching: boolean
}

interface IProps {
    GetParentSkills: typeof GetParentSkills
    GetSkills: typeof GetSkills
    parentSkills: any
    SetParentSkills: any
    selectedSkills: any
    SetSkills: any
}


const mapStateToProps = (state: rootState) => {
    return {
        province: state.userProfile?.provinces,
        data: state.userProfile?.data,
        parentSkills: state.userProfile?.parentSkills,
        selectedSkills: state.userProfile?.skills,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetParentSkills: () => dispatch(GetParentSkills()),
        GetSkills: () => dispatch(GetSkills()),
        SetParentSkills: (state: any) => dispatch({
            type: GET_PARENT_SKILLS,
            parentSkills: state,
        }),
        SetSkills: (state: any) => dispatch({
            type: GET_SKILLS,
            skills: state,
        })
    }
}

class Skills extends Component<IProps, IState> {
    public formInfoRef: any
    public formAboutRef: any

    constructor(props: IProps) {
        super(props);
        this.formInfoRef = React.createRef()
        this.formAboutRef = React.createRef()
        this.state = {
            parentSkills: this.props?.parentSkills,
            selectedSkills: this.props?.selectedSkills,
            isSearching: false,
            searching: ''

        }
    }

    componentDidMount() {
        this.props.GetParentSkills()
        this.props.GetSkills()

    }

    componentWillReceiveProps() {
        this.setState({parentSkills: this.props.parentSkills})
        this.setState({selectedSkills: this.props.selectedSkills})
    }

    componentWillUnmount() {

        this.props.SetSkills(this.state.selectedSkills)
        if (this.state.isSearching) {
            this.props.GetParentSkills()
        } else {
            this.props.SetParentSkills(this.state.parentSkills)
        }
    }

    ///parent Of skills 
    addParent = (skill: any) => {
        let skillIndex = this.props.parentSkills.findIndex((skillObject: any) => {
            return skillObject.code === skill.code
        })
        let editElement = skill
        editElement.isAdd = true
        if (editElement.skill == null) {
            apiClient.get(`list/skills/?skill=${skill.id}`).then(res => {
                editElement.skill = res
                const parents = [...this.state.parentSkills];
                parents[skillIndex] = editElement
                this.setState({parentSkills: parents})
            })
        } else {
            const parents = [...this.state.parentSkills];
            parents[skillIndex] = editElement
            this.setState({parentSkills: parents})
        }
    }


    parentOfSkills = () => {
        return this.state.parentSkills?.map((element: any, index: any) => {
            return (
                <React.Fragment key={index}>
                    <Grid id={element.name} data-testid={'parentskill'} container className={`${(element.isAdd) ? style.isAdd : style.notAdd} ${style.parentSkill}`}>
                        <Grid item xs={3} className={style.icon}>
                            <img className={style.img} src={element.image}/>
                        </Grid>
                        <Grid item xs={7} className={style.title}>
                            <p>{element.name}</p>
                        </Grid>

                        <Grid item xs={2} className={style.addIcon}>
                            <Popover title={(element.isAdd) ?
                                enums.popover.close_parent_skills
                                : enums.popover.plus_parent_skills}>
                                <img
                                data-testid={`btn-parent-${element.name}`}
                                    onClick={() => (element.isAdd) ? this.deleteParent(element) : this.addParent(element)}
                                    src={(element.isAdd) ? images.deleteIcon : images.plus_dark} alt={"icon"}/>
                            </Popover>
                        </Grid>

                    </Grid>
                    {this.skills(element, index)}
                </React.Fragment>

            )
        })
    }


    deleteParent = (parent: any) => {

        let skillIndex = this.state.parentSkills.findIndex((skillObject: any) => {
            return skillObject.code === parent.code
        })
        let editElement = parent
        editElement.isAdd = false

        const parents = [...this.state.parentSkills];
        parents[skillIndex] = editElement

        this.setState({parentSkills: parents})
    }


    //show skills of parent
    skills = (parentSkill: any, indexParent: any) => {
        if (parentSkill.isAdd) {
            return parentSkill.skill.map((skill: any, index: number) => {
                let findIsAdded = this.state.selectedSkills.findIndex((skillObject: any) => {
                    return skillObject.name === skill.name
                })
                return (
                    <Grid data-testid={'skill'} item container key={index}
                          className={`${(findIsAdded !== -1) ? style.isSelect : style.notSelect} ${style.skills} animate__animated animate__slideInDown`}>
                        <Grid className={style.icon} item xs={3}>
                            <img src={skill.image}/>
                        </Grid>
                        <Grid item xs={7} className={style.title}>
                            <p>{skill.name}</p>
                        </Grid>
                        <Grid item xs={2} className={style.addIcon}
                              onClick={() => this.addSkill(parentSkill, skill, indexParent, index)}>
                            <Popover title={enums.popover.plus_child_skills}>
                                <img src={images.plus_light} alt={"skill icon"}/>
                            </Popover>
                        </Grid>
                    </Grid>
                )

            })
        }

    }
    /// add skill to your customer
    addSkill = (parentSkill: any, skill: any, indexParent: number, index: number) => {

        skill.isSelected = true
        parentSkill.skill[index] = skill
        let findIsAdded = this.state.selectedSkills.findIndex((skillObject: any) => {
            return skillObject.name === skill.name
        })
        if (findIsAdded === -1) {
            let selectedSkills = [...this.state.selectedSkills]
            selectedSkills.push({name: skill.name, id: skill.id})
            this.setState({selectedSkills: selectedSkills})
        }


        let parentSkills = [...this.state.parentSkills]
        parentSkills[indexParent] = parentSkill


        this.setState({parentSkills: parentSkills})

    }
    ///delete skill of user 


    //show skills of user 
    skillsOfUser = () => {
        //this.setState({selectedSkills:this.props.selectedSkills})
        return this.state.selectedSkills?.map((skill: any, index: number) => {
            return (
                <Grid data-testid={'userskill'} key={index} xs={12} sm={12} item container
                      className={`${style.userSkill} animate__animated animate__fadeIn`}>
                    <Grid item xs={11} className={style.title}>
                        <p>{skill.name}</p>
                    </Grid>

                    <Grid item xs={1} className={style.deleteIcon} onClick={() => this.deleteSkill(skill, index)}>
                        <Popover title={enums.popover.close_user_skills}>
                            <img src={images.deleteIcon} alt={"delete icon"}/>
                        </Popover>
                    </Grid>

                </Grid>
            )
        })
    }


    deleteSkill = (skill: any, index: number) => {
        let selectedSkills = [...this.state.selectedSkills]
        selectedSkills.splice(index, 1);
        //selectedSkills.splice(0, skill.id);
        this.setState({selectedSkills: selectedSkills})
    }
    ////search input
    searchData = (event: any) => {
        this.setState({searching: event.target.value})
        if (event.target.value !== '') {
            this.setState({isSearching: true})
            this.setState({parentSkills: []}, () => {

                apiClient.get(`list/skills/?search=%20`).then(res => {
                    res.map((element: any) => {
                        if (element.name.indexOf(event.target.value) > -1) {
                            if (element.skill != null) {
                                element.skill = [element]
                            }
                            let newParentSkill = [...this.state.parentSkills]
                            newParentSkill.push(element)
                            this.setState({parentSkills: newParentSkill})
                        }
                    })
                })

            })

        } else {
            this.setState({isSearching: false})
            this.props.GetParentSkills()
            this.setState({parentSkills: this.props.parentSkills})
        }
    }

    sendData = () => {
        let ids: any[] = []
        this.state.selectedSkills.map((skill: any) => {
            ids.push(skill.id)
        })
        let data = {
            skills: ids
        }
        apiClient.patch('user/profile/skills/', {data: data})
            .then((response: any) => {
                Snackbar.success("مهارت های شما با موفقیت ذخیره شد")
            })
            .catch((err) => {
                Snackbar.error("خطایی رخ داده لطفا دوباره امتحان کنید")
            })
    }


    render() {
        return (
            <>
                <Helmet>
                    <title>مهارت های من</title>
                </Helmet>

                <div className={style.skillContainer}>
                    <Grid container className={`${style.skillsSection} ${style.alignItem}`}>
                        <Grid container className={`${style.alignItem} ${style.chooseSkills}`} item xs={12} sm={8}
                              md={9}>
                            <Grid item xs={12} className={style.sticky}>
                                <div className={style.header}>

                                    <div className={style.searchBox}>
                                        <InputBase
                                            placeholder="جستجوی مهارت ها"
                                            classes={{
                                                root: style.inputRoot,
                                                input: style.inputInput,
                                            }}
                                            inputProps={{"aria-label": "search"}}
                                            value={this.state.searching ? this.state.searching: ''}
                                            onChange={this.searchData}
                                        />
                                        <div className={style.searchIcon}>
                                            <img src={images.search} alt={"search icon"}/>
                                        </div>
                                    </div>

                                </div>
                            </Grid>
                            <Grid item container xs={12} sm={12} md={12}>
                                {(this.state.parentSkills?.length != 0)
                                    ? this.parentOfSkills()
                                    : <SkillsNotFound/>
                                }

                            </Grid>
                        </Grid>

                        <Grid container className={style.userSkillSection} item xs={12} sm={4} md={3}>
                            <div style={{position: 'relative'}}>
                                <Grid item className={style.header} xs={12}>
                                    <h3>مهارت های شما</h3>
                                </Grid>
                                <div>
                                    <Grid className={style.userSkills} item xs={12}>
                                        {this.skillsOfUser()}
                                    </Grid>
                                    <div className={style.button}>
                                        <Popover title={enums.popover.save_skills}>
                                            <Button onClick={this.sendData} variant="contained" color="primary">ذخیره
                                                نهایی</Button>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Skills)
