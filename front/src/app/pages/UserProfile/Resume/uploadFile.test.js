import React from 'react';
import Enzyme, { shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import renderer from "react-test-renderer";
import { Provider } from 'react-redux';
import store from "../../../redux/store";
import Resume from "./UploadFile";
import Dropzone from 'react-dropzone-uploader';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

Enzyme.configure({ adapter: new EnzymeAdapter() });
const setup =()=> {
    return shallow(
        <Provider store={store}>
            <Resume/>
        </Provider>
    );
}

const findByTestAttr = (wrapper, val) => {
    return wrapper.find(`[data-test="${val}"]`);
};

describe('test uploadFile component',()=>{

    test('render without error',()=>{
        const wrapper = setup();
        expect(wrapper).toBeTruthy();
        expect(wrapper.length).toEqual(1);
    })

    it('snapshot', () => {
        const shot = (<Provider store={store}><Resume /></Provider>)
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })

})