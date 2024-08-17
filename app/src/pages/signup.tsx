import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { FaEnvelope, FaLock, FaUser, FaUserPlus, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import { showError } from 'appUtils/showError';

const Signup: FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false); 
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    // Sign up with Supabase
    const { error: signUpError, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    setMessage('Please check your email to confirm your account.');

    // Insert the user into the Prisma database
    try {
      const res = await axios.post('/api/users/create', {
        id: signUpData.user?.id,
        email,
        name,
      });

      router.push('/login');
    } catch (apiError) {
      showError('Failed to create task. Please try again.');
      setError('Failed to save user data');
      console.error('API error:', apiError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-100">
      <div className="w-full max-w-md p-10 space-y-8 bg-white rounded-xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-4xl font-extrabold text-center text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Join us and start managing your tasks efficiently
          </p>
        </div>
        <form onSubmit={handleSignUp} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Full Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the{' '}
              <button
                type="button"
                className="font-medium text-green-600 hover:text-green-500"
                onClick={() => setShowTerms(!showTerms)}
              >
                Terms and Conditions
                {showTerms ? <FaChevronUp className="ml-1 inline" /> : <FaChevronDown className="ml-1 inline" />}
              </button>
            </label>
          </div>

          {showTerms && (
            <div className="mt-4 p-4 border border-gray-300 rounded-md text-sm text-gray-700 bg-gray-50">
              <h2 className="text-lg font-bold mb-2">Terms and Conditions</h2>
              <p className="mb-2">
                Welcome to our application. These terms and conditions outline the rules and regulations for the use of our application.
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use the application if you
                do not agree to all of the terms and conditions stated on this page.
              </p>
              <h3 className="font-semibold mb-1">License</h3>
              <p className="mb-2">
                Unless otherwise stated, we own the intellectual property rights for all material on the application. All intellectual
                property rights are reserved. You may access this from the application for your own personal use subjected to restrictions
                set in these terms and conditions.
              </p>
              <h3 className="font-semibold mb-1">User Comments</h3>
              <p className="mb-2">
                Certain parts of this application offer the opportunity for users to post and exchange opinions and information in certain
                areas of the website. We do not filter, edit, publish or review Comments prior to their presence on the website. Comments
                do not reflect the views and opinions of our company, its agents, and/or affiliates. Comments reflect the views and opinions
                of the person who posts their views and opinions. To the extent permitted by applicable laws, our company shall not be liable
                for the Comments or for any liability, damages, or expenses caused and/or suffered as a result of any use of and/or posting
                of and/or appearance of the Comments on this website.
              </p>
              <h3 className="font-semibold mb-1">Governing Law</h3>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of the country and you irrevocably submit
                to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              disabled={loading}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <FaUserPlus className="h-5 w-5 text-green-500 group-hover:text-green-400" />
              </span>
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
