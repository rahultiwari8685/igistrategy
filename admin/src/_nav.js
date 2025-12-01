import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem } from '@coreui/react'

import {
  cilSpeedometer,
  cilBullhorn,
  cilFolder,
  cilPeople,
  cilSettings,
  cilFile,
  cilMap,
  cilRss,
  cilNewspaper,
  cilPlus,
  cilCheckCircle,
  cilPencil,
  cilTrash,
  cilChart,
  cilUser,
  cilTags,
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
    to: '/blog',
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
        name: 'Published Blog',
        to: '/PublishedBlog',
        icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Draft Blog',
        to: '/DraftBlog',
        icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Deleted Blog',
        to: '/DeletedBlog',
        icon: <CIcon icon={cilTrash} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavItem,
    name: 'Users',
    to: '/Users',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Category',
    to: '/Category',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
  },




]

export default _nav
