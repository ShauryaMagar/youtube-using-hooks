import React from 'react';
import './VideoItem.css';

const VideoItem = props =>{
    const addFunction = () =>{
        const obj = {
            img: props.video.snippet.thumbnails.medium.url,
            title:props.video.snippet.title,
        }
        props.addToWatchList(obj);
    }
        return (
            <>
            <div onClick={()=>props.onVideoSelect(props.video)} className="video-item item">
                <img className="ui image" 
                src={props.video.snippet.thumbnails.medium.url} 
                alt="im" 
                />
                <div className="content">
                    <div className="header">
                          {props.video.snippet.title}
                    </div>
                    
                </div>
               
            </div>
            <div>
                <button onClick={addFunction}>Add to Watchlist</button>
            </div>
            </>
        );
};

export default VideoItem;

