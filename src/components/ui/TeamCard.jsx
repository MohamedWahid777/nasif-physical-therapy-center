import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TeamCard({ member, index = 0 }) {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const initials = member.name[lang]
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-gray-800">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name[lang]}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl font-bold text-blue-300 dark:text-blue-600">
              {initials}
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
          {member.name[lang]}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">
          {member.specialty[lang]}
        </p>
        <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
          {member.category[lang]}
        </span>
      </div>
    </motion.div>
  );
}
