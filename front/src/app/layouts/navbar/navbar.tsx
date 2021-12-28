import {
    AppBar,
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Drawer,
    fade,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemProps,
    ListItemText,
    makeStyles,
    Toolbar,
    Typography,
    Icon
} from "@material-ui/core";

import React, { useEffect, useState } from "react";
import styles from "./navbar.module.scss";
import { ArrowForward, Close, Edit } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, useHistory } from "react-router-dom";
import clsx from 'clsx';
import { createStyles, Theme, withStyles } from "@material-ui/core/styles";
import { AuthRoutesEnum, DashboardRoutesEnum, HomeRoutesEnum, UserRoutesEnum } from "../../navigation/RoutesEnum";
import AppsIcon from '@material-ui/icons/Apps';
import images from "../../assets/images";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import { rootState } from "../../redux/RootReducer";
import { GetAvatar, GetBriefProfile } from "../../redux/User/Profile/Actions";
import { setSearchText } from "../../redux/Search/Actions";
import { apiClient } from './../../api/_api'
import { deskLoading, userRequestAction } from "../../redux/Dashboard/Desk/Actions";
import Popover from '@material-ui/core/Popover';
import jalali_moment from 'jalali-moment'

interface INavLinkModel {
    id: number;
    text: string;
    icon: any;
    link: string;
    alert?: number;
}


const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: '200px',
    },
});

type Anchor = 'top';

function TemporaryDrawer(props: any) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false)
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        if (open) {
            document.body.classList.add(styles.openDrawer)
        }
        setOpen(open)

        setState({ ...state, [anchor]: open });

    };

    const list = (anchor: Anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Card>
                    <CardContent>
                        <ListItem style={{ padding: "0px", textAlign: "center", }}>
                            <Avatar src={props.avatar} />
                            <Grid
                                item
                                xs={8}
                                style={{
                                    textAlign: "center",
                                    color: "black",
                                }}
                            >
                                {props.name} {props.family}
                            </Grid>
                        </ListItem>

                        <ListItem style={{ padding: "0px", paddingTop: "5px", textAlign: "center", }}>

                            <Button style={{ width: "80%", margin: "auto", }} variant="outlined"
                                color="primary" component={Link} to={UserRoutesEnum.USER_PROFILE} data-test="profile">
                                پروفایل
                            </Button>

                        </ListItem>

                        <ListItem style={{ padding: "0px", paddingTop: "5px", textAlign: "center", }}>

                            <Button style={{ width: "80%", margin: "auto" }} variant="outlined" component={Link}
                                to={AuthRoutesEnum.SIGN_OUT}
                                color="primary" data-test="exit">
                                خروج
                            </Button>

                        </ListItem>
                    </CardContent>

                </Card>
            </List>
        </div>
    );

    const CustomDrawer = withStyles({
        root: {
            '&.MuiDrawer-root': {
                width: 'auto',
                marginBottom: '1em',
                height: 'auto !important',
                inset: 'unset !important',
                position: 'absolute !important',
                zIndex: 'inherit',
                '& .MuiBackdrop-root': {
                    position: 'relative'
                },
                '& .MuiDrawer-paperAnchorTop': {
                    top: '60px',
                    left: "unset",
                },
            },

        },
    })(Drawer);


    return (
        <div>
            {(['top'] as Anchor[]).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, !open)}><Avatar src={props.avatar} /></Button>
                    <CustomDrawer
                        anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </CustomDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
