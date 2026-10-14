import React, { useState } from 'react';

export default function AboutContentManager() {
  const [headline, setHeadline] = useState('Crafting Culinary Reverence Since 2014');
  const [manifesto, setManifesto] = useState(
    'Silva emerged from an obsession with elemental gastronomy—harnessing open alder wood coals, ancient maritime fermentations, and hyper-seasonal botanicals. We honor lineage not by replication, but by relentless stewardship of living flame and regenerative terroir.'
  );
  
  const [team, setTeam] = useState([
    { id: 1, name: 'Chef Silva', role: 'Chef-Patron & Culinary Director', desc: 'Two decades of Basque and Pacific-Rim firecraft curation.', enabled: true },
    { id: 2, name: 'Chef Mateo Torres', role: 'Head of Charcoal & Hearth Operations', desc: 'Master of slow-ember smoking and heirloom grain fermentations.', enabled: true },
    { id: 3, name: 'Elena Vance', role: 'Head Sommelier & Cellar Master', desc: 'Curator of 1,200 low-intervention alpine and volcanic vintages.', enabled: true },
  ]);

  const toggleMember = (id) => {
    setTeam(team.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="min-h-screen bg-[#0e0e0d] text-[#d1cece] flex flex-col lg:flex-row font-sans">
      {/* Sidebar Operations & CMS */}
      <aside className="w-full lg:w-64 bg-[#141413] border-r border-[#222120] p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#e87a38] flex items-center justify-center font-bold text-white shadow">
              <span className="font-serif italic text-lg">T</span>
            </div>
            <span className="text-xl font-serif text-white tracking-wide">Tastoria</span>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1 text-xs">
            <span className="text-[9px] uppercase text-[#615e58] font-semibold tracking-widest px-2 block mb-2">Operations & CMS</span>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">Dashboard Overview</button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg flex justify-between items-center transition">
              <span>Order Management</span>
              <span className="bg-[#e87a38] text-white px-1.5 py-0.2 rounded-full text-[10px] font-bold">12</span>
            </button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">Home Content CMS</button>
            <button className="w-full text-left px-3 py-2 bg-[#1f1d1b] text-[#e87a38] font-medium rounded-lg border border-[#332a22]">About Content CMS</button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg flex justify-between items-center transition">
              <span>Contact & Messages</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#e87a38]"></span>
            </button>
            <button className="w-full text-left px-3 py-2 text-[#8c8880] hover:bg-[#1d1b1a] rounded-lg transition">Media & Asset Library</button>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="pt-4 border-t border-[#222120] flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#2b2724] border border-[#443e39] overflow-hidden flex items-center justify-center text-xs font-bold text-[#e87a38]">
            S
          </div>
          <div>
            <p className="font-medium text-white text-xs">Silva Chef-Patron</p>
            <span className="text-[9px] text-[#e87a38] font-medium uppercase tracking-wider">Superadmin</span>
          </div>
        </div>
      </aside>

      {/* Main Content Container */}
      <main className="flex-1 p-6 lg:p-10 space-y-8 overflow-y-auto">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f1d1b] pb-5">
          <div>
            <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-[#6e6b65]">
              <span>Kitchen Admin</span>
              <span>/</span>
              <span>Storefront Content</span>
              <span>/</span>
              <span className="text-[#e87a38]">About & Brand Story</span>
            </div>
            <h2 className="text-xl font-medium text-white flex items-center gap-3 mt-1 font-serif">
              About Content CMS
              <span className="text-[10px] font-sans text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-normal">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Storefront: Connected
              </span>
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-xs border border-[#2b2927] rounded-lg text-[#a8a49c] hover:text-white bg-[#141312] transition">
              Preview About Page
            </button>
            <button className="px-4 py-2 text-xs bg-[#e87a38] hover:bg-[#d66b2c] rounded-lg text-white font-medium shadow transition">
              Publish Changes
            </button>
          </div>
        </div>

        {/* Grid Layout: Left Forms & Right Previews */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (Forms & Team) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Section 01: Brand Story & Philosophy */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-[#e87a38]">🔥</span> Brand Story & Philosophy
                </h3>
                <span className="text-[9px] uppercase tracking-widest bg-[#1f1d1b] border border-[#2e2a26] px-2 py-0.5 rounded text-[#8c8880]">Section 01</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">Storefront Main Headline</label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#e87a38] transition"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-[#737069]">
                  <span className="uppercase tracking-wider font-medium">Heritage & Woodfire Manifesto</span>
                  <span className="text-[#e87a38]">{manifesto.length} / 600 characters</span>
                </div>
                <textarea
                  rows={4}
                  value={manifesto}
                  onChange={(e) => setManifesto(e.target.value)}
                  className="w-full bg-[#1b1918] border border-[#2e2b28] rounded-lg p-3.5 text-xs text-[#d6d3cd] leading-relaxed focus:outline-none focus:border-[#e87a38] transition"
                />
              </div>

              <div className="space-y-1.5 pt-1">
                <label className="text-[10px] uppercase text-[#737069] tracking-wider font-medium block">Patron's Inscription / Epigraph</label>
                <div className="bg-[#1b1918] border border-[#2e2b28] rounded-lg px-3.5 py-2.5 text-xs text-[#a8a49c] italic flex items-center gap-2">
                  <span>“</span>
                  <span>Every dish carries the rhythm of our hearth and the legacy of our grower.</span>
                  <span>”</span>
                </div>
              </div>
            </div>

            {/* Executive Culinary Team & Founders */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-[#e87a38]">👥</span> Executive Culinary Team & Founders
                </h3>
                <button className="text-xs text-[#e87a38] hover:underline font-medium">+ Add Team Member</button>
              </div>

              <div className="space-y-3">
                {team.map((member) => (
                  <div key={member.id} className="bg-[#1b1a18] border border-[#262422] rounded-lg p-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-[#26221f] border border-[#3b332d] overflow-hidden shrink-0">
                        <img 
                          src={member.id === 1 ? "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=200&auto=format&fit=crop" : member.id === 2 ? "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=200&auto=format&fit=crop" : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"} 
                          alt={member.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white">{member.name}</h4>
                        <p className="text-[10px] text-[#e87a38] font-medium">{member.role}</p>
                        <p className="text-[11px] text-[#7a766f] mt-0.5 leading-snug">{member.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                      <button
                        onClick={() => toggleMember(member.id)}
                        className={`w-9 h-5 flex items-center rounded-full p-1 transition-colors duration-300 ${member.enabled ? 'bg-[#e87a38] justify-end' : 'bg-[#3b3834] justify-start'}`}
                      >
                        <div className="bg-white w-3.5 h-3.5 rounded-full shadow-md"></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Values & Accreditations */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-white flex items-center gap-2">
                  <span className="text-[#e87a38]">🛡️</span> Core Values & Accreditations
                </h3>
                <span className="text-[10px] text-[#737069]">3 Display Badges</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-[#1b1a18] border border-[#262422] rounded-lg p-3 space-y-2">
                  <span className="text-[#e87a38] text-sm">🔥</span>
                  <h4 className="text-xs font-semibold text-white">100% Woodfire</h4>
                  <p className="text-[10px] text-[#737069]">Sustainable fallen timber</p>
                </div>
                <div className="bg-[#1b1a18] border border-[#262422] rounded-lg p-3 space-y-2">
                  <span className="text-[#e87a38] text-sm">⭐</span>
                  <h4 className="text-xs font-semibold text-white">Michelin Selection</h4>
                  <p className="text-[10px] text-[#737069]">2021 - 2024 Retained</p>
                </div>
                <div className="bg-[#1b1a18] border border-[#262422] rounded-lg p-3 space-y-2">
                  <span className="text-[#e87a38] text-sm">🌿</span>
                  <h4 className="text-xs font-semibold text-white">Zero Single-Use</h4>
                  <p className="text-[10px] text-[#737069]">Closed-loop culinary lab</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Visual Assets & Canvas Mirror Preview) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Visual Asset Card */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-xs text-white">
                <span className="font-medium">🖼️ Primary Visual Asset</span>
                <span className="text-[10px] bg-[#1f1d1b] border border-[#2e2a26] px-2 py-0.5 rounded text-[#8c8880]">16:9 Aspect</span>
              </div>
              <div className="h-44 rounded-lg overflow-hidden border border-[#2b2724] relative group">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" 
                  alt="Cellar atmosphere" 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-xs bg-black/70 text-white px-3 py-1 rounded-md border border-white/20">Expand View</span>
                </div>
              </div>
              <div className="text-[10px] text-[#737069] flex justify-between">
                <span>2840 × 1600 px • 412 KB</span>
                <span className="text-emerald-400">WebP Lossless</span>
              </div>
              <button className="w-full py-2 text-xs bg-[#1f1e1c] hover:bg-[#2a2825] border border-[#33302b] rounded-lg text-white font-medium transition">
                Replace Asset
              </button>
            </div>

            {/* Storefront Canvas Mirror / Live Preview */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium text-white">📱 Storefront Canvas Mirror</span>
                <span className="text-[9px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">Synced Live</span>
              </div>
              <div className="bg-[#0b0b0b] border border-[#262422] rounded-xl p-5 space-y-3">
                <span className="text-[9px] uppercase text-[#e87a38] tracking-widest font-semibold block">Our Heritage</span>
                <h5 className="text-sm font-serif text-white leading-snug">{headline}</h5>
                <p className="text-[11px] text-[#8c8880] leading-relaxed italic border-l-2 border-[#e87a38] pl-2.5">
                  "{manifesto.substring(0, 110)}..."
                </p>
                <div className="pt-2 flex items-center justify-between border-t border-[#1a1918] text-[10px] text-[#737069]">
                  <span>Chef Silva</span>
                  <span className="text-[#e87a38]">Silva Patron Sig.</span>
                </div>
              </div>
            </div>

            {/* Publishing Readiness Audit */}
            <div className="bg-[#141312] border border-[#242220] rounded-xl p-5 space-y-3.5">
              <div className="flex justify-between items-center text-xs text-white font-medium">
                <span>📋 Publishing Readiness Audit</span>
                <span className="text-emerald-400 text-xs">3 / 3 Passed</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center bg-[#1b1a18] p-2.5 rounded-lg border border-[#262422]">
                  <span className="text-emerald-400 flex items-center gap-2">✓ Story headline & epigraph configured</span>
                  <span className="text-[10px] text-[#737069]">100%</span>
                </div>
                <div className="flex justify-between items-center bg-[#1b1a18] p-2.5 rounded-lg border border-[#262422]">
                  <span className="text-emerald-400 flex items-center gap-2">✓ 3 Culinary team bios & avatars verified</span>
                  <span className="text-[10px] text-emerald-400 font-medium">READY</span>
                </div>
                <div className="flex justify-between items-center bg-[#1b1a18] p-2.5 rounded-lg border border-[#262422]">
                  <span className="text-emerald-400 flex items-center gap-2">✓ Asset WebP compression optimal (&lt; 500KB)</span>
                  <span className="text-[10px] text-[#737069]">412 KB</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}