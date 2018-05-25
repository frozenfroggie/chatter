import { shallowMount } from '@vue/test-utils'
import AppChat from '@/components/AppChat.vue'
import ProfilePanel from '@/components/chat/ProfilePanel.vue'
import MessagesList from '@/components/chat/MessagesList.vue'

import toBeType from '../toBeType.js'
expect.extend({toBeType})

describe('AppChat', () => {
  it('renders ProfilePanel component with props.name type of string', () => {
    const wrapper = shallowMount(AppChat)
    const ProfilePanelComponent = wrapper.find(ProfilePanel)
    expect(ProfilePanelComponent.is(ProfilePanel)).toBe(true)
    expect(ProfilePanelComponent.props().name).toBeType('string')
  })
  it('renders MessagesList component with props.messages type of array', () => {
    const wrapper = shallowMount(AppChat)
    const MessagesListComponent = wrapper.find(MessagesList)
    expect(MessagesListComponent.is(MessagesList)).toBe(true)
    expect(MessagesListComponent.props().messages).toBeType('array')
  })
})
