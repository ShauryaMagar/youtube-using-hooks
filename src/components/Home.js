import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import {
  signOut,
} from "firebase/auth";

import { auth } from "./firebase-config";
import VideoDetail from './VideoDetail';
import { useNavigate, NavLink } from "react-router-dom";
const KEY = 'AIzaSyC3Lqw5sUJy32pGO8wEPuRfo2OiNDIE5No';

const Home = () => {
    let navigate = useNavigate();
    const [videos,setVideos]= useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    useEffect(()=>{
        const user = auth.currentUser;
        if (!user) {
            navigate("/login")
        }else{
            onTermSubmit('world US news');   
        }
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
    const logout = async () => {
        await signOut(auth);
        navigate('login');
    };
    return(
            <div className="ui container">
            <button onClick={logout}>Logout</button>
            <NavLink to="watchlist"><button>Watch List</button></NavLink>
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

export default Home;


