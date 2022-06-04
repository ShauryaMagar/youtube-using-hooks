import React, {useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import {
  signOut,
} from "firebase/auth";
import { ref, set, push, onValue, remove } from "firebase/database";

import { auth, database } from "./firebase-config";
import VideoDetail from './VideoDetail';
import { useNavigate } from "react-router-dom";
import Watchlist from './Watchlist';
const KEY = 'AIzaSyCsoImsPiZYs5De1I_018vjCa-ySvR8POA';

const Home = () => {
    let navigate = useNavigate();
    const [videos,setVideos]= useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [watch,setWatch] = useState(false);
    const [user,setUser] = useState({});
    const [list,setList] = useState({});
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
    useEffect(()=>{
        const user1 = auth.currentUser;
        if (!user1) {
            navigate("/login")
        }else{
            setUser(user1.uid);
            const dbRef = ref(database, 'users/'+user1.uid);
            const ob = [];
            onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let ar = {
                    key:childKey,
                    data:childData
                }
                ob.push(ar);
            });
            setList(ob);
        }, {
            onlyOnce: true
        });
            onTermSubmit('world news');  
        }
    },[]);
    const check = (obj) =>{
        const dbRef = ref(database, 'users/'+user);
            const ob = [];
            onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let ar = {
                    key:childKey,
                    data:childData
                }
                ob.push(ar);
            });
            setList(ob);
        }, {
            onlyOnce: true
        });
        let up = true;
        list.forEach(function(item){
            if(item.data.data.title === obj.title){
                up=false;
            }
        })
        return up;

    }
    const addToWatchList = (obj)=>{
        const ans = check(obj);
        if(ans){
            const postListRef = ref(database, 'users/'+user);
                const newPostRef = push(postListRef);
                set(newPostRef, {
                    data: obj
                });
                alert("Added to Watchlist!")
                const dbRef = ref(database, 'users/'+user);
                    const ob = [];
                    onValue(dbRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        const childKey = childSnapshot.key;
                        const childData = childSnapshot.val();
                        let ar = {
                            key:childKey,
                            data:childData
                        }
                        ob.push(ar);
                    });
                    setList(ob);
                }, {
                    onlyOnce: true
            });
        }else{
            alert("Item already in watchlist")
        }
       
    }
    const removeP =(key) =>{
        remove(ref(database,'users/'+user+"/"+key))
        .then(()=>{
            alert("removed from watchlist!")
            setWatch(false);
        })
        .catch((error)=>alert(error));
        const dbRef = ref(database, 'users/'+user);
            const ob = [];
            onValue(dbRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                let ar = {
                    key:childKey,
                    data:childData
                }
                ob.push(ar);
            });
            setList(ob);
        }, {
            onlyOnce: true
        });
    }
    
    const onVideoSelect = video => {
        setSelectedVideo(video);
    }
    const logout = async () => {
        await signOut(auth);
        navigate('login');
    };
    const watchSetter=()=>{
        setWatch(true);
    }
    const watchFromWatchList = (title) =>{
        setWatch(false);
        onTermSubmit(title);
    }
    return(
        <>
        {!watch?
            (<div className="ui container">
                <button onClick={logout}>Logout</button>
                <button onClick={watchSetter}>Watch List</button>
                <SearchBar onFormSubmit={onTermSubmit} />
                <div className="ui grid">
                    <div className="ui row">
                        <div className="eleven wide column">
                            <VideoDetail video={selectedVideo} />
                        </div>
                        <div className="five wide column">  
                            <VideoList addToWatchList={addToWatchList} onVideoSelect={onVideoSelect} videos = {videos}/>
                        </div>
                    </div>
                </div>
            </div>)
            :
            <Watchlist watchFromWatchList={watchFromWatchList} remove={removeP} list={list} setWatch={setWatch}/>
        }
        </>
        );
};

export default Home;


