import { shallowMount } from '@vue/test-utils'
import AppLogin from '@/components/AppLogin'
import TheLogo from '@/components/unique/TheLogo'
import TheLoginForm from '@/components/unique/forms/TheLoginForm'

describe('AppLogin', () => {
  it('renders TheLogo component', () => {
    const wrapper = shallowMount(AppLogin)
    const TheLogoComponent = wrapper.find(TheLogo)
    expect(TheLogoComponent.is(TheLogo)).toBe(true)
  })
  it('renders TheLoginForm component', () => {
    const wrapper = shallowMount(AppLogin)
    const TheLoginFormComponent = wrapper.find(TheLoginForm)
    expect(TheLoginFormComponent.is(TheLoginForm)).toBe(true)
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(AppLogin)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
