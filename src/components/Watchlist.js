import React from 'react';
import './VideoItem.css';
const Watchlist=(props) =>{
    const removeFunc = (title) =>{
        console.log(title);
        props.remove(title);
    }
    return(
        <>
        <button onClick={()=>props.setWatch(false)}>Home</button>
         {props.list.map((item, index) => (  
             <>
             <div className='video-item item' onClick={()=>props.watchFromWatchList(item.data.data.title)}>
              <img className="ui image" 
                src={item.data.data.img} 
                alt="im" 
                />
                <div className="content">
                    <div className="header">
                          {item.data.data.title}
                    </div>
                </div>
            </div>
            <div>
                <button onClick={()=>removeFunc(item.key)}>Remove from Watchlist</button>
            </div>
            </>
            ))}  
        
        </>
    );
};

export default Watchlist;