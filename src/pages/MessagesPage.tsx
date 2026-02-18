import { MessageList } from '../components/messages/MessageList';

export function MessagesPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Messages</h1>
      <MessageList />
    </div>
  );
}
