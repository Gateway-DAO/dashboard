import { FC, useEffect, useState } from "react"
import { createPortal } from "react-dom"

interface IPortal {
  children?: React.ReactNode
  portalSelector?: HTMLElement
}

const Portal: FC<IPortal> = ({ children, portalSelector }) => {
   const [mounted, setMounted] = useState(false)

   useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
   }, [])

   return mounted ? createPortal(children, portalSelector || document.body) : null
}

export default Portal
