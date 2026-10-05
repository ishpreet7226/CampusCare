# 🛡️ CampusCare — Smart Student Support & Triage

> **ServiceNow Co-Innovation Day Challenge**
> *Intelligent student support routing for university campuses*

---

## 🎯 Problem

Students struggle to find the correct university support service when they need help. Support is fragmented across multiple departments — academic services, wellbeing, financial aid, accommodation, career services — and students often don't know which one to contact.

This leads to:
- Delayed support
- Students falling through the cracks
- Repeated redirections between departments
- Frustration and disengagement

## 💡 Solution

**CampusCare** provides a single entry point where a student can describe their problem in plain language. The system uses **Smart Triage** to:

1. Analyse the student's request
2. Identify the correct support category
3. Recommend the appropriate department and service
4. Create a trackable support case

No forms, no jargon, no guessing which department to contact.

## 🚀 User Journey

```
Student opens CampusCare
    → Describes what they need help with
    → Smart Triage analyzes the request
    → Identifies support category
    → Recommends the correct service
    → Student confirms
    → Support case is created
    → Student sees Case ID, department, and status
    → Student can track progress on the dashboard
```

## ✨ Features

| Feature | Description |
|---------|-------------|
| **Smart Triage** | Keyword-based classification engine that routes requests to the correct support category |
| **Support Categories** | Academic, Wellbeing, Financial, Accommodation, Career, and General support |
| **Case Creation** | Generates a trackable support case with unique ID |
| **Progress Tracking** | Visual progress indicator (Submitted → Assigned → In Progress → Resolved) |
| **Case Dashboard** | View and track all submitted support cases |
| **Demo Mode** | Pre-built examples for judges to quickly test all categories |
| **Offline Support** | Works completely offline after installation |

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React** | UI framework |
| **Vite** | Build tool & dev server |
| **React Router** | Client-side routing |
| **Lucide React** | Icon library |
| **localStorage** | Case persistence |
| **Vanilla CSS** | Custom design system |

- ✅ No backend required
- ✅ No database required
- ✅ No authentication required
- ✅ No external API dependencies
- ✅ Works offline after `npm install`

## 📦 How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

## 🎬 Demo Flow (for judges)

1. **Open the app** → Land on the professional homepage
2. **Click "Get Support"** → Navigate to the support page
3. **Click "Demo Examples"** → Expand the demo panel
4. **Select an example** (e.g., "Academic difficulty") → Text is pre-filled
5. **Click "Find My Support"** → Watch the Smart Triage analyze the request
6. **Review the result** → See the recommended category, service, priority, and reason
7. **Click "Create Support Request"** → A case is created with a unique ID
8. **Click "View My Cases"** → See the case on the dashboard with full details

⏱️ **Total demo time: ~90 seconds**

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx / Header.css     # Navigation header
│   └── Footer.jsx / Footer.css     # Page footer
├── data/
│   └── triageData.js               # Triage engine, categories, keywords
├── pages/
│   ├── HomePage.jsx / HomePage.css  # Landing page
│   ├── SupportPage.jsx / SupportPage.css  # Support form + triage + case creation
│   └── CasesPage.jsx / CasesPage.css     # Case dashboard
├── App.jsx                          # Root component with routing
├── main.jsx                         # Entry point
└── index.css                        # Global design system
```

## 🔮 Future ServiceNow Integration

This prototype is designed to seamlessly integrate with **ServiceNow** in a production environment:

| Prototype (Current) | ServiceNow Integration (Future) |
|---------------------|--------------------------------|
| Mock keyword classification | ServiceNow AI/ML classification via Predictive Intelligence |
| localStorage cases | ServiceNow Case/Incident records |
| Mock case IDs (SN-XXXX) | Real ServiceNow case numbers |
| Static progress tracker | ServiceNow workflow-driven status updates |
| No authentication | ServiceNow SSO / university identity provider |
| Client-side only | ServiceNow REST API integration |
| Demo data | Real student data with privacy controls |

### Integration Points:

- **ServiceNow CSM (Customer Service Management)** → Create and manage real support cases
- **ServiceNow Virtual Agent** → Replace mock triage with AI-powered routing
- **ServiceNow Knowledge Base** → Surface relevant self-help articles
- **ServiceNow Assignment Rules** → Auto-assign cases to the correct support team
- **ServiceNow SLA Management** → Track response and resolution times
- **ServiceNow Notifications** → Email/SMS updates on case progress

---

**Built for ServiceNow Co-Innovation Day** 🏆
