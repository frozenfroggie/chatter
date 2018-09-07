import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import FriendsList from '@/components/friends/FriendsList.vue'
import Friend from '@/components/friends/Friend.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

import { store } from '@/store/store'

describe('FriendsList', () => {
  it('renders Friend component with friend prop for each item in props.friends', () => {
    const friends = [{
      "conversations": ["5b785a77c4e908471c1bb547"],
      "_id":"5b785a2e793c2745c2f2dd60",
      "username":"ewelina",
      "email":"abc@abc.abc"
    }, {
      "conversations": ["5b7c8175adc5e80004bacb2f"],
      "_id":"5b7c57ba39a6c6000416ae8f",
      "username":"frozenfroggie",
      "email":"wojtyraj@gmail.com"
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
