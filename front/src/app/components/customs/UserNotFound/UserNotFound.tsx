import React from "react"
import {Grid, Typography} from "@material-ui/core"

const UserNotFound = () => {
    return (
        <Grid container justify={"center"} alignItems={"center"} style={{marginTop: "50px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 65 64.608">
                <g id="Group_2" data-name="Group 2" transform="translate(-1371 -235)">
                    <path id="icons8_find_user_male"
                          d="M25.006.156c-7.251,0-13.4,4.978-13.4,14.5A24.848,24.848,0,0,0,18.186,31.12c1.47,3.9-1.176,5.36-1.725,5.566C8.878,39.469,0,44.525,0,49.542v1.881c0,6.83,13.013,8.388,25.085,8.388a89.321,89.321,0,0,0,13.248-.862A16.321,16.321,0,0,1,31.513,33a9.781,9.781,0,0,1,.47-1.96H31.9A24.871,24.871,0,0,0,38.49,14.658C38.49,5.134,32.248.156,25.006.156ZM43.9,29.866a13.8,13.8,0,1,0,8.623,24.614l.549.549a2.4,2.4,0,0,0,.392,2.822l6.193,6.193a2.52,2.52,0,0,0,3.527,0l1.1-1.1a2.52,2.52,0,0,0,0-3.527l-6.193-6.193a2.438,2.438,0,0,0-2.9-.392l-.549-.549A13.769,13.769,0,0,0,43.9,29.866Zm0,3.763A10.034,10.034,0,1,1,33.864,43.663,10.028,10.028,0,0,1,43.9,33.629Z"
                          transform="translate(1371 234.844)" fill="#046b00"/>
                    <g id="Group_1" data-name="Group 1" transform="translate(95 -73)">
                        <line id="Line_1" data-name="Line 1" x2="10.25" y2="9.225" transform="translate(1314.5 347.5)"
                              fill="none" stroke="#046b00" strokeLinecap="round" strokeWidth="2"/>
                        <line id="Line_2" data-name="Line 2" x1="10.25" y2="9.225" transform="translate(1314.5 347.5)"
                              fill="none" stroke="#046b00" strokeLinecap="round" strokeWidth="2"/>
                    </g>
                </g>
            </svg>

            <Typography color={"primary"} style={{marginRight: "10px"}}>کاربری با این مشخصات یافت نشد!</Typography>
        </Grid>

    )
}

export default UserNotFound;