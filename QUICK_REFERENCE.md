# 🚀 Quick Reference Card

## Commands Cheat Sheet

```bash
# Start development
npm run dev                    # → http://localhost:5174

# Build for production
npm run build                  # → Creates dist/ folder
npm run preview               # → Preview production build

# Linting
npm run lint                  # Check code quality

# Install new package
npm install package-name      # Add dependency
npm install -D package-name   # Add dev dependency
```

---

## File Quick Access

| File | Purpose | Edit For |
|------|---------|----------|
| `src/App.jsx` | Main app routing | Add new routes |
| `src/components/Navbar.jsx` | Navigation bar | Nav items, logo |
| `src/pages/Home.jsx` | Landing page | Hero content |
| `src/pages/Guide.jsx` | Step guide | Cultivation steps |
| `src/pages/FranchisePage.jsx` | Franchise info | Plans, pricing |
| `src/pages/Dashboard.jsx` | Monitoring | Sensor data |
| `src/pages/Marketplace.jsx` | Products | Products, dosage |
| `src/i18n/index.js` | i18n setup | Add languages |
| `src/i18n/locales/en.json` | Translations | Copy & translate |
| `src/index.css` | Styling | Colors, animations |
| `index.html` | HTML shell | Meta tags, title |
| `vite.config.js` | Build config | Ports, proxies |
| `package.json` | Dependencies | Versions |

---

## Routes Map

```
/                 → Home page
/guide            → Cultivation guide
/franchise        → Franchise info
/dashboard        → Monitoring dashboard
/marketplace      → Products & dosage
```

---

## Component Tree

```
App
  ├─ Navbar
  │   └─ Language Switcher
  ├─ Routes
  │   ├─ Home
  │   │   ├─ Hero Section
  │   │   ├─ Why Cordyceps
  │   │   ├─ Scientific Benefits
  │   │   └─ About Us
  │   ├─ Guide
  │   │   ├─ Progress Bar
  │   │   └─ Step Content
  │   ├─ Franchise
  │   │   ├─ Benefits Grid
  │   │   ├─ Pricing Cards
  │   │   └─ Modal Form
  │   ├─ Dashboard
  │   │   ├─ Sensor Cards
  │   │   ├─ Charts
  │   │   └─ Alerts
  │   └─ Marketplace
  │       ├─ Benefits
  │       ├─ Product Grid
  │       └─ Dosage Guide
  └─ Footer
```

---

## Common Edits

### Change Hero Title
File: `src/pages/Home.jsx` (line 32)
```jsx
<motion.h1>
  <span className="gradient-text">Your New Title Here</span>
</motion.h1>
```

### Add Navigation Item
File: `src/components/Navbar.jsx` (line 19)
```jsx
const NAV = [
  // ... existing
  { to: '/new-page', key: 'newPage' },
];
```

Then in translations:
File: `src/i18n/locales/en.json`
```json
{
  "nav": {
    "newPage": "New Page"
  }
}
```

### Change Brand Color
File: `src/index.css` (line 6)
```css
--color-primary-500: #22c55e;  /* Change this */
```

### Add New Language
1. Copy `src/i18n/locales/en.json` → `xx.json`
2. Translate all strings
3. Update `src/i18n/index.js`:
```js
import xx from './locales/xx.json';
// Add to resources
```

---

## Useful Keyboard Shortcuts

```
Ctrl+Shift+P      → VS Code command palette
Ctrl+F            → Search in file
Ctrl+H            → Find & replace
Ctrl+/            → Toggle comment
Alt+Up/Down       → Move line
Ctrl+K Ctrl+S     → VS Code shortcuts
```

### React/JSX Snippets
```
jsx      → New functional component
rafce    → React arrow function component
```

---

## CSS Classes Cheat Sheet

### Buttons
```jsx
className="btn-primary"        // Green primary button
className="btn-outline"        // Outline button
className="btn-primary w-full" // Full width
className="btn-primary !py-2.5"// Override padding
```

### Cards
```jsx
className="glass"              // Frosted glass effect
className="glass p-6"          // Glass + padding
className="glass-strong"       // Stronger blur
className="card-interactive"   // Hover effects
```

### Badges
```jsx
className="badge-green"        // Green accent
className="badge-yellow"       // Yellow/warning
className="badge-red"          // Red/danger
```

### Text
```jsx
className="gradient-text"      // Green→Blue gradient
className="text-white/50"      // 50% opacity white
className="text-sm font-bold"  // Small bold text
```

### Grid
```jsx
className="grid grid-cols-2"            // 2 columns
className="grid md:grid-cols-3"         // 3 cols at md+
className="grid lg:grid-cols-4 gap-6"   // 4 cols + gap
```

