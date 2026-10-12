import { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const messages = [
  { id: 1, initials: 'TP', name: 'Tharushi Perera', email: 'tharushi.perera@holdings.lk', subject: 'Private Room Dinner & Sommelier Pairing Request', preview: 'We are celebrating our 10th anniversary with close family members. We’d like to reserve the Hearth Cellar Room.', time: '14m ago', tag: 'Table Reservation · 6 Guests', status: 'VIP Patron', color: 'orange', body: 'Dear Chef Silva and Hospitality Concierge,\n\nI am writing to formally request a reservation for our 10th wedding anniversary dinner on Friday, October 25th at 19:30 for a party of six. We had an unforgettable experience in May and would like to reserve the Hearth Cellar Room specifically to ensure an intimate atmosphere for our guests.\n\nCould you confirm availability for the 9-course Autumn Tasting Menu along with sommelier wine pairing? Please take note that one of our guests has a severe shellfish allergy and will require a customized substitution.\n\nLooking forward to your confirmation and payment link for the deposit.\n\nWarm regards,\nTharushi Perera' },
  { id: 2, initials: 'KS', name: 'Kavindu Silva', email: 'kavindu.arch@studio.com', subject: 'Corporate Year-End Tasting Menu Buyout', preview: 'Hello Silva team, our architecture partners would love to book the full veranda for our year-end celebration.', time: '48m ago', tag: 'Catering/Private · 28 Guests', status: 'Heard Dining', color: 'gold', body: 'Hello Silva team,\n\nOur architecture partners would love to book the full veranda for our year-end celebration. We are expecting around 28 guests and would love to hear about your group tasting menus and private dining options.\n\nCould you send over a few available dates in December?\n\nBest,\nKavindu' },
  { id: 3, initials: 'NF', name: 'Nimesh Fernando', email: 'nimesh.fernando@gmail.com', subject: 'Allergy Clarification & Chef’s Counter Seating', preview: 'We have booked Table 04 for tonight at 20:30. My spouse has an acute allergy to cashews.', time: '2h ago', tag: 'Table Reservation · 2 Guests', status: 'Allergy Alert', color: 'green', body: 'Hello,\n\nWe have booked Table 04 for tonight at 20:30. My spouse has an acute allergy to cashews. Could you please confirm the kitchen has noted this on the reservation?\n\nThank you,\nNimesh' },
  { id: 4, initials: 'DJ', name: 'Dilani Jayawardena', email: 'dilani.jayawardena@outlook.com', subject: 'Sommelier Cellar Reserve Allocation', preview: 'Regarding the 2015 Barolo Monprivato bottle you poured for our anniversary dinner last Saturday...', time: 'Yesterday', tag: 'General Inquiry · Sommelier', status: 'Replied', color: 'gray', body: 'Hello,\n\nRegarding the 2015 Barolo Monprivato bottle you poured for our anniversary dinner last Saturday, would you be able to reserve another bottle for our next visit?\n\nMany thanks,\nDilani' },
  { id: 5, initials: 'HW', name: 'Harin Wickramaratne', email: 'harin.w@protonmail.com', subject: 'Private dining availability', preview: 'Could you let me know whether the courtyard is available for a small birthday dinner?', time: 'Oct 18', tag: 'Catering/Private · 10 Guests', status: 'New', color: 'blue', body: 'Hello Tastoria,\n\nCould you let me know whether the courtyard is available for a small birthday dinner in November? We would be a group of ten.\n\nThank you,\nHarin' },
]

const navItems = [
  { label: 'Dashboard Overview', code: 'OV', to: '/admin', end: true },
  { label: 'Order Management', code: 'OR', muted: true, count: '12' },
  { label: 'Home Content CMS', code: 'HM', muted: true },
  { label: 'About Content CMS', code: 'AB', to: '/', end: true },
  { label: 'Contact & Messages', code: 'CM', to: '/admin/messages', count: '8' },
  { label: 'Media & Asset Library', code: 'ME', muted: true },
]

function AdminFrame({ children, active }) {
  return (
    <div className="admin-app">
      <header className="admin-topbar">
        <Link className="admin-brand" to="/" aria-label="Tastoria public site"><span className="brand-mark">T</span><span>Tastoria</span></Link>
        <span className="admin-topbar-divider" />
        <span className="admin-context">Operations &amp; CMS</span>
        <div className="admin-topbar-actions">
          <button className="icon-button notification-button" type="button" aria-label="Notifications">♧<i /></button>
          <button className="profile-button" type="button"><span className="avatar avatar-photo">S</span><span><b>Silva</b><small>Superadmin</small></span><span className="profile-caret">⌄</span></button>
        </div>
      </header>
      <aside className="admin-sidebar">
        <span className="sidebar-caption">Operations &amp; CMS</span>
        <nav aria-label="Admin navigation">
          {navItems.map((item) => {
            const content = <><span className="sidebar-code">{item.code}</span><span className="sidebar-label">{item.label}</span>{item.count && <span className="sidebar-count">{item.count}</span>}</>
            return item.to ? (
              <NavLink key={item.label} to={item.to} end={item.end} className={({ isActive }) => `sidebar-link${isActive ? ' is-active' : ''}${active === item.to ? ' is-current' : ''}`}>
                {content}
              </NavLink>
            ) : (
              <span className="sidebar-link sidebar-link-muted" key={item.label} aria-disabled="true">{content}</span>
            )
          })}
        </nav>
        <Link className="sidebar-account" to="/"><span className="avatar">S</span><span><b>Silva Chef-Patron</b><small>Administrator</small></span><span className="account-more">···</span></Link>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  )
}

const stats = [
  { label: 'Total orders', value: '248', change: '+12%', code: 'OR', tone: 'orange', detail: 'vs last week' },
  { label: 'Gross revenue', value: '$4,320', change: '+18%', code: '$', tone: 'gold', detail: 'vs last week' },
  { label: 'Pending orders', value: '12', change: 'Needs prep', code: '!', tone: 'orange', detail: '5 min avg response' },
  { label: 'Inbound inquiries', value: '8', change: '+14%', code: 'IN', tone: 'green', detail: 'new today' },
  { label: 'Active assets', value: '42', change: '+7%', code: 'AS', tone: 'neutral', detail: '9.4 GB cached' },
]

function RevenueChart() {
  return (
    <svg className="revenue-chart" viewBox="0 0 560 240" role="img" aria-label="Orders and revenue trended upward over the last seven days">
      <defs><linearGradient id="revenue-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#f47a24" stopOpacity=".28" /><stop offset="100%" stopColor="#f47a24" stopOpacity="0" /></linearGradient></defs>
      {[35, 85, 135, 185].map((y) => <line key={y} x1="44" x2="520" y1={y} y2={y} stroke="#37312d" strokeDasharray="3 5" />)}
      <path d="M44 177 C92 160 111 148 151 139 S226 117 251 103 S328 87 357 99 S427 78 457 67 S497 42 520 32 L520 190 L44 190 Z" fill="url(#revenue-fill)" />
      <path d="M44 177 C92 160 111 148 151 139 S226 117 251 103 S328 87 357 99 S427 78 457 67 S497 42 520 32" fill="none" stroke="#f47a24" strokeWidth="3" />
      <path d="M44 160 C94 148 110 138 151 126 S224 91 251 85 S324 71 357 81 S421 58 457 52 S496 37 520 26" fill="none" stroke="#f0b323" strokeWidth="2.5" />
      {[44, 124, 204, 284, 364, 444, 520].map((x, i) => <text key={x} x={x} y="218" textAnchor="middle" fill="#817971" fontSize="10">{['Jul 14', 'Jul 15', 'Jul 16', 'Jul 17', 'Jul 18', 'Jul 19', 'Jul 20'][i]}</text>)}
      <circle cx="520" cy="32" r="4" fill="#f47a24" stroke="#fff" strokeWidth="2" /><circle cx="520" cy="26" r="4" fill="#f0b323" stroke="#fff" strokeWidth="2" />
    </svg>
  )
}

const orders = [
  ['#ORD-1001', 'John McCarthy', 'Jul 20 · 10:24 AM', '$24.50', 'Completed'],
  ['#ORD-1002', 'Priya Sharma', 'Jul 20 · 10:32 AM', '$32.00', 'Preparing'],
  ['#ORD-1003', 'David Lee', 'Jul 19 · 08:45 PM', '$18.75', 'Completed'],
  ['#ORD-1004', 'Sarah Kapoor', 'Jul 19 · 07:12 PM', '$42.00', 'Completed'],
  ['#ORD-1005', 'Michael Brown', 'Jul 20 · 04:30 PM', '$29.50', 'Cancelled'],
]

export function DashboardPage() {
  return (
    <AdminFrame active="/admin">
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <div><span className="live-label"><i /> Live shift · Kitchen is operational</span><h1>Welcome back, Silva</h1><p>Here’s what’s happening with your restaurant today. All lines are operating at optimal speed.</p></div>
          <div className="welcome-special"><span className="special-icon">✦</span><div><small>Today’s menu feature</small><b>“Good Food Brings People Together”</b><span>Heirloom Chermoula · Cumin-roasted cauliflower · Espresso</span></div></div>
        </div>
        <section className="metric-grid" aria-label="Today's restaurant metrics">
          {stats.map((stat) => <article className="metric-card" key={stat.label}><div className="metric-heading"><span>{stat.label}</span><span className={`metric-code tone-${stat.tone}`}>{stat.code}</span></div><strong>{stat.value}</strong><div className="metric-foot"><span className={`metric-change tone-${stat.tone}`}>{stat.change}</span><span>{stat.detail}</span><svg viewBox="0 0 48 18" aria-hidden="true"><path d="M2 15 12 11 20 13 31 6 38 8 46 2" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></div></article>)}
        </section>
        <section className="dashboard-grid">
          <article className="admin-panel trend-panel"><div className="panel-heading"><div><h2>Orders &amp; revenue trends</h2><p>Performance comparison over the recent operational period</p></div><select aria-label="Chart period" defaultValue="7"><option value="7">Last 7 days</option><option value="30">Last 30 days</option></select></div><div className="chart-legend"><span><i className="legend-orange" /> Orders</span><span><i className="legend-gold" /> Revenue ($)</span></div><RevenueChart /></article>
          <article className="admin-panel status-panel"><div className="panel-heading"><div><h2>Status breakdown</h2><p>Live distribution for today’s kitchen load</p></div><button className="text-icon-button" type="button" aria-label="More status options">···</button></div><div className="status-ring"><div><strong>248</strong><span>Total orders</span></div></div><div className="status-legend"><span>Completed <b>68%</b></span><span>Preparing <b>19%</b></span><span>Pending <b>5%</b></span><span>Cancelled <b>8%</b></span></div></article>
          <article className="admin-panel quick-panel"><div className="panel-heading"><div><h2>Quick actions</h2><p>Frequent tasks for fast-paced shifts</p></div></div><div className="quick-actions"><button type="button"><b className="quick-icon orange-bg">+</b><span>Add daily special</span></button><button type="button"><b className="quick-icon">▧</b><span>Upload media</span></button><button type="button"><b className="quick-icon orange-bg">≡</b><span>Live orders</span></button><NavLink to="/admin/messages"><b className="quick-icon green-bg">✉</b><span>Review inquiries</span></NavLink></div><button className="shift-button" type="button">⚙ <span>Configure shift dispatch</span></button></article>
          <article className="admin-panel orders-panel"><div className="panel-heading"><div><h2>Recent orders</h2><p>Real-time point of sale tickets</p></div><button className="panel-link" type="button">View all <span>↗</span></button></div><div className="orders-table-wrap"><table><thead><tr><th>Order ID</th><th>Customer</th><th>Date / time</th><th>Total</th><th>Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order[0]}>{order.map((value, index) => <td key={index}>{index === 4 ? <span className={`order-status status-${value.toLowerCase()}`}>{value}</span> : value}</td>)}</tr>)}</tbody></table></div></article>
          <article className="admin-panel guest-panel"><div className="panel-heading"><div><h2>Guest messages</h2><p>Inquiries, catering &amp; guest requests</p></div><span className="unread-dot" /></div><div className="guest-preview-list">{messages.slice(0, 3).map((message) => <Link to="/admin/messages" className="guest-preview" key={message.id}><span className={`avatar avatar-${message.color}`}>{message.initials}</span><span className="guest-preview-copy"><b>{message.name}</b><small>{message.preview}</small></span><time>{message.time}</time></Link>)}</div><NavLink className="open-inbox" to="/admin/messages">Open message inbox <span>↗</span></NavLink></article>
          <article className="admin-panel kitchen-panel"><div className="panel-heading"><div><h2>Kitchen &amp; floor live</h2><p>Real-time throughput status</p></div><span className="live-flame">✦</span></div><div className="occupancy-row"><b>Table occupancy</b><strong>78% full</strong></div><div className="occupancy-track"><i /></div><p className="kitchen-footnote">14 of 18 tables are seated <span>4 available</span></p><div className="station-list"><b>Station ticket queue</b><span>Grill Station <strong>4 tickets</strong></span><span>Pastry &amp; Sauté <strong>3 tickets</strong></span><span>Cold Bar / Salads <strong>2 tickets</strong></span><span>Delivery Couriers <strong>3 en route</strong></span></div><button className="floor-button" type="button">⌖ Open floor map &amp; KDS</button></article>
        </section>
      </div>
    </AdminFrame>
  )
}

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState(1)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All')
  const [draft, setDraft] = useState('')
  const [notice, setNotice] = useState('')
  const selected = messages.find((message) => message.id === selectedId) ?? messages[0]
  const visibleMessages = useMemo(() => messages.filter((message) => {
    const searchText = `${message.name} ${message.subject} ${message.preview} ${message.tag}`.toLowerCase()
    const matchesQuery = searchText.includes(query.toLowerCase())
    const matchesFilter = filter === 'All' || (filter === 'Reservations' && message.tag.toLowerCase().includes('reservation')) || (filter === 'Catering/Private' && message.tag.toLowerCase().includes('catering'))
    return matchesQuery && matchesFilter
  }), [query, filter])

  function sendReply(event) {
    event.preventDefault()
    if (!draft.trim()) return
    setNotice(`Reply queued for ${selected.name}`)
    setDraft('')
  }

  return (
    <AdminFrame active="/admin/messages">
      <div className="messages-page">
        <div className="messages-heading"><div><h1>Contact &amp; guest messages <span className="inquiry-count">8 unread inquiries</span></h1><p>Oct 24, 2024 – Oct 31, 2024 <span>·</span> Service Shift · Dinner Pricing (18:00 – 23:30)</p></div><div className="message-toolbar"><label className="message-search"><span>⌕</span><input aria-label="Search messages or guests" placeholder="Filter messages or guests..." value={query} onChange={(event) => setQuery(event.target.value)} /></label><button type="button" className="filter-button" onClick={() => setFilter(filter === 'All' ? 'Reservations' : filter === 'Reservations' ? 'Catering/Private' : 'All')}>☷ <span>Filter</span><i>{filter !== 'All' ? filter : ''}</i></button><button type="button" className="export-button" onClick={() => setNotice('Inquiry export is ready')}>⇩ <span>Export inquiries</span></button></div></div>
        <div className="message-workspace">
          <section className="inbox-column" aria-label="Guest inquiry list"><div className="message-tabs">{[['All', '24'], ['Reservations', '10'], ['Catering/Private', '6']].map(([label, count]) => <button key={label} className={filter === label ? 'tab-active' : ''} type="button" onClick={() => setFilter(label)}>{label}<span>{count}</span></button>)}</div><div className="message-list">{visibleMessages.map((message) => <button type="button" key={message.id} className={`message-row${selectedId === message.id ? ' message-selected' : ''}`} onClick={() => { setSelectedId(message.id); setNotice('') }}><span className={`avatar avatar-${message.color}`}>{message.initials}</span><span className="message-row-body"><span className="message-row-meta"><b>{message.name}</b><time>{message.time}</time></span><small>{message.email}</small><strong>{message.subject}</strong><span className="message-preview">{message.preview}</span><span className="message-tags"><i className={`tag-${message.color}`}>{message.tag}</i><i>{message.status}</i></span></span></button>)}{visibleMessages.length === 0 && <p className="empty-results">No inquiries match this search.</p>}</div></section>
          <section className="message-detail" aria-label={`Message from ${selected.name}`}><div className="detail-person"><span className={`avatar avatar-${selected.color}`}>{selected.initials}</span><div><h2>{selected.name} <span className="vip-pill">VIP PATRON</span></h2><p>{selected.email} <span>·</span> +94 77 870 2341 <span>◎</span></p><small>◷ Received Today at 17:42</small></div><div className="detail-actions"><button type="button" aria-label="Archive inquiry">▣</button><button type="button" aria-label="More message actions">···</button></div></div>
            <div className="reservation-facts"><div><span>Requested date</span><b>Fri, Oct 25, 2024</b></div><div><span>Time &amp; table</span><b>19:30 · Cellar Room</b></div><div><span>Party size</span><b className="orange-text">6 Guests (Private)</b></div><div><span>Lifetime visits</span><b>14 Visits ($6,840)</b></div></div>
            <div className="flagged-note"><span>!</span><p><b>Dietary &amp; Wine Preferences:</b> Guest Shellfish Anaphylaxis; Prefers French Grand Cru pairing.</p><strong>Chef Flagged</strong></div>
            <div className="email-body"><div className="email-meta"><b>INQUIRY BODY</b><span>MSG-18 · #SLV-9882</span></div><div className="email-paper">{selected.body.split('\n').map((line, index) => line ? <p key={index}>{line}</p> : <br key={index} />)}</div></div>
            <form className="reply-area" onSubmit={sendReply}><div className="reply-header"><div><b>Quick reply &amp; dispatch</b><small>Templates: <button type="button" onClick={() => setDraft('Thank you for reaching out. We would be delighted to host you. ') }>+ Confirm Reservation</button><button type="button" onClick={() => setDraft('Thank you for your inquiry. Please find our menu attached. ') }>+ Send Menu PDF</button><button type="button" onClick={() => setDraft('Could you share a few more details so we can help? ') }>+ Request More Info</button></small></div><span>Press Ctrl+Enter to dispatch</span></div><textarea aria-label="Reply to guest" placeholder="Dear Ms. Perera,\n\nWe are delighted to confirm your anniversary celebration..." value={draft} onChange={(event) => setDraft(event.target.value)} /><div className="reply-actions"><span>✉ &nbsp; Attachments &nbsp; · &nbsp; CC: concierge@tastoria.com</span><button className="save-draft" type="button" onClick={() => setNotice('Draft saved')}>Save draft</button><button className="send-reply" type="submit">➤ <span>Send reply</span></button></div></form>
            <div className="message-foot-cards"><div><span className="foot-card-mark">▣</span><div><b>Hearth Cellar Room</b><span>Friday, Oct 25, 2024 · Vacant until 19:30</span></div><em>Available</em></div><div><span className="foot-card-mark">◷</span><div><b>Avg inquiry SLA</b><span>VIP response in 18m</span></div><em>98.4% in time</em></div></div>
            {notice && <div className="admin-toast" role="status">{notice}<button type="button" aria-label="Dismiss notification" onClick={() => setNotice('')}>×</button></div>}
          </section>
        </div>
      </div>
    </AdminFrame>
  )
}