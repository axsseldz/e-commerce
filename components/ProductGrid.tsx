"use client";

import { Product } from "@/sanity.types";
import { AnimatePresence, motion } from "framer-motion";
import ProductThumb from "./ProductThumb";

function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {products?.map((product) => (
                <AnimatePresence key={product._id}>
                    <motion.div
                        layout
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full"
                    >
                        <div className="aspect-[4/5] w-full">
                            <ProductThumb key={product._id} product={product} />
                        </div>
                    </motion.div>
                </AnimatePresence>
            ))}
        </div>
    );
}

export default ProductGrid;
