import fs from 'node:fs/promises';

const config=JSON.parse(await fs.readFile(new URL('./products.json',import.meta.url),'utf8'));
const token=process.env.GITHUB_TOKEN;
const headers={'Accept':'application/vnd.github.raw+json','X-GitHub-Api-Version':'2022-11-28',...(token?{'Authorization':`Bearer ${token}`}:{})};

function extractBalancedArray(source,marker){
  const start=source.indexOf(marker); if(start<0) throw new Error(`Marker not found: ${marker}`);
  const open=source.indexOf('[',start); let depth=0, quote=null, template=false, escaped=false;
  for(let i=open;i<source.length;i++){
    const c=source[i];
    if(escaped){escaped=false;continue} if(c==='\\'){escaped=true;continue}
    if(quote){if(c===quote)quote=null;continue}
    if(template){if(c==='`')template=false;continue}
    if(c==='"'||c==="'"){quote=c;continue} if(c==='`'){template=true;continue}
    if(c==='[')depth++; if(c===']'&&--depth===0)return source.slice(open,i+1);
  }
  throw new Error('Unclosed array');
}
function parseDcpPp(html){
  const array=extractBalancedArray(html,'const posts='); const items=[];
  const re=/\{theme:'([^']*)',hook:(?:'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)"),body:(?:'((?:\\.|[^'])*)'|"((?:\\.|[^"])*)")\}/g;
  let m; const un=s=>String(s??'').replace(/\\n/g,'\n').replace(/\\'/g,"'").replace(/\\"/g,'"');
  while((m=re.exec(array))) items.push({theme:un(m[1]),hook:un(m[2]??m[3]),body:un(m[4]??m[5])}); return items;
}
function parseStamp(html){
  const array=extractBalancedArray(html,'const raw='); const items=[]; const re=/\["([^"]+)",`([\s\S]*?)`\]/g; let m;
  while((m=re.exec(array))) items.push({theme:m[1],text:m[2]}); return items;
}
function utm(product,id,locale){
  const u=new URL(product.destination); if(u.hostname==='bit.ly') return product.destination;
  u.searchParams.set('utm_source','threads');u.searchParams.set('utm_medium','social');u.searchParams.set('utm_campaign',`${product.campaign}_${locale.toLowerCase()}`);u.searchParams.set('utm_content',id.toLowerCase());return u.toString();
}
const rows=[];
for(const product of config.products){
  const [owner,repo]=product.repository.split('/'); const url=`https://api.github.com/repos/${owner}/${repo}/contents/${product.sourcePath}?ref=main`;
  const res=await fetch(url,{headers}); if(!res.ok) throw new Error(`${product.repository}: ${res.status}`); const html=await res.text();
  const parsed=product.key==='stamp'?parseStamp(html):parseDcpPp(html); if(parsed.length!==50) throw new Error(`${product.name}: expected 50 posts, found ${parsed.length}`);
  parsed.forEach((p,index)=>{const baseId=`${product.prefix}-${String(index+1).padStart(3,'0')}`;let text=p.text;
    if(!text){const cta=index<25?`Try ${product.name} free 👇`:`Try ${product.name} free:`;text=`${p.hook}\n\n${p.body}\n\n${cta}\n${utm(product,baseId,'en')}\n\nDM me with your feedback.`} else text=text.replaceAll('${URL}',product.destination);
    rows.push({id:`${baseId}-en`,base_id:baseId,product:product.name,product_key:product.key,language:'en',region:'',theme:p.theme,text,cta:'DM me with your feedback.',destination_url:product.destination,tracking_url:utm(product,baseId,'en'),utm_source:'threads',utm_medium:'social',utm_campaign:`${product.campaign}_en`,utm_content:baseId.toLowerCase(),channel:'threads',status:'SOURCE',planned_at:'',published_at:'',notes:'',translations_needed:product.locales.filter(x=>x!=='en')});
  });
}
await fs.writeFile(new URL('./content-database.json',import.meta.url),JSON.stringify({version:1,generated_at:new Date().toISOString(),source_count:rows.length,posts:rows},null,2)+'\n');
const cols=['id','base_id','product','language','region','theme','text','cta','destination_url','tracking_url','channel','status','planned_at','published_at','notes']; const cell=v=>`"${String(v??'').replaceAll('"','""')}"`;
await fs.writeFile(new URL('./content-database.csv',import.meta.url),'\ufeff'+[cols,...rows.map(r=>cols.map(c=>r[c]))].map(r=>r.map(cell).join(',')).join('\r\n'));
console.log(`Built ${rows.length} canonical source posts.`);
