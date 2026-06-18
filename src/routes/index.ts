import { createElement } from 'react'
import Dashboard from '../pages/Dashboard'
import Upload from '../pages/Upload'
import Processing from '../pages/Processing'
import Results from '../pages/Results'
import Settings from '../pages/Settings'

export const appRoutes = [
  { path: '/', element: createElement(Dashboard) },
  { path: '/upload', element: createElement(Upload) },
  { path: '/processing', element: createElement(Processing) },
  { path: '/results', element: createElement(Results) },
  { path: '/settings', element: createElement(Settings) },
]
