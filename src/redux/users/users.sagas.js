import userActions from "./users.types";
import { takeLatest, call, put, all, select, delay } from 'redux-saga/effects'
import { selectUserPageNumber, selectUserTotalPageNumber, selectUserHavingData } from './users.selectors'
import { userFetchSuccess, userFetchFailure, fetchUserPageCountSuccess, fetchUserPageCountFailure, increasePageNumber, moreUserLoadSuccess, moreUserLoadFailure, allUsersFetched } from './users.actions'
import axios from 'axios'

export function* userFetchAsync() {
    try {
        yield delay(5000)
        const pageNumber = yield select(selectUserPageNumber)
        const response = yield axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
        const data = yield response.data.data
        yield put(userFetchSuccess(data))
    } catch (error) {
        yield put(userFetchFailure(error.message))
    }
}

export function* totalUserFetchAsync() {
    try {
        const response = yield axios.get(`https://reqres.in/api/users`)
        const data = yield response.data.total_pages
        yield put(fetchUserPageCountSuccess(data))
    } catch (error) {
        yield put(fetchUserPageCountFailure(error.message))
    }
}

export function* loadMoreDataAsync() {
    try {
        yield delay(5000)
        yield call(totalUserFetchAsync)
        yield put(increasePageNumber())


        const pageNumber = yield select(selectUserPageNumber)
        const totalPages = yield select(selectUserTotalPageNumber)
        console.log(`Page Number -> ${pageNumber}  Total Page Number -> ${totalPages}`)
        if (pageNumber > totalPages) {
            yield put(allUsersFetched())
            const isHaving = yield select(selectUserHavingData)
            console.log(`Is Having -> ${isHaving}`)
        }
        else {
            const response = yield axios.get(`https://reqres.in/api/users?page=${pageNumber}`)
            const data = yield response.data.data
            yield put(moreUserLoadSuccess(data))
        }
    } catch (error) {
        yield put(moreUserLoadFailure(error.message))
    }
}

export function* userFetchStart() {
    yield takeLatest(userActions.FETCH_USER_START, userFetchAsync)
}



export function* totalUserCount() {
    yield takeLatest(userActions.FETCH_TOTAL_PAGE_COUNT_START, totalUserFetchAsync)
}


export function* loadMoreData() {
    yield takeLatest(userActions.FETCH_MORE_USERS_START, loadMoreDataAsync)
}

export function* allUserSagas() {
    yield all([
        call(userFetchStart),
        call(totalUserCount),
        call(loadMoreData)
    ])
}