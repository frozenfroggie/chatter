import { shallowMount } from '@vue/test-utils'
import MessagesList from '@/components/chat/MessagesList.vue'
import Message from '@/components/chat/Message.vue'

describe('MessagesList', () => {
  it('renders Message component with message prop for each item in props.messages', () => {
    const messages = ['first', 'second']
    const wrapper = shallowMount(MessagesList, {
      propsData: { messages }
    })
    const MessageComponents = wrapper.findAll(Message)
    expect(MessageComponents.length).toEqual(2);
    expect(MessageComponents.at(0).props()).toEqual({message: messages[0]})
    expect(MessageComponents.at(1).props()).toEqual({message: messages[1]})
  })
})
