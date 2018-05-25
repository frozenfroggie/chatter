import { shallowMount, mount } from '@vue/test-utils'
import AppSignup from '@/components/AppSignup'
import TheLogo from '@/components/unique/TheLogo'
import TheSignupForm from '@/components/unique/forms/TheSignupForm'

describe('AppSignup', () => {
  it('renders TheLogo component', () => {
    const wrapper = shallowMount(AppSignup)
    const TheLogoComponent = wrapper.find(TheLogo)
    expect(TheLogoComponent.is(TheLogo)).toBe(true)
  })
  it('renders TheSignupForm component', () => {
    const wrapper = shallowMount(AppSignup)
    const TheSignupFormComponent = wrapper.find(TheSignupForm)
    expect(TheSignupFormComponent.is(TheSignupForm)).toBe(true)
  })
  it('matches snapshot', () => {
    const wrapper = shallowMount(AppSignup)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
