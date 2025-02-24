import { PLACEHOLDER_ID } from "@/navLinks"

const BASE_ACTION_TYPES = ['new', 'share']

export function buildCsrRouteFromHref(route: string) {
  const [_, base, idOrBaseAction, action] = route.split('/')

  const isBaseAction = BASE_ACTION_TYPES.indexOf(idOrBaseAction) >= 0
  const id = isBaseAction ? '' : idOrBaseAction // empty or ID
  const baseAction = isBaseAction ? idOrBaseAction : ''
  const csrId = id ? PLACEHOLDER_ID : ''

  const csrRoute = '/' + [base, baseAction, csrId, action, id ? `?id=${id}` : ''].filter(piece => piece).join('/')
  return csrRoute
}
