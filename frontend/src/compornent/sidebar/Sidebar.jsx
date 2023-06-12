import React, { useContext } from 'react'
import { Home, Search, Notifications, Bookmark, Person, Settings, MessageRounded } from "@mui/icons-material"
import './Sidebar.css'
import CloseFriend from '../closeFriend/CloseFriend'
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'

export default function Sidebar() {
    const {user:currentUser} =useContext(AuthContext)
    return (
        <div className='sidebar'>
            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        <Home className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>ホーム</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <Search className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>検索</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <Notifications className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>通知</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <MessageRounded className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>メッセージ</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <Bookmark className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>ブックマーク</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <Person className='sidebarIcon' />
                        <Link to={`/profile/${currentUser.username}`} style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>プロフィール</span>
                        </Link>
                    </li>
                    <li className='sidebarListItem'>
                        <Settings className='sidebarIcon' />
                        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
                            <span className='sidebarListItemText'>設定</span>
                        </Link>
                    </li>
                </ul>
                <hr className='sidebarHr' />
                <ul className='sidebarFriendList'>
                    {Users.map((user) => (
                        <CloseFriend user={user} key={user.id} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
