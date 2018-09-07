import { shallowMount, mount } from '@vue/test-utils'
import TheNavigationAvatar from '@/components/unique/navigation/TheNavigationAvatar'

describe('TheNavigationAvatar', () => {
  it('matches snapshot', () => {
    const wrapper = mount(TheNavigationAvatar, {
      stubs: ['icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
