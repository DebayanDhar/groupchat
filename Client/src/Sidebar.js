import { Avatar, IconButton } from '@material-ui/core'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import ChatIcon from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import SidebarChat from './SidebarChat.js'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import { useStateValue } from './StateProvider.js'
import axios from './axios'

function Sidebar({ messages })
{
    const [newGroup, setNewgroup]=useState("");
    const [allGroups, setAllgroups]=useState([]);
    const [{ user }, dispatch] = useStateValue();
    //console.log(messages);
    useEffect(() => {
        axios.get('/groups/sync')
        .then((response) => {setAllgroups(response.data)});
        //
    },[])
    //console.log(allGroups)
    const createGroup = (e) => {
        e.preventDefault();
        
        axios.post('/groups/new',{
            groupName : newGroup,
            createdBy : user,
        });
        setNewgroup("");

    }
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar/>
                <div className="sidebar__headerRight">
                    
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>

            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined/>
                    <form>
                    <input value={newGroup} placeholder="Search or start new chat" type="text" onChange={
                        (e) => {setNewgroup(e.target.value)}
                    }/>
                    <button onClick={createGroup} type="submit"></button>
                    </form>

                </div>

            </div>
            <div className="sidebar__chats">
                {allGroups.map((group)=>{
                    const tempArray=messages.filter((message) => {return message.group===group.groupName})
                    //const obj=tempArray.find((elem) => {return elem.group === group.groupName});
                    let msg=group.createdBy+" created this group";
                    if(tempArray)
                    msg=[tempArray.length-1].message;
                    //console.log(tempArray);
                    console.log(msg);
                    return (<SidebarChat groupName={group.groupName} lastMessage={msg} key={group.id}/>);

                })}
               
            </div>


        </div>
    )
}

export default Sidebar