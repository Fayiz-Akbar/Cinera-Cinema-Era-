// import { useState } from 'react';
// import axiosClient from '../api/axiosClient';
// import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

  // (Logika state dan fungsi onSubmit akan ditambahkan di sini)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Login ke UnilaFest
        </h2>
        
        {/* Formulir Login */}
        <form className="mt-8 space-y-6">
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="sr-only">
              Alamat Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Alamat Email"
            />
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              placeholder="Password"
            />
          </div>

          {/* Tombol Login */}
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{' '}
          <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
            Daftar di sini
          </a>
          {/* (Nanti ini akan diganti dengan <Link> dari react-router-dom) */}
        </p>
      </div>
    </div>
  );
}