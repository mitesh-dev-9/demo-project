import { useState, useMemo } from "react";
import { Invoice, WalletConfig } from "../types";
import { X, Check, AlertCircle, ChevronDown } from "lucide-react";

interface PaymentModalProps {
  invoice: Invoice;
  walletConfig: WalletConfig;
  onClose: () => void;
  onConfirm: (invoiceId: string) => void;
}

type PaymentStatus = "form" | "processing" | "success" | "error";

export default function PaymentModal({
  invoice,
  walletConfig,
  onClose,
  onConfirm,
}: PaymentModalProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("form");
  const [paymentType, setPaymentType] = useState<"full" | "partial">("full");
  const [partialAmount, setPartialAmount] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("");

  // Use wallet config with fallback to default values
  const wallets = useMemo(() => {
    const configWallets = walletConfig.wallets.filter(
      (w) => w && w.trim() !== ""
    );
    return configWallets.length > 0
      ? configWallets
      : ["0x1234...5678", "0xabcd...ef01", "0x9876...5432"];
  }, [walletConfig.wallets]);

  const stableCoins = useMemo(() => {
    const configCoins = walletConfig.stableCoins.filter(
      (c) => c && c.trim() !== ""
    );
    return configCoins.length > 0 ? configCoins : ["USDC", "USDT", "DAI"];
  }, [walletConfig.stableCoins]);

  const networks = useMemo(() => {
    const configNetworks = walletConfig.networks.filter(
      (n) => n && n.trim() !== ""
    );
    return configNetworks.length > 0
      ? configNetworks
      : ["Ethereum", "Polygon", "BSC"];
  }, [walletConfig.networks]);

  const handlePayment = () => {
    setPaymentStatus("processing");
    setTimeout(() => {
      const success = Math.random() > 0.3;
      setPaymentStatus(success ? "success" : "error");
      if (success) {
        setTimeout(() => {
          onConfirm(invoice.id);
        }, 2000);
      }
    }, 2000);
  };

  if (paymentStatus === "success") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] rounded-3xl p-12 max-w-md w-full text-center animate-scale-in shadow-2xl">
          <div className="relative mb-6 mx-auto w-32 h-32">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-xl">
              <Check
                className="w-20 h-20 text-white animate-scale-in"
                strokeWidth={3}
              />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </h2>
          <p className="text-white/70">Your invoice has been paid</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === "error") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] rounded-3xl p-12 max-w-md w-full text-center relative animate-scale-in shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-all hover:rotate-90"
            aria-label="Close modal"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative mb-6 mx-auto w-32 h-32">
            <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl">
              <X className="w-20 h-20 text-white" strokeWidth={3} />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Payment Failed</h2>
          <p className="text-white/70 mb-6">
            Something went wrong. Please try again.
          </p>
          <button
            onClick={() => setPaymentStatus("form")}
            className="bg-white text-[#1e3a5f] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (paymentStatus === "processing") {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
        <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] rounded-3xl p-12 max-w-md w-full text-center animate-scale-in shadow-2xl">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 w-32 h-32 bg-blue-500/20 rounded-full animate-ping"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full flex items-center justify-center">
              <div className="w-20 h-20 border-4 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Processing Payment
          </h2>
          <p className="text-white/70">
            Please wait while we authorize your transaction...
          </p>
          <div className="flex justify-center gap-1 mt-6">
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative animate-scale-in shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-all"
          aria-label="Close modal"
          title="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Payment Details
          </h2>
          <p className="text-gray-500 text-sm">
            Invoice:{" "}
            <span className="font-semibold text-gray-900">{invoice.id}</span>
          </p>
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Amount:</span> $
              {invoice.amount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Payment Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Payment Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentType("full")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentType === "full"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <div className="font-semibold">Pay Full</div>
                <div className="text-sm mt-1">
                  ${invoice.amount.toLocaleString()}
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaymentType("partial")}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentType === "partial"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300 text-gray-700"
                }`}
              >
                <div className="font-semibold">Pay Partial</div>
                <div className="text-sm mt-1">Custom amount</div>
              </button>
            </div>
            {paymentType === "partial" && (
              <input
                type="number"
                value={partialAmount}
                onChange={(e) => setPartialAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-3 w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          {/* Wallet Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Wallet Address
            </label>
            <div className="relative">
              <select
                value={selectedWallet}
                onChange={(e) => setSelectedWallet(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select wallet address"
                title="Choose your wallet address"
              >
                <option value="">Select wallet...</option>
                {wallets.map((wallet, index) => (
                  <option key={index} value={wallet}>
                    {wallet}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Stable Coin Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Stable Coin
            </label>
            <div className="relative">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select stable coin"
                title="Choose your stable coin"
              >
                <option value="">Select coin...</option>
                {stableCoins.map((coin) => (
                  <option key={coin} value={coin}>
                    {coin}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Network Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Network
            </label>
            <div className="relative">
              <select
                value={selectedNetwork}
                onChange={(e) => setSelectedNetwork(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-label="Select network"
                title="Choose your network"
              >
                <option value="">Select network...</option>
                {networks.map((network) => (
                  <option key={network} value={network}>
                    {network}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Warning Box */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-semibold">Network Verification</p>
              <p className="mt-1">
                Please ensure you're on the correct network. Gas fees may apply.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handlePayment}
              disabled={!selectedWallet || !selectedCoin || !selectedNetwork}
              className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
            >
              Confirm Payment
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-500 space-y-1">
          <p>
            By confirming, you agree to our{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Terms of Service
            </span>
          </p>
          <p>
            and{" "}
            <span className="text-blue-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
