import { shallowMount } from '@vue/test-utils'
import TheLogo from '@/components/unique/TheLogo'

describe('TheLogo', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(TheLogo)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
