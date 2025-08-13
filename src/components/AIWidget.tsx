"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Bot, Send, Sparkles, X, MessageCircle, Lightbulb, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIWidgetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMaximize?: () => void
}

export function AIWidget({ open, onOpenChange, onMaximize }: AIWidgetProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hi! I'm your AI assistant. I can suggest platform improvements for your legal practice. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "FIDIC tools",
        "M&A workflows", 
        "Document automation",
        "Client experience"
      ]
    }
  ])
  
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes("fidic") || lowerMessage.includes("construction")) {
      return {
        content: "For construction law: I suggest FIDIC clause library, milestone tracking, and progress documentation tools.",
        suggestions: ["FIDIC automation", "Progress tracking", "Document templates"]
      }
    }
    
    if (lowerMessage.includes("m&a") || lowerMessage.includes("merger")) {
      return {
        content: "For M&A: We could add due diligence checklists, data room tools, and transaction timelines.",
        suggestions: ["Due diligence", "Deal rooms", "Compliance tools"]
      }
    }
    
    if (lowerMessage.includes("document") || lowerMessage.includes("template")) {
      return {
        content: "For documents: Smart contract drafting, automated review, and multi-language templates would help.",
        suggestions: ["Smart templates", "Auto review", "Language support"]
      }
    }
    
    return {
      content: "I can help customize the platform for Khirfan & Partners! What area interests you most?",
      suggestions: ["Construction tools", "M&A features", "Client portal", "Automation"]
    }
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        suggestions: aiResponse.suggestions,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1000)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, x: 300, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 300, y: 20 }}
          className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/20 dark:to-purple-900/20">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-sm">AI Assistant</div>
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Online
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {onMaximize && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMaximize}
                  className="h-7 w-7 p-0"
                >
                  <Maximize2 className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-7 w-7 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[85%] rounded-lg p-3 text-sm ${
                  message.type === "user" 
                    ? "bg-cyan-600 text-white" 
                    : "bg-gray-100 dark:bg-gray-800"
                }`}>
                  {message.type === "assistant" && (
                    <div className="flex items-center gap-1 mb-1 text-cyan-600 dark:text-cyan-400">
                      <Sparkles className="h-3 w-3" />
                      <span className="text-xs font-medium">AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{message.content}</div>
                  {message.suggestions && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded-md border border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-1"
                        >
                          <Lightbulb className="h-2.5 w-2.5" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                  <div className="flex items-center gap-1 mb-1 text-cyan-600 dark:text-cyan-400">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-xs font-medium">AI</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 text-sm"
              />
              <Button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="px-3"
              >
                <Send className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}