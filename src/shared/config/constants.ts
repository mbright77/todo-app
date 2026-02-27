export const APP_NAME = 'Listy'

export const TASK_FILTERS = [
  { key: 'active' as const, label: 'Active' },
  { key: 'today' as const, label: 'Today' },
  { key: 'upcoming' as const, label: 'Upcoming' },
  { key: 'completed' as const, label: 'Completed' },
]

/** Filter keys shown in the filter picker dialog on the Active page. */
export const FILTER_DIALOG_KEYS = ['active', 'today'] as const
