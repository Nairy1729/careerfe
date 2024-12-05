import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ContactUs.css";

function ContactForm() {
  const [state, handleSubmit] = useForm("xdkoywzp");

  React.useEffect(() => {
    if (state.succeeded) {
      toast.success("Thanks for reaching out! We'll get back to you shortly.");
    }
  }, [state.succeeded]);

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-form-group">
        <label htmlFor="email" className="contact-form-label">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="contact-form-input"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
        />
      </div>
      <div className="contact-form-group">
        <label htmlFor="message" className="contact-form-label">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="contact-form-textarea"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="btn-primary"
      >
        Send Message
      </button>
    </form>
  );
}

const ContactUs = () => {
  return (
    <div className="contact-us-page">
      <h1 className="contact-us-title">Contact Us</h1>
      <p className="contact-us-description">
        Have any questions or need assistance? Feel free to reach out to us
        using the form below, and we will get back to you as soon as possible.
      </p>
      <ContactForm />
      <ToastContainer />
    </div>
  );
};

export default ContactUs;
