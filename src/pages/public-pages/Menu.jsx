import React, { useState } from 'react';

const menuItems = [
  {
    id: 1,
    title: 'Heirloom burrata',
    category: 'Starters',
    badge: 'Vegetarian',
    price: 18.0,
    desc: 'Creamy burrata, ripe heirloom tomatoes, basil oil and toasted sourdough.',
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
  },
  {
    id: 2,
    title: 'Ember-roasted carrots',
    category: 'Starters',
    badge: 'Plant-based',
    price: 14.0,
    desc: 'Fire-kissed carrots, whipped tahini, pomegranate and toasted pistachio.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop',
    quantity: 0,
  },
  {
    id: 3,
    title: 'Wood-fired chicken',
    category: 'From the hearth',
    badge: 'House favorite',
    price: 28.0,
    desc: 'Free-range chicken, charred lemon, rosemary jus and crispy potatoes.',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=800&auto=format&fit=crop',
    quantity: 2,
  },
  {
    id: 4,
    title: 'Wild mushroom risotto',
    category: 'From the hearth',
    badge: 'Vegetarian',
    price: 24.0,
    desc: 'Arborio rice, woodland mushrooms, aged parmesan and black truffle.',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=800&auto=format&fit=crop',
    quantity: 0,
  },
  {
    id: 5,
    title: 'Hearth-baked sourdough',
    category: 'Sides',
    badge: 'To share',
    price: 8.0,
    desc: 'Our slow-fermented sourdough, cultured butter and flaky sea salt.',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?q=80&w=800&auto=format&fit=crop',
    quantity: 0,
  },
  {
    id: 6,
    title: 'Dark chocolate tart',
    category: 'Desserts',
    badge: 'Sweet finish',
    price: 12.0,
    desc: '70% dark chocolate, crisp cocoa pastry, sea salt and vanilla cream.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    quantity: 1,
  },
];

