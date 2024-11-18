"use client"

import { motion } from "framer-motion";

function Loader() {
    const dots = Array(3).fill(null);

    return (
        <motion.div
            className="flex justify-center items-center h-screen bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex gap-4">
                {dots.map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-8 h-8 bg-emerald-500 rounded-lg"
                        animate={{
                            y: ["0%", "-100%", "0%"],
                            scale: [1, 0.8, 1],
                            opacity: [1, 0.5, 1],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: "easeInOut"
                        }}
                        style={{
                            boxShadow: "0 0 20px rgba(16,185,129,0.3)"
                        }}
                    />
                ))}
            </div>
            <motion.div
                className="absolute mt-24 text-emerald-500 text-xl font-medium tracking-wider"
                animate={{
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            >
                LOADING
            </motion.div>
        </motion.div>
    );
}

export default Loader;
