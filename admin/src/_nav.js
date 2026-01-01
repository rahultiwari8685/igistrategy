import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'

import {
  cilSpeedometer,
  cilPeople,
  cilNewspaper,
  cilPlus,
  cilCheckCircle,
  cilPencil,
  cilTrash,
  cilUser,
  cilTags,
  cilFile,
  cilOptions,
  cilChart,
} from '@coreui/icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },

  {
    component: CNavGroup,
    name: 'Blog',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Blog',
        to: '/blog',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Published Blogs',
        to: '/PublishedBlog',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Draft Blogs',
        to: '/DraftBlog',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Deleted Blogs',
        to: '/DeletedBlog',
        icon: <CIcon icon={cilTrash} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Categories',
    to: '/category',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Reports',
    to: '/reports',
    icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Polls',
    to: '/polls',
    icon: <CIcon icon={cilOptions} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Customers',
    to: '/customers',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Plans',
    to: '/plans',
    icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
  },
]

export default _nav
