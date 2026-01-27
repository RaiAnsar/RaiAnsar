'use client';

const codeSnippets = [
  "npm install universe",
  "function coffee() { return '☕' + '💻'; }",
  "if (bug) { fixIt(); } else { celebrate(); }",
  "Array(10).fill('🌮').join('')",
  "return (<div>🚀</div>);",
  "try { beAwesome(); } catch (e) { beAwesomeAnyway(); }",
  "import { Magic } from 'stackbyte';",
  "// TODO: Rule the world with code",
  "git commit -m 'Fixed the bug I created 5 min ago'",
  "const life = new Promise((resolve) => resolve('success'));",
  "console.log('Hello, World!');",
  "const stackbyte = { quality: 100, speed: 100 };",
  "404: Sleep not found",
  "sudo make me a sandwich",
  "while (alive) { code(); eat(); sleep(); }",
  "const developer = { caffeineLevel: 'critical' };",
];

export function CodeMarquee() {
  return (
    <section className="marquee-section">
      {/* First row - scrolling left */}
      <div className="marquee-container mb-4">
        <div className="marquee-track">
          {[...codeSnippets, ...codeSnippets].map((snippet, index) => (
            <div key={index} className="code-snippet">
              <span style={{ color: 'var(--primary)' }}>{'>'}</span>
              {snippet}
            </div>
          ))}
        </div>
      </div>

      {/* Second row - scrolling right */}
      <div className="marquee-container">
        <div className="marquee-track reverse">
          {[...codeSnippets.slice().reverse(), ...codeSnippets.slice().reverse()].map((snippet, index) => (
            <div key={index} className="code-snippet">
              <span style={{ color: 'var(--secondary)' }}>{'>'}</span>
              {snippet}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
