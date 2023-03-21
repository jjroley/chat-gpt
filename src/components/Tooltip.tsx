import { ReactNode } from "react";

export default function Tooltip({ value, children }: { value: string, children: ReactNode }) {
  return (
    <>
      <span className='tooltip' data-value={value} >{ children }</span>
    </>
  )
}