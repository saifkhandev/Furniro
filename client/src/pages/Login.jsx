// Login page placeholder
export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="font-display text-3xl font-bold text-ink mb-2 text-center">
          Welcome Back
        </h1>
        <p className="text-ink-muted text-center mb-8">
          Sign in to your Grove & Co. account
        </p>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Login stub'); }}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
            <input id="email" type="email" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">Password</label>
            <input id="password" type="password" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">Sign In</button>
        </form>
        <p className="text-center text-sm mt-4">Don't have an account? <a href="#" className="text-primary font-medium">Sign Up</a></p>
      </div>
    </div>
  );
}