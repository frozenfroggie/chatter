import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppAddFriends from '@/components/AppAddFriends.vue'
import SearchPanel from '@/components/shared/SearchPanel.vue'
import UsersList from '@/components/addFriends/UsersList.vue'
import { store } from '@/store/store'

const localVue = createLocalVue()
localVue.use(Vuex)

import toBeType from '../toBeType.js'
expect.extend({toBeType})

describe('AppAddFriends', () => {
  it('renders UsersList component with props.users type of array', () => {
    const wrapper = shallowMount(AppAddFriends, {localVue, store})
    const UsersListComponent = wrapper.find(UsersList)
    expect(UsersListComponent.is(UsersList)).toBe(true)
    // expect(UsersListComponent.props().users).toBeType('array');
  })
  it('renders SearchPanel component with props.placeholder type of string', () => {
    const wrapper = shallowMount(AppAddFriends, {localVue, store})
    const SearchPanelComponent = wrapper.find(SearchPanel)
    expect(SearchPanelComponent.is(SearchPanel)).toBe(true)
    expect(SearchPanelComponent.props().placeholder).toBeType('string');
  })
})
