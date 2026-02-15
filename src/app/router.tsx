import { createBrowserRouter, Navigate } from 'react-router-dom'
import { CompletedPage } from '../pages/completed/ui/CompletedPage'
import { SearchPage } from '../pages/search/ui/SearchPage'
import { ActivePage } from '../pages/active/ui/ActivePage'
import { UpcomingPage } from '../pages/upcoming/ui/UpcomingPage'
import { AppLayout } from './ui/AppLayout'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { path: '', element: <Navigate to="/active" replace /> },
        { path: 'active', element: <ActivePage /> },
        { path: 'upcoming', element: <UpcomingPage /> },
        { path: 'completed', element: <CompletedPage /> },
        { path: 'search', element: <SearchPage /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
)
