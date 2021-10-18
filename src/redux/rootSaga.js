import { all, call } from 'redux-saga/effects'
import { allUserSagas } from './users/users.sagas'

export function* rootSaga() {
    yield all([
        call(allUserSagas)
    ])
}