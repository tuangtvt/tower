import {UserDataFooter, UserDataFooterProps} from './index';
import {shallow} from 'enzyme';
import * as React from 'react';

const defaults: UserDataFooterProps = {
    user: {}
};

describe('UserDataFooter component', () => {
    const setup = (props: Partial<UserDataFooterProps> = {}) =>
        shallow(<UserDataFooter {...{...defaults, ...props}}/>);

    it('should render', () => {
        const wrapper = setup();
        expect(wrapper).toBeDefined();
    });
});
