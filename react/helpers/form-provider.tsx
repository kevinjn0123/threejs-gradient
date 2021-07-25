import * as React from "react"
import { UseFormReturn } from "react-hook-form"

export const FormContext = React.createContext<UseFormReturn<any>>(
  {} as UseFormReturn<any>
)

export const GreetingContext = React.createContext<any>(null!)
