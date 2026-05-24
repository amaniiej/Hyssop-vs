# 🌿 Hyssop Herb Website

This is a modern React + Tailwind CSS website for Hyssop Herb, designed with a premium and professional user interface.

---

# 🚀 Project Structure

```
hyssop-ui/
│
├── public/
│   └── images/        # All website images go here
│
├── src/
│   ├── components/    # Reusable UI components (Navbar, Hero, etc.)
│   ├── pages/         # Pages (Home, Shop, About, Contact)
│   └── App.tsx        # Routing setup
```

---

# 🖼 IMAGE SETUP (VERY IMPORTANT)

## 📁 Where to put images

All images MUST go inside:

```
public/images/
```

Example:

```
public/images/hero.jpg
public/images/product1.jpg
public/images/about1.jpg
```

---

## ❌ DO NOT

* Do NOT put images inside `src/`
* Do NOT use random external links
* Do NOT mix image styles

---

# 🧱 HOW TO ADD IMAGES

## 🔹 Example: Product Image

### BEFORE (placeholder)

```
<div className="h-40 bg-linear-to-br ...">Image</div>
```

### AFTER (real image)

```
<img
  src="/images/product1.jpg"
  className="h-40 w-full object-cover rounded-lg"
/>
```

---

## 🔹 Example: About Page Image

```
<img
  src="/images/about1.jpg"
  className="h-64 w-full object-cover rounded-xl"
/>
```

---

## 🔹 Example: Hero Background (ADVANCED)

Inside Hero.tsx:

```
style={{
  backgroundImage: "url('/images/hero.jpg')",
  backgroundSize: "cover",
  backgroundPosition: "center"
}}
```

---

# 📦 REQUIRED IMAGES

## Hero Section

* hero.jpg (main landing background)

## Products

* product1.jpg
* product2.jpg
* product3.jpg

## Shop Page

* reuse product images or add more

## About Page

* about1.jpg (mission image)
* about2.jpg (approach image)

---

# 🎨 IMAGE STYLE GUIDELINES (IMPORTANT)

To keep the website professional:

✔ Use natural lighting
✔ Use herbal / green theme
✔ Keep consistent color tone
✔ Use high-quality images

---

## 🔍 Recommended sources

* Unsplash
* Pexels

Search keywords:

* "herbal products"
* "natural skincare"
* "organic wellness"
* "spa nature"

---

# ⚙️ RUNNING THE PROJECT

```
npm install
npm run dev
```

Then open:

```
http://localhost:5174/
```

---

# 🧭 PAGES

* `/` → Home (Landing Page)
* `/shop` → Shop Page
* `/about` → About Page
* `/contact` → Contact Page

---

# 💡 NOTES FOR DEVELOPERS

* This project uses React + Vite + Tailwind CSS
* Keep UI consistent when adding new sections
* Follow existing spacing and color system
* Reuse components where possible

---

# 🚀 NEXT STEPS

* Connect backend (contact form + reviews)
* Add real product data
* Deploy website

---

End of documentation.
