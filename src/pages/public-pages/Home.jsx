import React from 'react';

const featuredDishes = [
  {
    id: 1,
    title: 'Fire-kissed ribeye',
    price: '$38',
    desc: 'Celariac • bone jus • shallot',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Charred market fish',
    price: '$32',
    desc: 'Fennel • preserved lemon • herbs',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop',
  },
 {
    id: 3,
    title: 'Cacao & ember',
    price: '$16',
    desc: 'Dark chocolate • smoked salt • cherry',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Artisan Sourdough Toast',
    price: '$24',
    desc: 'Smoked avocado, heirloom tomatoes, bacon',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Truffle Wild Mushroom Pasta',
    price: '$32',
    desc: 'Handmade tagliatelle, parmesan cream, black truffle',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Signature Artisan Coffee',
    price: '$9',
    desc: 'Single-origin beans, steamed milk',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Home() {
  return (
    <div className="bg-[#0e0d0c] text-[#d6d3cd] min-h-screen">
      {/* Top Navbar */}
      <nav className="border-b border-[#222120] px-6 lg:px-16 py-4 flex items-center justify-between">
        <h1 className="text-xl font-serif text-[#e87a38] font-bold">Tastoria</h1>
        <div className="hidden md:flex items-center space-x-6 text-xs text-[#a8a49c]">
          <a href="#" className="text-white font-medium border-b border-[#e87a38] pb-1">Home</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Chef Details</a>
          <a href="#" className="hover:text-white">Order</a>
          <a href="#" className="hover:text-white">Contact</a>
          <a href="#" className="hover:text-white text-[11px] uppercase tracking-wider text-[#737069]">Admin</a>
        </div>
        <button className="bg-[#e87a38] hover:bg-[#d66b2c] text-white text-xs px-4 py-2 rounded-md font-medium">
          ORDER NOW ↗
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-16 py-20 bg-cover bg-center border-b border-[#1c1b1a]" style={{ backgroundImage: "linear-gradient(to right, rgba(14,13,12,0.95), rgba(14,13,12,0.6)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop')" }}>
        <div className="max-w-xl space-y-4">
          <span className="text-[10px] tracking-widest uppercase text-[#8c8880]">Seasonal dining • Mayfair, London</span>
          <h2 className="text-4xl lg:text-5xl font-serif text-[#f7f5ef] leading-tight">Gather around the fire.</h2>
          <p className="text-xs text-[#a8a49c] leading-relaxed">
            Honest ingredients, open flames, and plates made for passing around.
          </p>
          <button className="bg-[#e87a38] hover:bg-[#d66b2c] text-white text-xs px-5 py-2.5 rounded-md font-medium">
            Order Now ↗
          </button>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="max-w-7xl mx-auto px-6 lg:px-16 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-[10px] uppercase text-[#e87a38] tracking-widest block mb-1">From the hearth</span>
            <h3 className="text-2xl font-serif text-[#f7f5ef]">Featured dishes</h3>
          </div>
          <p className="text-xs text-[#737069] max-w-sm mt-2 md:mt-0">
            Our menu moves with the farms and the fire. These are a few plates we're especially excited to share right now.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((item) => (
            <div key={item.id} className="bg-[#141312] border border-[#242220] rounded-xl overflow-hidden p-3.5 hover:border-[#383531] transition">
              <div className="h-44 rounded-lg overflow-hidden mb-3">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-baseline mb-1">
                <h4 className="font-serif text-sm text-[#f7f5ef]">{item.title}</h4>
                <span className="text-xs font-semibold text-[#e87a38]">{item.price}</span>
              </div>
              <p className="text-[11px] text-[#737069]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Chef's Counter Banner */}
        <div className="mt-16 bg-[#161413] border border-[#2b2724] rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="md:col-span-5 h-64">
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" alt="Chef prep" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-7 p-8 space-y-3">
            <span className="text-[10px] border border-[#3d2b1f] text-[#e87a38] px-2.5 py-0.5 rounded-full uppercase tracking-wider">Chef's counter • 8 seats nightly</span>
            <h4 className="text-2xl font-serif text-[#f7f5ef]">Leave the menu to us.</h4>
            <p className="text-xs text-[#8c8880] leading-relaxed">
              A seven-course journey through flame, field, and season. Optional wine pairing available. Reservations required 48 hours in advance.
            </p>
            <a href="#" className="inline-block text-xs text-[#e87a38] hover:underline pt-2">Reserve the counter ↗</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1c1b19] px-6 lg:px-16 py-8 text-[11px] text-[#737069]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-serif text-sm text-[#e87a38]">Tastoria</span>
          <p>© 2026 Tastoria. Thoughtfully made, warmly shared.</p>
          <p>041 783 3551 • tastoria@gmail.com</p>
        </div>
      </footer>
    </div>
  );
}