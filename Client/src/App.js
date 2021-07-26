import './App.css';
import Sidebar from './Sidebar.js'; 
import Chat from './Chat.js'; 
import Pusher from 'pusher-js';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect, useState} from 'react';
import axios from './axios.js'
import Login from './Login';
import { useStateValue } from './StateProvider';


function AppBody({ messages })
{

  return(
    <div className="app_body">
        <Router>
          <Sidebar messages={messages}/>
            <Switch>
              <Route path="/group/:groupName">
                <Chat messages={messages}/>
              </Route>
              <Route path="/">
                
              </Route>
            
            </Switch>
        </Router>

      </div>
      

  )
}



function App() {

  const [messages, setMessages] = useState([]);


  useEffect(() => {
    
    
      axios.get('/messages/sync')
      .then(response => {
        
        setMessages(response.data);
      })
  }, [])
  useEffect(()=>{
    
    const pusher = new Pusher('b2b3e5e9a33775e6e28b', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {//pusher triggering the front end
      
      setMessages([...messages, newMessage])
    });
    
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }


  }, [messages]);


 

  const [{ user }, dispatch] = useStateValue();
  return (
    
    <div className="app">
      {!user ? <Login/> : <AppBody messages={messages}/>}
      
    </div>
    
    
  );
}

export default App;
