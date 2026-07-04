# Shree Infotech - Next.js Website

This is a modern, fast, and SEO-optimized website built for Shree Infotech using Next.js 15, React, and CSS Modules.

## 🚀 Local Development Setup

To run this website locally on your computer:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Email (Required for Inquiry Form)**
   The inquiry form uses Nodemailer to send emails directly to your Gmail account. Google requires an "App Password" to allow this.
   
   - Go to your Google Account -> Security.
   - Enable 2-Step Verification (if not already enabled).
   - Search for **App Passwords** and create a new one (call it "Website").
   - Copy the 16-letter code.
   - Create a file named `.env.local` in the root of your project folder.
   - Add the following line to the file, replacing the placeholder with your 16-letter code:
     ```env
     EMAIL_PASSWORD=your_16_letter_app_password_here
     ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Hosting on Vercel

This project is fully ready to be deployed on [Vercel](https://vercel.com).

### Deployment Steps:
1. Push this code to a GitHub repository.
2. Log in to Vercel and click "Add New" -> "Project".
3. Import your GitHub repository.
4. Open the **Environment Variables** section in the Vercel deployment settings.
5. Add the following variable:
   - **Key:** `EMAIL_PASSWORD`
   - **Value:** (your 16-letter Gmail app password)
6. Click **Deploy**.

### ⚠️ Important Note About Vercel & Testimonials:
Vercel uses a "serverless" architecture, which means it **cannot write files permanently** to its own filesystem (like `data/testimonials.json`). 

**Good News: I have fully integrated a Free Vercel Database (Redis) for you!** 
To ensure your testimonials are saved permanently when hosted on Vercel, just follow these quick steps to enable the free database:

1. Log in to Vercel and click your `Shreeinfo` project.
2. Go to the **Storage** tab at the top.
3. Click **Connect Database** or **Create Database** and select **Upstash Redis** (or Vercel KV).
4. Click through the default options to create it (the free tier is automatically selected).
5. Vercel will automatically add the required environment variables (like `KV_REST_API_URL`) to your project.
6. Re-deploy your project (Go to Deployments -> Redeploy).

The website will automatically detect the database and start saving all client testimonials permanently!

## ✨ Features
- **Next.js 15 App Router** for lightning-fast performance.
- **Advanced SEO (JSON-LD)** to ensure you rank #1 for "Computer Repair Shop" in Mundra.
- **Glassmorphism UI** with smooth CSS animations.
- **Working Contact API** that sends emails directly to `shreeinfo.mdr@gmail.com`.
- **Dynamic Testimonials** that fetch and display automatically.
