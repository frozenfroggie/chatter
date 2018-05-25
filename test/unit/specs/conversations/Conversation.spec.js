import { shallowMount } from '@vue/test-utils'
import Conversation from '@/components/conversations/Conversation.vue'

describe('Conversation', () => {
  it('renders conversation name in div.conversationName when props.conversation passed', () => {
    const conversation = {
      name: 'Christianna Lynn',
      preview: 'Hello, amazing work...',
      lastMessage: '12:53',
      isOnline: true
    }
    const wrapper = shallowMount(Conversation, {
      propsData: { conversation },
      stubs: {
        icon: true
      }
    })
    expect(wrapper.find('div.conversationName').text()).toBe(conversation.name)
  })
  it('renders conversation preview in div.conversationPreview when props.conversation passed', () => {
    const conversation = {
      name: 'Christianna Lynn',
      preview: 'Hello, amazing work...',
      lastMessage: '12:53',
      isOnline: true
    }
    const wrapper = shallowMount(Conversation, {
      propsData: { conversation },
      stubs: {
        icon: true
      }
    })
    expect(wrapper.find('div.conversationPreview').text()).toBe(conversation.preview)
  })
  it('renders conversation timestamp in div.timestamp when props.conversation passed', () => {
    const conversation = {
      name: 'Christianna Lynn',
      preview: 'Hello, amazing work...',
      lastMessage: '12:53',
      isOnline: true
    }
    const wrapper = shallowMount(Conversation, {
      propsData: { conversation },
      stubs: {
        icon: true
      }
    })
    expect(wrapper.find('div.timestamp').text()).toBe(conversation.lastMessage)
  })
  it('matches snapshot', () => {
    const conversation = {
      name: 'Christianna Lynn',
      preview: 'Hello, amazing work...',
      lastMessage: '12:53',
      isOnline: true
    }
    const wrapper = shallowMount(Conversation, {
      propsData: { conversation },
      stubs: {
        icon: true
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
