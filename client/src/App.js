import Users from './components/Users.jsx'
import ChatModule from './components/ChatModule.jsx';
import Sidebar from './components/Sidebar.jsx';

function App() {
  return (
    <>
      <div className='flex'>
        <Sidebar />
        <Users />
        <ChatModule />
      </div>
    </>
  );
}

export default App;
