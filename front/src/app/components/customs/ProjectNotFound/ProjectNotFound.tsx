import React from "react"
import {Grid, Typography} from "@material-ui/core"

const ProjectNotFound = () => {
    return (
        <Grid container justify={"center"} alignItems={"center"} style={{marginTop: "50px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 65 65.235">
                <g id="Group_5" data-name="Group 5" transform="translate(-1574 -446)">
                    <path id="icons8_search_property"
                          d="M7.531,0A7.4,7.4,0,0,0,0,7.531V52.718a7.4,7.4,0,0,0,7.531,7.531H37.42a17.4,17.4,0,0,1-7.06-5.021H7.531a2.368,2.368,0,0,1-2.51-2.51V10.041H55.228V30.36a15.856,15.856,0,0,1,5.021,7.06V7.531A7.4,7.4,0,0,0,52.718,0Zm5.021,20.083V25.1h5.021V20.083Zm10.041,0V25.1H47.7V20.083ZM12.552,30.124v5.021h5.021V30.124Zm10.041,0v5.021h6.041a13.714,13.714,0,0,1,4.236-5.021Zm21.338,0a13.807,13.807,0,1,0,0,27.614A13.611,13.611,0,0,0,52.4,54.679l.471.471a2.356,2.356,0,0,0,.314,3.059l6.276,6.276a2.452,2.452,0,0,0,3.53,0L64.25,63.23a2.361,2.361,0,0,0,0-3.452L57.974,53.5a2.4,2.4,0,0,0-2.9-.471l-.471-.471a13.635,13.635,0,0,0,3.138-8.629A13.93,13.93,0,0,0,43.931,30.124Zm0,3.766A10.041,10.041,0,1,1,33.89,43.931,10.074,10.074,0,0,1,43.931,33.89Zm-31.38,6.276v5.021h5.021V40.166Zm10.041,0v5.021h3.766V43.931a19.014,19.014,0,0,1,.471-3.766Z"
                          transform="translate(1574 446)" fill="#046b00"/>
                    <g id="Group_4" data-name="Group 4" transform="translate(162 113)">
                        <line id="Line_3" data-name="Line 3" x2="10" y2="9" transform="translate(1450.5 372.5)"
                              fill="none"
                              stroke="#046b00" strokeLinecap="round" strokeWidth="2"/>
                        <line id="Line_4" data-name="Line 4" x1="10" y2="9" transform="translate(1450.5 372.5)"
                              fill="none"
                              stroke="#046b00" strokeLinecap="round" strokeWidth="2"/>
                    </g>
                </g>
            </svg>
            <Typography color={"primary"} style={{marginRight: "10px"}}>پروژه ای با این مشخصات یافت نشد!</Typography>
        </Grid>

    )
}

export default ProjectNotFound;