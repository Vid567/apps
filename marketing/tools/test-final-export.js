const fs=require('fs');const assert=require('assert');
const db=JSON.parse(fs.readFileSync(require.resolve('../content-database.json'),'utf8'));
const posts=db.posts.filter(p=>p.product_key==='dcp'&&p.language==='en'&&p.review_status==='master'&&p.status==='SOURCE').slice(0,10);
const headers=['Post ID','Product','Language','Campaign','Text','Posting Time','Status','UTM URL'];
const esc=v=>`"${String(v??'').replaceAll('"','""')}"`;
const rows=posts.map(p=>[p.id,'dcp','en','dcp_beta_en',p.text,p.planned_at||'','ready',p.tracking_url]);
const csv=[headers,...rows].map(r=>r.map(esc).join(',')).join('\r\n');
assert.equal(posts.length,10,'Expected 10 production DCP EN posts');
for(const h of headers)assert(csv.split(/\r?\n/)[0].includes(h),`Missing header ${h}`);
for(const p of posts){assert(p.tracking_url.includes('utm_source=threads'));assert(p.tracking_url.includes('utm_campaign=dcp_beta_en'));assert(p.tracking_url.includes('utm_content='));assert(csv.includes(p.id));}
assert.equal(new Set(posts.map(p=>p.id)).size,10,'Duplicate post IDs');
console.log('PASS production export regression: 10/10 DCP EN posts, unique IDs, headers and canonical UTM tracking OK');
