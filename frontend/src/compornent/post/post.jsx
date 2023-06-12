import { MoreVert } from '@mui/icons-material'
import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import axios from 'axios';
import { format } from "timeago.js"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../state/AuthContext';
// import { Users } from '../../dummyData'

export default function Post({ post }) {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users?userId=${post.userId}`);
                // console.log(response);
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [post.userId]);
    const handleLike = async () => {
        try {
            await axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
        } catch (err) {
            console.log(err);
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }
    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                src={post.userId === currentUser._id
                                    ? (currentUser.profilePicture ? PUBLIC_FOLDER + currentUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png")
                                    : (user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png")}
                                alt=""
                                className="postProfileImg"
                            />
                        </Link>
                        <span className="postUsername">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>

                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img
                        src={PUBLIC_FOLDER + post.img}
                        alt=""
                        className='postImg'
                    />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={PUBLIC_FOLDER + "heart.png"} alt=""
                            className='likeIcon'
                            onClick={() => handleLike()} />
                        <span className="postLikeCounter">{like}人がいいねしました</span>
                    </div>
                    <div className="postBottomRight">

                        <span className="postComentText">{post.comment}:コメント</span>
                    </div>
                </div>
            </div>
        </div>


    )
}
