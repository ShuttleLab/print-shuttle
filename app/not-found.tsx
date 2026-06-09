import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4" aria-hidden="true">🖨️</div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-1">Page not found / 页面未找到</p>
        <p className="text-muted-foreground mb-8 text-sm">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-block px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90">
          Back to Home / 返回首页
        </Link>
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">
            Also from ShuttleLab
          </p>
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center gap-2">
              <a
                href="https://note.shuttlelab.org"
                target="_blank"
                rel="noopener"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Note Shuttle
              </a>
              <span className="text-xs text-muted-foreground">Markdown editor &amp; sharing</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://status.shuttlelab.org"
                target="_blank"
                rel="noopener"
                className="text-sm font-semibold text-foreground hover:text-primary transition-colors"
              >
                Status Shuttle
              </a>
              <span className="text-xs text-muted-foreground">Uptime monitoring &amp; alerts</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
