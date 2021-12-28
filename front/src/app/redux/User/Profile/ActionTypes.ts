export const SET_PROVINCES = 'SET_PROVINCES';
export const SET_CITIES = 'SET_CITIES';
export const SET_UNIVERSITY = 'SET_UNIVERSITY'
export const SET_DECRIPTION = 'SET_DECRIPTION'
export const GET_PROFILE = 'GET_PROFILE'
export const GET_PARENT_SKILLS = 'GET_PARENT_SKILLS'
export const GET_SKILLS = 'GET_SKILLS'
export const GET_RESUME = 'GET_RESUME'
export const GET_AVATAR = 'GET_AVATAR'
export const GET_BRIEF_PROFILE = 'GET_BRIEF_PROFILE'

interface University {
    id: number | any
    code: string,
    name: string,
    city: number
    province?: province | any
}

interface Universities extends Array<University> {
}

export interface IUniversities {
    type: typeof SET_UNIVERSITY,
    payload: Universities | any
}

interface City {
    id: number | any
    code: string,
    name: string,
    province?: province | any
}

interface Cities extends Array<City> {
}

export interface ICities {
    type: typeof SET_CITIES,
    payload: Cities | any
}

interface province {
    id: number | any
    code: string,
    name: string
}

interface provinces extends Array<province> {
}

export interface IProvinces {
    type: typeof SET_PROVINCES,
    payload: provinces | any
}


export interface IProfile {
    type: typeof SET_PROVINCES,
    payload: provinces | any
}

export interface IDescription {
    type: typeof SET_DECRIPTION,
    payload: string
}

//profile get
export interface IGetProfile {
    loading: boolean,
    type: typeof GET_PROFILE,
    description: string | any
    data: any
}

export interface IGET_BRIEF_PROFILE {
    type: typeof GET_BRIEF_PROFILE,
    briefprofile: any
    avatar: any
}

export interface IGetResume {
    type: typeof GET_RESUME,
    resume: string
}

export interface IGetAvatar {
    type: typeof GET_AVATAR,
    avatar: string
}

export interface ParentSkill {
    code: string
    name: string
    skill: any
    image: string | any
    isAdd?: boolean
}

interface ParentSkills extends Array<ParentSkill> {
}

export interface IGetParentSkills {
    type: typeof GET_PARENT_SKILLS,
    parentSkills: ParentSkills
}

export interface Skill {
    id: number
    name: string
}

interface Skills extends Array<Skill> {
}

export interface IGetSkills {
    type: typeof GET_SKILLS,
    skills: Skills
}

export interface IState {
    provinces: provinces | any
    profile: object
    cities: Cities
    universities: Universities
    description: string | any
    data: object | any
    parentSkills: ParentSkills
    skills: Skills
    loading: boolean
    resume: string | null
    avatar: any
    briefprofile: any
}

export const INITIAL_STATE: IState = {
    loading: true,
    provinces: [],
    cities: [],
    universities: [],
    profile: {},
    description: '',
    data: {},
    parentSkills: [],
    skills: [],
    resume: null,
    avatar: null,
    briefprofile: {}
}

export type ProfileTypes = IProvinces | ICities | IUniversities | IDescription |
    IGetProfile | IGetParentSkills | IGetSkills | IGetResume | IGetAvatar | IGET_BRIEF_PROFILE