### Spacing
```jsx
className="p-4"                // Padding all sides
className="px-6 py-3"          // Horizontal + vertical
className="mt-4 mb-6"          // Margins
className="gap-4"              // Grid/flex gap
```

---

## State Management Template

```jsx
// useState for simple state
const [isOpen, setIsOpen] = useState(false);

// useEffect for side effects
useEffect(() => {
  const unsubscribe = () => {};
  return () => unsubscribe();
}, [dependency]);

// Combining multiple states
const [values, setValues] = useState({
  name: '',
  email: '',
  age: '',
});

// Toggle functionality
const toggle = () => setIsOpen(!isOpen);

// Set by property
const handleChange = (e) => {
  setValues({
    ...values,
    [e.target.name]: e.target.value,
  });
};
```

---

## Testing Checklist

- [ ] All routes accessible?
- [ ] All buttons clickable?
- [ ] Forms submit?
- [ ] Language switcher works?
- [ ] Animations smooth?
- [ ] Mobile responsive?
- [ ] No console errors?
- [ ] No visual glitches?

---

## Deployment Checklist

- [ ] `npm run build` succeeds
- [ ] No console errors in build
- [ ] `npm run preview` works
- [ ] All images optimized
- [ ] Meta tags updated
- [ ] Analytics setup
- [ ] Error tracking setup
- [ ] Security headers configured

---

## Performance Tips

1. **Check Bundle Size**
   ```bash
   npm install -g vite-plugin-visualizer
   # Then analyze build
   ```

2. **Test Performance**
   - Open DevTools (F12)
   - Go to Lighthouse
   - Run audit
   - Target 90+ score

3. **Monitor Production**
   - Use Sentry for errors
   - Use Google Analytics
   - Monitor 404s

---

## Debug Tips

### See What's Rendering
```jsx
// Add to component
console.log('Component rendered');
```

### Check Props
```jsx
console.log('Props:', props);
```

### Monitor State Changes
```jsx
useEffect(() => {
  console.log('State changed:', value);
}, [value]);
```

### Network Issues
```
DevTools → Network tab → Check requests
DevTools → Console → Look for errors
Browser Cache → Clear if needed
```

---

## Resources

- **React Docs**: https://react.dev
- **Tailwind**: https://tailwindcss.com
- **Icons**: https://react-icons.github.io/react-icons
- **i18next**: https://i18next.com
- **Framer Motion**: https://www.framer.com/motion

---

## File Size Reference

```
node_modules/: ~500MB (ignored in git)
dist/ (build): ~300KB gzipped
src/: ~900 lines of code
locales/: 5 complete JSON files
docs/: 3 markdown files
```

---

## Git Commands

```bash
# Initialize repo
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin <URL>
git branch -M main
git push -u origin main

# Daily workflow
git add .
git commit -m "Feature: description"
git push
```

---

## Environment Variables (if needed)

```
.env.local
.env.production
.env.development

VITE_API_URL=https://api.example.com
VITE_VERSION=1.0.0
```

Access in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Troubleshooting Quick Fixes

| Issue | Solution |
|-------|----------|
| Port in use | Kill process: `netstat -ano \| grep 5173` |
| Dependencies broken | `npm install --force` |
| Styles not updating | Hard refresh: `Ctrl+Shift+R` |
| Old data showing | Clear cache: DevTools → Application → Clear |
| Build fails | Check console for specific errors |
| Components not rendering | Check route in App.jsx |

---

## Code Style Example

```jsx
// ✅ GOOD
export default function ProductCard({ product }) {
  return (
    <motion.div variants={fade} className="glass p-6">
      <h3 className="text-white font-bold">{product.name}</h3>
      <p className="text-white/50 text-sm">{product.desc}</p>
    </motion.div>
  );
}

// ❌ BAD
const ProductCard = (p) => <div><h3>{p.p.name}</h3></div>

// ❌ AVOID
const [state, setState] = useState('');
<div style={{color: 'red'}}>Text</div>
const nested = () => { const inner = () => {...}; }
```

---

## Quick Wins (Easy Improvements)

1. **Add favicon**: Replace in `index.html`
2. **Update title**: Edit `<title>` in `index.html`
3. **Change colors**: Edit `@theme` in `index.css`
4. **Add logo**: Create `src/assets/logo.svg`
5. **Update content**: Edit locale JSON files

---

## Performance Budget

```
Bundle: < 500KB gzipped
First Paint: < 1s
Interactive: < 2.5s
Lighthouse Score: > 90
Mobile Score: > 85
```

---

## Team Guidelines

1. **Code Reviews**: Check before merging
2. **Naming**: Use descriptive names
3. **Comments**: Explain why, not what
4. **Commits**: "type: description" format
5. **Testing**: Manual + automated
6. **Docs**: Keep README updated

---

**Need Help?** Check DOCUMENTATION.md or TECHNICAL_SPEC.md 📚
