function TabBar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Details' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'skills', label: 'Skills' },
    { id: 'spells', label: 'Spells' },
    { id: 'buffs-debuffs', label: 'Buffs and Debuffs' },
  ];

  return (
    <div className="tab-bar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={activeTab === tab.id ? 'tab-btn active' : 'tab-btn'}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default TabBar;