export default function Menu() {
  const [items, setItems] = useState(menuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const updateQuantity = (id, change) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      activeCategory === 'All' || item.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="bg-[#0b0b0b] text-[#d6d3cd] min-h-screen font-sans">
      {/* Header */}
      <header className="border-b border-[#222120] px-6 lg:px-16 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl tracking-wider font-serif text-[#f3f0e8]">Ember &amp; Grain</h1>
            <p className="text-[10px] tracking-widest text-[#737069] uppercase mt-0.5">Fire. Season. Soul.</p>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-xs font-medium tracking-wide">
            <a href="#" className="text-[#a8a49c] hover:text-white transition">Home</a>
            <a href="#" className="text-[#a8a49c] hover:text-white transition">About</a>
            <a href="#" className="text-[#a8a49c] hover:text-white transition">Chef Details</a>
            <a href="#" className="text-[#e27d3c] border-b-2 border-[#e27d3c] pb-1">Order</a>
            <a href="#" className="text-[#a8a49c] hover:text-white transition">Contact</a>
          </nav>

          <button className="flex items-center space-x-2 text-xs bg-[#171615] border border-[#2b2927] px-3.5 py-2 rounded-full hover:border-[#4a4742] transition">
            <svg className="w-3.5 h-3.5 text-[#d6d3cd]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="text-[#eae7e0]">Cart</span>
            <span className="bg-[#e27d3c] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              {totalItems}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-10 w-full space-y-12">
        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#8c8880] font-medium block">
              Seasonal Kitchen • Autumn 2026
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-normal leading-tight text-[#f7f5ef]">
              The hearth,<br />at your<br />table.
            </h2>
            <p className="text-xs md:text-sm text-[#8c8880] max-w-md leading-relaxed">
              Honest ingredients. A little smoke. A lot of soul. Explore our seasonal menu, made fresh and delivered warmly.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-[#8c8880]">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-emerald-400 font-medium">Kitchen open</span>
              </div>
              <span>•</span>
              <span>Delivery in 35–45 min</span>
              <span>•</span>
              <span>12:00–22:00</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-[#2b2927]">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop"
                alt="Dining spread"
                className="w-full h-[320px] md:h-[380px] object-cover filter brightness-95 hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-[#1c1b1a]">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'All dishes • 6', value: 'All' },
              { label: 'Starters', value: 'Starters' },
              { label: 'From the hearth', value: 'From the hearth' },
              { label: 'Sides', value: 'Sides' },
              { label: 'Desserts', value: 'Desserts' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={`px-4 py-2 text-xs rounded-md border transition ${
                  activeCategory === tab.value
                    ? 'bg-[#1f1e1c] text-white border-[#3b3834] font-medium'
                    : 'bg-[#121110] text-[#8c8880] border-[#222120] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Find your next favorite"
              className="w-full bg-[#121110] border border-[#242220] text-xs px-3.5 py-2 pl-9 rounded-md text-[#d6d3cd] placeholder-[#5a5752] focus:outline-none focus:border-[#4e4b46]"
            />
            <svg className="w-4 h-4 text-[#5a5752] absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </section>

        {/* Menu Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-serif text-[#f7f5ef]">Good things, in season.</h3>
            <span className="text-[11px] text-[#6b6761]">Made to order • Vegetarian &amp; plant-based options</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#121211] border border-[#201f1d] rounded-xl overflow-hidden flex flex-col justify-between p-3.5 hover:border-[#383531] transition"
              >
                <div className="space-y-3">
                  <div className="h-48 overflow-hidden rounded-lg">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#7a766f]">
                    <span>{item.category}</span>
                    <span className="bg-[#1b1918] text-[#9c978e] px-2 py-0.5 rounded border border-[#262422]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-serif text-base text-[#f7f5ef]">{item.title}</h4>
                    <span className="text-sm font-medium text-[#f7f5ef]">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-[11px] text-[#807c74] leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1a1918]">
                  {item.quantity > 0 ? (
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        In your cart
                      </span>
                      <div className="flex items-center space-x-2 bg-[#1b1a18] border border-[#2b2927] rounded px-2 py-0.5 text-xs text-white">
                        <button onClick={() => updateQuantity(item.id, -1)} className="text-[#8c8880] hover:text-white px-1">
                          -
                        </button>
                        <span className="text-[11px] px-1 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="text-[#8c8880] hover:text-white px-1">
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-full py-1.5 text-xs border border-[#2e2b27] bg-[#171614] hover:bg-[#201e1b] rounded text-[#eae7e0] font-medium transition"
                    >
                      Add to cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Cart Section */}
        {totalItems > 0 && (
          <section className="border border-[#382619] bg-[#13110f] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-[#201813] flex items-center justify-center border border-[#3d2719]">
                <svg className="w-4 h-4 text-[#e27d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs font-medium text-[#f5f2eb]">A lovely meal is coming together.</h5>
                <p className="text-[11px] text-[#7a766f]">
                  {totalItems} items • ${totalPrice.toFixed(2)} subtotal • Tax &amp; delivery calculated at checkout
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto bg-[#c86d38] hover:bg-[#b5602e] text-white text-xs font-medium px-5 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition">
              <span>View your cart</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </section>
        )}

        {/* Disclaimer */}
        <p className="text-center text-[10px] text-[#5e5a54] pt-2">
          Food allergies? Please call (718) 555-0142 before ordering. Our kitchen handles nuts, dairy, gluten and eggs.
        </p>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1c1b19] px-6 lg:px-16 py-10 mt-12 bg-[#090908]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 text-[11px] text-[#737069]">
          <div>
            <h4 className="text-sm font-serif text-[#eae7e0]">Ember &amp; Grain</h4>
            <p className="text-[9px] uppercase tracking-widest text-[#52504b] mt-0.5">Fire. Season. Soul.</p>
          </div>
          <div>
            <span className="uppercase tracking-wider text-[9px] text-[#4d4a46] block mb-1">Come by</span>
            <p className="text-[#8c8880]">42 Willow Lane, Brooklyn, NY</p>
          </div>
          <div>
            <span className="uppercase tracking-wider text-[9px] text-[#4d4a46] block mb-1">From our hearth</span>
            <p className="text-[#8c8880]">Tue–Sun : 12:00–22:00</p>
          </div>
          <div>
            <p className="text-[#8c8880]">(718) 555-0142</p>
            <p className="text-[#8c8880]">hello@emberandgrain.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}