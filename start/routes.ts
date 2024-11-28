/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        router.resource('birthdays', () => import('#controllers/birthdays_controller'))
        router.resource('members', () => import('#controllers/members_controller'))
      })
      .prefix('v1')
  })
  .prefix('api')
