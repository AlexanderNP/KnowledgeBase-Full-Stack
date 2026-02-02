import { motion, AnimatePresence } from "framer-motion";
import { CircleX } from "lucide-react";
import type { StandardSchemaV1Issue } from "@tanstack/react-form";

interface IFormErrorFieldProps {
  meta: {
    isValid: boolean;
    errors: StandardSchemaV1Issue[];
  };
}

export function ErrorFields({ meta }: IFormErrorFieldProps) {
  return (
    <AnimatePresence>
      {!meta.isValid &&
        meta.errors.map((item) => (
          <motion.div
            key={item?.message}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-sm text-red-700"
          >
            <CircleX size={18} />
            <span>{item?.message ?? "Неизвестная ошибка"}</span>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}