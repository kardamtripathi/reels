import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { database } from '../firebase'
import Navbar from './Navbar'
import './Profile.css'
import CircularProgress from '@mui/material/CircularProgress'
import Video from './Video'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Close } from '@mui/icons-material';
import Like2 from './Like2';
import AddComment from './AddComment'
import Comments from './Comments'
function Profile() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null)
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        database.users.doc(id).onSnapshot((snap) => {
            setUserData(snap.data());
        })
    }, [id])
    useEffect(() => {
        const pushData = async () => {
            if (userData != null) {
                let parr = []
                for (let i = 0; i < userData.postIds.length; i++) {
                    let postData = await database.posts.doc(userData.postIds[i]).get()
                    parr.push({ ...postData.data(), postId: postData.id })
                }
                setPosts(parr)
            }
        }
        pushData();
    })
    const [open, setOpen] = useState(null);

    const handleClickOpen = (id) => {
        setOpen(id);
    };

    const handleClose = () => {
        setOpen(null);
    };
    return (
        <>
            {
                posts == null || userData == null ? <CircularProgress /> :
                    <>
                        <Navbar userData={userData} />
                        <div className='spacer' />
                        <div className='container'>
                            <div className='upper-part'>
                                <div className='profile-img'>
                                    <img src={userData.profileUrl} />
                                </div>
                                <div className='info'>
                                    <Typography variant='h5'>
                                        Email: {userData.email}
                                    </Typography>
                                    <Typography variant='h6'>
                                        Posts: {userData.postIds.length}
                                    </Typography>
                                </div>
                            </div>
                            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />
                            <div className='profile-videos'>
                                {
                                    posts.map((post, index) => (
                                        <React.Fragment key={index} >
                                            <div className='videos'>
                                                <video src={post.pUrl} onClick={() => handleClickOpen(post.pId)} >
                                                    <source src={post.pUrl} />
                                                </video>
                                                <Dialog
                                                    open={open == post.pId}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                    fullWidth={true}
                                                    maxWidth='md'
                                                >
                                                    <Close
                                                        style={{
                                                            position: 'absolute',
                                                            top: '10px',
                                                            right: '10px',
                                                            cursor: 'pointer',
                                                            zIndex: 10
                                                        }}
                                                        onClick={handleClose}
                                                    />
                                                    <div className='modal-container'>
                                                        <div className='video-modal'>
                                                            <Video autoPlay={true} muted="muted" controls src={post.pUrl}>
                                                                <source src={post.pUrl} />
                                                            </Video>
                                                            {/* <video autoPlay={true} muted="muted" controls style={{width: '100%'}}>
                                                    <source src={post.pUrl}/>
                                                </video> */}
                                                        </div>
                                                        <div className='comment-modal'>
                                                            <Card className='card1' style={{ padding: '1rem' }}>
                                                                <Comments postData={post} />
                                                            </Card>
                                                            <Card variant='outlined' className='card2'>
                                                                <Typography style={{ padding: '0.5rem' }}>{post.likes.length == 0 ? '' : `Liked by ${post.likes.length} users`}</Typography>
                                                                <div style={{ display: 'flex' }}>
                                                                    <Like2 postData={post} userData={userData} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} />
                                                                    <AddComment style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} userData={userData} postData={post} />
                                                                </div>
                                                            </Card>
                                                        </div>
                                                    </div>
                                                </Dialog>
                                            </div>
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Profile