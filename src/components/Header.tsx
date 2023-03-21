import { IoAdd, IoChatbubbleOutline, IoChatbubblesOutline, IoRefreshOutline, IoSettingsOutline, IoTrashOutline } from "react-icons/io5";
import NavLink from "./NavLink";
import { useAuth } from "@/contexts/AuthContext";
import Tooltip from "./Tooltip";
import { useChat } from "@/contexts/ChatContext";


export default function Header() {
  const { user } = useAuth()
  const { clearChat } = useChat()

  return (
    <div className='p-3 flex flex-wrap border-b border-slate-500 gap-2 bg-slate-600 shadow-lg z-10'>
      <NavLink href='/' className='bg-inherit hover:bg-teal-600 hover:bg-opacity-40 rounded-full p-2 px-4 flex items-center text-sm gap-1 cursor-pointer'>
        <IoChatbubbleOutline className='text-lg' />
        Chat
      </NavLink>
      { /* <NavLink href='/conversations' className='bg-inherit hover:bg-teal-600 hover:bg-opacity-40 rounded-full p-2 px-4 flex items-center text-sm gap-1 cursor-pointer'>
        <IoChatbubblesOutline className='text-lg' />
        Conversations
      </NavLink> */ }
      <NavLink href='/settings' className='bg-inherit hover:bg-teal-600 hover:bg-opacity-40 rounded-full p-2 px-4 flex items-center text-sm gap-1 cursor-pointer'>
        <IoSettingsOutline className='text-lg' />
        Settings
      </NavLink>

      <button onClick={clearChat} className='ml-auto hover:bg-red-400 hover:rotate-[-360deg] p-2 rounded-full flex items-center justify-center w-10 h-10 transition-all scale-x-[-1]'><IoRefreshOutline /></button>
    </div>
  )
}