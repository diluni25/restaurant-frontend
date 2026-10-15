import React, { useState } from 'react';

export default function HomeContentCMS() {
  const [headline, setHeadline] = useState('Experience Culinary Passion & Flavor');
  const [tagline, setTagline] = useState('Handcrafted gourmet recipes made from fresh local ingredients.');
  const [primaryCtaText, setPrimaryCtaText] = useState('Order Online');
  const [primaryCtaLink, setPrimaryCtaLink] = useState('/menu');
  const [secondaryCtaText, setSecondaryCtaText] = useState('Book a Table');
  const [secondaryCtaLink, setSecondaryCtaLink] = useState('/reservation');

  const [dishes, setDishes] = useState([
    { id: 1, title: 'Smoked Black Angus Ribeye', price: 'Rs. 3,850 ($46.00)', badge: 'Tasting Highlight', enabled: true, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=200&auto=format&fit=crop' },
    { id: 2, title: 'Hand-Rolled Truffle Tortellini', price: 'Rs. 2,450 ($29.50)', badge: 'Vegetarian', enabled: true, img: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?q=80&w=200&auto=format&fit=crop' },
    { id: 3, title: 'Chilean Sea Bass & Fennel', price: 'Rs. 3,200 ($38.00)', badge: 'Catch of Day', enabled: true, img: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=200&auto=format&fit=crop' },
    { id: 4, title: 'Valrhona Smoked Ganache', price: 'Rs. 1,600 ($19.00)', badge: 'Inactive', enabled: false, img: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=200&auto=format&fit=crop' },
  ]);

  const [announcementActive, setAnnouncementActive] = useState(true);
  const [ribbonCopy, setRibbonCopy] = useState('Autumn Harvest Special – 20% Off Reserve Ce');

  const toggleDish = (id) => {
    setDishes(dishes.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d));
  };

  return (
    <div className="min-h-screen bg-[#0d0c0b] text-[#d1cece] flex flex-col lg:flex-row font-sans selection:bg-[#e87a38] selection:text-white">
      {/* Sidebar Operations & CMS */}
      <aside className="w-full lg:w-64 bg-[#141413] border-r border-[#222120] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#e87a38] flex items-center justify-center font-bold text-white shadow">
              <span className="font-serif italic text-lg">T</span>
            </div>
            <span className="text-xl font-serif text-white tracking-wide">Tastoria</span>
          </div>

          <div className="space-y-1 text-xs">
            <span className="text-[9px] uppercase text-[#615e58] font-semibold tracking-widest px-2 block mb-2">OPERATIONS & CMS</span>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">Dashboard Overview</button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg flex justify-between items-center transition">
              <span>Order Management</span>
              <span className="bg-[#e87a38] text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">12</span>
            </button>
            <button className="w-full text-left px-3 py-2 bg-[#1f1d1b] text-[#e87a38] font-medium rounded-lg border border-[#332a22]">Home Content CMS</button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">About Content CMS</button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg flex justify-between items-center transition">
              <span>Contact & Messages</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]"></span>
            </button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">Media & Asset Library</button>
          </div>
        </div>

        <div className="pt-4 border-t border-[#222120] flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#2b2724] border border-[#443e39] overflow-hidden flex items-center justify-center text-xs font-bold text-[#e87a38]">
            S
          </div>
          <div>
            <p className="font-medium text-white text-xs">Silva Chef-Patron</p>
            <span className="text-[9px] text-[#e87a38] font-medium uppercase tracking-wider">ADMINISTRATOR</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Top Header Bar & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f1d1b] pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#6e6b65]">
              <span>KITCHEN ADMIN</span>
              <span>/</span>
              <span>STOREFRONT CONTENT</span>
              <span>/</span>
              <span className="text-[#e87a38]">HERO & PROMOTIONS</span>
            </div>
            <h2 className="text-xl font-medium text-white flex items-center gap-3 font-serif">
              Home Content CMS
              <span className="text-[10px] font-sans text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Storefront: Connected
              </span>
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative hidden xl:block w-64">
              <input type="text" placeholder="Search dishes, orders, patrons, CMS..." className="w-full bg-[#171615] border border-[#2b2927] text-xs px-3.5 py-2 pl-8 rounded-lg text-[#d1cece] placeholder-[#6e6b65] focus:outline-none focus:border-[#e87a38]" />
              <svg className="w-3.5 h-3.5 text-[#6e6b65] absolute left-2.5 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button className="px-4 py-2 text-xs border border-[#2b2927] rounded-lg text-[#a8a49c] hover:text-white bg-[#141312] transition">Preview Site</button>
            <button className="px-4 py-2 text-xs bg-[#e87a38] hover:bg-[#d66b2c] rounded-lg text-white font-medium shadow transition">Publish Changes</button>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Hero Canvas & Featured Dishes) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Hero Canvas & Storytelling */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-[#e87a38]">🔥</span> Hero Canvas & Storytelling
                </h3>
                <span className="text-[9px] uppercase tracking-widest bg-[#1f1d1b] border border-[#2e2a26] px-2 py-0.5 rounded text-[#8c8880]">VIEWPORT 01</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">HERO HEADLINE</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#e87a38] transition"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">TAGLINE & PHILOSOPHY</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#e87a38] transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">PRIMARY CTA & ACTION</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={primaryCtaText} onChange={(e) => setPrimaryCtaText(e.target.value)} className="bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                    <input type="text" value={primaryCtaLink} onChange={(e) => setPrimaryCtaLink(e.target.value)} className="bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-[#8c8880] focus:outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">SECONDARY CTA & LINK</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" value={secondaryCtaText} onChange={(e) => setSecondaryCtaText(e.target.value)} className="bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                    <input type="text" value={secondaryCtaLink} onChange={(e) => setSecondaryCtaLink(e.target.value)} className="bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-[#8c8880] focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Signature Dishes */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-[#e87a38]">🍽️</span> Featured Signature Dishes
                </h3>
                <button className="text-xs text-[#e87a38] hover:underline font-medium">+ ADD DISH</button>
              </div>

              <div className="space-y-3">
                {dishes.map((dish) => (
                  <div key={dish.id} className="bg-[#1b1a18] border border-[#262422] rounded-lg p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-[#6e6b65] cursor-grab">⋮⋮</span>
                      <div className="w-12 h-10 rounded-lg bg-[#26221f] border border-[#3b332d] overflow-hidden shrink-0">
                        <img src={dish.img} alt={dish.title} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{dish.title}</h4>
                        <p className="text-[10px] text-[#e87a38] font-medium">{dish.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-[9px] uppercase px-2 py-0.5 rounded border ${dish.enabled ? 'bg-[#2b241d] text-[#e87a38] border-[#3d2f23]' : 'bg-[#1e1e1e] text-[#737069] border-[#2b2b2b]'}`}>
                        {dish.badge}
                      </span>
                      <button
                        onClick={() => toggleDish(dish.id)}
                        className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${dish.enabled ? 'bg-[#e87a38] justify-end' : 'bg-[#3b3834] justify-start'}`}
                      >
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Featured Visual Asset & Top Announcement Bar & Live Mirror) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Featured Visual Asset */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-xs text-white">
                <span className="font-medium">FEATURED VISUAL ASSET</span>
                <span className="text-[10px] bg-[#1f1d1b] border border-[#2e2a26] px-2 py-0.5 rounded text-[#8c8880]">High-Res (16:9)</span>
              </div>
              <div className="h-44 rounded-lg overflow-hidden border border-[#2b2724] relative group">
                <img src="https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800&auto=format&fit=crop" alt="Autumn Main Pass" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[10px] text-white font-medium border border-white/10">
                  Autumn Main Pass<br/><span className="text-[9px] text-[#8c8880]">hero-woodfire-duck-v2.jpg</span>
                </div>
              </div>
              <div className="text-[10px] text-[#737069] flex justify-between items-center">
                <span>2400 × 1350 px • 1.4 MB</span>
                <button className="px-3 py-1 bg-[#1f1e1c] hover:bg-[#2a2825] border border-[#33302b] rounded text-white font-medium">Replace</button>
              </div>
              <p className="text-[10px] text-[#e87a38] text-right cursor-pointer hover:underline">Crop focal point</p>
            </div>

            {/* Top Announcement Bar */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-white flex items-center gap-2">📢 Top Announcement Bar</span>
                <button
                  onClick={() => setAnnouncementActive(!announcementActive)}
                  className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${announcementActive ? 'bg-[#e87a38] justify-end' : 'bg-[#3b3834] justify-start'}`}
                >
                  <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase text-[#737069] tracking-wider block mb-1">RIBBON COPY</label>
                  <input type="text" value={ribbonCopy} onChange={(e) => setRibbonCopy(e.target.value)} className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] uppercase text-[#737069] tracking-wider block mb-1">CTA TEXT</label>
                    <input type="text" defaultValue="Claim Offer" className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-white focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase text-[#737069] tracking-wider block mb-1">TARGET LINK</label>
                    <input type="text" defaultValue="/specials" className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3 py-2 text-xs text-[#8c8880] focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Storefront Preview / Instant Mirror */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center text-[10px] text-[#737069]">
                <span>LIVE STOREFRONT PREVIEW</span>
                <span className="text-white">INSTANT MIRROR</span>
              </div>
              <div className="bg-[#e87a38] text-white text-[10px] px-3 py-1.5 rounded flex justify-between items-center font-medium">
                <span>{ribbonCopy}</span>
                <span className="underline cursor-pointer">Claim Offer</span>
              </div>
              <div className="bg-[#0b0b0b] border border-[#262422] rounded-xl p-5 space-y-3 text-center">
                <span className="text-[9px] uppercase text-[#e87a38] tracking-widest font-semibold block">SILVA GASTRONOMY</span>
                <h5 className="text-sm font-serif text-white leading-snug">{headline}</h5>
                <p className="text-[10px] text-[#8c8880] leading-relaxed">{tagline}</p>
                <div className="pt-2 flex items-center justify-center space-x-2">
                  <span className="bg-[#e87a38] text-white text-[10px] px-3 py-1.5 rounded font-medium">{primaryCtaText}</span>
                  <span className="border border-[#3d2b1f] text-[#d1cece] text-[10px] px-3 py-1.5 rounded">{secondaryCtaText}</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}