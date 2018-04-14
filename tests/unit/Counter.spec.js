import { expect } from 'chai';
import { shallow } from '@vue/test-utils';
import sinon from 'sinon';
import Counter from '@/components/Counter.vue';

describe('Counter.vue', () => {
  describe('when an initial value is provided', () => {
    it('it is used as the initial counter value', () => {
      const wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
      });
      const componentInstance = wrapper.vm;
      expect(componentInstance.value).to.be.equal(42);
    });
    it('it is rendered by the component', () => {
      const wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
      });
      expect(wrapper.text()).to.include('Counter value: 42');
    });
  });

  describe('when omitting the initial value', () => {
    it('the initial value is set as 0', () => {
      const wrapper = shallow(Counter, {
        propsData: { },
      });
      const componentInstance = wrapper.vm;
      expect(componentInstance.value).to.be.equal(0);
    });
    it('the default value 0 is rendered by the component', () => {
      const wrapper = shallow(Counter, {
        propsData: { },
      });
      expect(wrapper.html()).to.include('Counter value: <span class="counter-value">0</span>');
    });
  });

  describe('the stringValue computed', () => {
    let wrapper;
    let componentInstance;
    beforeEach(() => {
      wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
      });
      componentInstance = wrapper.vm;
    });
    it('returns the string representation of the initial value', () => {
      expect(componentInstance.stringValue).to.be.eql('42');
    });
    it('returns the string representation of the updated value', () => {
      wrapper.setData({ value: 99 });
      expect(componentInstance.stringValue).to.be.eql('99');
    });
  });

  describe('when the increment button is clicked', () => {
    let wrapper;
    let componentInstance;
    let increaseButton;
    beforeEach(() => {
      wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
      });
      componentInstance = wrapper.vm;
      increaseButton = wrapper.find('button#increase-btn');
    });
    it('the counter value is increased by one', () => {
      increaseButton.trigger('click');
      expect(componentInstance.value).to.be.equal(43);
    });
    it('the rendered output contains the value increased by one', () => {
      increaseButton.trigger('click');
      expect(wrapper.text()).to.include('Counter value: 43');
    });
    it('emits an increased event with the new value', () => {
      increaseButton.trigger('click');
      expect(wrapper.emitted().increased.length).to.be.equal(1);
      expect(wrapper.emitted().increased[0]).to.be.eql([43]);
    });
  });

  describe('the onIncrease method', () => {
    let wrapper;
    let componentInstance;
    beforeEach(() => {
      wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
      });
      componentInstance = wrapper.vm;
    });
    it('the counter value is increased by one', () => {
      componentInstance.onIncrease();
      expect(componentInstance.value).to.be.equal(43);
    });
    it('the rendered output contains the value increased by one', () => {
      componentInstance.onIncrease();
      expect(wrapper.text()).to.include('Counter value: 43');
    });
  });

  describe('when the increment-http button is clicked', () => {
    let wrapper;
    let componentInstance;
    let increaseHttpButton;
    let mockAxios;
    beforeEach(() => {
      const mockResponse = { data: [{ a: 'user' }, { another: 'user' }] };
      mockAxios = {
        get: sinon.stub()
          .withArgs('https://jsonplaceholder.typicode.com/users')
          .returns(Promise.resolve(mockResponse)),
      };
      wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
        mocks: {
          $http: mockAxios,
        },
      });
      componentInstance = wrapper.vm;
      increaseHttpButton = wrapper.find('#increase-http-btn');
    });
    it('the counter value is increased by the number of items in the response', (done) => {
      increaseHttpButton.trigger('click');
      setImmediate(() => {
        expect(componentInstance.value).to.be.equal(44);
        done();
      });
    });
    it('the rendered output contains the value increased by the number of items in the response', (done) => {
      increaseHttpButton.trigger('click');
      setImmediate(() => {
        expect(wrapper.text()).to.include('Counter value: 44');
        done();
      });
    });
    it('emits an increased event with the new value', (done) => {
      increaseHttpButton.trigger('click');
      setImmediate(() => {
        expect(wrapper.emitted().increased.length).to.be.equal(1);
        expect(wrapper.emitted().increased[0]).to.be.eql([44]);
        done();
      });
    });
  });

  describe('the onIncreaseFromHttp method', () => {
    let wrapper;
    let componentInstance;
    let mockAxios;
    beforeEach(() => {
      const mockResponse = { data: [{ a: 'user' }, { another: 'user' }] };
      mockAxios = {
        get: sinon.stub()
          .withArgs('https://jsonplaceholder.typicode.com/users')
          .returns(Promise.resolve(mockResponse)),
      };
      wrapper = shallow(Counter, {
        propsData: { initialValue: 42 },
        mocks: {
          $http: mockAxios,
        },
      });
      componentInstance = wrapper.vm;
    });
    it('increases the value by the number of items in the response', () => componentInstance.onIncreaseFromHttp().then(() => {
      expect(componentInstance.value).to.be.equal(44);
    }));
    it('emits an increased event with the new value', () => componentInstance.onIncreaseFromHttp().then(() => {
      expect(wrapper.emitted().increased.length).to.be.equal(1);
      expect(wrapper.emitted().increased[0]).to.be.eql([44]);
    }));
  });

  describe('the currentRoute property', () => {
    let wrapper;
    let componentInstance;
    beforeEach(() => {
      const mockRoute = { name: 'foo' };
      wrapper = shallow(Counter, {
        mocks: {
          $route: mockRoute,
        },
      });
      componentInstance = wrapper.vm;
    });
    it('returns the name of the current route', () => {
      expect(componentInstance.currentRoute).to.be.equal('foo');
    });
  });

  describe('the onNavigate method', () => {
    let wrapper;
    let componentInstance;
    let mockRouter;
    beforeEach(() => {
      mockRouter = {
        push: sinon.spy(),
      };
      wrapper = shallow(Counter, {
        mocks: {
          $router: mockRouter,
        },
      });
      componentInstance = wrapper.vm;
    });
    it('navigates to the home page', () => {
      componentInstance.onNavigate();
      sinon.assert.calledWith(mockRouter.push, { name: 'home' });
    });
  });
});
