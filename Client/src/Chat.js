import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons'
import InsertEmoticonIcon from  '@material-ui/icons/InsertEmoticon'
import MicIcon from  '@material-ui/icons/Mic'
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "./axios";
import './Chat.css'
import { useStateValue } from './StateProvider';


function Chat({ messages })
{
    const [input,setInput]=useState('');
    const [{ user }, dispatch] = useStateValue();
    const [groupname , setGroupName] = useState('');
    const { groupName }=useParams();
    
    useEffect(() => {
        setGroupName(groupName);
        

    } , [groupName]);


    const sendMessage =  (e)=> {
        e.preventDefault();
        
            axios.post('/messages/new',{
            message: input,
            name: user,
            timestamp: new Date().toUTCString(),
            group: groupname,
            received: false,

        });



        setInput("");
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{groupname}</h3>
                    <p>Last Seen at ...</p>
                </div>
                <div className="char__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                { messages.filter((message) => { return message.group === groupname}).map((message) => {
                    const classname= message.name === user ? "chat__message chat__reciever" : "chat__message";
                    return (<p className={classname} key={message.id}>
                        <span className="chat__name">{message.name}</span>
                        {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>)
                                        
                })

                }


            </div>
            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={
                        (e)=> setInput(e.target.value)
                    } placeholder="Type a message" type="text"></input>
                    <button onClick={sendMessage} type="Submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
            

        </div>
    )
}

export default Chat