import { shallowMount, createLocalVue } from '@vue/test-utils'
import MessagesList from '@/components/chat/MessagesList.vue'
import Message from '@/components/chat/Message.vue'
import Vuex from 'vuex'
import { messages, user } from '../../seed.js'
const localVue = createLocalVue()
localVue.use(Vuex)

let store
let getters
let actions
let $route
beforeEach(() => {
 getters = {
   getConversations: () => getConversations,
   user: () => user,
   messages: () => messages,
   activeConversationsIds: () => [],
   isVideoChatStarted: () => false,
   messagesPending: () => false
 },
 actions = {
   turnOnResizer: jest.fn()
 },
 store = new Vuex.Store({ getters, actions })
})

describe('MessagesList', () => {
  it('renders Message component with message prop for each item in props.messages', () => {
    const wrapper = shallowMount(MessagesList, {
      localVue,
      propsData: { messages, user },
      store,
      mocks: {
        $route: {
          params: {
            conversationId: '5b785a77c4e908471c1bb547'
          }
        }
      }
    })
    const MessageComponents = wrapper.findAll(Message)
    expect(MessageComponents.length).toEqual(10);
    expect(true).toBe(true)
  })
})
