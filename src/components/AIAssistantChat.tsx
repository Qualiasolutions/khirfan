"use client"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from "@/components/ui/Dialog"
import { Bot, Send, Sparkles, X, MessageCircle, Lightbulb, Settings } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

interface AIAssistantChatProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AIAssistantChat({ open, onOpenChange }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Hello! I'm your AI assistant for Khirfan & Partners Command Center. I can help suggest platform improvements, customize features for your legal practice, or discuss enhancements for construction law, M&A, and dispute resolution workflows. What would you like to explore?",
      timestamp: new Date(),
      suggestions: [
        "FIDIC contract templates",
        "Construction dispute workflows", 
        "M&A due diligence automation",
        "Jordanian legal research tools"
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
        content: "Great! For construction law expertise, I suggest adding:\n\n• FIDIC contract clause library with AI-powered selection\n• Construction milestone tracking with automated alerts\n• Dispute resolution timeline templates\n• Progress photo documentation system\n• Variation order approval workflows\n\nThese would leverage Hazem Khirfan's FIDIC expertise and streamline your construction practice.",
        suggestions: ["Progress tracking system", "FIDIC clause automation", "Construction document templates"]
      }
    }
    
    if (lowerMessage.includes("m&a") || lowerMessage.includes("merger") || lowerMessage.includes("acquisition")) {
      return {
        content: "Excellent! For M&A transactions, we could enhance the platform with:\n\n• Automated due diligence checklists\n• Data room organization tools\n• Transaction timeline management\n• Regulatory compliance tracking for Jordan\n• Cross-border transaction workflows\n• Client communication portals for deal updates\n\nThis would strengthen your Tier 2 Commercial/Corporate practice significantly.",
        suggestions: ["Due diligence automation", "Deal room setup", "Regulatory compliance tools"]
      }
    }
    
    if (lowerMessage.includes("dispute") || lowerMessage.includes("litigation") || lowerMessage.includes("arbitration")) {
      return {
        content: "Perfect for your Tier 2 Dispute Resolution practice! I recommend:\n\n• Case strategy development tools\n• Evidence management system\n• Arbitration timeline tracking\n• Witness statement templates\n• Settlement negotiation trackers\n• Court filing automation for Jordan\n• Multi-language document handling (Arabic/English)\n\nThese tools would enhance your already strong dispute resolution capabilities.",
        suggestions: ["Case strategy tools", "Evidence management", "Settlement tracking"]
      }
    }
    
    if (lowerMessage.includes("client") || lowerMessage.includes("communication")) {
      return {
        content: "For enhanced client experience, matching your 'high level of professionalism':\n\n• Personalized client portals\n• Automated case status updates\n• Multi-language client communications\n• Meeting scheduling with calendar integration\n• Document sharing with secure access\n• Client satisfaction tracking\n• Billing transparency tools\n\nThis would maintain your boutique firm's personalized touch while improving efficiency.",
        suggestions: ["Client portal design", "Automated updates", "Satisfaction tracking"]
      }
    }
    
    if (lowerMessage.includes("document") || lowerMessage.includes("template") || lowerMessage.includes("drafting")) {
      return {
        content: "For document automation tailored to your practice:\n\n• Smart contract drafting with firm-specific clauses\n• Automated legal document review\n• Template library for commercial agreements\n• Multi-language document generation (Arabic/English)\n• Version control and collaboration tools\n• Regulatory compliance checking for Jordan\n\nThis could reduce drafting time by 40-70% while maintaining quality.",
        suggestions: ["Smart templates", "Review automation", "Compliance checking"]
      }
    }
    
    if (lowerMessage.includes("workflow") || lowerMessage.includes("automation") || lowerMessage.includes("process")) {
      return {
        content: "For workflow optimization across your practice areas:\n\n• Custom case management workflows\n• Automated deadline tracking and alerts\n• Resource allocation optimization\n• Integration with existing legal software\n• Performance analytics and reporting\n• Cost-effective process automation\n\nThis would help scale your boutique practice while maintaining service quality.",
        suggestions: ["Process mapping", "Deadline automation", "Performance tracking"]
      }
    }
    
    if (lowerMessage.includes("research") || lowerMessage.includes("legal research")) {
      return {
        content: "For enhanced legal research capabilities:\n\n• AI-powered Jordanian law research\n• Cross-jurisdictional case law analysis\n• Regulatory change monitoring\n• Citation verification and updating\n• Precedent discovery tools\n• International law research integration\n\nThis would significantly speed up research while ensuring comprehensive coverage.",
        suggestions: ["Jordan law database", "Citation tools", "Precedent finder"]
      }
    }
    
    // Default response
    return {
      content: "I can help you customize the platform for Khirfan & Partners! Here are some areas where we could add specialized features:\n\n• Construction Law tools (FIDIC expertise)\n• M&A transaction workflows\n• Dispute resolution case management\n• Client communication enhancements\n• Document automation for your practice\n• Legal research tools for Jordan\n\nWhat specific area interests you most?",
      suggestions: ["Construction law tools", "M&A workflows", "Client experience", "Document automation"]
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

    // Simulate AI thinking time
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
    }, 1500)
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader onClose={() => onOpenChange(false)}>
          <DialogTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-5 w-5 text-white" />
            </div>
            AI Assistant for Khirfan & Partners
            <div className="ml-auto flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Online
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <DialogBody className="flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === "user" 
                      ? "bg-cyan-600 text-white" 
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  } rounded-lg p-4 shadow-sm`}>
                    {message.type === "assistant" && (
                      <div className="flex items-center gap-2 mb-2 text-cyan-600 dark:text-cyan-400">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-xs font-medium">AI Assistant</span>
                      </div>
                    )}
                    <div className="whitespace-pre-line text-sm">{message.content}</div>
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors"
                          >
                            <Lightbulb className="h-3 w-3 mr-1 inline" />
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-xs font-medium">AI Assistant</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about platform customizations for your legal practice..."
                className="flex-1"
              />
              <Button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="px-4"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Suggest improvements for construction law, M&A, dispute resolution, or general practice management
            </div>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}