//show Notification
function ShowNotification() {

    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            btn: {
                color: 'white',
                fontSize: '0.9rem'
            },
            popover: {
                maxHeight: '600px'
            },
            list: {
                '&:before': {
                    position: 'absolute',
                    length: '200px',
                    top: '100%',
                    borderStyle: 'solid',
                    borderWidth: '20px',
                }
            },
            item: {
                borderBottom: 'solid 2px rgba(0,0,0,0.2)',
                display: 'block',
                minWidth: '330px',
            },
            text: {
                fontSize: '0.8rem',
                padding: '5px'
            },
            date: {
                fontSize: '0.7rem',
                color: 'rgba(0,0,0,0.5)',
                paddingLeft: '5px',
                justifyContent: 'flex-end'
            },
            moreBtn: {
                color: 'rgb(4,107,0)',
                fontSize: '1rem',
                width: '100%',
                textAlign: 'center',
                '&:hover': {
                    color: '#7DC02F'
                }

            }

        }),
    );

    const classes = useStyles();
    //Notif state
    const [notifs, setNotifs] = useState([]);
    const [page, setPage] = useState(1);
    const [showMoreButton, setShowMoreButton] = useState(true);
    const [notVisited, setNotVisited] = useState(0);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    //api
    const getNotifs = (page: number) => {
        apiClient.get(`dashboard/messages/?page=${page}`)
            .then(res => {
                setNotifs(res.results);
                console.log(res.results);
                setNotVisited(res.results.filter((notif: any) => notif.isVisited == false).length)
            }).catch((err) => {
                if (err.status == 404) {
                    setShowMoreButton(false)
                }
            })
    }

    const getMoreNotifs = (page: number) => {
        apiClient.get(`dashboard/messages/?page=${page}`)
            .then(res => {
                let margeNotif: any = notifs
                margeNotif = margeNotif.concat(res.results)
                setNotifs(margeNotif);
                console.log(res.results);
                setNotVisited(margeNotif.filter((notif: any) => notif.isVisited == false).length)
            }).catch((err) => {
                if (err.status == 404) {
                    setShowMoreButton(false)
                }
            })
    }

    useEffect(() => {
        getNotifs(page);
    }, [anchorEl])

    //handleChange
    const handleChange = () => {
        setPage(page + 1)
        getMoreNotifs(page + 1)
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPage(1)
        getNotifs(page);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div style={{ marginLeft: '23px' }}>
            <Badge badgeContent={notVisited} color="error"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}>
                {
                    window.innerWidth > 769 ?
                        <Button aria-describedby={id} onClick={handleClick} className={classes.btn} data-test="notif">اعلان ها</Button>
                        :
                        <Button onClick={handleClick}><img src={images.navbar.bell} /></Button>

                }
            </Badge>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                className={classes.popover}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <List className={classes.list}>
                    {
                        notifs.length !== 0 ?
                            <>
                                {
                                    notifs.map((notif: any, index: number) => {
                                        return (

                                            <ListItem className={classes.item}>
                                                <ListItem className={classes.text}>{notif.text}</ListItem>
                                                <ListItem className={classes.date}>
                                                    {jalali_moment(notif.createdDate).format("jYYYY/jM/jD")}
                                                </ListItem>
                                            </ListItem>
                                        )
                                    })
                                }

                                {(showMoreButton) &&
                                    <Button onClick={handleChange} className={classes.moreBtn} data-test="show more"><b>بیشتر</b> </Button>
                                }
                            </>

                            :
                            <ListItem>
                                <Typography style={{ textAlign: 'center', color: 'rgba(0,0,0,.5)', fontSize: '0.9rem' }} data-test="not found"> یافت نشد ! </Typography>
                            </ListItem>
                    }
                </List>
            </Popover>
        </div>
    );
}




