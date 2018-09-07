import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppChat from '@/components/AppChat.vue'
import ProfilePanel from '@/components/chat/ProfilePanel.vue'
import MessagesList from '@/components/chat/MessagesList.vue'
import toBeType from '../toBeType.js'
import { getConversations, user, messages } from '../seed.js'
expect.extend({toBeType})

const localVue = createLocalVue()
localVue.use(Vuex)

const messagesFromFriend = messages['5b785a77c4e908471c1bb547']

let store
let getters
let actions
let $route
beforeEach(() => {
 getters = {
   getConversations: () => getConversations,
   user: () => user,
   messages: () => messagesFromFriend,
   activeConversationsIds: () => [],
   isVideoChatStarted: () => false,
   messagesPending: () => false
 },
 actions = {
   turnOnResizer: jest.fn()
 },
 store = new Vuex.Store({ getters, actions })
})

describe('AppChat', () => {
  it('renders ProfilePanel component with props.name type of string', () => {
    const wrapper = shallowMount(AppChat, {
      localVue,
      store,
      stubs: ['Icon'],
      mocks: {
        $route: {
          params: {
            conversationId: '5b785a77c4e908471c1bb547'
          }
        }
      }
    })
    const ProfilePanelComponent = wrapper.find(ProfilePanel)
    expect(ProfilePanelComponent.is(ProfilePanel)).toBe(true)
    expect(ProfilePanelComponent.props().name).toBeType('string')
  })
  it('renders MessagesList component with props.messages type of array', () => {
    const wrapper = shallowMount(AppChat, {
      localVue,
      store,
      stubs: ['Icon'],
      mocks: {
        $route: {
          params: {
            conversationId: '5b785a77c4e908471c1bb547'
          }
        }
      }
    })
    const MessagesListComponent = wrapper.find(MessagesList)
    expect(MessagesListComponent.is(MessagesList)).toBe(true)
    expect(MessagesListComponent.props().messages).toBeType('array')
  })
})
