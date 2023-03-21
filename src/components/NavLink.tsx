import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function NavLink({ className, children, ...props }:LinkProps & { className?: string, children: ReactNode }) {
  const router = useRouter()
  const isActive = router.pathname === props.href
  const classes = (className || '') + ( isActive ? ' active' : '')

  return (
    <Link className={classes} { ...props }>{ children }</Link>
  )
}