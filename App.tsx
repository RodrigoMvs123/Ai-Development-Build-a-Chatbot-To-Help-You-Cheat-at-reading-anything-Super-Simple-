import * as React from "react";

interface Message {
    question: string;
    response: string;
}

const App () => {
    const [ text, setText ] = React.useState<string>("")
    const [ messages, setMessages ] = React.useState<Message[]>([])

    const.getResponse = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/database/${text}`)
            const data = await response.json()
            setMessages([...messages, {
                question: text,
                response: data.content
            }])
        } catch (error) {
            console.error(error)
        }
        
    }
 
    return (
        <div className="chat-bot">
             <div className="header">
                  <div className="info-container">
                       <h3>Chat with</h3>
                       <h2>https://www.compart.com/en/unicode/U+25D3 BookBot</h2>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                      <path fill="#5000ca" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,192C672,203,768,245,864,224C960,203,1056,117,1152,80C1248,43,1344,53,1392,58.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                  </svg>
             </div>
             <div className="feed">
                  {messages.map( (message, _index) => 
                     <div key={_index}>
                        <div className="question bubble">{message.question}</div>
                        <div className="response bubble">{message.response}</div>
                     </div>
                  )}
             </div>
             <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
             />
             <button onClick={getResponse}>https://www.compart.com/en/unicode/U+21E8</button>
        </div>
    )
}

export default App
