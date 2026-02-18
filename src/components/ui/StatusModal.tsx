'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusData {
  status: 'available' | 'away' | 'offline';
  lastSeen: string;
  idleMinutes: number;
  message?: string;
}

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Status API endpoint - update this to your server
const STATUS_API = '/api/status.json';

export function StatusModal({ isOpen, onClose }: StatusModalProps) {
  const [localTime, setLocalTime] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [isLiveSync, setIsLiveSync] = useState(false);
  const [statusData, setStatusData] = useState<StatusData | null>(null);

  // Fetch real status from server
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch(STATUS_API, { cache: 'no-store' });
      if (res.ok) {
        const data: StatusData = await res.json();
        setStatusData(data);
        setIsLiveSync(true);

        // Use real status if available
        if (data.status === 'available') {
          setIsAvailable(true);
        } else {
          setIsAvailable(false);
        }
        return;
      }
    } catch {
      // Fall back to time-based status
      setIsLiveSync(false);
    }

    // Fallback: time-based availability (8 AM - 8 PM UTC)
    const now = new Date();
    const utcHour = now.getUTCHours();
    setIsAvailable(utcHour >= 8 && utcHour < 20);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const updateTime = () => {
      const now = new Date();

      // Local time (Pakistan)
      const localOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Karachi',
      };
      setLocalTime(now.toLocaleTimeString('en-US', localOptions));

      // UTC time
      const utcOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'UTC',
      };
      setUtcTime(now.toLocaleTimeString('en-US', utcOptions));
    };

    updateTime();
    fetchStatus();

    const timeInterval = setInterval(updateTime, 1000);
    const statusInterval = setInterval(fetchStatus, 30000); // Fetch status every 30s

    return () => {
      clearInterval(timeInterval);
      clearInterval(statusInterval);
    };
  }, [fetchStatus, isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-[201] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md"
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.98) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8), 0 0 60px rgba(0,255,240,0.1)',
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-6">
                {/* Status Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{
                      background: isAvailable
                        ? 'linear-gradient(135deg, rgba(0,255,240,0.2) 0%, rgba(0,255,240,0.05) 100%)'
                        : 'linear-gradient(135deg, rgba(255,180,0,0.2) 0%, rgba(255,180,0,0.05) 100%)',
                      border: `1px solid ${isAvailable ? 'rgba(0,255,240,0.3)' : 'rgba(255,180,0,0.3)'}`,
                    }}
                  >
                    {isAvailable ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F2D0A4" strokeWidth="2">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffb400" strokeWidth="2">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                        <path d="M2 2l20 20" strokeOpacity="0.5" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: isAvailable ? '#F2D0A4' : '#ffb400' }}
                      >
                        {isAvailable ? 'AVAILABLE' : 'AWAY'}
                      </h3>
                      {isLiveSync && (
                        <span
                          className="px-2 py-0.5 text-[10px] font-semibold rounded-full"
                          style={{
                            background: 'rgba(0,255,240,0.15)',
                            color: '#F2D0A4',
                            border: '1px solid rgba(0,255,240,0.3)',
                          }}
                        >
                          LIVE
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-white/50">Status Monitor</p>
                  </div>
                </div>

                {/* Status Message */}
                <div className="mb-6 pl-4 border-l-2 border-white/10">
                  <p className="text-sm text-white/70 leading-relaxed">
                    {isAvailable
                      ? "I'm currently at my desk and ready to discuss your project. Feel free to reach out!"
                      : "I'm currently away from my desk. Leave a message and I'll get back to you soon."}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">Location</span>
                    </div>
                    <p className="text-sm font-medium text-white/80">Islamabad, PK</p>
                  </div>

                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">Local Time</span>
                    </div>
                    <p className="text-sm font-medium text-white/80 tabular-nums">{localTime} <span className="text-white/40 text-xs">({utcTime} UTC)</span></p>
                  </div>

                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">Response</span>
                    </div>
                    <p className="text-sm font-medium text-white/80">
                      {isAvailable ? 'Quick' : 'Later'}
                    </p>
                  </div>

                  <div
                    className="p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
                        <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                        <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                        <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                        <circle cx="12" cy="20" r="1" fill="currentColor" />
                      </svg>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">
                        {statusData?.idleMinutes !== undefined ? 'Idle' : 'Connection'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-white/80">
                      {statusData?.idleMinutes !== undefined
                        ? statusData.idleMinutes < 1
                          ? 'Active now'
                          : `${statusData.idleMinutes}m ago`
                        : isLiveSync ? 'Synced' : 'Offline'}
                    </p>
                  </div>
                </div>

                {/* How it works */}
                <div
                  className="p-4 rounded-xl mb-4"
                  style={{
                    background: 'rgba(0,255,240,0.03)',
                    border: '1px solid rgba(0,255,240,0.1)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F2D0A4" strokeWidth="2">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                    <span className="text-xs font-semibold text-[#F2D0A4] uppercase tracking-wider">How It Works</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">
                    {isLiveSync
                      ? "This status syncs in real-time with my computer activity. When I'm actively working, the status shows Available. If I step away, it updates to Away."
                      : "This status indicator shows my typical working hours (8 AM - 8 PM UTC). When live sync is available, it reflects my actual computer activity."}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-[10px] text-white/30">
                  <div className="flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Verified Presence</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    <span>Live Sync</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
