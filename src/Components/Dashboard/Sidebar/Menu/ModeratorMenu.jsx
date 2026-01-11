import { BsChatLeftDots } from 'react-icons/bs'
import MenuItem from './MenuItem'

const ModeratorMenu = () => {
  return (
    <>
      <MenuItem icon={BsChatLeftDots} label='Manage All Reviews' address='manage-all-reviews' />
    </>
  )
}

export default ModeratorMenu