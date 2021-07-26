import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Groups from './dbGroups.js'
import Pusher from 'pusher';
import cors from 'cors';
const app=express();
const port=process.env.PORT || 9000;
const connection_url = 'mongodb+srv://DebayanDhar:Debayan@51@cluster0.pcxsy.mongodb.net/groupchatDB?retryWrites=true&w=majority';
const pusher = new Pusher({
    appId: "1235759",
    key: "b2b3e5e9a33775e6e28b",
    secret: "b3ecaa57435037676a5a",
    cluster: "ap2",
    useTLS: true
  });
  
app.use(express.json());//middleware
app.use(cors());

mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.once('open',()=>{ //once the connection between server and DB is established execute this callback
    console.log('DB is connected');
    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log(change);

        if(change.operationType === 'insert')
        {
            const messageDetails = change.fullDocument;//data from the change stream
            pusher.trigger('messages','inserted',//changes are pushed into the pusher
            {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                group: messageDetails.group,
                received: messageDetails.received,
            });
        }
        else
        console.log("Error triggering pusher");
    });
});

app.get('/',(req,res)=> res.status(200).send("hello world"));

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err)
        res.status(500).send(err);
        else
        res.status(200).send(data);
    });
});
app.get('/groups/sync',(req,res)=>{
    Groups.find((err,data)=>{
        if(err)
        res.status(500).send(err);
        else
        res.status(200).send(data);
    });
});

app.post('/messages/new', (req,res)=>{
    const dbMessage = req.body;

    Messages.create(dbMessage,(err,data)=>{
        if(err)
        res.status(500).send(err)
        else
        res.status(201).send(data);
    });
});

app.post('/groups/new', (req,res)=>{
    const dbGroup = req.body;

    Groups.create(dbGroup,(err,data)=>{
        if(err)
        res.status(500).send(err)
        else
        res.status(201).send(data);
    });
});
app.listen(port,()=>console.log('Listening on localhost: '+port));