import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { MemoryRouter } from 'react-router-dom'

import nav from '../src/components/Home'

configure({ adapter: new Adapter() })

describe('Home', () => {
    it('Should render a <nav/> on route "/home"', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/home"]}>
                <nav/>
            </MemoryRouter>
        )
        expect(wrapper.find(nav)).toHaveLength(1)
    })
})