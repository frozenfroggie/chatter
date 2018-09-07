import { shallowMount } from '@vue/test-utils'
import ConversationsList from '@/components/conversations/ConversationsList.vue'
import Conversation from '@/components/conversations/Conversation.vue'
import { getConversations } from '../../seed'

describe('ConversationsList', () => {
  it('renders Conversation component with conversation prop for each item in props.conversations', () => {

    const wrapper = shallowMount(ConversationsList, {
      propsData: { conversations: getConversations.conversations }
    })
    const ConversationComponents = wrapper.findAll(Conversation)
    expect(ConversationComponents.length).toEqual(2);
    expect(ConversationComponents.at(0).props()).toEqual({conversation: getConversations.conversations[0]})
    expect(ConversationComponents.at(1).props()).toEqual({conversation: getConversations.conversations[1]})
  })
})
