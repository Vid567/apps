// Add future products to this list. The layout adapts automatically.
const products = [
  {
    name: "DailyCashPlan",
    description: "A simple overview of your income, expenses and debts so you can see where your money stands.",
    url: "https://bit.ly/dailycashplan",
    cta: "Open DailyCashPlan",
    category: "Finance",
    icon: "cash"
  },
  {
    name: "PantryPlan",
    description: "Keep track of what you have at home and make grocery shopping easier.",
    url: "https://bit.ly/pantryplan",
    cta: "Open PantryPlan",
    category: "Home",
    icon: "pantry"
  },
  {
    name: "AI Stamp Collection Scanner",
    description: "Turn your stamp collection into a clear, structured digital stamp inventory.",
    url: "https://bit.ly/AIStampScannerApp",
    cta: "Try Free Browser Beta",
    category: "Collecting",
    status: "Browser Beta v1.0",
    icon: "stamp"
  },
  {
    name: "AI Coin Collection Scanner",
    description: "Create a structured coin inventory from collection photos, review coin details, and flag items that may deserve further research.",
    url: "https://vid567.github.io/ai-coin-collection-scanner/en/",
    cta: "Try Free Browser Beta",
    category: "Collecting",
    status: "Browser Beta v3.1",
    icon: "coin"
  }
];

const icons = {
  cash: '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="7" width="24" height="18" rx="4" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="16" cy="16" r="4" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M8 11h2M22 21h2" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  pantry: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 5h16l2 5v17H6V10l2-5Z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/><path d="M6 11h20M12 17h8M16 14v6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
  stamp: '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="m6 4 3 2 3-2 4 2 4-2 3 2 3-2v24l-3-2-3 2-4-2-4 2-3-2-3 2V4Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/><rect x="11" y="10" width="10" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  coin: '<svg viewBox="0 0 32 32" aria-hidden="true"><circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" stroke-width="2.3"/><circle cx="16" cy="16" r="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 11v10M13 13h5a2 2 0 0 1 0 4h-5M13 17h5a2 2 0 0 1 0 4h-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};

const grid = document.querySelector("#product-grid");
for (const product of products) {
  const article = document.createElement("article");
  article.className = "product-card";
  article.dataset.category = product.category;

  const top = document.createElement("div");
  top.className = "card-top";
  const icon = document.createElement("div");
  icon.className = "product-icon";
  icon.innerHTML = icons[product.icon];
  top.append(icon);
  if (product.status) {
    const status = document.createElement("span");
    status.className = "status";
    status.textContent = product.status;
    top.append(status);
  }

  const category = document.createElement("span");
  category.className = "card-category";
  category.textContent = product.category;
  const heading = document.createElement("h3");
  heading.textContent = product.name;
  const description = document.createElement("p");
  description.textContent = product.description;
  const link = document.createElement("a");
  link.className = "product-link";
  link.href = product.url;
  link.textContent = product.cta;
  link.setAttribute("aria-label", `${product.cta} — opens the product`);

  article.append(top, category, heading, description, link);
  grid.append(article);
}

document.querySelector("#year").textContent = new Date().getFullYear();

// Analytics intentionally unconfigured. Add a dedicated Apps Hub stream here later.
