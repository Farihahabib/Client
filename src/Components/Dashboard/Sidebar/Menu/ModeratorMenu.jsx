
import {BsChatLeftDots,BsBriefcaseFill } from 'react-icons/bs'
import MenuItem from './MenuItem'
const ModeratorMenu = () => {
  return (
    <>
   
      <MenuItem icon={BsChatLeftDots } label='All reviews' address='all-reviews' />
      <MenuItem
        icon={BsBriefcaseFill }
        label='Manage Applications'
        address='manage-applications'
      />
    </>
  )
}

export default ModeratorMenu