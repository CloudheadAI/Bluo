import { useState, useEffect } from 'react';
import type { Conversation } from '../../types';
import { messages as messagesApi } from '../../services/api';
import { Avatar, LoadingSpinner, EmptyState } from '../common';

export function MessageList() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConv, setSelectedConv] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    messagesApi.conversations().then((data) => {
      setConversations(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (conversations.length === 0) {
    return (
      <EmptyState
        icon="💬"
        title="No messages yet"
        description="Start a conversation with someone!"
      />
    );
  }

  const selected = conversations.find((c) => c.id === selectedConv);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex h-[500px]">
        {/* Conversation list */}
        <div
          className={`w-full md:w-80 border-r border-gray-100 overflow-y-auto ${
            selectedConv ? 'hidden md:block' : ''
          }`}
        >
          <div className="p-4 border-b border-gray-50">
            <h2 className="font-semibold text-gray-900">Messages</h2>
          </div>
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConv(conv.id)}
              className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                selectedConv === conv.id ? 'bg-blue-50' : ''
              }`}
              aria-label={`Conversation with ${conv.participant.displayName}`}
            >
              <Avatar name={conv.participant.displayName} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm text-gray-900 truncate">
                    {conv.participant.displayName}
                  </p>
                  {conv.unreadCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 truncate">{conv.lastMessage.content}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className={`flex-1 flex flex-col ${!selectedConv ? 'hidden md:flex' : 'flex'}`}>
          {selected ? (
            <>
              <div className="p-4 border-b border-gray-50 flex items-center gap-3">
                <button
                  onClick={() => setSelectedConv(null)}
                  className="md:hidden text-gray-500"
                  aria-label="Back to conversations"
                >
                  ←
                </button>
                <Avatar name={selected.participant.displayName} size="sm" />
                <p className="font-semibold text-sm text-gray-900">
                  {selected.participant.displayName}
                </p>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex flex-col gap-2">
                  <div className="self-start bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2 max-w-[70%]">
                    <p className="text-sm text-gray-800">{selected.lastMessage.content}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-50">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    aria-label="Type a message"
                  />
                  <button
                    onClick={() => setMessageText('')}
                    disabled={!messageText.trim()}
                    className="bg-blue-500 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-600 disabled:opacity-50 transition-colors"
                    aria-label="Send message"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
