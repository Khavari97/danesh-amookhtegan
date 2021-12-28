import React from "react";

interface IProps {
    width?: string,
    height?: string
}

const QuestionIcon = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 40">
            <path id="icons8_help"
                  d="M21.188,1.188a20,20,0,1,0,20,20A20,20,0,0,0,21.188,1.188ZM21.095,33.4a2.85,2.85,0,1,1,2.857-2.85A2.826,2.826,0,0,1,21.095,33.4Zm4.2-12.923-1.859,1.614c-1.4,1.23-1.164,1.832-1.164,2.586H20.189v-.761c0-3.671,3.505-4.306,3.505-9.729,0-2.083-.681-3.036-2.414-3.036-1.594,0-2.308.78-2.077,2.659.139,1.184-1.052,1.653-1.832,1.653a1.872,1.872,0,0,1-1.627-2.07c0-2.017,2.116-4.134,5.8-4.134,3.585,0,6.713,1.62,6.713,5.522C28.264,17.2,27.378,18.661,25.295,20.48Z"
                  transform="translate(-1.188 -1.188)" fill="#008595"/>
        </svg>

    )
}

export default QuestionIcon;