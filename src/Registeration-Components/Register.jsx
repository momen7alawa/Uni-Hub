import React, { useState } from 'react'
import '../css/Login.css'
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false) // 🆕 Loading State

  const navigate = useNavigate()

  const validateInputs = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.')
      return false
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return false
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return false
    }

    if (!acceptTerms) {
      setError('You must accept the terms & conditions.')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateInputs()) return

    setLoading(true) // Start loading

    try {
      const checkRes = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/accounts?email=${encodeURIComponent(email)}`
      )
      const existing = await checkRes.json()

      if (existing.length > 0) {
        setError('This email is already registered. Please login.')
        setLoading(false)
        return
      }

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: `${firstName} ${lastName}`,
          email: email,
          password: password, // Note: In a real app, never send plain text passwords!
          role: 'student',    // Optional: Add a role
          createdAt: new Date().toISOString()
        })
      })

      if (!res.ok) {
        throw new Error('Failed to register')
      }

      setSuccess('Account created successfully! Redirecting...')

      setFirstName('')
      setLastName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setAcceptTerms(false)

      setTimeout(() => {
        navigate('/login')
      }, 1500)

    } catch (err) {
      console.error(err)
      setError('Server error. Please check your connection.')
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <section className="login-section">
      <div className="login-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Register</h2>

          {error && <p className="error-msg" style={{color: 'red', textAlign: 'center'}}>{error}</p>}
          {success && <p className="success-msg" style={{color: 'lightgreen', textAlign: 'center'}}>{success}</p>}

          <div className="input-box">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <span className="input-icon"><FaUser /></span>
          </div>

          <div className="input-box">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <span className="input-icon"><FaUser /></span>
          </div>

          <div className="input-box">
            <input
              type="email" // Browser built-in validation
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="input-icon"><FaEnvelope /></span>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="input-icon"><FaLock /></span>
          </div>

          <div className="input-box">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="input-icon"><FaLock /></span>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
              />{' '}
              I accept the terms &amp; conditions
            </label>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="register-link">
            <p>
              Already have an account?{' '}
              <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Register