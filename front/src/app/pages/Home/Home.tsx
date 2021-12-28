import React, {useState} from 'react';
import Styles from './Home.module.scss';
import images from "../../assets/images";
import {Grid, InputBase, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SliderComponent from "./SliderComponent";
import {setSearchText} from "../../redux/Search/Actions";
import {useDispatch} from "react-redux";
import {HomeRoutesEnum} from "../../navigation/RoutesEnum";
import {useHistory} from "react-router-dom"
import {Helmet} from "react-helmet";

const Home = () => {
    const [searchInputText, setSearchInputText] = useState("");
    const history = useHistory()
    const dispatch = useDispatch()

    return (
        <>
            <Helmet>
                <title>صفحه اصلی</title>
            </Helmet>
            <Grid className={Styles.header} style={{marginTop: -30}}>
                <Grid><img className={Styles.image} src={images.auth.home} alt=''/></Grid>
                <Grid className={Styles.divSearch}>

                    <InputBase className={Styles.inputSearch}
                               data-test="search"
                               placeholder="مهارت یا اسم پروژه یا نام کاربری فرد مورد نظر خود را وارد کنید"
                               defaultValue={searchInputText}
                               onChange={(e) => setSearchInputText(e.target.value)}
                    />
                    <Button color='primary' variant='contained' data-test='searchBtn'
                            onClick={() => {
                                dispatch(setSearchText(searchInputText))
                                history.push(HomeRoutesEnum.SEARCH)
                            }}>
                        جستجو
                        <img src={images.auth.search} alt='' className={Styles.iconSearch}/>
                    </Button>
                </Grid>

            </Grid>

            <Grid className={Styles.slider}>
                <SliderComponent/>
            </Grid>

            <Grid>
                <footer className={Styles.footer}>
                    <Typography data-testid={'body1'} component={'h2'} variant="body1" >
                        کلیه حقوق این وب سایت متعلق به دانشگاه خوارزمی می باشد
                    </Typography>
                </footer>
            </Grid>
        </>
    )
}

export default Home


