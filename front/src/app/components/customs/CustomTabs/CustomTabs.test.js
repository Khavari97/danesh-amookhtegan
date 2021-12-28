import React from "react"
import { shallow, configure, mount } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import App, { TabPanel } from "./CustomTabs"
import { Icon } from "../../material-ui";
import images from "../../../assets/images/userProfile/index"
import renderer from "react-test-renderer";
import { AppBar, Box, Tab, Tabs, withStyles } from '@material-ui/core';

const skillIcon = (
  <Icon>
    <img style={{ width: '30px' }} alt="development_skill" src={images.development_skill} data-test='development_skill' />
  </Icon>
);
const infoIcon = (
  <Icon>
    <img style={{ width: '30px' }} alt="customer" src={images.customer} data-test='customer' />
  </Icon>
);

const resumeIcon = (
  <Icon>
    <img style={{ width: '30px' }} alt="pdfFile" src={images.pdfFile} data-test='pdfFile' />
  </Icon>
);
configure({ adapter: new Adapter() })


const Div = () => {
  return <div className="containerOne" ></div>
}
const DivTwo = () => {
  return <div className="containerTwo" ></div>
}
const DivThree = () => {
  return <div className="containerThree" ></div>
}

configure({ adapter: new Adapter() })
const DeskTabs = [
  { label: "تکمیل پروفایل", icon: infoIcon, component: <Div /> },
  { label: "مهارت ها", icon: skillIcon, component: <DivTwo /> },
  { label: "رزومه", icon: resumeIcon, component: <DivThree /> },
]

describe('Custom tab component', () => {

  let wrapper = mount(<App />);
  wrapper.setProps({ tabs: DeskTabs });

  it('check props', () => {
    expect(
      wrapper
        .props()
    ).toEqual({ tabs: DeskTabs });
  })

  it('check tabs buttons div', () => {
    expect(
      wrapper
        .find('[aria-label="tabs"]').exists()
    ).toBe(true)
  })

  it('check tabs count buttons ', () => {
    expect(
      wrapper
        .find('[aria-label="tabs"]').find('button').length
    ).toBe(3)
  })
  //
  it('Tab exists', () => {
    expect(
      wrapper
        .find(Tab)
        .exists()
    ).toBe(true);
  })

  it('TabPanel length', () => {
    expect(
      wrapper.find(TabPanel)
        .length
    ).toBe(3);
  })

  //default tab active
  it('check value ', () => {
    expect(
      wrapper.find(TabPanel).at(0).props().value
    ).toBe(0)
  })
  it('snapshot', () => {
    const shot = <App />
    const snapshot = renderer.create(shot).toJSON();
    expect(snapshot).toMatchSnapshot();
  })
})

describe('Simulate tab component Two', () => {

  let wrapper = mount(<App />);
  wrapper.setProps({ tabs: DeskTabs });

  it('check props', () => {
    expect(
      wrapper
        .props()
    ).toEqual({ tabs: DeskTabs });
  })
  // click simulate second tab

  wrapper.find("button#simple-tab-1").simulate('click')

  it('find content div that active-two', () => {
    expect(
      wrapper.find("div.containerTwo")
        .exists()
    ).toEqual(true)
  })

  it('check value ', () => {
    expect(
      wrapper.find(TabPanel).at(0).props().value
    ).toBe(1)
  })

})

describe('Simulate tab component Three', () => {

  let wrapper = mount(<App />);
  wrapper.setProps({ tabs: DeskTabs });

  it('check props', () => {
    expect(
      wrapper
        .props()
    ).toEqual({ tabs: DeskTabs });
  })


  // click simulate second tab

  wrapper.find("button#simple-tab-2").simulate('click')

  it('find content div that active-three', () => {
    expect(
      wrapper.find("div.containerThree")
        .exists()
    ).toEqual(true)
  })

  it('check value ', () => {
    expect(
      wrapper.find(TabPanel).at(0).props().value
    ).toBe(2)
  })

})



