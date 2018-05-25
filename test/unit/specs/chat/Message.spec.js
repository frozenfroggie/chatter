import { shallowMount } from '@vue/test-utils'
import Message from '@/components/chat/Message.vue'

describe('Message', () => {
  it('renders message content and message timestamp in proper divs when props.message passed', () => {
    const message = {
      from: 'me',
      content: 'Hi, whats goin on? I have terrible time in Sweden. Heva you been there? I will send you some photos leter. Text me if you have time',
      timestamp: '30 JANUARY 17:30'
    }
    const wrapper = shallowMount(Message, {
      propsData: { message },
      stubs: ['Icon']
    })
    expect(wrapper.find('div.content').text()).toBe(message.content)
    expect(wrapper.find('div.timestamp').text()).toBe(message.timestamp)
  })
  it('matches snapshot', () => {
    const message = {
      from: 'Christianna Lynn',
      content: 'Lorem ipsum dolor sit amet, sed odio voluptaria eu. Tollit populo definiebas cum ut, eos graece causae cu. Convenire prodesset argumentum vix ut, ne mel mutat noster. Eam at veri facilisi menandri.',
      timestamp: '30 FEBRUARY 12:30'
    }
    const wrapper = shallowMount(Message, {
      propsData: { message },
      stubs: ['Icon']
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
