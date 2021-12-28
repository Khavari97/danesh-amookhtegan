import React from "react";

interface IProps {
    width?: string,
    height?: string
}

const ArrowToLeftIcon = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40">
            <path id="icons8_go_back"
                  d="M41,21A20,20,0,1,0,21,41,20.055,20.055,0,0,0,41,21ZM19,30.336a52.9,52.9,0,0,1-9.5-8.672c0-.163-.169-.332-.169-.664s.169-.5.332-.833a61.462,61.462,0,0,1,9.5-8.665,1.013,1.013,0,0,1,1.335,0,2.447,2.447,0,0,1,.5,1.165V17s10.169.495,10.664.833c.671.495,1,2,1,3.164a4.937,4.937,0,0,1-1,3C31.169,24.333,21,25,21,25v4.336a.921.921,0,0,1-.664,1A1.013,1.013,0,0,1,19,30.336Z"
                  transform="translate(-1 -1)" fill="#008595"/>
        </svg>
    )
}

export default ArrowToLeftIcon;