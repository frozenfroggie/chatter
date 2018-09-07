import { shallowMount } from '@vue/test-utils'
import Message from '@/components/chat/Message.vue'
import { user, messages } from '../../seed'
const messagesFromFriend = messages['5b785a77c4e908471c1bb547']

describe('Message', () => {
  it('renders message content and message timestamp in proper divs when props.message passed', () => {
    const wrapper = shallowMount(Message, {
      propsData: { message: messagesFromFriend[0], user },
      stubs: ['Icon']
    })
    expect(wrapper.find('div.content').text()).toBe(messagesFromFriend[0].messageText)
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(Message, {
      propsData: { message: messagesFromFriend[0], user },
      stubs: ['Icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
