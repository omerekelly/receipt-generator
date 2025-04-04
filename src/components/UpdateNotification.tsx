import React, { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UpdateNotificationProps {
  onUpdate: () => void;
}

const UpdateNotification: React.FC<UpdateNotificationProps> = ({ onUpdate }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'RELOAD_PAGE') {
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={onUpdate}
        className="flex items-center gap-2 bg-white dark:bg-gray-800 text-blue-500 dark:text-blue-400 px-8 py-3 rounded-[999px] hover:bg-blue-50 dark:hover:bg-gray-700 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:shadow-[0_8px_35px_rgba(59,130,246,0.25)] dark:hover:shadow-[0_8px_35px_rgba(59,130,246,0.4)] border border-blue-100 dark:border-gray-700 hover:border hover:border-blue-200 dark:hover:border-blue-400"
      >
        <RefreshCw className="w-4 h-4 animate-spin" />
        <span className="font-medium">{t('updateNow')}</span>
      </button>
    </div>
  );
};

export default UpdateNotification;