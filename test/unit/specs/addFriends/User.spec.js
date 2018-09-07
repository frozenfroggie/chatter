import { shallowMount } from '@vue/test-utils'
import User from '@/components/addFriends/User.vue'

describe('User', () => {
  it('renders user name in div.conversationName when props.user passed', () => {
    const user = {
      username: 'Christianna Lynn',
    }
    const wrapper = shallowMount(User, {
      propsData: { user },
      stubs: ['Icon']
    })
    expect(wrapper.find('div.conversationName').text()).toBe(user.username)
  })
  it('matches snapshot', () => {
    const user = {
      name: 'Christianna Lynn',
      isOnline: true
    }
    const wrapper = shallowMount(User, {
      propsData: { user },
      stubs: ['Icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
