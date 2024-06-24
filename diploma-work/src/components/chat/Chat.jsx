import {useEffect, useState, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import {useChatStore} from '../../lib/chatStore';
import {useUserStore} from '../../lib/userStore';
import upload from '../../lib/upload';
import {db} from '../../lib/firebase';
import './chat.css';

const Chat = () => {

    const [chat, setChat] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');
    const [img, setImg] = useState({
        file: null,
        url: '',
    });

    
    const {currentUser} = useUserStore();
    const {chatId, user} = useChatStore();

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: 'smooth'})
    }, []);

    useEffect(() => {

        const unSub = onSnapshot(doc(db, 'chats', chatId), res => {
            setChat(res.data());
        });

        return () => {
            unSub();
        };

    }, [chatId]);

    const handleOpenEmoji = () => setIsOpen(!isOpen);

    const handleChangeText = e => setText(e.target.value);

    const handleEmoji = e =>  setText(prevText => prevText + e.emoji);

    const handleSendMessage = async () => {
        if (!text) return;

        let imgUrl = null;

        try {
            if (img.file) {
                imgUrl = await upload(img.file);
            }

            await updateDoc(doc(db, 'chats', chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text,
                    createdAt: new Date(),
                    ...(imgUrl && { img: imgUrl }),
                }),
            });

            const userIDs = [currentUser.id, user.id];

            userIDs.forEach(async id => {
                const userChatsRef = doc(db, 'userchats', id);
                const userChatsSnapshot = await getDoc(userChatsRef);

                if (userChatsSnapshot.exists()) {
                    const userChatsData = userChatsSnapshot.data();

                    const chatIndex = userChatsData.chats.findIndex(
                        c => c.chatId === chatId
                    );

                    userChatsData.chats[chatIndex].lastMessage = text;
                    userChatsData.chats[chatIndex].isSeen =
                    id === currentUser.id ? true : false;
                    userChatsData.chats[chatIndex].updatedAt = Date.now();

                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    });
                }
            });
        } catch (err) {
            console.log(err);
        } finally{
            setImg({
                file: null,
                url: '',
            });

            setText('');
        }
    }

    return (
        <div className='chat'>
            <div className='top'>
                <div className='user'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <span>Jane Doe</span>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className='icons'>
                    <img src='./phone.png' alt='' />
                    <img src='./video.png' alt='' />
                    <img src='./info.png' alt='' />
                </div>
            </div>
            <div className='center'>

                {chat?.messages?.map(message => (
                    <div className='message' key={message.createAt}>
                        <img src='./avatar.png' alt='' />
                        <div className='texts'>
                            {message.img && (
                                <img src='./avatar.png' alt='' />
                            )}
                            <p>
                                {message.text}
                            </p>
                            <span>{message.createAt}</span>
                        </div>
                    </div>
                ))}

                <div ref={endRef}></div>
            </div>
            <div className='bottom'>
                <div className='icons'>
                    <img src='./img.png' alt='' />
                    <img src='./camera.png' alt='' />
                    <img src='./mic.png' alt='' />
                </div>
                <input 
                    type='text' 
                    value={text}
                    placeholder='Type a message...'
                    onChange={handleChangeText}
                    onFocus={handleOpenEmoji} 
                />
                <div className='emoji'>
                    <img src='./emoji.png' alt='' onClick={handleOpenEmoji}/>
                    <div className='picker'>
                        {isOpen && (
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        )}
                    </div>
                </div>

                <button 
                    className='sendButton'
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div> 
    );
};

export default Chat;