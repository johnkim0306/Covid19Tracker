import React from 'react'
import './contact.scss'
import {MdOutlineEmail} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {BsWhatsapp} from 'react-icons/bs'

const ContactOption = ({ icon, title, description, linkText, linkHref }) => (
    <article className="contact__option">
      {icon}
      <h4>{title}</h4>
      <h5>{description}</h5>
      <a href={linkHref}>{linkText}</a>
    </article>
)

const ContactForm = () => (
    <form action="">
        <input type="text" name='name' placeholder="Your Full Name" required />
        <input type="email" name='email' placeholder="Your Email" required />
        <textarea name="message" rows="7" placeholder="Your Message" required></textarea>
        <button type='submit' className='btn btn-primary'> Send Message</button>
    </form>
)

const Contact = () => {
    return (
            <section id='contact'>
                <h5>Get in Touch</h5>
                <h2>Contact Me</h2>
                <div className="container contact__container">
                    <div className="contact__options">
                    <ContactOption
                        icon={<MdOutlineEmail className='contact__option-icon' />}
                        title='Email'
                        description='john.kim0306@gmail.com'
                        linkText='Send a message'
                        linkHref='mailto:john.kim0306@gmail.com'
                    />
                    <ContactOption
                        icon={<RiMessengerLine className='contact__option-icon' />}
                        title='Messenger'
                        description='john kim'
                        linkText='Send a message'
                        linkHref='https://m.me/100000925471875'
                    />
                    <ContactOption
                        icon={<BsWhatsapp className='contact__option-icon' />}
                        title='WhatsApp'
                        description='john.kim0306@gmail.com'
                        linkText='Send a message'
                        linkHref='https://api.whatsapp.com/send?phone+15877773519'
                    />
                    </div>
                    <ContactForm />
                </div>
            </section>
    )
}

export default Contact
