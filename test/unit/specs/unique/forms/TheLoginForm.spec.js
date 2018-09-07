import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheLoginForm from '@/components/unique/forms/TheLoginForm'
import { store } from '@/store/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheLoginForm', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(TheLoginForm, {
      stubs: ['icon'],
      localVue,
      store
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
