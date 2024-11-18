import ProductsView from "@/components/ProductsView";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { MdSportsVolleyball } from "react-icons/md";
import { Suspense } from "react";
import Chat from "@/components/Chat";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen p-5 pt-16">
      {/* Existing background elements */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#f5f5f5_1px,transparent_1px)] bg-[size:4rem_1px] opacity-10 pointer-events-none" />
      <div className="fixed inset-0 bg-[linear-gradient(to_bottom,#f5f5f5_1px,transparent_1px)] bg-[size:1px_4rem] opacity-10 pointer-events-none" />
      <div className="fixed top-20 right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />
      <div className="fixed bottom-20 left-20 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-20 animate-pulse pointer-events-none" />

      {/* Main content container with sidebar - modified to use flex */}
      <div className="relative z-10">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
          {/* Main content */}
          <div className="relative backdrop-blur-sm bg-white/70 rounded-2xl 
                          shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] 
                          border border-gray-100/50
                          animate-slide-up mb-6">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-b from-transparent to-white/50 shadow-sm border border-black/5">
              <ProductsView products={products} />
            </div>
          </div>

          {/* Video section with enhanced gradient background and content */}
          <div className="relative backdrop-blur-sm rounded-2xl 
                          shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] 
                          border border-gray-100/50
                          animate-slide-up
                          bg-gradient-to-r from-emerald-400/30 via-indigo-400/30 to-fuchsia-400/30">
            <div className="p-6 md:p-8 rounded-2xl bg-white/30 shadow-sm border border-black/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                {/* Video column */}
                <div>
                  <iframe
                    className="w-full aspect-video rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/tWU8CXFLOgk?loop=1&playlist=tWU8CXFLOgk&autoplay=1&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Content column */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                    FitSport <MdSportsVolleyball className="text-emerald-500" size={32} />
                  </h2>
                  <div className="prose prose-lg">
                    <p className="text-gray-700 leading-relaxed">
                      Experience the perfect blend of style and performance with FitSport. Our cutting-edge sportswear is designed for athletes who demand the best in comfort, durability, and innovation.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Using advanced moisture-wicking technology and sustainable materials, our products help you achieve peak performance while staying environmentally conscious.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Video Section */}
          <div className="relative backdrop-blur-sm rounded-2xl 
                          shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] 
                          border border-gray-100/50
                          animate-slide-up mt-6
                          bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30">
            <div className="p-6 md:p-8 rounded-2xl bg-white/30 shadow-sm border border-black/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                {/* Content column - now on the left */}
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Customer-Centric Excellence
                  </h2>
                  <div className="prose prose-lg">
                    <p className="text-gray-700 leading-relaxed">
                      At FitSport, we understand the unique needs of athletes and sports enthusiasts. Our dedication goes beyond creating exceptional sportswear - we're building a community that supports your athletic journey.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      From professional athletes to weekend warriors, we're committed to providing personalized solutions that help you achieve your sporting goals. Our customer service team consists of sports experts who speak your language.
                    </p>
                  </div>
                </div>

                {/* Video column - now on the right */}
                <div>
                  <iframe
                    className="w-full aspect-video rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/W7NFoCfXAXU?loop=1&playlist=W7NFoCfXAXU&autoplay=1&mute=1"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="fixed bottom-4 right-4 w-72 h-12 bg-white rounded-lg shadow-lg animate-pulse z-[9999]" />}>
            <Chat />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
