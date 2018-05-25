import { shallowMount, mount, RouterLinkStub } from '@vue/test-utils'
import TheNavigation from '@/components/unique/navigation/TheNavigation'

describe('TheNavigation', () => {
  it('matches snapshot', () => {
    const wrapper = mount(TheNavigation, {
      stubs: {
        icon: true,
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
