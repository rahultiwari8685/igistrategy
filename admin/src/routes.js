import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Blog = React.lazy(() => import('./views/pages/blog/Blog'))
const Reports = React.lazy(() => import('./views/pages/reports/Reports'))
const Plans = React.lazy(() => import('./views/pages/plans/Plans'))
const Polls = React.lazy(() => import('./views/pages/polls/Polls'))
const Subscription = React.lazy(() => import('./views/pages/subscription/Subscriptions'))
const Customers = React.lazy(() => import('./views/pages/customers/Customers'))
const UpdateBlog = React.lazy(() => import('./views/pages/blog/UpdateBlog'))
const PublishedBlog = React.lazy(() => import('./views/pages/blog/PublishedBlog'))
const DraftBlog = React.lazy(() => import('./views/pages/blog/DraftBlog'))
const DeletedBlog = React.lazy(() => import('./views/pages/blog/DeletedBlog'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/ChangePassword'))


const Users = React.lazy(() => import('./views/pages/users/Users'))
const Category = React.lazy(() => import('./views/pages/category/Category'))
// import UpdateNews from "./pages/News/UpdateNews";




const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  { path: '/blog', name: 'Blog', element: Blog },
  { path: '/reports', name: 'Reports', element: Reports },
  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/plans', name: 'Plans', element: Plans },
  { path: '/polls', name: 'Polls', element: Polls },
  { path: '/subscription', name: 'Subscription', element: Subscription },
  { path: '/UpdateBlog/:id', name: 'Update Blog', element: UpdateBlog },
  { path: '/PublishedBlog', name: 'Published Blog', element: PublishedBlog },
  { path: '/DraftBlog', name: 'Draft Blog', element: DraftBlog },
  { path: '/DeletedBlog', name: 'Deleted Blog', element: DeletedBlog },


  { path: '/ChangePassword', name: 'Change Password', element: ChangePassword },
  { path: '/Users', name: 'Users', element: Users },
  { path: '/Category', name: 'Category', element: Category },

]
export default routes
