import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
const KEY = 'AIzaSyC3Lqw5sUJy32pGO8wEPuRfo2OiNDIE5No';

const App = () => {
    const [videos,setVideos]= useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    useEffect(()=>{
        onTermSubmit('world US news');
    },[]);
    const onTermSubmit = async term => {
        const response = await youtube.get('/search', {
            params: {
                q: term,
                part: 'snippet',
                maxResults: 5,
                key: KEY,
                type: 'video',
            }
        });
        setVideos(response.data.items);
        setSelectedVideo(response.data.items[0]);
    };
    const onVideoSelect = video => {
        setSelectedVideo(video);
    }
    return(
            <div className="ui container">
            <SearchBar onFormSubmit={onTermSubmit} />
            <div className="ui grid">
            <div className="ui row">
                  <div className="eleven wide column">
                   <VideoDetail video={selectedVideo} />
                   </div>
                   <div className="five wide column">
                
                    <VideoList onVideoSelect={onVideoSelect} videos = {videos}
                    />
                    </div>
            </div>
            
              
              
            </div>
            
            </div>
        );
};




export default App;