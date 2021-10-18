import userActions from "./users.types";

export const userFetchStart = () => ({
    type: userActions.FETCH_USER_START
})

export const userFetchSuccess = (users) => ({
    type: userActions.FETCH_USER_SUCCESS,
    payload: users
})

export const userFetchFailure = (error) => ({
    type: userActions.FETCH_USER_FAILURE,
    payload: error
})



export const fetchUserPageCountStart = () => ({
    type: userActions.FETCH_TOTAL_PAGE_COUNT_START
})

export const fetchUserPageCountSuccess = (count) => ({
    type: userActions.FETCH_TOTAL_PAGE_COUNT_SUCCESS,
    payload: count
})

export const fetchUserPageCountFailure = (error) => ({
    type: userActions.FETCH_TOTAL_PAGE_COUNT_FAILURE,
    payload: error
})


export const moreUserLoadStart = () => ({
    type: userActions.FETCH_MORE_USERS_START
})

export const moreUserLoadSuccess = (moreUsers) => ({
    type: userActions.FETCH_MORE_USERS_SUCCESS,
    payload: moreUsers
})


export const moreUserLoadFailure = error => ({
    type: userActions.FETCH_MORE_USERS_FAILURE,
    payload: error
})

export const increasePageNumber = () => ({
    type: userActions.INCREASE_PAGE_COUNT
})


export const allUsersFetched = () => ({
    type: userActions.ALL_USERS_FETCHED
})