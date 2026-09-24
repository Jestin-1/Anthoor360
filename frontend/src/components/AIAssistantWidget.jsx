import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Mic, 
  MicOff, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function AIAssistantWidget() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: language === 'ml'
        ? 'നമസ്കാരം! ഞാൻ ആന്തൂർ 360 എ.ഐ അസിസ്റ്റന്റാണ്. ആശുപത്രികൾ, സ്കൂളുകൾ, വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ, നികുതി അടയ്ക്കൽ തുടങ്ങിയ എന്ത് വിവരങ്ങളും എന്നോട് ചോദിക്കാം.'
        : 'Hello! I am Anthoor 360 AI Civic Assistant. You can ask me about nearby hospitals, government colleges, citizen services, temple timings, or municipal wards in Anthoor.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Voice Recognition support
  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please use Chrome/Edge.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ml' ? 'ml-IN' : 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSendQuery(transcript);
    };

    recognition.start();
  };

  const handleSendQuery = (textToSend = input) => {
    const q = textToSend.trim();
    if (!q) return;

    // User message
    const userMsg = { sender: 'user', text: q };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Process intent
    setTimeout(() => {
      const lower = q.toLowerCase();
      let responseText = "";
      let actions = [];

      if (lower.includes('hospital') || lower.includes('clinic') || lower.includes('ആശുപത്രി') || lower.includes('ഡോക്ടർ') || lower.includes('chc')) {
        responseText = language === 'ml'
          ? "ആന്തൂർ നഗരസഭയിലെ പ്രധാന ആരോഗ്യ കേന്ദ്രങ്ങൾ: 1) ധർമ്മശാല ലിങ്ക് റോഡിലുള്ള ആന്തൂർ താലൂക്ക് കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ (സി.എച്ച്.സി - 24x7 അത്യാഹിത വിഭാഗം), 2) പറശ്ശിനിക്കടവ് ആയുർവേദ മെഡിക്കൽ കോളേജ്, 3) മൊറാഴ കുടുംബാരോഗ്യ കേന്ദ്രം."
          : "Anthoor Municipality healthcare facilities include: 1) Anthoor Taluk Community Health Centre (CHC) at Dharmasala with 24x7 Emergency/Casualty (Ph: 0497 2780108), 2) Parassinikkadavu Ayurveda Medical College & Hospital, and 3) Morazha Primary Health Centre.";
        actions = [
          { label: "View Hospitals on Map", action: () => navigate('/map?category=healthcare') },
          { label: "Emergency Contacts", action: () => navigate('/emergency') }
        ];
      } else if (lower.includes('tax') || lower.includes('building') || lower.includes('നികുതി') || lower.includes('സഞ്ചയ') || lower.includes('property')) {
        responseText = language === 'ml'
          ? "കെട്ടിട നികുതി സഞ്ചയ (Sanchaya) ഓൺലൈൻ പോർട്ടൽ വഴി അടയ്ക്കാം. വാർഡ് നമ്പറും ഡോർ നമ്പറും നൽകി യു.പി.ഐ / നെറ്റ് ബാങ്കിംഗ് വഴി അടച്ച് ഡിജിറ്റൽ രസീത് ഉടൻ ഡൗൺലോഡ് ചെയ്യാം."
          : "Property & Building Tax can be paid online directly via Kerala LSGD's Sanchaya portal (tax.lsgkerala.gov.in) using your Ward & Door number. Receipts are generated instantly.";
        actions = [
          { label: "Citizen Services Guide", action: () => navigate('/services') },
          { label: "Open Sanchaya Portal", url: "https://tax.lsgkerala.gov.in" }
        ];
      } else if (lower.includes('parassinikkadavu') || lower.includes('temple') || lower.includes('muthappan') || lower.includes('ക്ഷേത്രം') || lower.includes('മുത്തപ്പൻ')) {
        responseText = language === 'ml'
          ? "ശ്രീ പറശ്ശിനിക്കടവ് മുത്തപ്പൻ മടപ്പുര വളപട്ടണം പുഴയുടെ തീരത്താണ്. ദിവസവും രാവിലെ 5:00 മുതൽ രാത്രി 8:30 വരെ തുറന്നിരിക്കും. ദിവസേന മുത്തപ്പൻ തിറയാട്ടവും പ്രസാദ ഊട്ടും ഉണ്ടായിരിക്കും."
          : "Parassinikkadavu Sree Muthappan Madappura is located on the scenic banks of Valapattanam River. Open daily 5:00 AM - 8:30 PM with daily Muthappan Theyyam performances, free tea, and boiled green gram prasadam.";
        actions = [
          { label: "View Temple on Map", action: () => navigate('/map?facility=fac-5') },
          { label: "Tourism Details", action: () => navigate('/tourism') }
        ];
      } else if (lower.includes('college') || lower.includes('school') || lower.includes('education') || lower.includes('gcek') || lower.includes('nift') || lower.includes('വിദ്യാഭ്യാസം') || lower.includes('കോളേജ്')) {
        responseText = language === 'ml'
          ? "ആന്തൂർ നഗരസഭയിലെ പ്രധാന ഉന്നത വിദ്യാഭ്യാസ സ്ഥാപനങ്ങൾ: 1) ഗവ. എൻജിനീയറിങ് കോളേജ് കണ്ണൂർ (GCEK), 2) നാഷണൽ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഫാഷൻ ടെക്നോളജി (NIFT), 3) കണ്ണൂർ സർവ്വകലാശാല മാങ്ങാട്ടുപറമ്പ് കാമ്പസ്."
          : "Anthoor is Kannur's premier educational hub hosting: 1) Government College of Engineering Kannur (GCEK), 2) National Institute of Fashion Technology (NIFT Kannur), and 3) Kannur University Mangattuparamba Campus.";
        actions = [
          { label: "View Education Hub on Map", action: () => navigate('/map?category=education') }
        ];
      } else if (lower.includes('snake') || lower.includes('vismaya') || lower.includes('vellikkeel') || lower.includes('പാമ്പ്') || lower.includes('വിനോദം') || lower.includes('ടൂറിസം')) {
        responseText = language === 'ml'
          ? "ആന്തൂരിലെ പ്രധാന വിനോദസഞ്ചാര കേന്ദ്രങ്ങൾ: പറശ്ശിനിക്കടവ് സ്നേക്ക് പാർക്ക് & മൃഗശാല, വെള്ളിക്കീൽ കണ്ടൽ ഇക്കോ ടൂറിസം പാർക്ക്, വിസ്മയ വാട്ടർ തീം പാർക്ക്, വളപട്ടണം റിവർ ക്രൂയിസ് എന്നിവയാണ്."
          : "Top attractions in Anthoor: Parassinikkadavu Snake Park & Zoo, Vellikkeel Eco Tourism Mangrove Walkway, Vismaya Water Theme Park, and historical Morazha Martyr Memorial.";
        actions = [
          { label: "Explore Tourism Section", action: () => navigate('/tourism') }
        ];
      } else {
        responseText = language === 'ml'
          ? `ആന്തൂർ 360-ൽ "${q}" സംബന്ധിച്ച വിവരങ്ങൾ ലഭ്യമാണ്. മാപ്പ് തുറന്നോ പൗരസേവന സഹായി വഴിയോ കൂടുതൽ അറിയാം.`
          : `I found verified information regarding "${q}" in Anthoor Municipality records. You can explore the interactive GIS map or search our municipal services.`;
        actions = [
          { label: "Open GIS Map", action: () => navigate('/map') },
          { label: "View All Wards", action: () => navigate('/wards') }
        ];
      }

      setMessages(prev => [...prev, { sender: 'ai', text: responseText, actions }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Widget Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #059669, #0D9488)',
          color: '#FFFFFF',
          boxShadow: '0 8px 24px rgba(5, 150, 105, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid #FFFFFF',
          cursor: 'pointer',
          zIndex: 1500,
          transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
        title="Anthoor 360 AI Civic Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
        {!isOpen && (
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: '#F59E0B',
            border: '2px solid #FFFFFF'
          }}></span>
        )}
      </button>

      {/* AI Assistant Modal Pop-up */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '96px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 48px)',
          height: '520px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 20px 48px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-light)',
          zIndex: 1500,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'popIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #064E3B, #0D9488)',
            padding: '16px 20px',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div className="flex items-center gap-2">
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.98rem', fontWeight: 800 }}>
                  {language === 'ml' ? 'ആന്തൂർ 360 എ.ഐ' : 'Anthoor 360 AI'}
                </div>
                <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>
                  {language === 'ml' ? 'പൗരസഹായി & മാപ്പ് ഗൈഡ്' : 'Civic Guide & Map Assistant'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ color: '#FFFFFF', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}
              >
                <div style={{
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  backgroundColor: m.sender === 'user' ? '#064E3B' : 'var(--surface-100)',
                  color: m.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                  fontSize: '0.86rem',
                  lineHeight: '1.5'
                }}>
                  {m.text}
                </div>

                {/* Optional Interactive Action Buttons */}
                {m.actions && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                    {m.actions.map((act, actIdx) => (
                      <button
                        key={actIdx}
                        onClick={() => {
                          if (act.url) window.open(act.url, '_blank');
                          else if (act.action) {
                            act.action();
                            setIsOpen(false);
                          }
                        }}
                        className="btn btn-secondary btn-sm"
                        style={{
                          fontSize: '0.78rem',
                          padding: '6px 10px',
                          justifyContent: 'space-between',
                          borderRadius: '8px',
                          backgroundColor: '#FFFFFF',
                          borderColor: 'var(--primary-200)'
                        }}
                      >
                        <span style={{ color: 'var(--primary-800)', fontWeight: 600 }}>{act.label}</span>
                        {act.url ? <ExternalLink size={12} color="var(--primary-700)" /> : <ChevronRight size={14} color="var(--primary-700)" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Pills */}
          <div style={{
            padding: '8px 12px',
            backgroundColor: 'var(--surface-50)',
            borderTop: '1px solid var(--surface-200)',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }}>
            {[
              language === 'ml' ? 'ആശുപത്രികൾ' : 'Hospitals near me',
              language === 'ml' ? 'മുത്തപ്പൻ ക്ഷേത്രം' : 'Muthappan Temple',
              language === 'ml' ? 'കെട്ടിട നികുതി' : 'Building Tax (Sanchaya)',
              language === 'ml' ? 'എൻജിനീയറിങ് കോളേജ്' : 'Govt Engg College'
            ].map((qText, idx) => (
              <button
                key={idx}
                onClick={() => handleSendQuery(qText)}
                style={{
                  fontSize: '0.74rem',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--surface-300)',
                  color: 'var(--primary-800)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
              >
                {qText}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div style={{ padding: '12px 14px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="text"
              placeholder={language === 'ml' ? 'ചോദ്യം ചോദിക്കൂ അല്ലെങ്കിൽ സംസാരിക്കൂ...' : 'Ask a question or use voice...'}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSendQuery(); }}
              style={{
                flex: 1,
                padding: '10px 14px',
                fontSize: '0.86rem',
                borderRadius: '12px',
                border: '1px solid var(--surface-200)',
                backgroundColor: 'var(--surface-50)'
              }}
            />
            <button
              onClick={handleVoiceInput}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: isListening ? '#EF4444' : 'var(--surface-100)',
                color: isListening ? '#FFFFFF' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s'
              }}
              title="Speak in Malayalam / English"
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              onClick={() => handleSendQuery()}
              className="btn btn-primary btn-sm"
              style={{ width: '36px', height: '36px', padding: 0, borderRadius: '10px' }}
            >
              <Send size={15} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
