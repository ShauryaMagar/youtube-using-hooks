import React, {useState} from 'react';

const SearchBar = ({onFormSubmit}) => {
    const [term,setTerm] = useState('');
    const onInputChange = (event) => {
        setTerm(event.target.value);
    }


    const onSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(term);
    };
        return(
            <div className="ui segment search-bar">
               <form onSubmit={onSubmit} className="ui form">
                  <div className='field'>
                      <label>Video Search</label>
                      <input type='text' onChange={onInputChange} value={term}  />
                  </div>
               </form>
            </div>
        );

}


export default SearchBar;

//AIzaSyC3Lqw5sUJy32pGO8wEPuRfo2OiNDIE5No API KEY