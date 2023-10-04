import React, {useState, useEffect} from 'react'
import './Video.css'
import ReactDOM from 'react-dom'
function Video(props) {
  const [muted, setMuted] = useState(true);
    const handleClick = (e) => {
        e.preventDefault();
        e.target.muted = !e.target.muted
    }
    const handleScroll = () => {
      if (!props.open) {
        const video = document.getElementById(props.id);
        if (video) {
          const next = video.parentNode.nextSibling;
          if (next) {
            next.scrollIntoView();
            setMuted(false);
          }
        }
      }
    };
  return (
    <video
      src={props.src}
      className='videos-styling'
      muted={muted}
      onClick={handleClick}
      onEnded={handleScroll}
      controls
      id={props.id}
    ></video>
  )
}

export default Video