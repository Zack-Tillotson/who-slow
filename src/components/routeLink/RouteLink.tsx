import { MouseEvent, MouseEventHandler } from "react"
import Link, {LinkProps} from 'next/link'
import { useRouter } from 'next/navigation'

import { IS_STATIC, PLACEHOLDER_ID } from "@/navLinks"

interface RouteLinkProps extends LinkProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>,
}

function buildCsrRouteFromHref(route: string) {
  const [_, base, id, action] = route.split('/')
  const csrId = id ? PLACEHOLDER_ID : ''
  const csrRoute = '/' + [base, csrId, action, `?id=${id}`].filter(piece => piece).join('/')
  return csrRoute
}

export function RouteLink({onClick, ...restProps}: RouteLinkProps) {
  const router = useRouter()

  const clickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    if(onClick) {
      onClick(event)
    }
    if(!event.isDefaultPrevented() && IS_STATIC) {
      const csrRoute = buildCsrRouteFromHref(restProps.href.toString())
      event.preventDefault()
      router.push(csrRoute)
    }
  }
  return (
    <Link onClick={clickHandler} {...restProps} />
  )
}
