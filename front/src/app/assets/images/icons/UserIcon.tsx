import React from "react";

interface IProps {
    width?: string,
    height?: string
}

const UserIcon = (props: IProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 46.916">
            <path id="icons8_contacts"
                  d="M28.527,28.86c-.292-.092-2.123-.919-.976-4.4h-.014A19.4,19.4,0,0,0,32.8,11.566C32.8,4.081,27.822.156,22.031.156S11.29,4.081,11.29,11.566a19.349,19.349,0,0,0,5.271,12.927c1.168,3.07-.926,4.209-1.36,4.366C9.14,31.054,2.031,35.049,2.031,39v1.481c0,5.37,10.413,6.6,20.057,6.6s19.943-1.225,19.943-6.6V39C42.031,34.935,34.887,30.968,28.527,28.86Z"
                  transform="translate(-2.031 -0.156)" fill="#008595"/>
        </svg>

    )
}

export default UserIcon;