function Navbar(props: any) {
    const history = useHistory()
    const dispatch = useDispatch()
    const profile = useSelector((state: rootState) => state.userProfile.briefprofile)
    const projectRequest = useSelector((state: rootState) => state.dashboard.desk.requests)
    const avatar = useSelector((state: rootState) => state.userProfile.avatar)

    const [navSearchInput, setNavSearchInput] = useState("")

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            position: "sticky",
            marginBottom: 50
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },

        },
        search_box: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            width: "100%",
            [theme.breakpoints.down(768)]: {
                width: "100%",
                color: "white",
                backgroundColor: "transparent",
                "&:hover": {
                    color: "black",
                },
            },
            [theme.breakpoints.up(768)]: {
                width: "auto",
            },
            [theme.breakpoints.up("md")]: {
                marginRight: theme.spacing(1),
                width: "auto",
            },
        },
        searchIcon: {
            padding: "0 7px",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            left: 0,
            top: 0,
        },
        inputRoot: {
            color: "inherit",
            display: "flex !important"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.down(768)]: {
                width: "15ch",
                "&:focus": {
                    width: "100%",
                    color: "black",
                    backgroundColor: fade(theme.palette.common.white, 0.25),
                },
            },
            [theme.breakpoints.up("md")]: {
                width: "15ch",
                "&:focus": {
                    width: "20ch",
                },
            },
            [theme.breakpoints.up("sm")]: {
                width: "10ch",
            },
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'flex-end',
        },
        badge: {
            "&:hover": {
                variant: "standard",
            },
        },
    }));
    const [badgeHover, setBadgeHover] = useState([] as any[]);
    const cssClass = useStyles();
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [drawerShow, setDrawerShow] = useState(false);

    function ListItemLink(props: ListItemProps<typeof Link, { button?: true }>) {
        return <ListItem button component={Link} {...props} />;
    }

    function resize(e: any) {
        setWindowSize({ width: e.target.innerWidth, height: e.target.innerHeight });
    }

    function changeBadgeHover(id: number, enable: boolean) {
        let temp = [...badgeHover];
        let findIndex = temp.map((item) => item.id).indexOf(id);
        if (findIndex) {
            temp[findIndex] = { ...temp[findIndex], enable };
            setBadgeHover(temp);
        }
    }

    useEffect(() => {
        dispatch(GetBriefProfile())
        dispatch(GetAvatar())
        dispatch((filterStatus = "") => {
            dispatch(deskLoading())
            apiClient.get("dashboard/user-projects/",
                {
                    params: {
                        category: "REQUEST",
                    },
                })
                .then((response) => {
                    dispatch(userRequestAction(response))
                })
        })
        setBadgeHover(
            navLinks.map((item) => {
                return { id: item.id, enable: false };
            }) as any[]
        );
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);


    const customIcon = (src: any) => {
        return (
            <Icon>
                <img style={{ width: '22px' }} alt="" src={src} />
            </Icon>
        )
    }

    //navbar links
    //you can cutomize navLink object
    const navLinks: INavLinkModel[] = [
        { id: 0, text: "خانه", icon: customIcon(images.navbar.home), link: DashboardRoutesEnum.DASHBOARD },
        { id: 1, text: "میز کار", icon: customIcon(images.navbar.front_desk), link: DashboardRoutesEnum.DESK_PROJECTS },
        { id: 3, text: "صفحه ی اصلی", icon: customIcon(images.navbar.mainpage), link: HomeRoutesEnum.HOME },
    ];

    return (
        <div className={styles.main_layout}>
            <Helmet>
                <title>میزکار</title>
            </Helmet>
            <AppBar className={styles.app_bar} position={"sticky"}>
                <Toolbar className={styles.toolbar}>
                    {windowSize.width > 768 ? (
                        // Desktop mode
                        <>
                            <Typography style={{ display: 'flex', alignItems: 'center' }}>
                                <img className={styles.Logo} src={images.userProfile.kharazmiLogo}
                                    alt={"kharazmi logo"} data-test='logo' />
                                <AppsIcon className={styles.AppIcon} />
                                <span className={styles.title}>دانش آموختگان</span></Typography>

                            <div className={styles.menu}>
                                <Box>
                                    {navLinks.map((item) => (
                                        item.alert ? (
                                            <Button
                                                color="inherit"
                                                onPointerEnter={() => changeBadgeHover(item.id, true)}
                                                onPointerLeave={() =>
                                                    changeBadgeHover(item.id, false)
                                                }
                                                key={item.id}
                                            >
                                                <Badge
                                                    badgeContent={item.alert}
                                                    color="error"
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "right",
                                                    }}
                                                    variant={
                                                        badgeHover.find((x) => x.id === item.id)?.enable
                                                            ? "standard"
                                                            : "dot"
                                                    }
                                                >
                                                    <Link to={item.link} style={{ color: "white" }}>
                                                        {item.text}
                                                    </Link>
                                                </Badge>
                                            </Button>
                                        ) : (
                                                <Button color={"inherit"} key={item.id} component={Link} to={item.link}>
                                                    {item.text}
                                                </Button>
                                            )
                                    ))}
                                </Box>
                                <ShowNotification />
                                <div className={cssClass.search_box}>
                                    <InputBase
                                        placeholder="جستجو"
                                        classes={{
                                            root: cssClass.inputRoot,
                                            input: cssClass.inputInput,
                                        }}
                                        onChange={(e) => setNavSearchInput(e.target.value)}
                                        inputProps={{ "aria-label": "search" }}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                dispatch(setSearchText(navSearchInput))
                                                history.push(HomeRoutesEnum.SEARCH)

                                            }
                                        }}
                                    />
                                    <div className={cssClass.searchIcon}
                                        onClick={() => dispatch(setSearchText(navSearchInput))}>
                                        {customIcon(images.navbar.search)}
                                    </div>

                                </div>
                                <TemporaryDrawer name={profile.firstName} family={profile.lastName} avatar={avatar} />
                            </div>
                        </>
                    ) : (
                            // Mobile mode
                            <div className={styles.menu}>
                                <div className={styles.menu_icon}>
                                    <IconButton color="inherit" onClick={() => setDrawerShow(true)}>
                                        <MenuIcon />
                                    </IconButton>
                                </div>

                                <ShowNotification />

                                <div>
                                    <Typography className={styles.title}>دانش آموختگان</Typography>
                                </div>
                                <AppsIcon className={styles.AppIcon} />
                                <Drawer
                                    open={drawerShow}
                                    onClose={() => setDrawerShow(false)}
                                    anchor="top"
                                >

                                    <div className={styles.submenu}>
                                        <div className={styles.submenu_list_item}>
                                            <IconButton onClick={() => setDrawerShow(false)}>
                                                <Close style={{ color: 'white' }} />
                                            </IconButton>
                                            <img className={styles.Logo} src={images.userProfile.kharazmiLogo}
                                                alt={"kharazmi logo"} />
                                        </div>
                                        <Divider />
                                        <List>
                                            {navLinks.map((item) => (
                                                item.alert ?
                                                    <ListItemLink to={item.link} key={item.id}>
                                                        <ListItemText className={styles.submenu_list_item}>
                                                            <Badge
                                                                badgeContent={item.alert}
                                                                color="error"
                                                                anchorOrigin={{
                                                                    vertical: "bottom",
                                                                    horizontal: "left",
                                                                }}
                                                            >
                                                                {item.icon}
                                                                {item.text}
                                                            </Badge>
                                                        </ListItemText>
                                                    </ListItemLink>
                                                    :
                                                    <ListItemLink to={item.link} key={item.id}>
                                                        <ListItemText className={styles.submenu_list_item}>
                                                            {item.icon}
                                                            {item.text}
                                                        </ListItemText>
                                                    </ListItemLink>
                                            ))}

                                            <ListItem>
                                                <div className={cssClass.search_box}>
                                                    <InputBase
                                                        placeholder="جستجو"
                                                        classes={{
                                                            root: cssClass.inputRoot,
                                                            input: cssClass.inputInput,
                                                        }}
                                                        onChange={(e) => setNavSearchInput(e.target.value)}
                                                        inputProps={{ "aria-label": "search" }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                dispatch(setSearchText(navSearchInput))
                                                                history.push(HomeRoutesEnum.SEARCH)

                                                            }
                                                        }}
                                                    />
                                                    <div className={cssClass.searchIcon}
                                                        onClick={() => dispatch(setSearchText(navSearchInput))}>
                                                        {customIcon(images.navbar.search)}
                                                    </div>
                                                </div>
                                            </ListItem>

                                            <Divider style={{ background: 'white' }} />
                                            <ListItem className={styles.hover}>
                                                <Avatar src={avatar}
                                                    style={{
                                                        marginRight: "4px"
                                                    }} />
                                                <Grid
                                                    item
                                                    xs={8}
                                                    style={{
                                                        textAlign: "right",
                                                        marginRight: "7px",
                                                        color: "white",
                                                    }}
                                                >
                                                    {profile.firstName} {profile.lastName}
                                                </Grid>
                                            </ListItem>
                                            <ListItemLink
                                                to={UserRoutesEnum.USER_PROFILE}
                                                className={styles.hover}>
                                                <ListItemText className={styles.submenu_list_item}>
                                                    {customIcon(images.navbar.registration)}
                                                    {'تکمیل پروفایل'}
                                                </ListItemText>
                                            </ListItemLink>
                                            <ListItemLink
                                                to={AuthRoutesEnum.SIGN_OUT}
                                                className={styles.hover}>
                                                <ArrowForward
                                                    style={{
                                                        color: "white",
                                                        marginRight: "10px",
                                                        marginLeft: "10px"
                                                    }} />
                                                <Grid
                                                    item
                                                    xs={8}
                                                    style={{
                                                        textAlign: "right",
                                                        marginRight: "7px",
                                                        color: "white",
                                                    }}
                                                >
                                                    خروج
                                            </Grid>
                                            </ListItemLink>
                                        </List>
                                    </div>
                                </Drawer>
                            </div>
                        )}
                </Toolbar>
            </AppBar>
            <>
                {props.children}
            </>
        </div>
    );
}

export default Navbar;
