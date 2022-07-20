import NavBar from "./navBar/NavBar"
import SideBar from "./sideBar/SideBar"
import AllRoutes from "./AllRoutes"

import styles from "./adminPage.module.css"
import { Helmet } from "react-helmet"

const AdminPage = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className={styles.adminContainer}>
        <SideBar />
        <div className={styles.mainContainer}>
          <NavBar />
          <AllRoutes />
        </div>
      </div>
    </>
  )
}

export default AdminPage
