import React from 'react'
import {InputGroup} from '../components/InputGroup'
import { Mail, Shield } from 'lucide-react'

function SupportSection() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Contact & Support</h3>
                <p className="text-gray-400">Have a bug to report or need help? Reach out.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#161616] cursor-pointer p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-purple-400 mb-4" />
                    <h4 className="text-white font-medium mb-1">Email Support</h4>
                    <p className="text-gray-500 text-sm">support@autojobai.com</p>
                </div>
                <div className="bg-[#161616] cursor-pointer p-6 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                    <Shield className="w-6 h-6 text-blue-400 mb-4" />
                    <h4 className="text-white font-medium mb-1">Privacy Policy</h4>
                    <p className="text-gray-500 text-sm">Read our terms</p>
                </div>
            </div>

            <form className="space-y-6 pt-6 border-t border-white/5">
                <InputGroup label="Subject" placeholder="e.g., Billing Issue" />
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Message</label>
                    <textarea
                        rows="5"
                        className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:text-gray-600"
                        placeholder="Describe your issue..."
                    ></textarea>
                </div>
                <button type="button" className="bg-white cursor-pointer text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Send Message
                </button>
            </form>
        </div>
    )
}

export default SupportSection