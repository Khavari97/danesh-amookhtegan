import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import AppsIcon from '@material-ui/icons/Apps';
import {AuthRoutesEnum, HomeRoutesEnum} from "../../navigation/RoutesEnum";
import images from "../../assets/images";
import Styles from "./PublicNavbar.module.scss"
import {
    AppBar,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemProps,
    ListItemText,
    Toolbar,
    Typography
} from "@material-ui/core";
import styles from "../../layouts/navbar/navbar.module.scss";
import MenuIcon from "@material-ui/icons/Menu";
import {LockOpen, PersonAdd} from "@material-ui/icons";

interface INavLinkModel {
    id: number;
    text: string;
    icon?: any;
    link: string;
}

export const PublicNavbar = (props: any) => {
    const [badgeHover, setBadgeHover] = useState([] as any[]);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [drawerShow, setDrawerShow] = useState(false);

    function ListItemLink(props: ListItemProps<typeof Link, { button?: true }>) {
        return <ListItem button component={Link} {...props} />;
    }

    function resize(e: any) {
        setWindowSize({width: e.target.innerWidth, height: e.target.innerHeight});
    }


    useEffect(() => {
        setBadgeHover(
            navLinks.map((item) => {
                return {id: item.id, enable: false};
            }) as any[]
        );
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        };
    }, []);

    const navLinks: INavLinkModel[] = [
        {id: 0, text: "ورود", icon: <LockOpen/>, link: AuthRoutesEnum.SIGN_IN},
        {id: 1, text: "ثبت نام", icon: <PersonAdd/>, link: AuthRoutesEnum.SIGN_UP},
        {id: 2, text: "صفحه ی اصلی", link: HomeRoutesEnum.HOME},
    ]

    return (
        <div>
            {windowSize.width > 640 ? (
                    <nav className={Styles.mainNav}>
                        <div className={Styles.navbar}>
                            <img style={{width: '30px', float: 'right', marginRight: '15px', marginTop: '-5px'}}
                                 src={images.userProfile.kharazmiLogo} alt={"kharazmi logo"} data-test='logo'/>
                            <AppsIcon className={Styles.appIcon}/>
                            <span className={Styles.title} data-test="subject"> دانش آموختگان </span>
                            <div>
                                <Link className={Styles.signUpButton} to={AuthRoutesEnum.SIGN_UP} data-test="register"> ثبت نام </Link>
                                <Link className={Styles.signInButton} to={AuthRoutesEnum.SIGN_IN} data-test="login"> ورود </Link>
                                <Link className={Styles.signInButton} to={HomeRoutesEnum.HOME} data-test="home"> صفحه اصلی </Link>
                            </div>
                        </div>
                    </nav>)
                :
                (
                    <div className={styles.main_layout}>
                        <AppBar className={styles.app_bar}>
                            <Toolbar className={styles.toolbar}>
                                <div className={styles.menu}>

                                    <div className={styles.menu_icon}>
                                        <IconButton color="inherit" onClick={() => setDrawerShow(true)}>
                                            <MenuIcon/>
                                        </IconButton>
                                    </div>

                                    <div>
                                        <Typography data-test="title">دانش آموختگان</Typography>
                                    </div>

                                    <AppsIcon className={styles.AppIcon}/>

                                    <Drawer
                                        open={drawerShow}
                                        onClose={() => setDrawerShow(false)}
                                        anchor="top"
                                    >

                                        <div className={styles.submenu}>
                                            <div className={styles.submenu_list_item}>
                                                <IconButton onClick={() => setDrawerShow(false)}>
                                                    <MenuIcon/>
                                                </IconButton>
                                            </div>

                                            <List>
                                                {navLinks.map((item) => (
                                                    <ListItemLink to={item.link} key={item.id}>
                                                        <ListItemText className={styles.submenu_list_item}>
                                                            {item.icon}
                                                            {item.text}
                                                        </ListItemText>
                                                    </ListItemLink>
                                                ))}


                                            </List>
                                        </div>
                                    </Drawer>
                                </div>
                            </Toolbar>
                        </AppBar>
                    </div>
                )
            }
            <div>
                {props.children}
            </div>
        </div>
    )
}


export default PublicNavbar