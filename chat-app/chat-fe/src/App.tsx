import { useEffect, useRef, useState } from 'react'



function App() {

  const [messages, setMessages] = useState<string[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);



  useEffect(()=>{

    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event: MessageEvent) => {
      setMessages(prevMessages => [...prevMessages, event.data]);
    }

    wsRef.current = ws;


    ws.onopen=( )=>{
      ws.send(JSON.stringify({
        type: "join",
        payload:{
          roomId: "12345"
        }
      }))
    }
  },[])
 
  return (
    <>
    <div className='h-screen flex flex-col bg-black text-white font-mono'>
      {/* Header */}
      <div className='border-b border-gray-800 p-4'>
        <h1 className='text-xl font-light tracking-widest'>NION CHAT</h1>
        <div className='text-xs text-gray-500 mt-1'>Connected to room #12345</div>
      </div>

      {/* Messages Container */}
      <div className='flex-1 p-6 overflow-hidden'>
        <div className='h-full border border-gray-800 rounded-lg bg-gray-950 p-4 overflow-y-auto'>
          <div className='space-y-3'>
            {messages.length === 0 ? (
              <div className='text-center text-gray-600 mt-8'>
                <div className='inline-block w-2 h-2 bg-gray-600 rounded-full animate-pulse'></div>
                <div className='text-sm mt-2 tracking-wider'>AWAITING TRANSMISSION</div>
              </div>
            ) : (
              messages.map((m, idx) => (
                <div key={idx} className='group'>
                  <div className='flex items-start space-x-3'>
                  
                    <div className='flex-1'>
                      <div className='text-xs text-gray-500 mb-1'>
                        USER_{String(idx + 1).padStart(3, '0')} • 
                      </div>
                      <div className='bg-gray-900 border border-gray-800 rounded-lg p-3 text-sm font-light tracking-wide'>
                        {m}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className='border-t border-gray-800 p-4'>
        <div className='flex items-center space-x-3'>
          <div className='flex-1 relative'>
            <input 
              ref={messageInputRef} 
              type="text" 
              className='w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm font-light tracking-wide placeholder-gray-500 focus:outline-none focus:border-white focus:bg-black transition-all duration-200' 
              placeholder="Enter message"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  if (wsRef.current && messageInputRef.current) {
                    const message = messageInputRef.current.value.trim();
                    if (message) {
                      wsRef.current.send(JSON.stringify({
                        type: "chat",
                        payload: {
                          message: message
                        }
                      }));
                      messageInputRef.current.value = ''; 
                    }
                  }
                }
              }}
            />
            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-xs'>
              
            </div>
          </div>
          <button 
            onClick={() => {
              if (wsRef.current && messageInputRef.current) {
                const message = messageInputRef.current.value.trim();
                if (message) {
                  wsRef.current.send(JSON.stringify({
                    type: "chat",
                    payload: {
                      message: message
                    }
                  }));
                  messageInputRef.current.value = ''; 
                }
              }
            }} 
            className='bg-white text-black px-6 py-3 rounded-lg text-sm font-medium tracking-wider hover:bg-gray-200 transition-all duration-200 border border-gray-700'
          >
            SEND
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
