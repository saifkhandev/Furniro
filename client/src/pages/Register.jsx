// Register page placeholder
export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="max-w-md w-full p-8 bg-white rounded-2xl shadow-xl">
        <h1 className="font-display text-3xl font-bold text-ink mb-2 text-center">Create Account</h1>
        <p className="text-ink-muted text-center mb-8">Join Grove & Co. for exclusive offers</p>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Register stub'); }}>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink mb-1">First Name</label>
            <input id="firstName" type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink mb-1">Last Name</label>
            <input id="lastName" type="text" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1">Email</label>
            <input id="email" type="email" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-ink mb-1">Password</label>
            <input id="password" type="password" className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary" />
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition-colors">Create Account</button>
        </form>
      </div>
    </div>
  );
}