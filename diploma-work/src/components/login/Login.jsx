import {useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../../lib/firebase';
import upload from '../../lib/upload';
import {toast} from 'react-toastify';
import './login.css';

const Login = () => {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });

    const [loading, setLoading] = useState(false);

    const handleAvatar = e => {
        
        if (e.target.files[0]) {
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            });
        }

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const {email, password} = Object.fromEntries(formData);

        setLoading(true);

        try {

            await signInWithEmailAndPassword(auth, email, password);
            
            setLoading(false);
            toast.success('You successfully login!');
        } catch(err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    const handleRegister = async (e) => {

        e.preventDefault();

        const formData = new FormData(e.target);

        const {username, email, password} = Object.fromEntries(formData);

        setLoading(true);

        try {

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);

            await setDoc(doc(db, 'users', res.user.uid), {
                username,
                email,
                avatar: imgUrl,
                id: res.user.uid,
                blocked: [],
            });

            await setDoc(doc(db, 'userchats', res.user.uid), {
                chats: [],
            });

            setLoading(false);
            toast.success('Account created successfully!');
            
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }

    };

    return (
        <div className='login'>
            <div className='item'>
                <h2>Welcome back,</h2>
                <form onSubmit={handleLogin}>
                    <input type='text' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button disabled={loading}>{loading ? 'Loading...' : 'Sign In'}</button>
                </form>
            </div>
            <div className='separator'></div>
            <div className='item'>
                <h2>Create an </h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor='file'>
                        <img src={avatar.url || './avatar.png'} alt='' />
                        Upload Image
                    </label>
                    <input type='file' id='file' style={{display: 'none'}} onChange={handleAvatar} />
                    <input type='text' placeholder='Username' name='username' />
                    <input type='text' placeholder='Email' name='email' />
                    <input type='password' placeholder='Password' name='password' />
                    <button disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
                </form>
            </div>
        </div>
    );
};

export default Login;