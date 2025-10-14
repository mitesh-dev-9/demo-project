import { useState } from 'react';
import { WalletConfig } from '../types';
import { Wallet, Network, Coins, Save, Settings as SettingsIcon, Plus, Trash2 } from 'lucide-react';

interface SettingsPageProps {
  config: WalletConfig;
  onUpdateConfig: (config: WalletConfig) => void;
}

export default function SettingsPage({ config, onUpdateConfig }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'wallets' | 'networks' | 'stablecoins'>('wallets');
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [walletsState, setWalletsState] = useState<string[]>(() => (config.wallets && config.wallets.length > 0 ? config.wallets : ['']));
  const [networksState, setNetworksState] = useState<string[]>(() => (config.networks && config.networks.length > 0 ? config.networks : ['']));
  const [coinsState, setCoinsState] = useState<string[]>(() => (config.stableCoins && config.stableCoins.length > 0 ? config.stableCoins : ['']));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    const newConfig: WalletConfig = {
      wallets: walletsState.map((v) => v.trim()).filter((v) => v !== ''),
      networks: networksState.map((v) => v.trim()).filter((v) => v !== ''),
      stableCoins: coinsState.map((v) => v.trim()).filter((v) => v !== ''),
    };

    setTimeout(() => {
      onUpdateConfig(newConfig);
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const tabConfig = [
    { id: 'wallets' as const, label: 'Wallets', icon: Wallet, color: 'blue' },
    { id: 'networks' as const, label: 'Networks', icon: Network, color: 'purple' },
    { id: 'stablecoins' as const, label: 'Stable Coins', icon: Coins, color: 'green' },
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        {/* Success Toast */}
        {showSuccess && (
          <div className="fixed top-8 right-8 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-scale-in z-50">
            <Save className="w-5 h-5" />
            <span className="font-medium">Settings saved successfully!</span>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-8 animate-scale-in">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <SettingsIcon className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-sm text-gray-500">Configure your wallet and payment preferences</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-lg">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-semibold rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-md scale-105'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-fade-in">
              {activeTab === 'wallets' && (
                <div className="space-y-4">
                  {walletsState.map((value, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-blue-500" />
                          Wallet Address {idx + 1}
                        </label>
                        {walletsState.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setWalletsState((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1"
                            title="Remove wallet"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setWalletsState((prev) => prev.map((p, i) => (i === idx ? v : p)));
                        }}
                        placeholder={`Enter wallet address ${idx + 1}`}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all group-hover:border-gray-300"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setWalletsState((prev) => [...prev, ''])}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-blue-200 text-blue-700 hover:bg-blue-50 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add wallet
                  </button>
                </div>
              )}

              {activeTab === 'networks' && (
                <div className="space-y-4">
                  {networksState.map((value, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Network className="w-4 h-4 text-purple-500" />
                          Network {idx + 1}
                        </label>
                        {networksState.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setNetworksState((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1"
                            title="Remove network"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setNetworksState((prev) => prev.map((p, i) => (i === idx ? v : p)));
                        }}
                        placeholder={`Enter network name ${idx + 1}`}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all group-hover:border-gray-300"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setNetworksState((prev) => [...prev, ''])}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-purple-200 text-purple-700 hover:bg-purple-50 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add network
                  </button>
                </div>
              )}

              {activeTab === 'stablecoins' && (
                <div className="space-y-4">
                  {coinsState.map((value, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Coins className="w-4 h-4 text-green-500" />
                          Stable Coin {idx + 1}
                        </label>
                        {coinsState.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setCoinsState((prev) => prev.filter((_, i) => i !== idx))}
                            className="text-red-500 hover:text-red-600 text-xs flex items-center gap-1"
                            title="Remove coin"
                          >
                            <Trash2 className="w-4 h-4" />
                            Remove
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const v = e.target.value;
                          setCoinsState((prev) => prev.map((p, i) => (i === idx ? v : p)));
                        }}
                        placeholder={`Enter stable coin ${idx + 1} (e.g., USDC, USDT)`}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all group-hover:border-gray-300"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setCoinsState((prev) => [...prev, ''])}
                    className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-green-200 text-green-700 hover:bg-green-50 transition-all"
                  >
                    <Plus className="w-4 h-4" /> Add coin
                  </button>
                </div>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full bg-gradient-to-r from-[#6b9d3e] to-[#5a8534] hover:from-[#5a8534] hover:to-[#4a7324] text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Saving Settings...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <SettingsIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Configuration Tips</p>
                <p className="text-sm text-gray-600">
                  Make sure to verify all addresses and network configurations before saving. 
                  Changes will be applied immediately to all payment transactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
