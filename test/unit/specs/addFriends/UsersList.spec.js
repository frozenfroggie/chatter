import { shallowMount } from '@vue/test-utils'
import UsersList from '@/components/addFriends/UsersList.vue'
import User from '@/components/addFriends/User.vue'

describe('UsersList', () => {
  it('renders User component with user prop for each item in props.users', () => {
    const users = [{
      username: 'Christianna Lynn',
      isOnline: true
    }, {
      username: 'June Aline',
      isOnline: false
    }]
    const wrapper = shallowMount(UsersList, {
      propsData: { users }
    })
    const UserComponents = wrapper.findAll(User)
    expect(UserComponents.length).toEqual(2);
    expect(UserComponents.at(0).props()).toEqual({user: users[0]})
    expect(UserComponents.at(1).props()).toEqual({user: users[1]})
  })
})
