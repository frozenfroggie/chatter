import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import Friend from '@/components/friends/Friend.vue'

describe('Friend', () => {
  it('renders friend name in div.friendName when props.friend passed', () => {
    const friend = {
      name: 'Christianna Lynn',
      isOnline: true
    }
    const wrapper = shallowMount(Friend, {
      propsData: { friend },
      stubs: {
        icon: true,
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.find('div.friendName').text()).toBe(friend.name)
  })
  it('matches snapshot', () => {
    const friend = {
      name: 'Christianna Lynn',
      isOnline: true
    }
    const wrapper = shallowMount(Friend, {
      propsData: { friend },
      stubs: {
        icon: true,
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
