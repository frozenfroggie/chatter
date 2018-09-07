import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import AppLogin from '@/components/AppLogin'
import TheLogo from '@/components/unique/TheLogo'
import TheLoginForm from '@/components/unique/forms/TheLoginForm'
import { store } from '@/store/store'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('AppLogin', () => {
  it('renders TheLogo component', () => {
    const wrapper = shallowMount(AppLogin, {localVue, store})
    const TheLogoComponent = wrapper.find(TheLogo)
    expect(TheLogoComponent.is(TheLogo)).toBe(true)
  })
  it('renders TheLoginForm component', () => {
    const wrapper = shallowMount(AppLogin, {localVue, store})
    const TheLoginFormComponent = wrapper.find(TheLoginForm)
    expect(TheLoginFormComponent.is(TheLoginForm)).toBe(true)
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(AppLogin)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
