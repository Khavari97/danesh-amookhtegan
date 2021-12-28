import React from "react";
import {Button, ButtonProps} from "@material-ui/core";
import styles from "./DangerButton.module.scss"

interface DangerButtonProps extends ButtonProps {
    label: string
}

const DangerButton = (props: DangerButtonProps) => {
    return (
        <Button className={styles.dangerButton} {...props}>{props.label}</Button>
    )
}

export default DangerButton;