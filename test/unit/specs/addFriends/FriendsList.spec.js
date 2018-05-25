import { shallowMount } from '@vue/test-utils'
import FriendsList from '@/components/addFriends/FriendsList.vue'
import Friend from '@/components/addFriends/Friend.vue'

describe('FriendsList', () => {
  it('renders Friend component with friend prop for each item in props.friends', () => {
    const friends = [{
      name: 'Christianna Lynn',
      isOnline: true
    }, {
      name: 'June Aline',
      isOnline: false
    }]
    const wrapper = shallowMount(FriendsList, {
      propsData: { friends }
    })
    const FriendComponents = wrapper.findAll(Friend)
    expect(FriendComponents.length).toEqual(2);
    expect(FriendComponents.at(0).props()).toEqual({friend: friends[0]})
    expect(FriendComponents.at(1).props()).toEqual({friend: friends[1]})
  })
})
