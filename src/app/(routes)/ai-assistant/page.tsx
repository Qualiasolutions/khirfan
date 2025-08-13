"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Bot, Send, Sparkles, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  suggestions?: string[]
}

export default function AIAssistantPage() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content: "Welcome to the full AI Assistant interface! I'm here to help you customize and enhance the Khirfan & Partners Command Center platform. I can suggest improvements for construction law, M&A transactions, dispute resolution, client management, and more.\n\nWhat aspect of your legal practice would you like to enhance?",
      timestamp: new Date(),
      suggestions: [
        "FIDIC contract automation",
        "M&A due diligence workflows",
        "Client communication portal",
        "Document automation tools",
        "Performance analytics",
        "Regulatory compliance tracking"
      ]
    }
  ]);
  
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage: string): { content: string; suggestions?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("fidic") || lowerMessage.includes("construction")) {
      return {
        content: "Excellent choice for construction law enhancement! Here's what I recommend for Khirfan & Partners' FIDIC expertise:\n\n🏗️ **FIDIC Contract Management**\n• AI-powered clause selection based on project type\n• Contract comparison tools for different FIDIC editions\n• Risk assessment matrix for construction projects\n\n📊 **Project Tracking**\n• Construction milestone management with automated alerts\n• Progress photo documentation with AI categorization\n• Weather delay tracking and documentation\n\n⚖️ **Dispute Prevention**\n• Early warning system templates\n• Variation order approval workflows\n• Claims preparation assistance\n\nThese tools would leverage Hazem Khirfan's deep FIDIC expertise and help streamline your construction practice significantly.",
        suggestions: ["Progress tracking system", "FIDIC clause automation", "Construction document templates", "Risk assessment tools"]
      };
    }
    
    if (lowerMessage.includes("m&a") || lowerMessage.includes("merger") || lowerMessage.includes("acquisition")) {
      return {
        content: "Perfect for enhancing your M&A capabilities! Here are comprehensive suggestions:\n\n📋 **Due Diligence Automation**\n• Automated checklist generation based on transaction type\n• Document request list templates for different sectors\n• Red flag detection in financial documents\n\n🏢 **Transaction Management**\n• Deal timeline tracking with milestone alerts\n• Stakeholder communication portals\n• Regulatory approval tracking for Jordan and cross-border deals\n\n📊 **Data Room Organization**\n• Intelligent document categorization\n• Access control and audit trails\n• Integration with international legal platforms\n\nThis would significantly strengthen your Tier 2 Commercial/Corporate practice and help manage complex transactions more efficiently.",
        suggestions: ["Due diligence automation", "Deal room management", "Regulatory compliance", "Cross-border workflows"]
      };
    }
    
    if (lowerMessage.includes("dispute") || lowerMessage.includes("litigation") || lowerMessage.includes("arbitration")) {
      return {
        content: "Excellent focus on dispute resolution! Here's how we can enhance your capabilities:\n\n⚖️ **Case Strategy Development**\n• AI-assisted case law research for Jordan and international precedents\n• Strategy development templates by dispute type\n• Risk assessment and outcome prediction tools\n\n📁 **Evidence Management**\n• Digital evidence cataloging and organization\n• Timeline reconstruction tools\n• Witness statement management system\n\n🤝 **Alternative Dispute Resolution**\n• Mediation and arbitration workflow templates\n• Settlement negotiation tracking\n• Multi-language document handling (Arabic/English)\n\nThese tools would complement your existing Tier 2 expertise and help manage complex disputes more effectively.",
        suggestions: ["Case strategy tools", "Evidence management", "Settlement tracking", "Multi-language support"]
      };
    }
    
    if (lowerMessage.includes("client") || lowerMessage.includes("communication") || lowerMessage.includes("portal")) {
      return {
        content: "Great focus on client experience! Here's how to enhance communication while maintaining your boutique firm's personal touch:\n\n👥 **Personalized Client Portals**\n• Individual dashboards with case status and documents\n• Secure messaging with real-time notifications\n• Appointment scheduling with calendar integration\n\n📱 **Communication Enhancement**\n• Multi-language support (Arabic/English) for all communications\n• Automated status updates at key milestones\n• Client satisfaction surveys and feedback collection\n\n💼 **Service Excellence**\n• Matter cost tracking and billing transparency\n• Document sharing with version control\n• Meeting summaries and action item tracking\n\nThis would help maintain your 'high level of professionalism' while improving efficiency.",
        suggestions: ["Client portal design", "Multi-language communication", "Automated updates", "Satisfaction tracking"]
      };
    }
    
    if (lowerMessage.includes("document") || lowerMessage.includes("template") || lowerMessage.includes("drafting")) {
      return {
        content: "Perfect for document automation! Here's a comprehensive approach:\n\n📝 **Smart Contract Drafting**\n• AI-powered template selection based on matter type\n• Firm-specific clause libraries with precedent tracking\n• Risk-based clause recommendations\n\n🔍 **Document Review & Analysis**\n• Automated contract analysis for key terms and risks\n• Comparison tools for multiple document versions\n• Compliance checking against Jordanian law requirements\n\n🌐 **Multi-Language Support**\n• Parallel Arabic/English document generation\n• Translation consistency checking\n• Cultural and legal adaptation for different jurisdictions\n\nThis could reduce your drafting time by 40-70% while maintaining the high quality your clients expect.",
        suggestions: ["Smart templates", "Review automation", "Compliance checking", "Multi-language drafting"]
      };
    }
    
    if (lowerMessage.includes("performance") || lowerMessage.includes("analytics") || lowerMessage.includes("metrics")) {
      return {
        content: "Excellent focus on performance optimization! Here's what I recommend:\n\n📊 **Practice Analytics**\n• Matter profitability analysis by practice area\n• Time tracking and efficiency metrics\n• Client acquisition and retention analytics\n\n⏱️ **Productivity Metrics**\n• Automated time capture and billing optimization\n• Workflow efficiency measurement\n• Bottleneck identification and resolution\n\n📈 **Business Intelligence**\n• Revenue forecasting based on pipeline\n• Resource allocation optimization\n• Competitive analysis and market positioning\n\nThese tools would help you make data-driven decisions while growing your practice strategically.",
        suggestions: ["Profitability analysis", "Efficiency tracking", "Revenue forecasting", "Resource optimization"]
      };
    }
    
    // Default response
    return {
      content: "I'm here to help customize the Khirfan & Partners Command Center platform! As your AI assistant, I can suggest enhancements across all your practice areas:\n\n🏗️ **Construction Law** - FIDIC expertise automation\n🏢 **M&A Transactions** - Due diligence and deal management\n⚖️ **Dispute Resolution** - Case management and strategy tools\n👥 **Client Experience** - Personalized portals and communication\n📝 **Document Automation** - Smart templates and review tools\n📊 **Performance Analytics** - Practice metrics and optimization\n\nWhat specific area would you like to explore first?",
      suggestions: ["Construction law tools", "M&A workflows", "Dispute resolution", "Client experience", "Document automation", "Performance analytics"]
    };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse.content,
        suggestions: aiResponse.suggestions,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] sm:h-[calc(100vh-2rem)] flex flex-col">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold">AI Assistant</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                Get personalized suggestions to enhance your legal practice platform
              </p>
            </div>
          </div>
          <div className="sm:ml-auto flex items-center gap-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full self-start sm:self-center">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="hidden sm:inline">Online & Ready</span>
            <span className="sm:hidden">Online</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto border border-gray-200 dark:border-gray-800 rounded-xl bg-white/50 dark:bg-gray-900/50">
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[95%] sm:max-w-[85%] rounded-xl p-3 sm:p-4 shadow-sm ${
                  message.type === "user" 
                    ? "bg-cyan-600 text-white" 
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                }`}>
                  {message.type === "assistant" && (
                    <div className="flex items-center gap-2 mb-2 sm:mb-3 text-cyan-600 dark:text-cyan-400">
                      <Sparkles className="h-4 w-4" />
                      <span className="text-xs sm:text-sm font-medium">AI Assistant</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed">{message.content}</div>
                  {message.suggestions && (
                    <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 hover:bg-white/20 rounded-full border border-gray-200 dark:border-gray-700 transition-colors flex items-center gap-1"
                        >
                          <Lightbulb className="h-3 w-3" />
                          <span className="truncate">{suggestion}</span>
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
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-xs sm:text-sm font-medium">AI Assistant</span>
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
      </div>

      {/* Input Area */}
      <div className="mt-3 sm:mt-4 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 p-3 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about platform customizations..."
            className="flex-1 text-sm"
          />
          <Button 
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="px-3 sm:px-6"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
          💡 Try asking about: FIDIC automation, M&A workflows, client portals, document templates, or performance analytics
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 sm:hidden">
          💡 Ask about: FIDIC, M&A, clients, documents, analytics
        </div>
      </div>
    </div>
  );
}