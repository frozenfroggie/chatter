import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Friend from '@/components/friends/Friend.vue'
import { store } from '@/store/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Friend', () => {
  it('renders friend name in div.friendName when props.friend passed', () => {
    const friend = {"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc"}
    const wrapper = shallowMount(Friend, {
      localVue,
      store,
      propsData: { friend },
      stubs: {
        icon: true,
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.find('div.friendName').text()).toBe("Ewelina")
  })
  it('matches snapshot', () => {
    const friend = {"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc"}
    const wrapper = shallowMount(Friend, {
      localVue,
      store,
      propsData: { friend },
      stubs: {
        icon: true,
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
