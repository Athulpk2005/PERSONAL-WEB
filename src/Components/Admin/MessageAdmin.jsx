import React, { useState, useEffect } from 'react';
import { db, collection, getDocs, doc, updateDoc, serverTimestamp } from '../../services/firebase';
import { Mail, Clock, Check, X, Eye } from 'lucide-react';

const MessageAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages from Firebase...');
      const querySnapshot = await getDocs(collection(db, 'messages'));
      console.log('Messages fetched:', querySnapshot.docs.length);
      
      const messagesData = querySnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          // Sort by timestamp (newest first)
          if (a.timestamp && b.timestamp) {
            return b.timestamp.toDate() - a.timestamp.toDate();
          }
          return 0;
        });
      
      console.log('Processed messages:', messagesData);
      setMessages(messagesData);
      setLoading(false);
    } catch (err) {
      console.error('Detailed error fetching messages:', err);
      setError(`Failed to fetch messages: ${err.message}`);
      setLoading(false);
    }
  };

  const markAsRead = async (messageId) => {
    try {
      await updateDoc(doc(db, 'messages', messageId), {
        status: 'read',
        readAt: serverTimestamp()
      });
      fetchMessages(); // Refresh the list
    } catch (err) {
      setError('Failed to update message status');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'No date';
    return timestamp.toDate().toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading messages...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Message Admin</h1>
          <p className="text-white/60">Manage contact form submissions</p>
        </div>

        <div className="grid gap-4">
          {messages.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <Mail className="w-12 h-12 text-white/40 mx-auto mb-4" />
              <p className="text-white/60">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`bg-white/5 border border-white/10 rounded-xl p-6 ${
                  message.status === 'unread' ? 'border-primary/30' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{message.name}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        message.status === 'unread' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-white/10 text-white/60'
                      }`}>
                        {message.status === 'unread' ? 'Unread' : 'Read'}
                      </span>
                    </div>
                    <a 
                      href={`mailto:${message.email}`}
                      className="text-primary hover:underline text-sm"
                    >
                      {message.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-white/40 text-sm">
                    <Clock className="w-4 h-4" />
                    {formatDate(message.timestamp)}
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-white/80 whitespace-pre-wrap">{message.message}</p>
                </div>

                <div className="flex justify-end">
                  {message.status === 'unread' && (
                    <button
                      onClick={() => markAsRead(message.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition"
                    >
                      <Eye className="w-4 h-4" />
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchMessages}
            className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition"
          >
            Refresh Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageAdmin;
