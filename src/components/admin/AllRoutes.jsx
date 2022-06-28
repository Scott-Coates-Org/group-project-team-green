import { Route, Switch } from "react-router-dom"

import {
  AllProducts,
  Apps,
  Bookings,
  Categories,
  CreateProducts,
  Customers,
  Dashboard,
  DiscountCodes,
  Inbox,
  Reports,
  Settings,
  Stock,
} from "components/admin/adminRoutes"

const AllRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/admin/dashboard" component={Dashboard} />
        <Route path="/admin/inbox" component={Inbox} />
        <Route path="/admin/bookings" component={Bookings} />
        <Route path="/admin/all products" component={AllProducts} />
        <Route path="/admin/create products" component={CreateProducts} />
        <Route path="/admin/stock" component={Stock} />
        <Route path="/admin/discount codes" component={DiscountCodes} />
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/customers" component={Customers} />
        <Route path="/admin/reports" component={Reports} />
        <Route path="/admin/apps" component={Apps} />
        <Route path="/admin/settings" component={Settings} />
      </Switch>
    </>
  )
}

export default AllRoutes
