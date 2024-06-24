import {useEffect, useState} from 'react';
import './chatList.css';
import {useUserStore} from '../../../lib/userStore';
import {useChatStore} from '../../../lib/chatStore';
import {db} from '../../../lib/firebase';
import AddUser from './addUser/AddUser';
import {onSnapshot, doc, getDoc} from 'firebase/firestore';

const ChatList = () => {

    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);

    const {currentUser} = useUserStore();
    const {changeChat} = useChatStore();

    useEffect(() => {

        const unSub = onSnapshot(doc(db, 'userchats', currentUser.id), async res => {
            const items = res.data().chats;

            const promises = items.map(async item => {
                const userDocRef = doc(db, 'users', item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return {
                    ...item,
                    user
                };

            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));

        });

        return () => {
            unSub();
        };

    }, [currentUser.id]);

    const handleChangeAddMode = () => setAddMode(!addMode);

    const handleOpenChat = async chat => changeChat(chat.chatId, chat.user);

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

            {chats.map(chat => (
                <div className='item' key={chat.chatId} onClick={() => handleOpenChat(chat)}>
                    <img src={chat.user.avatar || './avatar.png'} alt='' />
                    <div className='texts'>
                        <span className=''>{chat.user.username}</span>
                        <p className=''>{chat.lastMassage}</p>
                    </div>
                </div>
            ))}

            {addMode && (
                <AddUser />
            )}
        </div>
    )
};

export default ChatList;