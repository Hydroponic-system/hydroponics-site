# 🚀 Hydroponics Factory - Website Implementation Guide

This is a professional B2B static website template designed for your agricultural hydroponics company. It follows the structure of [Hydroponics Factory](https://www.hydroponicsfactory.com/) and is optimized for GitHub Pages.

## 📦 What's Included
- `index.html`: Home page with hero, why choose us, featured products, and inquiry form.
- `products.html`: Product showcase including Greenhouse, Tower, NFT Pipes, Dutch Buckets, etc.
- `about.html`: Company history, factory info, and certifications.
- `contact.html`: Detailed contact info and inquiry lead generation form.

## 🛠️ How to Upload to GitHub (For Non-Coders)

### Step 1: Prepare your Repository
1. Log in to your **GitHub** account.
2. Click the **"+"** icon (top right) and select **"New repository"**.
3. Repository name: `your-company-name` (e.g., `agro-hydro-systems`).
4. Set it to **Public**.
5. Click **"Create repository"**.

### Step 2: Upload Files
1. In your new repository, click **"Upload files"**.
2. Drag and drop all the `.html` files (`index.html`, `products.html`, `about.html`, `contact.html`) into the box.
3. Scroll down and click **"Commit changes"**.

### Step 3: Enable Website (GitHub Pages)
1. Go to **"Settings"** (top menu of your repository).
2. Click **"Pages"** in the left sidebar.
3. Under **"Build and deployment" > "Branch"**, select **"main"** (or `master`) and folder **"/(root)"**.
4. Click **"Save"**.
5. Wait ~2 minutes. Your site will be live at `https://yourusername.github.io/your-repo-name/`.

---

## 🎨 How to Customize (Editing Content)

You don't need to know code to make simple changes. Open the `.html` files in any text editor (Notepad, VS Code):

### 1. Change Text
Search for the text you want to change (e.g., `sales@yourhydroponics.com`) and replace it with your real email.

### 2. Change Images
The template uses placeholder images from Unsplash. To use your own:
1. Upload your photos to a folder named `img` in your GitHub repo.
2. In the HTML code, find `<img src="...">` and change the path to `img/your-photo.jpg`.

### 3. Change Colors
The website uses **Tailwind CSS**. To change the primary green color, look at the top of `index.html` inside `<script>`:
```javascript
colors: {
    primary: '#2D7A27', // Change this HEX code to your brand color
    secondary: '#F59E0B', // Change this for the buttons
}
```

## 📩 About the Inquiry Form
Since this is a static website (HTML only), the "Submit" button won't send an email automatically. 
**Recommendation:** Use a free service like [Formspree](https://formspree.io/) or [Getform.io](https://getform.io/). You just need to change the `<form action="#">` to `<form action="https://formspree.io/f/your-unique-id">`.

---
*Created with ❤️ for your Hydroponics Business.*
