import NavBar from './navBar/NavBar'
import SideBar from './sideBar/SideBar'

import styles from './adminPage.module.css'

const AdminPage = () => {
	return (
		<div className={styles.adminContainer}>
			<SideBar />
			<div className={styles.mainContainer}>
				<NavBar />
			</div>
		</div>
	)
}

export default AdminPage
