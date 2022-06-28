import { Link } from 'react-router-dom'

import { sidebarItems } from './sideBarData'
import SubMenu from './SubMenu'

import styles from './sideBar.module.css'

const SideBar = () => {
	return (
		<div className={styles.sideMenu}>
			<div className={styles.sidebarItems}>
				{sidebarItems.map((item) => {
					const { name, icon, children } = item
					return (
						<div key={name}>
							{children ? (
								<SubMenu items={children} name={name} icon={icon} />
							) : (
								<div className={styles.sidebarItem}>
									<Link
										to={`/admin/${name.toLowerCase()}`}
										className={styles.link}
									>
										<span className="mr-2">{icon}</span>
										{name}
									</Link>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default SideBar
