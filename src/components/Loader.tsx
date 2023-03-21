

export interface LoaderType {
  variant?: 'dots';
}

export default function Loader({ variant }:LoaderType) {

  if(variant === 'dots') {
    return (
      <div className='flex items-center gap-1 loader-dots'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    )
  }

  return null
}