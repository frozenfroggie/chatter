import { shallowMount } from '@vue/test-utils'
import AppAddFriends from '@/components/AppAddFriends.vue'
import SearchPanel from '@/components/shared/SearchPanel.vue'
import FriendsList from '@/components/addFriends/FriendsList.vue'

import toBeType from '../toBeType.js'
expect.extend({toBeType})

describe('AppAddFriends', () => {
  it('renders FriendsList component with props.friends type of array', () => {
    const wrapper = shallowMount(AppAddFriends)
    const FriendsListComponent = wrapper.find(FriendsList)
    expect(FriendsListComponent.is(FriendsList)).toBe(true)
    expect(FriendsListComponent.props().friends).toBeType('array');
  })
  it('renders SearchPanel component with props.placeholder type of string', () => {
    const wrapper = shallowMount(AppAddFriends)
    const SearchPanelComponent = wrapper.find(SearchPanel)
    expect(SearchPanelComponent.is(SearchPanel)).toBe(true)
    expect(SearchPanelComponent.props().placeholder).toBeType('string');
  })
})
