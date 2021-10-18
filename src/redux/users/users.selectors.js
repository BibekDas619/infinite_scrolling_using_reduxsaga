import { createSelector } from 'reselect'

const user = state => state.users


export const selectUserPageNumber = createSelector(
    [user],
    usr => usr.pageNumber
)

export const selectUserTotalPageNumber = createSelector(
    [user],
    usr => usr.totalPages
)

export const selectUserHavingData = createSelector(
    [user],
    usr => usr.havePages
)