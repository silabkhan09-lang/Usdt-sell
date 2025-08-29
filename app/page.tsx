export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">Buy & Sell USDT P2P</h1>
        <p className="text-lg md:text-xl mb-8">Safe, fast, and escrow-protected crypto trading</p>
        <div className="space-x-4">
          <a href="/offers" className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-xl font-semibold hover:bg-yellow-500 transition">
            Browse Offers
          </a>
          <a href="/create-offer" className="px-6 py-3 bg-white text-blue-900 rounded-xl font-semibold hover:bg-gray-200 transition">
            Create Offer
          </a>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-blue-700 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-2">1. Seller Posts Offer</h3>
            <p>Choose amount, rate, and payment method to create a listing.</p>
          </div>
          <div className="p-6 bg-blue-700 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-2">2. Buyer Pays Seller</h3>
            <p>Buyer pays seller directly via bank, mobile money, or other methods.</p>
          </div>
          <div className="p-6 bg-blue-700 rounded-2xl shadow-lg">
            <h3 className="font-semibold text-xl mb-2">3. Escrow Releases USDT</h3>
            <p>The escrow releases USDT to the buyer, while commission goes to you.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 mt-16 bg-blue-950 text-center text-gray-300">
        <p>© {new Date().getFullYear()} YourP2PPlatform. All rights reserved.</p>
      </footer>
    </div>
  )
}
