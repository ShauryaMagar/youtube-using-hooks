import React from 'react';

const VideoDetail = props =>{
    if(!props.video){
        return <div>Select A Video First</div>;
    }
    const addToWatchList=()=>{
        
    }
    const videoSrc = `https://www.youtube.com/embed/${props.video.id.videoId}`;
    return(
    <div>
    <div className="ui embed">
        <iframe title="video player" src={videoSrc} />
    </div>
    <div className="ui segment">
        <h4 className="ui header">{props.video.snippet.title}</h4>
        <p> {props.video.snippet.description} </p>
    </div>
    <button onClick={addToWatchList}>Watchlist</button>
    </div>
    );
}


export default VideoDetail;