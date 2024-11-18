"use client";

import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { cn } from "@/lib/utils";
import * as React from "react";
import { RiAiGenerate, RiRobot2Fill, RiSendPlane2Fill } from "react-icons/ri";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

type Message = {
    role: "user" | "assistant";
    content: string;
};

// Custom Input component
const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
    return (
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Input.displayName = "Input";

// Custom ScrollArea component
const ScrollArea = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={cn("relative overflow-auto", className)}
            {...props}
        >
            {children}
        </div>
    );
});
ScrollArea.displayName = "ScrollArea";

// Custom Button component
const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
            ref={ref}
            {...props}
        />
    );
});
Button.displayName = "Button";

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    // Add a ref for the messages container
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Add scroll to bottom effect
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading]); // Scroll on new messages or loading state change

    const context = `You are a helpful shopping assistant for a sports clothing e-commerce store called FitSport. 
  You only answer questions related to sports clothing, sizing, materials, care instructions, and general product information.
  Keep responses concise and friendly. If asked about anything unrelated to sports clothing retail, politely redirect to clothing-related topics.`;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            // Get response from Gemini
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent([context, input]);
            const response = await result.response;
            const text = response.text();

            // Add assistant message
            setMessages((prev) => [...prev, { role: "assistant", content: text }]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Sorry, I'm having trouble responding right now. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed bottom-4 right-4 w-72 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg 
                    flex flex-col z-[9999] overflow-hidden
                    animate-in fade-in duration-300">
            <div
                className={`p-3 cursor-pointer transition-all duration-300
                    bg-gradient-to-r from-emerald-500/90 via-blue-500/90 to-purple-500/90
                    hover:from-emerald-600/90 hover:via-blue-600/90 hover:to-purple-600/90
                    flex items-center gap-2`}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2 text-white">
                    <RiAiGenerate className="w-5 h-5 animate-pulse" />
                    <h2 className="text-sm font-semibold">FitSport Assistant</h2>
                </div>
            </div>

            {isExpanded && (
                <>
                    <ScrollArea className="flex-1 p-3 max-h-[400px] bg-gradient-to-b from-white/50 to-gray-50/50">
                        <div className="space-y-3">
                            {messages.map((message, i) => (
                                <div
                                    key={i}
                                    className={`flex items-start gap-2 ${message.role === "assistant" ? "justify-start" : "justify-end"
                                        }`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                                            <RiRobot2Fill className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                    <div
                                        className={`max-w-[85%] rounded-xl p-3 text-sm ${message.role === "assistant"
                                            ? "bg-gradient-to-r from-gray-100 to-gray-50 shadow-sm"
                                            : "bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                                        <RiRobot2Fill className="w-4 h-4 text-white animate-pulse" />
                                    </div>
                                    <div className="max-w-[85%] rounded-xl p-3 text-sm bg-gradient-to-r from-gray-100 to-gray-50">
                                        <div className="flex gap-1">
                                            <span className="animate-bounce">•</span>
                                            <span className="animate-bounce delay-100">•</span>
                                            <span className="animate-bounce delay-200">•</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </ScrollArea>

                    <form onSubmit={handleSubmit} className="p-2 border-t border-gray-200/50 bg-white/80">
                        <div className="flex gap-2">
                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask about our products..."
                                className="text-sm h-9 bg-gray-50/50"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`h-9 w-9 rounded-lg flex items-center justify-center
                                    bg-gradient-to-r from-emerald-500 to-blue-500 
                                    hover:from-emerald-600 hover:to-blue-600
                                    transition-all duration-300
                                    disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                <RiSendPlane2Fill className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
}