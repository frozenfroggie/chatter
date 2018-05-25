import { shallowMount } from '@vue/test-utils'
import AppConversations from '@/components/AppConversations.vue'
import SearchPanel from '@/components/shared/SearchPanel.vue'
import ConversationsList from '@/components/conversations/ConversationsList.vue'

import toBeType from '../toBeType.js'
expect.extend({toBeType})

describe('AppConversations', () => {
  it('renders SearchPanel component with props.placeholder type of string', () => {
    const wrapper = shallowMount(AppConversations)
    const SearchPanelComponent = wrapper.find(SearchPanel)
    expect(SearchPanelComponent.is(SearchPanel)).toBe(true)
    expect(SearchPanelComponent.props().placeholder).toBeType('string');
  })
  it('renders ConversationsList component with props.conversations type of array', () => {
    const wrapper = shallowMount(AppConversations)
    const ConversationsListComponent = wrapper.find(ConversationsList)
    expect(ConversationsListComponent.is(ConversationsList)).toBe(true)
    expect(ConversationsListComponent.props().conversations).toBeType('array')
  })
})
