'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── small inline icons ── */
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className="w-4 h-4 fill-current shrink-0">
    <path d="M15 3C8.373 3 3 8.373 3 15c0 2.251.632 4.35 1.711 6.15L3.107 27l5.975-1.568A11.946 11.946 0 0015 27c6.627 0 12-5.373 12-12S21.627 3 15 3zm-4.107 6.402c.195 0 .395-.001.568.009.214.005.447.021.67.514.265.586.842 2.056.916 2.205.074.149.121.325.018.52-.098.2-.149.321-.293.498-.149.172-.312.386-.447.516-.149.149-.303.312-.131.609.172.297.769 1.271 1.652 2.057 1.135 1.014 2.093 1.325 2.391 1.474.298.149.47.126.642-.074.177-.195.744-.864.944-1.162.195-.298.394-.247.664-.149 1.461.72 1.759.869 2.057 1.018.298.149.483.223.558.344.077.125.077.72-.17 1.414-.247.693-1.46 1.363-2.004 1.41-.55.051-1.062.247-3.569-.74-3.024-1.192-4.931-4.289-5.08-4.489-.149-.195-1.211-1.61-1.211-3.07 0-1.465.768-2.182 1.037-2.48.274-.298.595-.371.795-.371z" />
  </svg>
);

/* ── contact row ── */
const ContactRow = ({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-white/50 font-assistant text-xs">{label}</p>
      {href
        ? <a href={href} className="text-white font-assistant text-sm hover:text-primary transition-colors">{value}</a>
        : <p className="text-white font-assistant text-sm">{value}</p>
      }
    </div>
  </div>
);

/* ── floating label form field ── */
const FloatingField = ({
  label, name, type = 'text', value, onChange, required,
}: {
  label: string; name: string; type?: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => {
  const [focused, setFocused] = React.useState(false);
  const floated = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        id={name} name={name} type={type} value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" "
        autoComplete={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'off'}
        className={`w-full bg-white/8 border rounded-xl px-4 pt-6 pb-2.5 text-white font-assistant text-sm focus:outline-none transition-all duration-200 ${
          focused
            ? 'border-primary/70 bg-white/12 shadow-[0_0_0_3px_rgba(181,113,74,0.18)]'
            : 'border-white/15 hover:border-white/25'
        }`}
      />
      <label
        htmlFor={name}
        className={`absolute right-4 font-assistant pointer-events-none transition-all duration-200 ${
          floated
            ? 'top-1.5 text-[10px] text-primary/80 font-medium'
            : 'top-[1.05rem] text-sm text-white/40'
        }`}
      >
        {label}{required && <span className="text-primary/80 mr-0.5">*</span>}
      </label>
    </div>
  );
};

/* ── success state ── */
const Success = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="flex flex-col items-center justify-center text-center py-12"
  >
    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h3 className="text-2xl font-frank font-bold text-white mb-3">תודה שפנית אלינו!</h3>
    <p className="font-assistant text-white/65 mb-2">קיבלנו את פרטיך ונחזור אליך בהקדם.</p>
    <p className="font-assistant text-white/40 text-sm mb-8">זמן המענה הממוצע שלנו הוא עד 24 שעות בימי עסקים.</p>
    <button
      onClick={onReset}
      className="px-6 py-2.5 border border-white/20 text-white/70 font-assistant text-sm rounded-xl hover:border-primary/50 hover:text-white transition-all"
    >
      שליחת פנייה נוספת
    </button>
  </motion.div>
);

/* ── main component ── */
const Contact: React.FC = () => {
  const phoneNumber = '972544727746';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent('שלום, אשמח לקבל מידע נוסף על שירותי האריחים שלכם.')}`;

  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.phone.trim()) {
      setError('יש למלא שם פרטי ומספר טלפון');
      return;
    }
    setLoading(true);
    setError(null);
    // Simulate submission — replace with real API call as needed
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setForm({ firstName: '', lastName: '', phone: '', email: '' });
  };

  return (
    <section id="contact" className="py-20 bg-secondary" dir="rtl">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <span className="inline-block text-primary font-assistant font-semibold text-sm mb-2 tracking-widest uppercase">
            צור קשר
          </span>
          <h2 className="text-3xl md:text-4xl font-frank font-bold text-white mb-4">
            נשמח לשמוע מכם
          </h2>
          <div className="w-14 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Card */}
        <motion.div
          className="max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">

            {/* ── Left: contact info ── */}
            <div className="lg:col-span-2 p-8 lg:p-10 border-b lg:border-b-0 lg:border-e border-white/10">
              <h3 className="text-2xl font-frank font-bold text-white mb-3">דברו איתנו</h3>
              <p className="font-assistant text-white/60 text-sm leading-relaxed mb-8">
                השאירו פרטים ונחזור אליכם בהקדם עם הצעה מותאמת לפרויקט שלכם.
              </p>

              {/* Quick-contact buttons */}
              <div className="flex gap-3 mb-10">
                <a
                  href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white rounded-xl py-3 font-assistant font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  <WhatsAppIcon />
                  וואטסאפ
                </a>
                <a
                  href="tel:+972544727746"
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white rounded-xl py-3 font-assistant font-medium text-sm transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
                >
                  <PhoneIcon />
                  התקשרו
                </a>
              </div>

              {/* Contact details */}
              <div className="space-y-4 mb-8">
                <ContactRow icon={<PhoneIcon />} label="טלפון" value="054-4727746" href="tel:+972544727746" />
                <ContactRow icon={<EmailIcon />} label='דוא"ל' value="info@tiletech.co.il" href="mailto:info@tiletech.co.il" />
                <ContactRow icon={<LocationIcon />} label="איזור פעילות" value="מרכז והשפלה" />
              </div>

              {/* Hours */}
              <div className="pt-6 border-t border-white/10">
                <p className="font-frank font-bold text-white text-sm mb-3">שעות פעילות</p>
                <div className="space-y-1.5 font-assistant text-xs text-white/50">
                  <div className="flex justify-between"><span>ראשון – חמישי</span><span>09:00 – 18:00</span></div>
                  <div className="flex justify-between"><span>שישי</span><span>09:00 – 13:00</span></div>
                  <div className="flex justify-between"><span>שבת</span><span className="text-white/30">סגור</span></div>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <Success key="success" onReset={handleReset} />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    <h3 className="text-2xl font-frank font-bold text-white mb-7">השאירו פרטים</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <FloatingField label="שם פרטי" name="firstName" value={form.firstName} onChange={handleChange} required />
                      <FloatingField label="שם משפחה" name="lastName" value={form.lastName} onChange={handleChange} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <FloatingField label="טלפון" name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                      <FloatingField label='דוא"ל' name="email" type="email" value={form.email} onChange={handleChange} />
                    </div>

                    {error && (
                      <p className="mb-4 text-red-400 font-assistant text-sm">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-primary text-white font-assistant font-semibold py-4 rounded-xl text-base transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-60 shadow-lg flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          שולח...
                        </>
                      ) : (
                        'שלח פנייה'
                      )}
                    </button>

                    <p className="text-white/35 font-assistant text-xs text-center mt-4">
                      נחזור אליך תוך 24 שעות בימי עסקים
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
