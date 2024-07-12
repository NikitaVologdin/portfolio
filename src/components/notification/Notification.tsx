"use client";
import { useContext } from "react";
import Image from "next/image";
import { NotificationContext } from "../../context/NotificationContext";
import succesIcon from "../../../public/form/check.svg";
import failureIcon from "../../../public/form/close.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function Notification() {
  const ctx = useContext(NotificationContext);

  const successStyles = "border-green-600 text-green-600 bg-green-100";
  const failureStyles = "border-rose-600 text-rose-600 bg-rose-100";
  const status = ctx.notification.status;
  const isStatusOk = status === 200;
  const icon = isStatusOk ? succesIcon : failureIcon;
  return (
    <div className="notification fixed top-7 text-center right-0 w-3/4">
      <AnimatePresence>
        {ctx.notification.isActive && (
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -50 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className={`inline-block border-1 rounded-md px-6 py-2.5 ${
              isStatusOk ? successStyles : failureStyles
            }`}
          >
            <div className="flex gap-2">
              {/* <h5>All good!</h5> */}
              <Image
                alt=""
                src={icon}
                width="5"
                height="5"
                className={`inline h-auto w-auto fill-rose-600`}
              />
              <p>{ctx.notification.message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
