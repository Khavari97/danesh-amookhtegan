import React, { Component } from "react";
import { Grid, Input } from "@material-ui/core";
import images from "../../../assets/images";
import Button from "@material-ui/core/Button";


interface IProps {
    text: any;
    default: any;
    value?: string;
    data_testid?:string
}

class SearchInput extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }


    render() {
        return (
            <Grid item style={{ display: "flex", textAlign: "center", padding: 5, margin: "5px 0 40px 0" }}>
                <Input fullWidth
                data-testid={this.props.data_testid}
                       data-test='placeholder'
                    placeholder={
                        "مهارت یا اسم پروژه یا نام کاربری فرد مورد نظر خود را وارد کنید"
                    }
                    defaultValue={this.props.default}
                    onChange={this.props.text}
                />
                <Button data-test='btnSearch' color='primary' variant='contained' style={{ marginRight: 5 }}
                >
                    جستجو
                    <img src={images.auth.search} alt='' width={"100%"} style={{ marginRight: 5 }} />
                </Button>
            </Grid>
        )
    }
}

export default SearchInput