import { shallowMount } from '@vue/test-utils'
import ConversationsList from '@/components/conversations/ConversationsList.vue'
import Conversation from '@/components/conversations/Conversation.vue'

describe('ConversationsList', () => {
  it('renders Conversation component with conversation prop for each item in props.conversations', () => {
    const conversations = [{
      name: 'Christianna Lynn',
      preview: 'Hello, amazing work...',
      lastMessage: '12:53',
      isOnline: true
    }, {
      name: 'June Aline',
      preview: 'Ok, no problem.',
      lastMessage: 'MON',
      isOnline: false
    }]
    const wrapper = shallowMount(ConversationsList, {
      propsData: { conversations }
    })
    const ConversationComponents = wrapper.findAll(Conversation)
    expect(ConversationComponents.length).toEqual(2);
    expect(ConversationComponents.at(0).props()).toEqual({conversation: conversations[0]})
    expect(ConversationComponents.at(1).props()).toEqual({conversation: conversations[1]})
  })
})
