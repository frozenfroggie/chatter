import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import TheSignupForm from '@/components/unique/forms/TheSignupForm';
import { store } from '@/store/store'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuelidate)

describe('TheSignupForm', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(TheSignupForm, {
      stubs: ['icon'],
      localVue,
      store
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
