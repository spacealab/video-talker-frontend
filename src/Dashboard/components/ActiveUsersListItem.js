import React from 'react'
import userAvatar from '../../resources/image/userAvatar.png'

const ActiveUserListItem = (props) => {
    const { activeUser } = props;

    const handleListItemPressed = () => {
        // call to other user 
    }

  return (
    <div className='active_user_list_item' onClick={handleListItemPressed}>
        <div className='active_user_list_image_container'>
            <img className='active_user_list_image' src={userAvatar} alt='userAvatar'/>
        </div>
        <span className='active_user_list_text'>{activeUser.username}</span>
    </div>
  )
}

export default ActiveUserListItem;