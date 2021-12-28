import React from 'react';
import {AppBar, Box, Tab, Tabs, withStyles} from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>{children}</Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const StyledAppBar = withStyles({
    root: {
        '&.MuiPaper-elevation4': {
            backgroundColor: "white",
            boxShadow: "none",
            borderBottom: "1px solid black"
        },
    }
})(AppBar)

const CustomTabsComponent = withStyles({
    root: {
        '&.MuiTabs-root': {
            backgroundColor: "white",
            color: 'black',
            '&.MuiTab-textColorInherit': {
                color: "primary !important",
                '.Mui-selected': {
                    color: "primary !important"
                }
            },

        },
        '&.MuiAppBar-colorPrimary': {
            color: 'black',
            marginBottom: '1em',
            backgroundColor: "white !important",
        },
    },
})(Tabs);

export interface AppbarProps {
    tabs: TabBarProps[]
}

export interface TabBarProps {
    label: string,
    icon?: any,
    component: any,
    testid?:string;
}

export const CustomTabs = (props: AppbarProps) => {
    const query = new URLSearchParams(window.location.search);
    const tabIndex = query.get("tab")
    const [value, setValue] = React.useState(tabIndex ? parseInt(tabIndex) : 0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        window.history.pushState("", "", `?tab=${newValue}`)
        setValue(newValue);
    };

    return (
        <div>
            <StyledAppBar position="static">
                <CustomTabsComponent
                    variant="scrollable"
                    scrollButtons="auto"
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs">
                    {props.tabs?.map((AppbarProps, index) => {
                        return <Tab data-testid={AppbarProps.label} label={AppbarProps.label} icon={AppbarProps.icon} {...a11yProps(index)}
                                    key={index}/>
                    })}
                </CustomTabsComponent>
            </StyledAppBar>


            {props.tabs?.map(({component: Component,testid:testId}, index) => {
                return <TabPanel value={value} index={index} key={index}>{Component}</TabPanel>
            })}

        </div>
    );
}

export default CustomTabs;