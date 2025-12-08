import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cubeLogo from "@assets/cube_1765183043936.png";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"animate" | "fadeOut">("animate");

  useEffect(() => {
    const animationTimer = setTimeout(() => {
      setPhase("fadeOut");
    }, 2500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fadeOut" ? (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          data-testid="splash-screen"
        >
          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative"
              initial={{ scale: 0, rotateY: -180, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                rotateY: [-180, 0],
                opacity: 1
              }}
              transition={{ 
                duration: 1.2, 
                ease: "easeOut",
                times: [0, 0.7, 1]
              }}
            >
              <motion.img
                src={cubeLogo}
                alt="Kerala Startup Fest Logo"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                animate={{
                  rotateZ: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute inset-0 rounded-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [0.8, 1.5, 2],
                  opacity: [0, 0.3, 0]
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  ease: "easeOut"
                }}
                style={{
                  background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)"
                }}
              />
            </motion.div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <motion.h1 
                className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <span className="text-foreground">KERALA</span>{" "}
                <span className="text-primary">STARTUP</span>{" "}
                <span className="text-foreground">FEST</span>
              </motion.h1>
              <motion.p
                className="text-muted-foreground text-sm sm:text-base mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                2026
              </motion.p>
            </motion.div>

            <motion.div
              className="mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          data-testid="splash-screen-fadeout"
        />
      )}
    </AnimatePresence>
  );
}
