// Home page placeholder
export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-5xl font-bold text-ink mb-4">
          Grove & Co.
        </h1>
        <p className="text-lg text-ink-muted mb-8">
          Premium furniture for modern living
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-primary-dark transition-colors font-medium">
            Shop Now
          </button>
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-md hover:bg-primary hover:text-white transition-colors font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
