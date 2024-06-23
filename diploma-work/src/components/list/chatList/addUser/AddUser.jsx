import './addUser.css';

const AddUser = () => {
  
    const handleSearch = async (e) => {
        
    };
  
    const handleAdd = async () => {
    
    };
  
    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input type='text' placeholder='Username' name='username' />
                <button>Search</button>
            </form>
            <div className='user'>
                <div className='detail'>
                    <img src={'./avatar.png'} alt='' />
                    <span>Jane Doe</span>
                </div>
                <button onClick={handleAdd}>Add User</button>
            </div>
        </div>
      );
};

export default AddUser;