import {TabBarProps} from "../../components/customs/CustomTabs/CustomTabs";
import DescriptionProject from "./Description/ProjectDescription";
import InfoIcon from "../../assets/images/icons/InfoIcon";
import ProjectMembers from "./ProjectMembers/ProjectMembers";
import PeopleIcon from "../../assets/images/icons/PeopleIcon";
import ProjectRequests from "./ProjectRequests/ProjectRequests";
import UserIcon from "../../assets/images/icons/UserIcon";
import SettingIcon from "../../assets/images/icons/SettingIcon";
import MembershipRequest from "./MembershipRequest/MembershipRequest";
import QuestionIcon from "../../assets/images/icons/QuestionIcon";
import React from "react";
import ProjectSetting from "./ProjectSetting/ProjectSetting";
import RemoveProject from "./Status/RemoveProject";


export const AdminTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "درخواست ها", component: <ProjectRequests/>, icon: <UserIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "تنظیمات", component: <ProjectSetting/>, icon: <SettingIcon width={"1.5rem"} height={"1.5rem"}/>}
]

export const CreatorTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "درخواست ها", component: <ProjectRequests/>, icon: <UserIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "تنظیمات", component: <ProjectSetting/>, icon: <SettingIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "حذف پروژه", component: <RemoveProject/>, icon: <QuestionIcon width={"1.5rem"} height={"1.5rem"}/>}
]

export const AcceptedTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>}
]

export const PendingTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>},
    {
        label: "درخواست همکاری",
        component: <MembershipRequest/>,
        icon: <QuestionIcon width={"1.5rem"} height={"1.5rem"}/>
    },
]

export const NonMemberTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>},
    {
        label: "درخواست همکاری",
        component: <MembershipRequest/>,
        icon: <QuestionIcon width={"1.5rem"} height={"1.5rem"}/>
    },
]


export const PublicTabs: TabBarProps[] = [
    {label: "توضیحات", component: <DescriptionProject/>, icon: <InfoIcon width={"1.5rem"} height={"1.5rem"}/>},
    {label: "افراد", component: <ProjectMembers/>, icon: <PeopleIcon width={"1.5rem"} height={"1.5rem"}/>},
]