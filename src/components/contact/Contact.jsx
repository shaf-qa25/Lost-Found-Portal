import React from "react";
import './Contact.css'
export default function Contact() {
    const [result, setResult] = React.useState("");
  
    const onSubmit = async (event) => {
      event.preventDefault();
      setResult("Sending....");
      const formData = new FormData(event.target);
  
      formData.append("access_key", "1cf042c9-0d7f-4768-9e13-321352d0df78");
  
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
  
      const data = await response.json();
  
      if (data.success) {
        const successMessage = "Form Submitted Successfully";
        alert(successMessage);
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    };
  
    return (
      <section className="contact">
        <form onSubmit={onSubmit}>
            <h2>Complaint Form</h2>
          <div className="input-box">
            <label>Full Name</label>
            <input type="text" name="name" className="field" placeholder="Enter Your Name" required/>
          </div>
          <div className="input-box">
            <label>Email-Address</label>
            <input type="text" name="email" className="field" placeholder="Enter your Field"required/>
          </div>
          <div className="input-box">
            <label>Your Message</label>
            <textarea name="" id="" className="fieldMess" placeholder="Enter Your Message" required></textarea>
          </div>
  
          <button type="submit">Send Message</button>
  
        </form>
        
  
      </section>
    );
  }