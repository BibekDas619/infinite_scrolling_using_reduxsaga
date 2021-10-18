import userActions from "./users.types";

const INITIAL_STATE = {
    allUsers: [],
    isFetching: false,
    isCountFetching: false,
    error: undefined,
    countError: undefined,
    moreDataError: undefined,
    totalPages: 0,
    isMoreDataFetching: false,
    pageNumber: 1,
    havePages: true
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActions.FETCH_USER_START:
            return {
                ...state,
                isFetching: true,
                error: undefined
            }

        case userActions.FETCH_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
                allUsers: action.payload,
                error: undefined
            }

        case userActions.FETCH_USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }

        case userActions.FETCH_TOTAL_PAGE_COUNT_START:
            return {
                ...state,
                isCountFetching: true
            }

        case userActions.FETCH_TOTAL_PAGE_COUNT_SUCCESS:
            return {
                ...state,
                isCountFetching: false,
                totalPages: action.payload,
                countError: undefined,
            }

        case userActions.FETCH_TOTAL_PAGE_COUNT_FAILURE:
            return {
                ...state,
                isCountFetching: false,
                countError: action.payload
            }

        case userActions.FETCH_MORE_USERS_START:
            return {
                ...state,
                isMoreDataFetching: true
            }
        case userActions.FETCH_MORE_USERS_SUCCESS:
            return {
                ...state,
                isMoreDataFetching: false,
                allUsers: [...state.allUsers, ...action.payload],
                moreDataError: undefined
            }

        case userActions.FETCH_MORE_USERS_FAILURE:
            return {
                ...state,
                isMoreDataFetching: false,
                moreDataError: action.payload
            }

        case userActions.INCREASE_PAGE_COUNT:
            return {
                ...state,
                pageNumber: state.pageNumber + 1
            }


        case userActions.ALL_USERS_FETCHED:
            return {
                ...state,
                havePages: false
            }

        default: return state
    }
}

export default userReducer