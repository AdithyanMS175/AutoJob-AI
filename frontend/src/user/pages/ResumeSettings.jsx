import { Upload } from 'lucide-react'
import React from 'react'

function ResumeSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-bold text-white mb-2">Resume & AI Context</h3>
                <p className="text-gray-400">Upload your base resume so our AI can tailor it for jobs.</p>
            </div>

            <div className="bg-[#161616] border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-purple-500/50 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-purple-400" />
                </div>
                <p className="text-white font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-gray-500 text-sm">PDF, DOCX up to 10MB</p>
            </div>

            <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">AI Customization Rules</h4>
                <div className="p-4 bg-[#161616] rounded-xl border border-white/5">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="mt-1 w-4 h-4 rounded bg-gray-800 border-gray-600 text-purple-600 focus:ring-purple-500" defaultChecked />
                        <div>
                            <span className="text-white text-sm font-medium">Auto-Emphasize Skills</span>
                            <p className="text-gray-500 text-xs mt-1">Allow AI to rearrange your skills based on the job description.</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default ResumeSettings