import { shallowMount } from '@vue/test-utils'
import Friend from '@/components/addFriends/Friend.vue'

describe('Friend', () => {
  it('renders friend name in div.conversationName when props.friend passed', () => {
    const friend = {
      name: 'Christianna Lynn',
      isOnline: true
    }
    const wrapper = shallowMount(Friend, {
      propsData: { friend },
      stubs: ['Icon']
    })
    expect(wrapper.find('div.conversationName').text()).toBe(friend.name)
  })
  it('matches snapshot', () => {
    const friend = {
      name: 'Christianna Lynn',
      isOnline: true
    }
    const wrapper = shallowMount(Friend, {
      propsData: { friend },
      stubs: ['Icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
