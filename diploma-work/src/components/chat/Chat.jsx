import {useEffect, useState, useRef} from 'react';
import EmojiPicker from 'emoji-picker-react';
import './chat.css';

const Chat = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [text, setText] = useState('');

    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({behavior: 'smooth'})
    }, []);

    const handleOpenEmoji = () => setIsOpen(!isOpen);

    const handleChangeText = e => setText(e.target.value);

    const handleEmoji = e =>  setText(prevText => prevText + e.emoji);

    return (
        <div className='chat' ref={endRef}>
            <div className='top'>
                <div className='user'>
                    <img src='./avatar.png' alt='' />
                    <div className="texts">
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
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message'>
                    <img src='./avatar.png' alt='' />
                    <div className='texts'>
                        <img src='https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp' alt='' />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='texts'>
                        <img src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' alt='' />
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className='message own'>
                    <div className='texts'>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit libero deleniti autem obcaecati. 
                            Reprehenderit, impedit? Optio consequatur dolorem deleniti, assumenda necessitatibus unde aliquam officia sequi beatae odio a veritatis non.
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
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
                <div className="emoji">
                    <img src='./emoji.png' alt='' onClick={handleOpenEmoji}/>
                    <div className="picker">
                        {isOpen && (
                            <EmojiPicker onEmojiClick={handleEmoji} />
                        )}
                    </div>
                </div>

                <button className='sendButton'>Send</button>
            </div>
        </div> 
    );
};

export default Chat;