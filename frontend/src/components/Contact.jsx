import { useState } from 'react'
import { apiRequest } from '../lib/api'

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: '', text: '' })
    setLoading(true)
    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      })
      setStatus({ type: 'success', text: 'Message sent successfully. I have received it.' })
      setForm({ name: '', email: '', message: '' })
    } catch (err) {
      setStatus({ type: 'error', text: err.message || 'Failed to send message. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-screen-2xl container mx-auto px-4 md:px-20 my-20'>
      <h1 className='font-bold text-3xl mb-5 text-emerald-700 mt-10'>Contact me</h1>
      <p className='text-xl font-semibold'>Please fill out the contact form below, or reach out to me directly via email.</p>

        <div name="Contact" className='flex flex-col justify-center items-center mt-5 rounded-md'>

          <form onSubmit={handleSubmit} className='bg-slate-200 p-5 rounded-xl'>
            <h1 className='text-2xl font-bold'>Send Your Message</h1>
          <div className='mt-7'>
            <label htmlFor="txt_f_name" className='font-semibold'>Full Name</label><br />
            <input className="border-2 ml-1 rounded-md w-60 bg-white border-white" type="text" placeholder='Enter your full name' id='txt_f_name' name='name' value={form.name} onChange={handleChange} required />
          </div>
          <div className='mt-4'>
            <label htmlFor="txt_email">Email Address</label><br />
            <input className="border-2 ml-1 rounded-md w-60 bg-white border-white" type="email" placeholder='Email address' id='txt_email' name='email' value={form.email} onChange={handleChange} required />
          </div>
          <div className='mt-4'>
            <label htmlFor="txt_msg">Message</label><br />
            <textarea name="message" id="txt_msg" cols="30" className="border-2 ml-1 rounded-md bg-white border-white" placeholder='Type your message here' value={form.message} onChange={handleChange} required></textarea>
          </div>
          {status.text && (
            <p className={`mt-3 text-sm ${status.type === 'success' ? 'text-green-700' : 'text-red-600'}`}>{status.text}</p>
          )}
          <div className='mt-4'>
            <button type='submit' disabled={loading} className='border-2 pl-2 pr-2 rounded-md bg-black text-white font-semibold hover:scale-105 duration-100 hover:bg-gray-900 disabled:opacity-60'>{loading ? 'Sending...' : 'Send'}</button>
          </div>

          </form>
          
        </div>


    </div>
  )
}

export default Contact

