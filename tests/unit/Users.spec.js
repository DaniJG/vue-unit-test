import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import sinon from 'sinon';
import Users from '@/components/Users.vue';

describe('Users.vue', () => {
  let mockAxios;
  let mockUsers;
  beforeEach(() => {
    mockUsers = [{ a: 'user' }, { another: 'user' }];
    mockAxios = {
      get: sinon.stub()
        .withArgs('https://jsonplaceholder.typicode.com/users')
        .returns(Promise.resolve({ data: mockUsers })),
    };
    Users.__Rewire__('axios', mockAxios); // eslint-disable-line no-underscore-dangle
  });

  describe('when the load users button is clicked', () => {
    it('updates the list of users with the HTTP response', (done) => {
      const wrapper = shallow(Users);
      const componentInstance = wrapper.vm;
      wrapper.find('button').trigger('click');

      setImmediate(() => {
        expect(componentInstance.users).to.be.equal(mockUsers);
        done();
      });
    });
  });
});
