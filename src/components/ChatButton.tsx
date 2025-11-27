'use client';
import { useState, useRef, useEffect, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatButton = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input }),
      });

      if (!response.ok) throw new Error('Chatbot request failed');

      const result = await response.json();
      const botMessage: Message = {
        text: result.output_text?.trim() || 'I did not catch that, please rephrase.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        text: 'Sorry, I am having trouble right now. Try again later.',
        sender: 'bot',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        className="bg-emerald-primary hover:bg-emerald-dark text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all hover:shadow-emerald-primary/50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
          />
        </svg>
      </button>

      {isPopoverOpen && (
        <div className="absolute bottom-20 right-0 w-72 md:w-80 h-96 bg-dark-bg rounded-2xl shadow-2xl flex flex-col border border-gray-700 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-primary via-emerald-dark to-golden p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">JoinQuran AI</h3>
                <p className="text-xs text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <a
                href="/JoinQuran_FAQ.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
                title="Download FAQ"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
              <button
                onClick={() => setIsPopoverOpen(false)}
                className="text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-[#162238] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
            {messages.map((message, i) => (
              <div key={i} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed shadow-md ${message.sender === 'user'
                    ? 'bg-gradient-to-br from-emerald-primary to-emerald-dark text-white rounded-tr-none'
                    : 'bg-dark-surface border border-gray-600 text-white rounded-tl-none'
                    }`}
                >
                  {message.sender === 'bot' && (
                    <p className="font-medium text-emerald-primary mb-1 text-xs uppercase tracking-wide">AI Assistant</p>
                  )}
                  <ReactMarkdown
                    components={{
                      a: (props: any) => (
                        <a {...props} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-medium break-all" />
                      ),
                      p: (props: any) => <p {...props} className="mb-1 last:mb-0" />,
                      ul: (props: any) => <ul {...props} className="list-disc pl-4 mb-2" />,
                      li: (props: any) => <li {...props} className="mb-0.5" />,
                      strong: (props: any) => <strong {...props} className="font-bold" />,
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-dark-surface border border-gray-600 p-3 rounded-2xl shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-emerald-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-600 bg-[#162238] shadow-inner">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about courses, fees..."
                disabled={isLoading}
                className="w-full pl-3 pr-10 py-2 text-xs bg-dark-surface text-white placeholder:text-text-muted border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-primary transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-gradient-to-r from-emerald-primary to-emerald-dark text-white rounded-full hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-3.5 h-3.5 transform rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] text-gray-400 mt-1.5">Powered by JoinQuran Institute</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatButton;
