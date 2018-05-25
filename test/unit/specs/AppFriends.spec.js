import { shallowMount } from '@vue/test-utils'
import AppFriends from '@/components/AppFriends.vue'
import SearchPanel from '@/components/shared/SearchPanel.vue'
import FriendsList from '@/components/friends/FriendsList.vue'

import toBeType from '../toBeType.js'
expect.extend({toBeType})

describe('AppFriends', () => {
  it('renders SearchPanel component with props.placeholder type of string', () => {
    const wrapper = shallowMount(AppFriends)
    const SearchPanelComponent = wrapper.find(SearchPanel)
    expect(SearchPanelComponent.is(SearchPanel)).toBe(true)
    expect(SearchPanelComponent.props().placeholder).toBeType('string')
  })
  it('renders FriendsList component with props.friends type of array', () => {
    const wrapper = shallowMount(AppFriends)
    const FriendsListComponent = wrapper.find(FriendsList)
    expect(FriendsListComponent.is(FriendsList)).toBe(true)
    expect(FriendsListComponent.props().friends).toBeType('array')
  })
})
