import { InputHTMLAttributes, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "./Tooltip";

export interface RangeType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info: string;
}

export default function Range({ label, info, value, ...rest }: RangeType) {
  return (
    <>
      <label className='flex items-center gap-1'>
        { label }
        <Tooltip value={info}>
          <IoInformationCircleOutline className='cursor-pointer' />
        </Tooltip>
        
        <div className='ml-auto'>{ value }</div>
      </label>
      <input type='range' value={value} { ...rest } />
    </>
  )
}