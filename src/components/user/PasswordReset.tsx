'use client';

export default function ChangePasswordForm() {
  return (
    <>

      <div className="flex items-center justify-center min-h-[80vh] text-white px-4 py-10">
        <div className="w-full max-w-md bg-gray-950 bg-opacity-70 shadow-2xl rounded-xl overflow-hidden p-8">

          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-orange-400">Change Password</h2>
          </div>

          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-300">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full p-3 rounded-lg text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                className="w-full py-3 bg-orange-500 border-2 border-orange-600 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none"
              >
                Send OTP
              </button>
            </div>

            {/* Optional Login Link */}
            <p className="text-sm text-center text-gray-400 mt-4">
              Remember your password?{" "}
              <a href="/user/login" className="text-orange-400 hover:underline">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
