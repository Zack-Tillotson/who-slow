import { MouseEvent, MouseEventHandler } from "react"
import Link, {LinkProps} from 'next/link'
import { useRouter } from 'next/navigation'

import { IS_STATIC} from "@/navLinks"
import { buildCsrRouteFromHref } from "../view/buildRouteLink"

interface RouteLinkProps extends LinkProps {
  onClick?: MouseEventHandler<HTMLAnchorElement>,
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
