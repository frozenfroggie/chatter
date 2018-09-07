import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import MessagesList from '@/components/chat/MessagesList.vue'
import Message from '@/components/chat/Message.vue'
import { store } from '@/store/store'
import VueRouter from 'vue-router'
import router from '@/router'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
router.push({name: 'chat', params: {conversationId: '5b785a77c4e908471c1bb547'}})

const user = {"username":"jakub","email":"abc2@abc.abc","friends":[{"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc"},{"conversations":["5b7c8175adc5e80004bacb2f"],"_id":"5b7c57ba39a6c6000416ae8f","username":"frozenfroggie","email":"wojtyraj@gmail.com"}],"_id":"5b785a37793c2745c2f2dd61"}
const messages = {"5b785a77c4e908471c1bb547":[{"_id":"5b8e889ead1f1c1328c3fda8","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"sasadd","createdAt":"2018-09-04T13:29:02.657Z","updatedAt":"2018-09-04T13:29:02.657Z","__v":0},{"_id":"5b8e88b3ad1f1c1328c3fda9","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"aa","createdAt":"2018-09-04T13:29:23.944Z","updatedAt":"2018-09-04T13:29:23.944Z","__v":0},{"_id":"5b8e89a7ad1f1c1328c3fdaa","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJlbWFpbCI6ImFiY0BhYmMuYWJjIiwidXNlcm5hbWUiOiJld2VsaW5hIiwiaWF0IjoxNTM2MjQzMzg0LCJleHAiOjE1MzYyNDM0NDR9.CQXgFbW13L2sg-obH9GyLsE7M2EZGinr7YtyadBOaHE","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJpYXQiOjE1MzYyNDMzODQsImV4cCI6MTUzNjg0ODE4NH0.2D9RRc5Y0FtGWwmeJT-wmRZP-aJL9EHRZ_u6mJqnuM0","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a37793c2745c2f2dd61"],"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc","password":"$2b$10$R3X5rDJWCurbDBCiIN7yGOGGSPqTwuJKDp7/zlFmD6Rb82ykGnJ5i","__v":0},"recipent":"5b785a37793c2745c2f2dd61","conversationId":"5b785a77c4e908471c1bb547","messageText":"bu","createdAt":"2018-09-04T13:33:27.537Z","updatedAt":"2018-09-04T13:33:27.537Z","__v":0},{"_id":"5b8e89aaad1f1c1328c3fdab","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"aa","createdAt":"2018-09-04T13:33:30.606Z","updatedAt":"2018-09-04T13:33:30.606Z","__v":0},{"_id":"5b8ec6e5ad1f1c1328c3fdac","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"dsadsa\\","createdAt":"2018-09-04T17:54:45.010Z","updatedAt":"2018-09-04T17:54:45.010Z","__v":0},{"_id":"5b8ec6eaad1f1c1328c3fdad","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJlbWFpbCI6ImFiY0BhYmMuYWJjIiwidXNlcm5hbWUiOiJld2VsaW5hIiwiaWF0IjoxNTM2MjQzMzg0LCJleHAiOjE1MzYyNDM0NDR9.CQXgFbW13L2sg-obH9GyLsE7M2EZGinr7YtyadBOaHE","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJpYXQiOjE1MzYyNDMzODQsImV4cCI6MTUzNjg0ODE4NH0.2D9RRc5Y0FtGWwmeJT-wmRZP-aJL9EHRZ_u6mJqnuM0","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a37793c2745c2f2dd61"],"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc","password":"$2b$10$R3X5rDJWCurbDBCiIN7yGOGGSPqTwuJKDp7/zlFmD6Rb82ykGnJ5i","__v":0},"recipent":"5b785a37793c2745c2f2dd61","conversationId":"5b785a77c4e908471c1bb547","messageText":"aaa","createdAt":"2018-09-04T17:54:50.341Z","updatedAt":"2018-09-04T17:54:50.341Z","__v":0},{"_id":"5b8ec806ad1f1c1328c3fdae","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"aaa","createdAt":"2018-09-04T17:59:34.705Z","updatedAt":"2018-09-04T17:59:34.705Z","__v":0},{"_id":"5b8ec809ad1f1c1328c3fdaf","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJlbWFpbCI6ImFiY0BhYmMuYWJjIiwidXNlcm5hbWUiOiJld2VsaW5hIiwiaWF0IjoxNTM2MjQzMzg0LCJleHAiOjE1MzYyNDM0NDR9.CQXgFbW13L2sg-obH9GyLsE7M2EZGinr7YtyadBOaHE","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJpYXQiOjE1MzYyNDMzODQsImV4cCI6MTUzNjg0ODE4NH0.2D9RRc5Y0FtGWwmeJT-wmRZP-aJL9EHRZ_u6mJqnuM0","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a37793c2745c2f2dd61"],"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc","password":"$2b$10$R3X5rDJWCurbDBCiIN7yGOGGSPqTwuJKDp7/zlFmD6Rb82ykGnJ5i","__v":0},"recipent":"5b785a37793c2745c2f2dd61","conversationId":"5b785a77c4e908471c1bb547","messageText":"bbb","createdAt":"2018-09-04T17:59:37.945Z","updatedAt":"2018-09-04T17:59:37.945Z","__v":0},{"_id":"5b8ec893ad1f1c1328c3fdb0","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJlbWFpbCI6ImFiYzJAYWJjLmFiYyIsInVzZXJuYW1lIjoiamFrdWIiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjE2NjIxMH0.gP1h99D0IESmVh4Vr7GEvbFMRhFUapLHnJnzTfgdVb8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEzNzc5M2MyNzQ1YzJmMmRkNjEiLCJpYXQiOjE1MzYxNjYxNTAsImV4cCI6MTUzNjc3MDk1MH0.WYthL0EEDMxPdsqmVGYch4a_ctVMSxa3J49pyJPrikY","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a2e793c2745c2f2dd60","5b7c57ba39a6c6000416ae8f"],"conversations":["5b785a77c4e908471c1bb547","5b7c8175adc5e80004bacb2f"],"_id":"5b785a37793c2745c2f2dd61","username":"jakub","email":"abc2@abc.abc","password":"$2b$10$LmKMMcxfIPoGgNUOvpUPJOHeXDQ5OCvEj7xguCOjd7/s4pc41zeyW","__v":0},"recipent":"5b785a2e793c2745c2f2dd60","conversationId":"5b785a77c4e908471c1bb547","messageText":"aaaadsd","createdAt":"2018-09-04T18:01:55.990Z","updatedAt":"2018-09-04T18:01:55.990Z","__v":0},{"_id":"5b8ec896ad1f1c1328c3fdb1","author":{"tokens":{"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJlbWFpbCI6ImFiY0BhYmMuYWJjIiwidXNlcm5hbWUiOiJld2VsaW5hIiwiaWF0IjoxNTM2MjQzMzg0LCJleHAiOjE1MzYyNDM0NDR9.CQXgFbW13L2sg-obH9GyLsE7M2EZGinr7YtyadBOaHE","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjc4NWEyZTc5M2MyNzQ1YzJmMmRkNjAiLCJpYXQiOjE1MzYyNDMzODQsImV4cCI6MTUzNjg0ODE4NH0.2D9RRc5Y0FtGWwmeJT-wmRZP-aJL9EHRZ_u6mJqnuM0","refreshTokenExpiration":604800},"isVerified":true,"isOnline":false,"friends":["5b785a37793c2745c2f2dd61"],"conversations":["5b785a77c4e908471c1bb547"],"_id":"5b785a2e793c2745c2f2dd60","username":"ewelina","email":"abc@abc.abc","password":"$2b$10$R3X5rDJWCurbDBCiIN7yGOGGSPqTwuJKDp7/zlFmD6Rb82ykGnJ5i","__v":0},"recipent":"5b785a37793c2745c2f2dd61","conversationId":"5b785a77c4e908471c1bb547","messageText":"vvvc","createdAt":"2018-09-04T18:01:58.453Z","updatedAt":"2018-09-04T18:01:58.453Z","__v":0}]}

describe('MessagesList', () => {
  it('renders Message component with message prop for each item in props.messages', () => {
    const wrapper = shallowMount(MessagesList, {
      localVue,
      store,
      attachToDocument: true,
      propsData: { messages, user },
      stubs: ['Icon'],
      router
    })
    const MessageComponents = wrapper.findAll(Message)
    expect(MessageComponents.length).toEqual(10);
  })
})