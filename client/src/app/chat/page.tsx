'use client';

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';

let socket: any;

export default function Chat() {
  const [messages, setMessages] = useState<Array<{id?: string; text: string; sender?: string; createdAt?: string; isMe?: boolean;}>>([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load username from localStorage or prompt
    const stored = localStorage.getItem('chat_username');
    if (stored) setUsername(stored);
    else {
      const name = window.prompt('Enter a display name for chat (e.g. Guest123)') || `Guest-${Math.random().toString(36).slice(2,6)}`;
      localStorage.setItem('chat_username', name);
      setUsername(name);
    }

    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000';
    socket = io(socketUrl, { transports: ['websocket'] });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));

    socket.on('receiveMessage', (msg: any) => {
      setMessages(prev => [...prev, { id: msg.id, text: msg.text, sender: msg.sender, createdAt: msg.createdAt, isMe: msg.sender === username }]);
    });

    return () => socket.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load recent messages from API on mount
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data.map((m: any) => ({ id: m._id, text: m.text, sender: m.sender, createdAt: m.createdAt, isMe: m.sender === username })));
      } catch (err) { console.error(err); }
    }
    load();
  }, [username]);

  const send = () => {
    if (!input.trim() || !username) return;
    const msg = { text: input, sender: username };
    socket.emit('sendMessage', msg);
    setMessages(prev => [...prev, { text: input, sender: username, isMe: true, createdAt: new Date().toISOString() }]);
    setInput('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl h-[80vh] bg-gray-950 border-purple-800 flex flex-col">
        <div className="p-6 border-b border-purple-800 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-purple-400">Live Chat with Zohaib Ali</h1>
          <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>

        <ScrollArea className="flex-1 p-6">
          {messages.map((m, i) => (
            <div key={m.id || i} className={`mb-4 flex ${m.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs px-4 py-2 rounded-2xl ${m.isMe ? 'bg-purple-600' : 'bg-gray-800'}`}>
                <div className="text-xs text-gray-400 mb-1">{m.sender || 'Guest'} • {m.createdAt ? new Date(m.createdAt).toLocaleTimeString() : ''}</div>
                <div>{m.text}</div>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </ScrollArea>

        <div className="p-6 border-t border-purple-800 flex gap-3">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Type a message..."
            className="bg-gray-900 border-gray-700"
          />
          <Button onClick={send} className="bg-purple-600 hover:bg-purple-700">
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </Card>
    </div>
  );
}