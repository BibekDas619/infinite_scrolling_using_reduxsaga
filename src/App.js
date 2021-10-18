import axios from 'axios'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { connect } from 'react-redux'
import { userFetchStart, fetchUserPageCountStart, moreUserLoadStart } from './redux/users/users.actions'
import Loader from "react-loader-spinner"


import './App.css';


function App({ users, userFetchStart, isFetching, fetchUserPageCountStart, moreUserLoadStart, havePages }) {
  useEffect(() => {
    userFetchStart()
    fetchUserPageCountStart()
  }, [])


  return (
    <div className="App">
      {isFetching === true ? <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} style={{ marginTop: '50vh' }} /> :
        <InfiniteScroll
          dataLength={users.length}
          next={() => moreUserLoadStart()}
          hasMore={havePages}
          loader={<Loader type="Puff" color="black" height={40} width={50} />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {
            users.map((itm, index) => (
              <div key={index}>
                <img src={itm.avatar} alt="Image" />
                <h1>{itm.first_name} {itm.last_name}</h1>
              </div>
            ))
          }
        </InfiniteScroll>

      }

    </div>
  );
}


const mapStateToProps = state => ({
  users: state.users.allUsers,
  isFetching: state.users.isFetching,
  havePages: state.users.havePages
})

const mapDispatchToProps = dispatch => ({
  userFetchStart: () => dispatch(userFetchStart()),
  fetchUserPageCountStart: () => dispatch(fetchUserPageCountStart()),
  moreUserLoadStart: () => dispatch(moreUserLoadStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
