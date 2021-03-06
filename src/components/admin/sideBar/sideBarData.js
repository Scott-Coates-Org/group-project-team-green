import { AiOutlineAppstore } from "react-icons/ai"
import { BsInbox } from "react-icons/bs"
import { BsBookmarks } from "react-icons/bs"
import { BsFillTagFill } from "react-icons/bs"
import { BsPeople } from "react-icons/bs"
import { TbReportAnalytics } from "react-icons/tb"
import { RiApps2Line } from "react-icons/ri"
import { FiSettings } from "react-icons/fi"

// Add a children property array to any object if you want it to have nested
// items, like for example in "Bookings". This will update the UI dynamically.

export const sidebarItems = [
  { name: "Dashboard", icon: <AiOutlineAppstore /> },
  { name: "Inbox", icon: <BsInbox /> },
  {
    name: "Bookings",
    icon: <BsBookmarks />,
    children: ["All bookings", "Create rooms"],
  },
  {
    name: "Products",
    icon: <BsFillTagFill />,
    children: [
      "All products",
      "Create products",
      "Stock",
      "Discount codes",
      "Categories",
    ],
  },
  { name: "Customers", icon: <BsPeople /> },
  { name: "Reports", icon: <TbReportAnalytics /> },
  { name: "Apps", icon: <RiApps2Line /> },
  { name: "Addons", icon: <RiApps2Line /> },
  { name: "Settings", icon: <FiSettings /> },
]
