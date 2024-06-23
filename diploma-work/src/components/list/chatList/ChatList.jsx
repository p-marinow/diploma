import {useState} from 'react';
import './chatList.css';
import AddUser from './addUser/AddUser';

const ChatList = () => {

    const [addMode, setAddMode] = useState(false);

    const handleChangeAddMode = () => setAddMode(!addMode);

    return (
        <div className='chatList'>
            <div className='search'>
                <div className='searchBar'>
                    <img src='./search.png' alt='' />
                    <input type='text' placeholder='Search' />
                </div>
                <img 
                    src={addMode ? './minus.png' : './plus.png'} 
                    alt=''
                    className='add'
                    onClick={handleChangeAddMode}
                />
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span className=''>Patrick I. Miller</span>
                    <p className=''>Hello</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span className=''>Dana S. Hamilton</span>
                    <p className=''>Hi there</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span className=''>Jane Doe</span>
                    <p className=''>????</p>
                </div>
            </div>
            <div className='item'>
                <img src='./avatar.png' alt='' />
                <div className='texts'>
                    <span className=''>Lucia C. Domingo</span>
                    <p className=''>👍</p>
                </div>
            </div>
            {addMode && (
                <AddUser />
            )}
        </div>
    )
};

export default ChatList;