import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import { verifyPaymentAPI } from "../../services/allAPI";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";


const plans = [
  {
    name: "Free",
    price: 0,
    priceId: null,
    features: ["1 Job Post", "Basic Applications"],
  },
  {
    name: "Pro",
    price: 29,
    priceId: "price_pro_xxx",
    features: ["10 Job Posts", "AI Scoring", "Analytics"],
  },
  {
    name: "Enterprise",
    price: 99,
    priceId: "price_enterprise_xxx",
    features: ["Unlimited Jobs", "Advanced AI", "Team Access"],
  },
];

const PlanModal = ({ onClose }) => {
  const modalRef = useRef();
  const [user,setUser] = useState();

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  const fetchUser = () =>{
    const user = sessionStorage.getItem("user");
      setUser(JSON.parse(user))

  }


  const makePayment = async (plan) => { // Accept the whole plan object
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PKEY);
    const token = sessionStorage.getItem("token");

    if (token) {
      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Pass the plan details (like priceId or name) to the backend
      const result = await verifyPaymentAPI(plan, reqHeader);

      if (result.status === 200) {
        const { checkOutURL } = result.data;
        window.location.href = checkOutURL;
      
      }else if(result.status == 400){
        console.log(result.status);
        toast.error("User Already Subscribed")

      }
    }
  };



  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-gray-900 rounded-2xl w-full max-w-3xl p-6 border border-gray-700 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h3 className="text-2xl font-bold text-white mb-6">
          Choose Your Plan
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border border-gray-700 rounded-xl p-5 hover:border-purple-500 transition"
            >
              <h4 className="text-xl text-white font-semibold">
                {plan.name}
              </h4>
              <p className="text-3xl text-purple-400 font-bold mt-2">
                ${plan.price}
              </p>

              <ul className="mt-4 space-y-2 text-gray-400 text-sm">
                {plan.features.map((f) => (
                  <li key={f}>• {f}</li>
                ))}
              </ul>

              <button
                onClick={() => makePayment(plan)}
                className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg"
              >
                {plan.price === 0 ? "Current Plan" : "Subscribe"}
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={3000} theme='colored' />
    </div>
  );
};

export default PlanModal;
