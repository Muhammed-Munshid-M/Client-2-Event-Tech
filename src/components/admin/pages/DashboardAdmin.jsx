import React from 'react'
// import LayoutAdmin from '../LayoutAdmin'
import LayoutAdmin from '../LayoutAdmin';

function DashboardAdmin() {
  return (
    <div>
      <LayoutAdmin>
        <h1 className='mt-16'>Hello Admin</h1>
      </LayoutAdmin>
      {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
    </div>
  )
}

export default DashboardAdmin