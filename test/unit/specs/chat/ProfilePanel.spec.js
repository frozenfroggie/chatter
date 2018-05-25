import { shallowMount } from '@vue/test-utils'
import ProfilePanel from '@/components/chat/ProfilePanel.vue'

describe('ProfilePanel', () => {
  it('renders profile name when props.name passed', () => {
    const name = 'Julie Goldstein';
    const wrapper = shallowMount(ProfilePanel, {
      propsData: { name },
      stubs: ['Icon']
    })
    expect(wrapper.text()).toBe(name)
  })
  it('matches snapshot', () => {
    const name = 'Christianna Lynn';
    const wrapper = shallowMount(ProfilePanel, {
      propsData: { name },
      stubs: ['Icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
