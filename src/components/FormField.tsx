
import { ReactNode } from "react"

export default function FormField({label, children}:{label:string, children:ReactNode}){
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{label}</span>
      {children}
    </label>
  )
}
