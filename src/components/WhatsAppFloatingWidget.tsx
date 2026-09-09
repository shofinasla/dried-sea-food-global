import { useState } from 'react';
import { MessageCircle, X, ExternalLink, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useTranslation } from '../i18n/LanguageContext';

export default function WhatsAppFloatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentLang } = useTranslation();

  const getGreeting = () => {
    switch (currentLang) {
      case 'zh':
        return '您好！欢迎联系印尼 Dried Seafood Global 出口团队。请问您需要了解哪类干鱼或海产产品？';
      case 'ja':
        return 'こんにちは！インドネシア Dried Seafood Global 輸出デスクへようこそ。どのような海産乾物をお探しですか？';
      case 'ko':
        return '안녕하세요! 인도네시아 Dried Seafood Global 수출 전담 데스크입니다. 건어물 및 염장 생선 수출 상담을 도와드리겠습니다.';
      case 'ar':
        return 'مرحباً! مرحباً بكم في مكتب تصدير الأسماك المجففة والمأكولات البحرية من إندونيسيا. كيف يمكننا مساعدتك اليوم؟';
      case 'id':
        return 'Halo! Selamat datang di Export Desk Dried Seafood Global Indonesia. Ada yang dapat kami bantu terkait pemesanan & ekspor komoditas ikan kering?';
      case 'es':
        return '¡Hola! Bienvenido a la Mesa de Exportación de Dried Seafood Global Indonesia. ¿En qué podemos ayudarle con respecto a nuestros pescados secos?';
      case 'fr':
        return 'Bonjour ! Bienvenue au bureau export de Dried Seafood Global Indonésie. Comment pouvons-nous vous aider pour vos commandes de poissons séchés ?';
      case 'de':
        return 'Guten Tag! Willkommen beim Export-Desk von Dried Seafood Global Indonesien. Wie können wir Ihnen bei Trockenfisch und Meeresfrüchten helfen?';
      case 'vi':
        return 'Xin chào! Chào mừng quý khách đến với Bàn xuất khẩu Dried Seafood Global Indonesia. Chúng tôi có thể hỗ trợ gì về thủy hải sản khô?';
      case 'ru':
        return 'Здравствуйте! Добро пожаловать в экспортный отдел Dried Seafood Global Индонезия. Чем мы можем помочь по поставкам сушеной рыбы?';
      default:
        return 'Hello! Welcome to Dried Seafood Global Indonesia Export Desk. How can we assist you with our dried seafood and salted fish commodities?';
    }
  };

  const getButtonLabel = () => {
    switch (currentLang) {
      case 'zh': return '在线咨询 (WhatsApp)';
      case 'ja': return 'WhatsApp相談 (24h)';
      case 'ko': return '실시간 상담 (WhatsApp)';
      case 'ar': return 'مكتب التصدير (واتساب)';
      case 'id': return 'Hotline Ekspor (24 Jam)';
      case 'es': return 'Chat Exportación (WhatsApp)';
      case 'fr': return 'Assistance Export (WhatsApp)';
      case 'de': return 'Export-Chat (WhatsApp)';
      case 'vi': return 'Tư vấn xuất khẩu (WhatsApp)';
      case 'ru': return 'Экспортный чат (WhatsApp)';
      default: return 'Export Desk (24/7)';
    }
  };

  const defaultMessage = encodeURIComponent(
    `Hello Dried Seafood Global, I am interested in importing Indonesian dried seafood & salted fish commodities. Please provide catalog and export terms.`
  );

  const whatsappUrl = `https://wa.me/6288985582838?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white border border-slate-200 rounded-3xl shadow-2xl p-4 animate-fadeIn overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-sm">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Export Desk 24/7</h4>
                <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Online & Ready for RFQ
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3.5 px-3 bg-slate-50 rounded-2xl my-3 text-xs text-slate-700 leading-relaxed border border-slate-100">
            <p>{getGreeting()}</p>
            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official B2B Trade WhatsApp (+62 889-8558-2838)</span>
            </div>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              fetch('/api/analytics/event', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'whatsapp_click', label: 'Floating Widget', path: window.location.pathname })
              }).catch(() => {});
            }}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="btn-whatsapp-floating"
        title="Direct WhatsApp Export Consultation"
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
      >
        <div className="relative">
          <MessageCircle className="w-5 h-5 text-white" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
        </div>
        <span className="text-xs font-bold tracking-wide hidden sm:inline">
          {getButtonLabel()}
        </span>
      </button>
    </div>
  );
}
