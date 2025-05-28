import { useState } from "react";
import NavBarLanding from "../components/NavBarLanding";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("access_key", "a6b82597-5ef7-4d94-95ac-9899c201b96a"); // Replace with your Web3Forms API Key
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append("h-captcha-response", (document.getElementById("h-captcha") as HTMLInputElement)?.value || "");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: form,
      });

      const result = await res.json();
      if (result.success) {
        setResponse("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponse("Something went wrong. Please try again.");
      }
    } catch (error) {
      setResponse("Error submitting form. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
    <NavBarLanding/>
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
        
        {response && <p className="text-green-600 text-center">{response}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required 
          />

          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={formData.email} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required 
          />

          <textarea 
            name="message" 
            rows={4} 
            placeholder="Your Message" 
            value={formData.message} 
            onChange={handleChange} 
            className="w-full p-2 border rounded"
            required 
          />

          {/* hCaptcha Integration */}
          <div className="h-captcha" data-sitekey="bc80794e-3122-4388-a0ec-a44653aaf968"></div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
      <h1>Note : form is Currently on working phase</h1>
    </div>
    </>
  );
};

export default ContactUs;
