import './App.css';
import { useState } from 'react';
import NotificationList from './components/NotificationList'
import EventTrigger from './components/EventTrigger'

function App() {
    const [currentTargetUser, setCurrentTargetUser] = useState("");

  return (
    <div className="container">
      <h1 className='main-heading'>Insyd Notification POC 🚀</h1>
      <EventTrigger setCurrentTargetUser={setCurrentTargetUser} />
      <NotificationList targetUserId={currentTargetUser} />
    </div>
  );
}

export default App;

