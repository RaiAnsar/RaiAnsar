'use client';

import Image from 'next/image';

// Pre-calculated positions for instant render (no random on mount)
const techElements = [
  { type: 'tech' as const, name: 'WordPress', icon: '/images/svg/wordpress.svg', left: '5%', top: '15%', delay: '0s', duration: '22s' },
  { type: 'tech' as const, name: 'React', icon: '/images/svg/react.svg', left: '85%', top: '60%', delay: '2s', duration: '25s' },
  { type: 'tech' as const, name: 'Python', icon: '/images/svg/python.svg', left: '20%', top: '70%', delay: '4s', duration: '20s' },
  { type: 'tech' as const, name: 'PHP', icon: '/images/svg/php.svg', left: '70%', top: '25%', delay: '1s', duration: '28s' },
  { type: 'tech' as const, name: 'Laravel', icon: '/images/svg/laravel.svg', left: '45%', top: '80%', delay: '3s', duration: '24s' },
  { type: 'tech' as const, name: 'Flutter', icon: '/images/svg/flutter.svg', left: '90%', top: '40%', delay: '5s', duration: '21s' },
  { type: 'tech' as const, name: 'Vite', icon: '/images/svg/vite.svg', left: '10%', top: '45%', delay: '2.5s', duration: '26s' },
  { type: 'tech' as const, name: 'Node.js', icon: '/images/svg/nodejs.svg', left: '60%', top: '10%', delay: '1.5s', duration: '23s' },
  { type: 'tech' as const, name: 'CSS3', icon: '/images/svg/css3.svg', left: '30%', top: '30%', delay: '4.5s', duration: '27s' },
  { type: 'tech' as const, name: 'JavaScript', icon: '/images/svg/javascript.svg', left: '75%', top: '75%', delay: '3.5s', duration: '22s' },
  { type: 'bubble' as const, size: 80, left: '15%', top: '55%', delay: '0.5s', duration: '30s' },
  { type: 'bubble' as const, size: 100, left: '50%', top: '20%', delay: '2s', duration: '35s' },
  { type: 'bubble' as const, size: 60, left: '80%', top: '85%', delay: '4s', duration: '25s' }
];

export function Bubbles() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none opacity-40">
      {techElements.map((element, index) => {
        if (element.type === 'tech') {
          return (
            <div
              key={index}
              className="absolute w-16 h-16 md:w-20 md:h-20 flex items-center justify-center
                         rounded-2xl border border-white/10 backdrop-blur-lg animate-float-gentle
                         bg-gradient-to-br from-accent/5 to-purple-500/5"
              style={{
                left: element.left,
                top: element.top,
                animationDelay: element.delay,
                animationDuration: element.duration
              }}
            >
              <Image
                src={element.icon}
                alt={element.name}
                width={40}
                height={40}
                priority={index < 3}
                className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-70
                           drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              />
            </div>
          );
        }

        // Bubble
        return (
          <div
            key={index}
            className="absolute rounded-full animate-float-gentle
                       bg-gradient-to-br from-accent/10 to-purple-500/10
                       border border-purple-500/20 backdrop-blur-sm"
            style={{
              width: `${element.size}px`,
              height: `${element.size}px`,
              left: element.left,
              top: element.top,
              animationDelay: element.delay,
              animationDuration: element.duration
            }}
          />
        );
      })}
    </div>
  );
}
