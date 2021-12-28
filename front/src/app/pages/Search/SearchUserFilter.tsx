import React, { Component } from "react";
import { rootState } from "../../redux/RootReducer";
import { GetSkills, ProvinceApi } from "../../redux/User/Profile/Actions";
import { connect } from "react-redux";
import { Grid } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FilterUsers, getAllSkills, setUserCity, setUserProvince, setUserSkill, setUserUniversity } from "../../redux/Search/Actions";

interface IProps {
    skills: any;
    university: any;
    province: any;
    city: any;
    GetSkills: any
    ProvinceApi: any
    countUserPages: any
    FilterUsers: any
    pageUsers: number
    setUserUniversity: any
    user_university: string
    setUserProvince: any
    setUserSkill: any
    user_province: string
    user_city: string
    user_skill: string
    setUserCity: any
    text: string
    getAllSkills: any
    allSkills: []
    // FilterCity:any
}

interface IState {
    fields: any
}

const mapStateToProps = (state: rootState) => {
    return {
        skills: state.userProfile.skills,
        university: state.userProfile.universities,
        province: state.userProfile.provinces,
        city: state.userProfile.cities,
        countUserPages: state.search.countUserPages,
        pageUsers: state.search.pageUsers,
        user_university: state.search.user_university,
        user_province: state.search.user_province,
        user_city: state.search.user_city,
        text: state.search.text,
        allSkills: state.search.allSkills,
        user_skill: state.search.user_skill,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        ProvinceApi: () => dispatch(ProvinceApi()),
        GetSkills: () => dispatch(GetSkills()),
        FilterUsers: (university: string, skill: string, city: string, province: string, text: string, countPages: number) => dispatch(FilterUsers(university, skill, city, province, text, countPages)),
        setUserUniversity: (university: string) => dispatch(setUserUniversity(university)),
        setUserProvince: (province: string) => dispatch(setUserProvince(province)),
        setUserCity: (city: string) => dispatch(setUserCity(city)),
        getAllSkills: () => dispatch(getAllSkills()),
        setUserSkill: (skill: string) => dispatch(setUserSkill(skill)),
    }
}


class SearchUserFilter extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            fields: [

                {
                    id: 'selectInput',
                    name: 'skills',
                    label: ' مهارت ',
                    value: '',
                    placeholder: '',
                    items: props.skills

                }
                ,

                {
                    id: 'selectInput',
                    name: 'university',
                    label: ' دانشگاه ',
                    value: '',
                    placeholder: '',
                    items: props.university

                }
                ,

                {
                    id: 'selectInput',
                    name: 'province',
                    label: ' استان ',
                    value: '',
                    code: '',
                    placeholder: '',
                    items: props.province
                },
                {
                    id: 'selectInput',
                    name: 'city',
                    label: ' شهر',
                    value: '',
                    placeholder: '',
                    items: props.city
                }

            ]

        }
    }


    render() {

        return (
            <Grid container>
                <Grid item data-test="sorting" style={{ padding: "0 5px 15px 0", width: "100%" }} sm={12}> دسته بندی بر اساس : </Grid>
                {
                    this.state.fields.map((field: any,index:number) => {
                        return (
                            <Grid key={index} item sm={3} xs={12} >
                                <Autocomplete
                                   data-testid={field.name}
                                    id="combo-box-demo"
                                    options={field.items}
                                    getOptionLabel={(option: any) => option.name}
                                    size="small"
                                    style={{
                                        padding: "5px 3px",
                                        marginBottom: "20px"
                                    }}
                                    onChange={field.handleChange}
                                    renderInput={(params) =>
                                        <TextField {...params} label={field.label} variant="outlined" />}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>
        );
    }

    componentDidMount() {
        this.props.ProvinceApi();
        this.props.getAllSkills();
        this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
    }

    componentDidUpdate(prevProps: IProps) {
        if (this.props.user_university !== prevProps.user_university) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }
        if (this.props.user_province !== prevProps.user_province) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }
        if (this.props.user_city !== prevProps.user_city) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }

        if (this.props.text !== prevProps.text) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }
        if (this.props.user_skill !== prevProps.user_skill) {
            this.props.FilterUsers(this.props.user_university, this.props.user_skill, this.props.user_city, this.props.user_province, this.props.text, this.props.pageUsers)
        }
    }

    static getDerivedStateFromProps(nextProps: IProps, nextState: IState) {
        return {
            fields: [
                {
                    id: 'selectInput',
                    name: 'skills',
                    label: ' مهارت ',
                    value: '',
                    placeholder: '',
                    items: nextProps.allSkills,
                    handleChange: (event: any, values: any) => {
                        nextProps.setUserSkill((values?.id) ? values.id : '')
                    },
                }
                ,
                {
                    id: 'selectInput',
                    name: 'university',
                    label: ' دانشگاه ',
                    value: '',
                    placeholder: '',
                    items: nextProps.university,
                    handleChange: (event: any, values: any) => {
                        nextProps.setUserUniversity((values?.code) ? values.code : '')
                    },
                }
                ,
                {
                    id: 'selectInput',
                    name: 'province',
                    label: ' استان ',
                    value: '',
                    placeholder: '',
                    items: nextProps.province,
                    handleChange: (event: any, values: any) => {
                        nextProps.setUserProvince((values?.code) ? values.code : '')
                    },
                },
                {
                    id: 'selectInput',
                    name: 'city',
                    label: ' شهر',
                    value: '',
                    placeholder: '',
                    items: nextProps.city,
                    handleChange: (event: any, values: any) => {
                        nextProps.setUserCity((values?.code) ? values.code : '')
                    },
                }
            ]
        }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserFilter)
