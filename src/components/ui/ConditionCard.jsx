import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ConditionCard({ condition, index = 0 }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={condition.image}
          alt={condition.name[lang]}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <h3 className="absolute bottom-3 start-4 end-4 text-white font-bold text-lg">
          {condition.name[lang]}
        </h3>
      </div>
      <div className="p-5">
        <div className="mb-3">
          <p className="text-xs font-semibold text-red-500 dark:text-red-400 uppercase tracking-wider mb-1">
            {lang === "ar" ? "الأعراض" : "Symptoms"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {condition.symptoms[lang]}
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">
            {lang === "ar" ? "العلاج" : "Treatment"}
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {condition.treatment[lang]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
