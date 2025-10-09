import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-[hsl(var(--glass-text))] font-medium text-lg">consulting</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors">
            Home
          </a>
          <a href="#" className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors">
            About
          </a>
          <a href="#" className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors">
            Services
          </a>
          <a href="#" className="text-[hsl(var(--glass-text))] hover:text-[hsl(var(--glass-text))]/80 transition-colors">
            Blog
          </a>
        </div>
        
        <Button variant="glass" className="rounded-full px-6">
          Get an audit
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
