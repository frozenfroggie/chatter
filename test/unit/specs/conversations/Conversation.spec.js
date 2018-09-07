import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Conversation from '@/components/conversations/Conversation.vue'
import { store } from '@/store/store'
import moment from 'moment'
import { conversation } from '../../seed'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Conversation', () => {
  it('renders conversation name in div.conversationName when props.conversation passed', () => {
    const $route = {
      params: {
        conversationId: '12345678910'
      }
    }
    const wrapper = shallowMount(Conversation, {
      localVue,
      store,
      propsData: { conversation },
      stubs: {
        icon: true
      },
      mocks: {
        $route
      }
    })
    expect(wrapper.find('div.conversationName').text()).toBe('Ewelina')
  })
  it('renders conversation preview in div.conversationPreview when props.conversation passed', () => {
    const $route = {
      params: {
        conversationId: '12345678910'
      }
    }
    const wrapper = shallowMount(Conversation, {
      localVue,
      store,
      propsData: { conversation },
      stubs: {
        icon: true
      },
      mocks: {
        $route
      }
    })
    expect(wrapper.find('div.conversationPreview').text()).toBe(conversation.snippet.messageText)
  })
  it('renders conversation timestamp in div.timestamp when props.conversation passed', () => {
    const conversation = {"_id":"5b785a77c4e908471c1bb547","participants":["5b785a37793c2745c2f2dd61","5b785a2e793c2745c2f2dd60"],"snippet":{"author":{"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina"},"recipent":{"_id":"5b785a37793c2745c2f2dd61","username":"jakub"},"messageText":"vvvc","createdAt":"2018-09-04T18:01:58.453Z"}}
    const $route = {
      params: {
        conversationId: '12345678910'
      }
    }
    const wrapper = shallowMount(Conversation, {
      localVue,
      store,
      propsData: { conversation },
      stubs: {
        icon: true
      },
      mocks: {
        $route
      }
    })
    expect(wrapper.find('div.timestamp').text()).toBe(moment(conversation.snippet.createdAt).format('D MMMM'))
  })
  it('matches snapshot', () => {
    const $route = {
      params: {
        conversationId: '12345678910'
      }
    }
    const wrapper = shallowMount(Conversation, {
      localVue,
      store,
      propsData: { conversation },
      stubs: {
        icon: true
      },
      mocks: {
        $route
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
