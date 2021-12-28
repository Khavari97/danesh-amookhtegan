import React from "react"
import App from "./select";
import Adapter from 'enzyme-adapter-react-16'
import Enzyme, { configure } from "enzyme";
import { render, waitFor,screen } from '@testing-library/react'
import UserEvent from "@testing-library/user-event";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import renderer from "react-test-renderer";
import { Provider } from "react-redux";

const middlewares = [thunk]
const mockStore = configureStore(middlewares);


configure({ adapter: new Adapter() })


configure({ adapter: new Adapter() })

const mockCallback = jest.fn();

describe(" test of ProjectResult page ", () => {
    let object = {
        label: 'string',
        valueId: 'any',
        data_test:'select-input',
        items: [{
            code: 3, id: 1,
            name: "tehran",
        },
        {
            code: 4, id: 2,
            name: "shiraz",
        }
        ],
        onChange: mockCallback
    }
    let store_mock = mockStore({})

     it('check call onchange select', async () => {
        const { getByRole, getByTestId, getByText, container } = render(
            <Provider store={store_mock}>
                <App object={object} />
            </Provider>
        );
        const selectNode = getByTestId("select-input");
        const selectButton = getByRole("button");
        expect(selectButton).not.toBeNull();
        expect(selectNode).not.toBeNull();
        UserEvent.click(selectButton);
        await waitFor(() => getByText("tehran"), { container });
        const itemClickable = getByText("tehran");
        UserEvent.click(itemClickable);
        expect(mockCallback).toHaveBeenCalled();
    });
    it('check call onchange select', async () => {
        const { getByRole, getByTestId, getByText, container } = render(
            <Provider store={store_mock}>
                <App object={object} />
            </Provider>
        );
        const selectNode = getByTestId("select-input");
        const selectButton = getByRole("button");
        expect(selectButton).not.toBeNull();
        expect(selectNode).not.toBeNull();
        UserEvent.click(selectButton);
        await waitFor(() => getByText("shiraz"), { container });
        const itemClickable = getByText("shiraz");
        UserEvent.click(itemClickable);
        expect(mockCallback).toHaveBeenCalled();
    });

    it('snapshot',()=>{
        const shot = (<Provider store={store_mock}>
        <App object={object} />
    </Provider>)
        const snapshot = renderer.create(shot).toJSON();
        expect(snapshot).toMatchSnapshot();
    })
})


