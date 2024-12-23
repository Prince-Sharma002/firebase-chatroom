// import { useEffect, useState } from "react";
// import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore'
// import { auth, db } from "../firebase-config";
// import "../styles/Chat.css";
// import '@fortawesome/fontawesome-free/css/all.css';

// export const Chat = ({room}) => {
//     const [newMessage, setNewMessage] = useState("")
//     const [messages, setMessages] = useState([])

//     const messagesRef = collection(db, "messages")

//     useEffect(() => {
//         const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"))
//         const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
//             let messages = []
//             snapshot.forEach((doc) => {
//                 messages.push({...doc.data(), id: doc.id})
//             })
 
//             setMessages(messages)
//         })

//         return () => unsubscribe()
//     }, [])

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         if(newMessage === "") return;

//         await addDoc(messagesRef, {
//             text: newMessage,
//             createdAt: serverTimestamp(),
//             user: "prince",
//             room,
//         })

//         setNewMessage("")
//     }

//     return (
//         <div className="chat-app">
//             <div className="header"> 
//                 <h1>Community of Handicap</h1> 
//             </div>
//             <div className="namecontainer">
//   <div className="Left-container">{room}</div>
//   <div className="video-icon"><i className="fas fa-video"></i></div>
// </div>

//             <div className="messages">
//                 {messages.map((message) => 
//                     <div className="message" key={message.id}>
//                         <span className="user">{message.user}:</span>
//                         <div className="content">
//                         <div class="contentmessage">{message.text}</div>
//                         </div>
                        
//                     </div>
//                 )}
//             </div>

//             <form className="new-message-form" onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     className="new-message-input" 
//                     placeholder="Type your message here..." 
//                     onChange={(e) => setNewMessage(e.target.value)}
//                     value={newMessage}
//                 />
//                 <button className="send-button" type="submit">Send</button>
//             </form>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";
import '@fortawesome/fontawesome-free/css/all.css';

export const Chat = ({room}) => {
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const messagesRef = collection(db, "messages");

    useEffect(() => {
        const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            let messages = [];
            snapshot.forEach((doc) => {
                messages.push({...doc.data(), id: doc.id});
            });
 
            setMessages(messages);
        });

        return () => unsubscribe();
    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage === "") return;

        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: "prince",
            room,
        });

        setNewMessage("");
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp.seconds * 1000);
        return date.toLocaleString();
    };

    return (
        <div className="chat-app">
            <div className="header"> 
                <h1>SegMap ChatRoom</h1> 
            </div>
            <div className="namecontainer">
                <div className="Left-container"> Room Name  :  {room}</div>
                <div className="video-icon"><i className="fas fa-video"></i></div>
            </div>

            <div className="messages">
                {messages.map((message) => 
                    <div style={{display:"flex" , alignContent:"center" , alignItems : "center"}} className="message" key={message.id}>
                        <span className="user">{message.user}:</span>
                            <div className="timestamp" style={{marginRight:"1rem"}}>{formatDate(message.createdAt)}  </div>

                         
                        <div className="content">
                            <div className="contentmessage">{message.text}</div>
                        </div>
                    </div>
                )}
            </div>

            <form className="new-message-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    className="new-message-input" 
                    placeholder="Type your message here..." 
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                />
                <button className="send-button" type="submit">Send</button>
            </form>
        </div>
    );
};
