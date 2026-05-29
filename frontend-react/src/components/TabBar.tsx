import { Tab } from '../types'

interface TabBarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void
}

function TabBar({activeTab, setActiveTab}: TabBarProps) {
  const tabs = [
    { id: 'overview',   label: 'Overview' },
    { id: 'details',    label: 'Details' },
    { id: 'inventory',  label: 'Inventory' },
    { id: 'skills',     label: 'Skills' },
    { id: 'spells',     label: 'Spells' },
    { id: 'conditions', label: 'Conditions' }
  ] as const;

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