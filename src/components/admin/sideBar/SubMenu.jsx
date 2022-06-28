import { useState } from 'react'
import { Collapse } from 'reactstrap'
import { Link } from 'react-router-dom'

import styles from './sideBar.module.css'

const SubMenu = ({ name, items, icon }) => {
	const [collapsed, setCollapsed] = useState(true)
	const toggle = () => setCollapsed((collapsed) => !collapsed)

	return (
		<div className={styles.sidebarItem}>
			<div onClick={toggle} className={styles.link}>
				<a>
					<span className="mr-2">{icon}</span>
					{name}
				</a>
			</div>
			<Collapse isOpen={!collapsed} navbar className="pt-2">
				{items.map((item) => (
					<h6 key={item} className="pl-4">
						<Link
							to={`/admin/${item.toLowerCase()}/`}
							className={styles.subMenuItem}
						>
							{item}
						</Link>
					</h6>
				))}
			</Collapse>
		</div>
	)
}

export default SubMenu
