# 🎤 ConvoManage

**ConvoManage** is a modern, full-featured **conference management platform** built with scalable architecture and a polished user experience. It supports multiple user roles, real-time capabilities, and smooth end-to-end event management workflows.

---

## 🚀 Features

- 🔐 **Role-based authentication** for organizers, speakers, and attendees  
- 📆 **Event management dashboard** for scheduling, sessions, and more  
- 👥 **Speaker profiles** with session assignments  
- 💳 **Attendee registration** with optional **Stripe payments**  
- 🔔 **Real-time updates**, notifications, and reminders  
- 📊 **Analytics dashboard** for engagement and insights  
- 🌐 **Responsive & accessible UI** with modern design principles  

---

## 🧱 Tech Stack

| Layer        | Stack                                                                 |
|--------------|------------------------------------------------------------------------|
| **Frontend** | React 18 · TypeScript · Tailwind CSS · Lucide React                   |
| **Backend**  | Supabase (PostgreSQL · Auth · Edge Functions · Real-time)             |
| **Auth**     | Supabase Auth with JWT                                                |
| **State**    | React Context API · Custom Hooks                                      |
| **Payments** | Stripe Integration (optional)                                         |
| **Storage**  | Supabase Storage                                                      |
| **Deploy**   | Netlify                                                               |

---

## 🧭 Architecture Highlights

- 🔄 **Multi-tenant SaaS** structure  
- 🔌 Real-time collaboration via Supabase subscriptions  
- 🧩 Modular, scalable component system  
- 📡 REST-style APIs with real-time GraphQL-like updates  
- ♿ Accessibility-first, mobile-friendly design  

---

## 🛠 Setup Instructions

> ⚠️ Make sure to connect your Supabase project first!

1. **Clone the repo**  
   ```bash
   git clone https://github.com/Triplejw/ConvoManage.git
   cd ConvoManage
