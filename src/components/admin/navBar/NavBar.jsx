import { BsFillQuestionCircleFill } from "react-icons/bs"
import { BsFillBellFill } from "react-icons/bs"

import styles from "./navBar.module.css"

const NavBar = () => {
  return (
    <nav className={styles.navbar}>
      <a>
        <BsFillBellFill />
      </a>
      <a>
        <BsFillQuestionCircleFill />
      </a>
    </nav>
  )
}

export default NavBar
