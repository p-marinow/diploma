import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useUserStore} from '../../../lib/userStore';
import {useChatStore} from '../../../lib/chatStore';
import {db} from '../../../lib/firebase';
import AddUser from './addUser/AddUser';
import {onSnapshot, doc, getDoc, updateDoc} from 'firebase/firestore';
import './chatList.css';

const ChatList = () => {

    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState("");

    const {currentUser} = useUserStore();
    const {changeChat, isCurrentUserBlocked, isReceiverBlocked} = useChatStore();

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

    const handleOpenChat = async chat => {

        const userChats = chats.map(item => {
            const {user, ...rest} = item;
            return rest;
        });

        const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

        userChats[chatIndex].isSeen = true;

        const userChatsRef = doc(db, 'userchats', currentUser.id);

        try {
            await updateDoc(userChatsRef, {
                chats: userChats,
              });
              changeChat(chat.chatId, chat.user);
        } catch(err) {
            toast.error('Can not open a chat!');
        }
    };

    const handleChange = e => setInput(e.target.value)

    const filteredChats = chats.filter((c) =>
        c.user.username.toLowerCase().includes(input.toLowerCase())
    );

    return (
        <div className='chatList'>
            <div className='search'>
                <div className='searchBar'>
                    <img src='./search.png' alt='' />
                    <input type='text' placeholder='Search' onChange={handleChange} />
                </div>
                <img 
                    src={addMode ? './minus.png' : './plus.png'} 
                    alt=''
                    className='add'
                    onClick={handleChangeAddMode}
                />
            </div>

            {filteredChats.map(chat => (
                <div 
                    className='item' 
                    key={chat.chatId} 
                    onClick={() => handleOpenChat(chat)}
                    style={{
                        backgroundColor: chat?.isSeen ? 'transparent' : '#5183fe'
                    }}
                >
                    <img src={isCurrentUserBlocked || isReceiverBlocked || chat.user.avatar ?  './avatar.png' : chat.user.avatar} alt='' />
                    <div className='texts'>
                        <span className=''>
                            {(isCurrentUserBlocked || isReceiverBlocked) ? 'User' : chat.user.username}</span>
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