import React from 'react'
import Topbar from '../../compornent/topbar/Topbar'
import Sidebar from '../../compornent/sidebar/Sidebar'

import Rightbar from '../../compornent/rightbar/Rightbar'
import './Home.css'
import TimeLine from '../../compornent/timeline/TimeLine'
export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <TimeLine/>
        <Rightbar/>
      </div>
    </>
  )
}
