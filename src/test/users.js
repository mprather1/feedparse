import {crudTest} from './'

describe('Users', function () {
  crudTest({
    model: 'users',
    url: '/api/users',
    postUrl: '/api/users/',
    postAttributes: {
      username: 'user',
      password: 'password'
    },
    expectedResponse: '',
    putAttributes: {
      username: 'updatedName',
      password: 'updatedPassword'
    }
  })
})
