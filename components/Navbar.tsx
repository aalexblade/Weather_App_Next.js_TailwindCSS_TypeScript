import Link from 'next/link';
import { CloudSun } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="w-full bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-xl hover:text-white/80 transition-colors">
          <CloudSun className="w-6 h-6" />
          <span>SkyCast</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
