import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { clinicInfo } from '../data/clinicInfo'
import { services } from '../data/services'
import InnerHero from '../components/layout/InnerHero'
import SectionHeader from '../components/ui/SectionHeader'

export default function ContactPage() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState('contact')
  const [selectedService, setSelectedService] = useState('')

  // Form handling state
  const [formState, setFormState] = useState({
    status: 'idle', // 'idle', 'submitting', 'success', 'error'
    message: ''
  });

  const handleSubmit = async (e, formType) => {
    e.preventDefault();
    setFormState({ status: 'submitting', message: '' });
    
    const formData = new FormData(e.target);
    
    // Web3Forms setup
    formData.append("access_key", clinicInfo.web3formsAccessKey || "YOUR_ACCESS_KEY_HERE");
    formData.append("subject", formType === 'contact' ? 'استفسار عام - موقع مركز ناصف' : 'حجز موعد - مركز ناصف');
    formData.append("from_name", "Nasif Center Website");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setFormState({ 
          status: 'success', 
          message: lang === 'ar' ? 'تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.' : 'Your message has been sent successfully. We will contact you soon.'
        });
        e.target.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => setFormState({ status: 'idle', message: '' }), 5000);
      } else {
        console.error("Form error:", data);
        setFormState({ 
          status: 'error', 
          message: lang === 'ar' ? 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending. Please try again.'
        });
      }
    } catch (error) {
      console.error("Form connection error:", error);
      setFormState({ 
        status: 'error', 
        message: lang === 'ar' ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' : 'A connection error occurred. Please try again.'
      });
    }
  };

  useEffect(() => {
    const tabParam = searchParams.get('tab')
    const serviceParam = searchParams.get('service')
    
    if (tabParam === 'booking') {
      setActiveTab('booking')
    }
    if (serviceParam) {
      setActiveTab('booking')
      setSelectedService(decodeURIComponent(serviceParam))
    }
  }, [searchParams])

  return (
    <>
      <Helmet>
        <title>{lang === 'ar' ? 'تواصل معنا - مركز ناصف' : 'Contact Us - Nasif Center'}</title>
      </Helmet>

      {/* Premium Cinematic Hero — Contact */}
      <InnerHero
        variant="contact"
        badge={lang === 'ar' ? 'نحن هنا لمساعدتك' : 'We Are Here To Help'}
        title={t('contact.title')}
        description={
          <p>
            {lang === 'ar'
              ? 'نؤمن في مركز ناصف بأن التواصل المستمر مع مرضانا هو أولى خطوات الشفاء. فريقنا الطبي المتخصص مستعد دائماً للاستماع إلى استفساراتك، تقديم الاستشارة المناسبة، ومرافقتك في كل خطوة من رحلة التعافي.'
              : 'At Nasif Center, we believe that continuous communication with our patients is the first step to healing. Our specialized medical team is always ready to listen to your inquiries, provide appropriate consultation, and accompany you through every step of your recovery journey.'}
          </p>
        }
        image="/assets/images/clinic/Photo4.webp"
        imageAlt={lang === 'ar' ? 'استشارة طبية' : 'Medical Consultation'}
        imageClass="aspect-[4/3] max-w-[460px]"
        minHeight="min-h-[50vh]"
      />

      {/* Main Contact Layout */}
      <section className="py-16 bg-white dark:bg-dark-card border-t border-neutral-100 dark:border-dark-border relative z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
          
          {/* RTL Order: Grid places form first (lg:col-span-8) so it appears on the right in Arabic. 
              Sticky card is second (lg:col-span-4) so it appears on the left. */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Contact Form (Takes ~67-70% width, positioned on the right in Arabic) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8 }}
              className="lg:col-span-8 w-full"
            >
              <div className="bg-neutral-50/80 dark:bg-dark-surface/80 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-neutral-200/60 dark:border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                
                <h3 className="font-display font-bold text-2xl md:text-3xl text-neutral-900 dark:text-white mb-2">{lang === 'ar' ? 'أرسل رسالتك' : 'Send Your Message'}</h3>
                <p className="font-body text-neutral-500 dark:text-dark-muted text-sm mb-8 font-light">{t('contact.subtitle')}</p>

                {/* Premium Tabs */}
                <div className="flex bg-white dark:bg-dark-card p-1.5 rounded-xl mb-8 border border-neutral-200/80 dark:border-white/5 shadow-sm">
                  <button 
                    onClick={() => setActiveTab('contact')} 
                    className={`flex-1 py-2.5 px-4 font-body font-semibold text-[13px] rounded-lg transition-all duration-300 ${activeTab === 'contact' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-800' : 'text-neutral-500 dark:text-dark-muted hover:text-neutral-800 dark:hover:text-dark-text'}`}
                  >
                    {lang === 'ar' ? 'استفسار عام' : 'General Inquiry'}
                  </button>
                  <button 
                    onClick={() => setActiveTab('booking')} 
                    className={`flex-1 py-2.5 px-4 font-body font-semibold text-[13px] rounded-lg transition-all duration-300 ${activeTab === 'booking' ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 shadow-sm border border-primary-100 dark:border-primary-800' : 'text-neutral-500 dark:text-dark-muted hover:text-neutral-800 dark:hover:text-dark-text'}`}
                  >
                    {lang === 'ar' ? 'حجز موعد' : 'Book Appointment'}
                  </button>
                </div>

                {/* Forms Container */}
                <div className="relative min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {activeTab === 'contact' && (
                      <motion.form 
                        key="form-contact"
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={(e) => handleSubmit(e, 'contact')}
                        className="space-y-6"
                      >
                        {/* Web3Forms hidden fields */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                            <input type="text" name="name" required className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm" placeholder={lang === 'ar' ? 'اكتب اسمك هنا...' : 'Enter your name...'} />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                            <input type="tel" name="phone" required dir="ltr" className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm rtl:text-right text-left" placeholder="01X XXX XXXX" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'الرسالة' : 'Message'}</label>
                            <textarea name="message" rows="5" required className="w-full p-4 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm resize-none" placeholder={lang === 'ar' ? 'كيف يمكننا مساعدتك؟' : 'How can we help you?'} />
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          disabled={formState.status === 'submitting'}
                          className={`btn-primary w-full text-base py-4 mt-4 shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all ${formState.status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_6px_25px_rgba(37,99,235,0.4)]'}`}
                        >
                          {formState.status === 'submitting' 
                            ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                            : t('contact.send')}
                        </button>
                      </motion.form>
                    )}

                    {activeTab === 'booking' && (
                      <motion.form 
                        key="form-booking"
                        initial={{ opacity: 0, x: -10 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={(e) => handleSubmit(e, 'booking')}
                        className="space-y-6"
                      >
                        {/* Web3Forms hidden fields */}
                        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                            <input type="text" name="name" required className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm" placeholder={lang === 'ar' ? 'اكتب اسمك هنا...' : 'Enter your name...'} />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</label>
                            <input type="tel" name="phone" required dir="ltr" className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm rtl:text-right text-left" placeholder="01X XXX XXXX" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'الخدمة المطلوبة' : 'Service Required'}</label>
                            <select 
                              name="service" 
                              required 
                              value={selectedService}
                              onChange={(e) => setSelectedService(e.target.value)}
                              className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm appearance-none"
                            >
                              <option value="" disabled>{lang === 'ar' ? 'اختر التخصص المطلوب...' : 'Select required specialty...'}</option>
                              {services.map(s => (
                                <option key={s.id} value={s.name[lang]}>{s.name[lang]}</option>
                              ))}
                            </select>
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'التاريخ المفضل' : 'Preferred Date'}</label>
                            <input type="date" name="date" required className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm" />
                          </div>
                          <div className="md:col-span-1">
                            <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'الوقت المفضل' : 'Preferred Time'}</label>
                            <input type="time" name="time" required className="w-full p-3.5 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm" />
                          </div>
                          <div className="md:col-span-2">
                             <label className="block text-[11px] font-body font-bold text-neutral-500 dark:text-dark-muted mb-2 uppercase tracking-wider">{lang === 'ar' ? 'ملاحظات طبية (اختياري)' : 'Medical Notes (Optional)'}</label>
                             <textarea name="notes" rows="3" className="w-full p-4 rounded-xl border border-neutral-200/80 dark:border-dark-border bg-white dark:bg-dark-card font-body text-sm text-neutral-800 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all shadow-sm resize-none" placeholder={lang === 'ar' ? 'هل تعاني من أي أمراض مزمنة؟' : 'Do you suffer from any chronic diseases?'} />
                          </div>
                        </div>
                        <button 
                          type="submit" 
                          disabled={formState.status === 'submitting'}
                          className={`btn-primary w-full text-base py-4 mt-4 shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-all ${formState.status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_6px_25px_rgba(37,99,235,0.4)]'}`}
                        >
                          {formState.status === 'submitting' 
                            ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') 
                            : t('contact.book')}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>

                  {/* Form UX Feedback Messages */}
                  <AnimatePresence>
                    {formState.status === 'success' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-[-60px] left-0 right-0 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded-xl border border-green-200 dark:border-green-800/30 text-center text-sm font-medium"
                      >
                        {formState.message}
                      </motion.div>
                    )}
                    {formState.status === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-[-60px] left-0 right-0 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-3 rounded-xl border border-red-200 dark:border-red-800/30 text-center text-sm font-medium"
                      >
                        {formState.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
              </div>
            </motion.div>

            {/* Sticky Contact Info Card (Takes ~30% width, positioned on the left in Arabic) */}
            <motion.div 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-4 w-full h-full"
            >
              <div className="sticky top-32 bg-white/60 dark:bg-dark-card/60 backdrop-blur-xl border border-neutral-200/60 dark:border-white/5 rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
                
                <div className="w-12 h-12 rounded-2xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 border border-neutral-100 dark:border-white/5 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>

                <h3 className="font-display font-bold text-xl text-neutral-900 dark:text-white mb-6">
                  {lang === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
                </h3>

                <div className="space-y-6">
                  {/* Phone */}
                  <a href={`tel:${clinicInfo.phone}`} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 mt-0.5 rounded-full bg-neutral-100 dark:bg-dark-surface flex items-center justify-center shrink-0 text-neutral-500 dark:text-dark-muted group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                    </div>
                    <div>
                      <p className="font-body text-[11px] uppercase tracking-wider text-neutral-500 dark:text-dark-muted mb-1 font-semibold">{lang === 'ar' ? 'الخط الساخن' : 'Hotline'}</p>
                      <p className="font-body font-medium text-[15px] text-neutral-900 dark:text-white group-hover:text-primary-600 transition-colors" dir="ltr">{clinicInfo.phone}</p>
                    </div>
                  </a>

                  {/* Branches */}
                  {clinicInfo.branches.map((branch, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 mt-0.5 rounded-full bg-neutral-100 dark:bg-dark-surface flex items-center justify-center shrink-0 text-neutral-500 dark:text-dark-muted group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <div>
                        <p className="font-body text-[11px] uppercase tracking-wider text-neutral-500 dark:text-dark-muted mb-1 font-semibold">{branch.name[lang]}</p>
                        <p className="font-body font-light text-[13px] text-neutral-600 dark:text-dark-text leading-relaxed">{branch.address[lang]}</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Working Hours */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-8 h-8 mt-0.5 rounded-full bg-neutral-100 dark:bg-dark-surface flex items-center justify-center shrink-0 text-neutral-500 dark:text-dark-muted group-hover:bg-primary-500 group-hover:text-white transition-all duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <p className="font-body text-[11px] uppercase tracking-wider text-neutral-500 dark:text-dark-muted mb-1 font-semibold">{lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}</p>
                      <p className="font-body font-light text-[13px] text-neutral-600 dark:text-dark-text leading-relaxed">
                        {lang === 'ar' ? 'السبت - الخميس' : 'Saturday - Thursday'}<br/>
                        <span className="font-medium text-neutral-900 dark:text-white">09:00 AM - 07:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-px w-full bg-neutral-200/60 dark:bg-white/5 my-6" />
                
                {/* Social Links — Synced with Footer */}
                <div className="flex flex-wrap items-center gap-3">
                  {clinicInfo.social.facebook.map((url, i) => (
                    <a key={`fb-${i}`} href={url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-dark-surface border border-neutral-200/60 dark:border-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 text-neutral-600 dark:text-dark-muted shadow-sm" aria-label="Facebook">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                    </a>
                  ))}
                  <a href={clinicInfo.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-dark-surface border border-neutral-200/60 dark:border-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 text-neutral-600 dark:text-dark-muted shadow-sm" aria-label="TikTok">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
                  </a>
                  <a href={`mailto:${clinicInfo.email}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-dark-surface border border-neutral-200/60 dark:border-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 text-neutral-600 dark:text-dark-muted shadow-sm" aria-label="Email">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                  </a>
                  <a href="https://wa.me/201090677084" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-dark-surface border border-neutral-200/60 dark:border-white/5 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-300 text-neutral-600 dark:text-dark-muted shadow-sm" aria-label="WhatsApp">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  </a>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Additional Lower Section: Reassuring Patient Messaging */}
      <section className="py-20 bg-neutral-50 dark:bg-dark-bg border-t border-neutral-100 dark:border-dark-border px-4">
        <div className="max-w-3xl mx-auto">
          <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 shadow-sm border border-primary-200/50 dark:border-primary-800/50">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <SectionHeader 
            title={lang === 'ar' ? 'راحتك وتعافيك هما أولويتنا المطلقة' : 'Your comfort and recovery are our absolute priority'}
            description={lang === 'ar' 
              ? 'نتفهم تماماً أن رحلة العلاج قد تتطلب الصبر والدعم. لذلك، نلتزم بتوفير بيئة هادئة ومريحة تعزز من تعافيك النفسي والجسدي، مع تقديم خطط علاجية مبنية على الشفافية والثقة المتبادلة.' 
              : 'We fully understand that the treatment journey may require patience and support. Therefore, we are committed to providing a calm and comfortable environment that enhances your psychological and physical recovery, while providing treatment plans based on transparency and mutual trust.'}
          />
        </div>
      </section>
    </>
  )
}
