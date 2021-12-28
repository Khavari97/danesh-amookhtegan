import React, { Component } from 'react';
import { rootState } from "../../redux/RootReducer";
import { GetParentSkills, GetSkills, } from "../../redux/User/Profile/Actions";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { Filter, getAllSkills, setProjectCategory, setProjectSkill, setProjectStatus } from '../../redux/Search/Actions';

interface IState {
    fields: any,
    filter: { category: string, status: string, skill: string }
}

interface IProps {
    status: any;
    parentSkill: any;
    childSkill: any;
    GetSkills: any;
    GetParentSkills: any;
    FilterProjects: any;
    setProjectCategory: any;
    page: number;
    project_category: string;
    project_skill: string;
    project_status: string;
    setProjectStatus: any;
    text: string;
    getAllSkills: any;
    allSkills: [];
    setProjectSkill: any

}

const mapStateToProps = (state: rootState) => {
    return {
        status: state.project?.status,
        parentSkill: state.userProfile?.parentSkills,
        childSkill: state.userProfile?.skills,
        countPages: state.search?.countPages,
        page: state.search?.page,
        project_category: state.search?.project_category,
        project_skill: state.search?.project_skill,
        project_status: state.search?.project_status,
        text: state.search?.text,
        allSkills: state.search?.allSkills
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        GetSkills: () => dispatch(GetSkills()),
        GetParentSkills: () => dispatch(GetParentSkills()),
        FilterProjects: (status: string, category: string, skill: string, text: string, countPages: number) => dispatch(Filter(status, category, skill, text, countPages)),
        setProjectCategory: (category: string) => dispatch(setProjectCategory(category)),
        setProjectStatus: (status: string) => dispatch(setProjectStatus(status)),
        setProjectSkill: (skill: string) => dispatch(setProjectSkill(skill)),
        getAllSkills: () => dispatch(getAllSkills())
    }
}

class SearchProjectFilter extends Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            filter: { status: '', category: '', skill: '' },
            fields: [
                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' status ',
                    label: ' وضعیت ',
                    value: ' ',
                    items: []
                },
                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' parentSkill ',
                    label: ' دسته بندی ',
                    value: ' ',
                    items: props.parentSkill
                },
                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' childSkill ',
                    label: ' مهارت ',
                    value: ' ',
                    items: props.childSkill
                }
            ]

        }
    }

    onChangeHandler = (event: any, values: any) => {
        console.log(values)
        this.props.setProjectCategory((values?.name) ? values.name : '')
    }

    render() {
        return (
            <Grid container>
                <Grid item data-test="sorting" style={{ padding: "0 5px 15px 0" }} sm={12}> دسته بندی بر اساس : </Grid>
                {
                    this.state.fields.map((field: any,index:number) => {
                        return (
                            <Grid key={index} item sm={4} xs={12}>
                                <Autocomplete
                                    id="combo-box-demo"
                                    data-test="Autocomplete"
                                    options={field.items}
                                    getOptionLabel={(option: any) => option.name}
                                    onChange={field.handleChange}
                                    size="small"
                                    style={{
                                        padding: "5px 5px",
                                        marginBottom: "20px"
                                    }}
                                    data-testid={field.name}
                                    renderInput={(params) =>
                                        <TextField {...params} label={field.label} variant="outlined" data-test="field" />}
                                />

                            </Grid>
                        )
                    })
                }

            </Grid>

        );
    }

    componentDidMount() {
        this.props.GetSkills();
        this.props.GetParentSkills();
        this.props.getAllSkills();
        this.props.FilterProjects('', '', '', this.props.text, this.props.page)
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.project_category !== prevProps.project_category) {
            this.props.FilterProjects(this.props.project_status, this.props.project_category, this.props.project_skill, this.props.text, this.props.page)
        }
        if (this.props.project_status !== prevProps.project_status) {
            this.props.FilterProjects(this.props.project_status, this.props.project_category, this.props.project_skill, this.props.text, this.props.page)
        }
        if (this.props.project_skill !== prevProps.project_skill) {
            this.props.FilterProjects(this.props.project_status, this.props.project_category, this.props.project_skill, this.props.text, this.props.page)
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, nextState: IState) {
        return {
            fields: [

                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' status ',
                    label: ' وضعیت ',
                    value: ' ',
                    handleChange: (event: any, values: any) => {
                        nextProps.setProjectStatus((values?.code) ? values.code : '')
                    },
                    items: [
                        {
                            code: "STARTED",
                            name: "شروع شده"
                        },
                        {
                            code: "ENDED",
                            name: "پایان یافته"
                        },
                        {
                            code: "WAITING",
                            name: "در حال انتظار"
                        },
                        {
                            code: "DELETED",
                            name: "حذف شده"
                        }
                    ]
                },

                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' parentSkill ',
                    label: ' دسته بندی ',
                    value: ' ',
                    handleChange: (event: any, values: any) => {
                        nextProps.setProjectCategory((values?.name) ? values.name : '')
                    },
                    items: nextProps.parentSkill
                },
                {
                    id: 'selectInput',
                    type: 'text',
                    name: ' childSkill ',
                    label: ' مهارت ',
                    value: ' ',
                    items: nextProps.allSkills,
                    handleChange: (event: any, values: any) => {
                        nextProps.setProjectSkill((values?.name) ? values.name : '')
                    },
                }
            ]

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchProjectFilter)