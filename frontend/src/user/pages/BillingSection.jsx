import React, { useState } from "react";
import { gsap } from "gsap";
import PlanModal from "../components/PlanModal";

function BillingSection() {
  const [open, setOpen] = useState(false);

  const fetchUser = () => {
    const user = sessionStorage.getItem("user")
    
    
  }


  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Subscription</h3>
          <p className="text-gray-400">Manage your plan.</p>
        </div>

        <div className="bg-linear-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-purple-300 text-sm font-medium mb-1">
              Current Plan
            </p>
            <h4 className="text-2xl font-bold text-white">Pro Developer</h4>
            <p className="text-gray-400 text-sm mt-1">
              Renews on Jan 25, 2026
            </p>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Manage
          </button>
        </div>
      </div>

      {open && <PlanModal onClose={() => setOpen(false)} />}
    </>
  );
}

export default BillingSection;
