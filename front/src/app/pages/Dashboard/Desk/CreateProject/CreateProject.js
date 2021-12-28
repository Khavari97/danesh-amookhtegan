import * as React from "react";
import Style from "./CreateProject.module.scss";
import TextField from "@material-ui/core/TextField";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { DatePicker } from "jalali-react-datepicker";
import NumberFormat from "react-number-format";
import { apiClient } from "./../../../../api/_api";
import moment from "jalali-moment";
// import { Calendar, DatePicker } from 'react-persian-datepicker';
import NativeSelect from "@material-ui/core/NativeSelect";
import {
  createProject,
  getPurpose,
  getSkills,
} from "./child/CreatePropjectApi";
import { Button } from "../../../../components/material-ui";
import ArrowToLeftIcon from "./../../../../assets/images/icons/ArrowToLeftIcon";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import Container from "@material-ui/core/Container";
import Snackbar from "../../../../components/material-ui/Snackbar/SnackbarUtils";

import {
  Firstfields,
  label,
  SecondsFields,
  updateProject,
} from "./child/CreateProjectsObjects";
import { Typography } from "@material-ui/core";
import { parse } from "path";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      skills: [],
      skillsNames: [],
      skillsObjects: [],
      skillsValues: [],
      name: "",
      description: "",
      endDate: "",
      category: 0,
      amount: "",
      pathname: true,
      detail: [],
    };
  }

  componentDidMount = async () => {
    await this.getCategory();
    await this.setState({
      pathname:
        window.location.pathname == "/dashboard/project/create" ? true : false,
    });
    await this.fetchProjectDescription(this.props.slug);
  };
  getCategory = async () => {
    apiClient
      .get("list/skills")
      .then((data) => {
        data.unshift({ id: "", title: "" });
        this.setState({
          options: data,
        });
      })
      .catch((e) => console.log(e));
  };

  Label = (numberOfRow, Lable) => {
    return (
      <div className={Style.labeldiv}>
        {this.state.pathname ? (
          <div className={Style.circleDiv}>{numberOfRow} </div>
        ) : (
          <span style={{ height: "20px", width: "20px", marginLeft: "3px" }}>
            <ArrowToLeftIcon />
          </span>
        )}
        {Lable}
      </div>
    );
  };

  setTextFiedlValue = (val) => {
    switch (val) {
      case "name":
        return this.state.name;
        break;
      case "description":
        return this.state.description;
        break;
      case "amount":
        return this.state.amount;
        break;
      default:
        return null;
        break;
    }
  };

  Inputs = (array, handleChange) => {
    return array.map((item, index) => {
      return (
        <div className={Style.childDivStyle} key={index}>
          {this.state.pathname
            ? this.Label(item.index + 1, label[item.index])
            : this.Label(item.index + 1, updateProject[item.index])}
          <div className={Style.inputDiv}>
            <>
              {!this.state.pathname && item.name == "name" ? (
                <div style={{ float: "right", width: "100%" }}></div>
              ) : (
                <TextField
                  id={item.id}
                  name={item.name}
                  required={item.required}
                  onInvalid={(e) =>
                    e.target.setCustomValidity(item.onInvalidMessage)
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                  pattern={item.pattern}
                  label={item.label ? item.label : ""}
                  variant="outlined"
                  multiline={item.multiline ? true : false}
                  rows={item.multiline ? 5 : 1}
                  helperText={item.helpertext ? item.helpertext : ""}
                  style={{ width: "100%" }}
                  onChange={handleChange}
                  inputProps={{
                    maxLength: item.maxLength ? item.maxLength : 5,
                    minLength: 1,
                  }}
                  type={item.type ? item.type : null}
                  value={this.setTextFiedlValue(item.val)}
                />
              )}
            </>
          </div>
        </div>
      );
    });
  };

  CreateOptions = (options) => {
    return options.map((value, index) => {
      return (
        <option value={value.id} key={index}>
          {" "}
          {value.name}
        </option>
      );
    });
  };

  HandleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  getIdOfSkills = async () => {
    let Objects = this.state.skillsObjects;
    let skillsnames = this.state.skillsNames;
    let skillsvalues = [];
    skillsnames.map((pvalue) => {
      Objects.map((cvalue) => {
        if (pvalue == cvalue.name) {
          skillsvalues.push(cvalue.id);
        }
      });
    });

    await this.setState({
      skillsValues: skillsvalues,
    });
  };

  Submit = async (event) => {
    event.preventDefault();

    await this.getIdOfSkills();
    let state = this.state;
    const data = {
      name: this.state.pathname ? state.name : this.props.slug,
      skills: state.skillsValues,
      description: state.description,
      endDate: state.endDate,
      category: state.category,
      amount: state.amount,
    };
    console.log(data.endDate);
    if (data.endDate == "") {
      console.log(data.endDate);
      delete data.endDate;
    }
    if (this.state.pathname) {
      await createProject(data);
    } else {
      apiClient
        .patch(`dashboard/projects/${this.props.slug}/`, {
          data: data,
        })
        .then((res) => {
          Snackbar.success("تغییرات با موفقت ذخیره شد");
          window.location.href = res.url;
        })
        .catch((e) => console.log(e));
    }

    await this.setState({
      options: [],
      skills: [],
      skillsNames: [],
      skillsObjects: [],
      skillsValues: [],
      name: " ",
      description: " ",
      endDate: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`,
      amount: "",
    });
    await this.getCategory();
  };

  fetchProjectDescription = async (slug) => {
    apiClient.get(`dashboard/projects/${slug}/`).then((response) => {
      console.log(response);
      this.setState({
        detail: response,
      });
      if (window.location.pathname != "/dashboard/project/create") {
        this.setState({
          name: response.name,
          amount: response.amount,
          description: response.description,
          category: response.categoryId,
        });
        let names = [];
        response.skills.map((value) => {
          names.push(value.name);
        });
        this.onFocusSkillsId(response.categoryId, names);
      }
      console.log(this.state.endDate, "endDate");
    });
  };
  onFocusSkillsId = async (id, names) => {
    apiClient
      .get(`list/skills/?skill=${id}`)
      .then((data) => {
        let array = [];
        let skillsObjects = [];
        data.map((value) => {
          array.push(value.name);
          skillsObjects.push(value);
        });

        if (JSON.stringify(this.state.skills) != JSON.stringify(array)) {
          this.setState({
            skillsNames: names,
            skills: array,
            skillsObjects: skillsObjects,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  checkDate = (date) => {
    if (
      new Date(date) > new Date()
      /*new Date().getFullYear() <= parseInt(date.slice(1, 5)) &&
new Date().getMonth() + 1 <= parseInt(date.slice(6, 8)) &&
new Date().getDay() < parseInt(date.slice(9, 11))*/
    ) {
      this.setState({
        endDate: date.slice(1, 11),
      });
    } else {
      Snackbar.warning("تاریخ انتخابی برای پایان پروژه درست نیست");
    }
  };

  render() {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    return (
      <Container data-test="Container">
        <Typography component={"h1"} variant={"h1"} data-test="Typography">
          {this.state.pathname ? "ساخت پروژه" : ""}
        </Typography>
        <div className={Style.mainDivstyle} data-test="Main-div">
          <form onSubmit={this.Submit}>
            {this.state.pathname ? (
              this.Inputs(Firstfields, this.HandleChange)
            ) : (
              <></>
            )}
            {this.state.pathname
              ? this.Label(2, label[1])
              : this.Label(2, updateProject[1])}
            <div className={Style.childDivStyle}>
              <div className={Style.inputDiv}>
                <FormControl
                  variant="filled"
                  name="category"
                  value={this.state.category}
                  style={{
                    width: "100%",
                  }}
                  data-test="FormControl"
                >
                  <NativeSelect
                    onChange={this.HandleChange}
                    name="category"
                    inputProps={{ "aria-label": "purpose" }}
                    value={this.state.category}
                    data-test="NativeSelect"
                  >
                    {this.CreateOptions(this.state.options)}
                  </NativeSelect>
                </FormControl>
              </div>
            </div>

            {this.state.pathname
              ? this.Label(3, label[2])
              : this.Label(3, updateProject[2])}

            <div className={Style.childDivStyle}>
              <div className={Style.inputDiv}>
                <FormControl style={{ width: "100%" }}>
                  <Select
                    labelId="demo-mutiple-checkbox-label"w
                    id="demo-mutiple-checkbox"
                    multiple
                    value={this.state.skillsNames}
                    name="skillsNames"
                    onChange={this.HandleChange}
                    input={<Input />}
                    renderValue={(selected) => selected.join(", ")}
                    data-test="skills_names_Selector"
                    MenuProps={MenuProps}
                    required
                    onInvalid={(e) =>
                      e.target.value == [] || this.state.skillsNames.length < 3
                        ? e.target.setCustomValidity(
                            " مهارت ها حتما باید انتخاب شود وحداقل سه مورد باشد"
                          )
                        : e.target.setCustomValidity("")
                    }
                    onFocus={async () => {
                      if (this.state.category != "-1") {
                        apiClient
                          .get(`list/skills/?skill=${this.state.category}`)
                          .then((data) => {
                            let array = [];
                            let skillsObjects = [];
                            data.map((value) => {
                              array.push(value.name);
                              skillsObjects.push(value);
                            });

                            if (
                              JSON.stringify(this.state.skills) !=
                              JSON.stringify(array)
                            ) {
                              this.setState({
                                skillsNames: [],
                                skills: array,
                                skillsObjects: skillsObjects,
                              });
                            }
                          })
                          .catch((error) => console.log(error));
                      }
                    }}
                  >
                    {this.state.skills.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox
                          checked={this.state.skillsNames.indexOf(name) > -1}
                          data-test="skills_names_Selector_NativeSelect"
                        />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            {this.Inputs(SecondsFields[0], this.HandleChange)}
            {this.state.pathname
              ? this.Label(5, label[4])
              : this.Label(5, updateProject[4])}
            <div className={Style.childDivStyle}>
              <DatePicker
                className={Style.datePicker}
                onClickSubmitButton={({ value }) => {
                  if (value._i) {
                    this.checkDate(
                      JSON.stringify(value._i.toString().slice(0, 10))
                    );
                  } else {
                  }
                }}
              />
            </div>
            {this.state.pathname
              ? this.Label(6, label[5])
              : this.Label(6, updateProject[5])}

            <div className={Style.childDivStyle}>
              <div className={Style.inputDiv}>
                <NumberFormat
                  name="amount"
                  value={this.state.amount}
                  onChange={this.HandleChange}
                  thousandSeparator={true}
                  className={Style.childDivStyle}
                  data-test="amount"
                  style={{ height: "50px" }}
                  required={true}
                  onInvalid={(e) => {
                    e.target.setCustomValidity(
                      "هزینه حتما باید انتخاب وارد شود"
                    );
                  }}
                  onInput={(e) => e.target.setCustomValidity("")}
                  format="#################################################################################################################"
                />
              </div>
            </div>

            <div className={Style.childDivStyle}>
              <div className={Style.inputDiv}>
                <Button type="submit" variant="contained" color="primary">
                  {this.state.pathname ? "ایجاد پروژه جدید" : "ذخیره تغییرات"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

export default CreateProject;
