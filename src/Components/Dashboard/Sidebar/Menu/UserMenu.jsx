import React from 'react';
import MenuItem from './MenuItem';
import { BsFingerprint } from 'react-icons/bs';

const UserMenu = () => {
    return (
        <div>
      <MenuItem icon={BsFingerprint} label='My Reviews' address='/MyReviews' />
        </div>
    );
};

export default UserMenu;