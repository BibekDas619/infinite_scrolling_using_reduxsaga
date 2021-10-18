import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleWare from 'redux-saga'
import rootReducer from './rootReducer'
import { rootSaga } from './rootSaga'

const sagaMiddleWare = createSagaMiddleWare()

const middleWares = [sagaMiddleWare]


const store = createStore(rootReducer, applyMiddleware(...middleWares))

sagaMiddleWare.run(rootSaga)


export default store