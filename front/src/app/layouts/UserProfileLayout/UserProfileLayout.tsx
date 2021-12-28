import React, {useEffect} from 'react'
import UserProfile from './../../pages/UserProfile/SetProfile/SetProfile'
import {Icon} from "./../../components/material-ui";
import UserSkills from './../../pages/UserProfile/Skills/Skills'
import SendResume from "../../pages/UserProfile/Resume/SendResume";
import images from "../../assets/images/userProfile/index"
import {useDispatch} from "react-redux";
import {GetAvatar, GetParentSkills, GetProfile, GetSkills, ProvinceApi} from "../../redux/User/Profile/Actions";
import CustomTabs, {TabBarProps} from "../../components/customs/CustomTabs/CustomTabs";

export default function SimpleTabs() {
    const dispatch = useDispatch();

    //get skills
    useEffect(() => {
        dispatch(GetParentSkills());
        dispatch(GetSkills());
        dispatch(ProvinceApi())
        dispatch(GetProfile())
        dispatch(GetAvatar())
    }, [])

    const skillIcon = (
        <Icon>
            <img style={{width: '30px'}} alt="development_skill" src={images.development_skill} data-test='development_skill'/>
        </Icon>
    );
    const infoIcon = (
        <Icon>
            <img style={{width: '30px'}} alt="customer" src={images.customer} data-test='customer'/>
        </Icon>
    );

    const resumeIcon = (
        <Icon>
            <img style={{width: '30px'}} alt="pdfFile" src={images.pdfFile} data-test='pdfFile'/>
        </Icon>
    );

    const DeskTabs: TabBarProps[] = [
        {label: "تکمیل پروفایل", icon: infoIcon, component: <UserProfile/>},
        {label: "مهارت ها", icon: skillIcon, component: <UserSkills/>},
        {label: "رزومه", icon: resumeIcon, component: <SendResume/>},
    ]
    return (
        <>
            <div>
                <CustomTabs tabs={DeskTabs}/>
            </div>
        </>
    );
}


