import { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

export function LogoAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative w-32 h-32 mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
      }`}
    >
      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-loggie-purple to-loggie-cyan
                      opacity-20 blur-xl animate-pulse" />

      {/* Outer orbit ring */}
      <div className="absolute inset-0 rounded-full border border-loggie-purple/30 animate-spin"
           style={{ animationDuration: '20s' }}>
        {/* Orbiting particles */}
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-loggie-cyan shadow-lg shadow-loggie-cyan/50"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translateX(64px) translateY(-50%)`,
            }}
          />
        ))}
      </div>

      {/* Middle ring */}
      <div className="absolute inset-4 rounded-full border border-loggie-cyan/20" />

      {/* Logo container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 bg-gradient-to-br from-loggie-purple to-loggie-cyan rounded-2xl
                      flex items-center justify-center shadow-lg shadow-loggie-purple/30
                      hover:shadow-xl hover:shadow-loggie-purple/40 transition-shadow">
          <Lock className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  );
}
