import NavBar from "./navBar/NavBar"
import SideBar from "./sideBar/SideBar"
import AllRoutes from "./AllRoutes"

import styles from "./adminPage.module.css"

const AdminPage = () => {
  return (
    <div className={styles.adminContainer}>
      <SideBar />
      <div className={styles.mainContainer}>
        <NavBar />
        <AllRoutes />
      </div>
    </div>
  )
}

export default AdminPage
