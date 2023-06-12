import React, { useContext, useEffect, useState } from 'react'
import Topbar from '../../compornent/topbar/Topbar'
import Sidebar from '../../compornent/sidebar/Sidebar'
import TimeLine from '../../compornent/timeline/TimeLine'
import Rightbar from '../../compornent/rightbar/Rightbar'
import './Profile.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../state/AuthContext'

export default function Profile() {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const username = useParams().username;
    const {user:currentUser} = useContext(AuthContext)


    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(`/users?username=${username}`)
            // console.log(response);
            setUser(response.data);
        }
        fetchUser();
    }, [username])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                src={
                                    user?.coverPicture
                                        ? PUBLIC_FOLDER + currentUser.coverPicture
                                        : PUBLIC_FOLDER + "post/3.jpeg"
                                }
                                alt=""
                                className='profileCoverImg'
                            />
                            <img
                                src={
                                    PUBLIC_FOLDER + (currentUser?.profilePicture || "/person/noAvatar.png")
                                }
                                alt=""
                                className="profileUserImg"
                            />

                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{currentUser.username}</h4>
                            <span className="profileInfoDesc">{currentUser.desc}</span>
                        </div>

                    </div>
                    <div className="profileRightBottom">
                        <TimeLine username={currentUser.username} />
                        <Rightbar user={user} />
                    </div>
                </div>

            </div>
        </>
    )
}
