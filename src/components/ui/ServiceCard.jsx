import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ServiceCard({ service, index = 0 }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1 min-w-[260px] flex-shrink-0"
    >
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 leading-tight">
        {service.name[lang]}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
        {service.description[lang]}
      </p>
      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
        {service.category[lang]}
      </span>
    </motion.div>
  );
}
