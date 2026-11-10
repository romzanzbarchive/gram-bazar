function initCheckout(){
const root=$('#co'),KEY='gb_pending',getP=()=>{try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}};
function totals(area,code){const sub=Cart.sub();let ship=DELIVERY[area]||0;if(FREE_DELIVERY_OVER>0&&sub>=FREE_DELIVERY_OVER)ship=0;const c=Cart.coupon(code,sub);return{sub,ship,disc:c.disc,tot:sub+ship-c.disc,c}}
function banner(){const p=getP(),b=$('#pend');if(!b)return;b.innerHTML=p?`<div class="notice">⏳ অর্ডার <b>${esc(p.id)}</b> এখনো <b>নিশ্চিত নয়</b>। WhatsApp-এ গিয়ে মেসেজটি <b>Send</b> চাপুন।<div class="ba"><a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">WhatsApp খুলুন</a><button class="btn alt" id="sent">আমি Send করেছি</button><button class="btn ghost" id="canc">বাতিল</button></div></div>`:'';if(p){$('#sent').onclick=()=>{localStorage.removeItem(KEY);Cart.clear();root.innerHTML=`<div class="empty">🙏<h2>ধন্যবাদ!</h2><p>আপনি মেসেজ পাঠিয়েছেন বলে জানিয়েছেন। অর্ডার ${esc(p.id)} আমরা WhatsApp-এ কনফার্ম করব।</p><a class="btn" href="index.html">হোমে যান</a></div>`};$('#canc').onclick=()=>{localStorage.removeItem(KEY);banner()}}}
function render(){const L=Cart.lines();if(!L.length){root.innerHTML=`<div id="pend"></div><div class="empty">🧺<p>আপনার কার্ট খালি</p><a class="btn" href="products.html">কেনাকাটা চালিয়ে যান</a></div>`;banner();return}
const area=localStorage.getItem('gb_area')||Object.keys(DELIVERY)[0];
root.innerHTML=`<div id="pend"></div><form id="fm" class="form" novalidate><h2>গ্রাহকের তথ্য</h2>
<label>নাম *<input name="name" required autocomplete="name"></label>
<label>মোবাইল নম্বর *<input name="phone" required inputmode="tel" placeholder="01XXXXXXXXX" autocomplete="tel"></label>
<label>বিকল্প ফোন (ঐচ্ছিক)<input name="alt" inputmode="tel"></label>
<label>জেলা *<input name="district" required value="ঢাকা"></label>
<label>উপজেলা *<input name="upazila" required></label>
<label>ইউনিয়ন *<input name="union" required></label>
<label>গ্রাম *<input name="village" required></label>
<label>ডেলিভারি এলাকা *<select name="area">${Object.entries(DELIVERY).map(([a,c])=>`<option value="${a}"${a==area?' selected':''}>${a} — ডেলিভারি ${tk(c)}</option>`).join('')}</select></label>
<label>পূর্ণ ঠিকানা *<textarea name="addr" required rows="2"></textarea></label>
<label>অতিরিক্ত নির্দেশনা<textarea name="note" rows="2"></textarea></label>
<label>কুপন কোড<div class="cp"><input name="coupon" placeholder="যেমন: GRAM10"><button type="button" class="btn alt" id="ap">প্রয়োগ</button></div></label><small id="cm"></small>
<h2>পেমেন্ট</h2><p class="pay">💵 ক্যাশ অন ডেলিভারি — পণ্য হাতে পেয়ে টাকা দিন</p>
<div class="sum" id="sum"></div><button class="btn big" type="submit">✅ অর্ডার নিশ্চিত করুন (WhatsApp)</button>
<p class="mut">বাটন চাপলে WhatsApp খুলবে। অর্ডার সম্পন্ন করতে সেখানে অবশ্যই <b>Send</b> চাপতে হবে।</p></form>`;
const f=$('#fm');
const sum=()=>{const t=totals(f.area.value,f.coupon.value);$('#sum').innerHTML=L.map(({p,q})=>`<div><span>${esc(p.name)} × ${bn(q)}</span><b>${tk(pr(p)*q)}</b></div>`).join('')+`<div><span>সাবটোটাল</span><b>${tk(t.sub)}</b></div><div><span>ডেলিভারি চার্জ (${esc(f.area.value)})</span><b>${t.ship?tk(t.ship):'ফ্রি'}</b></div>${t.disc?`<div><span>কুপন ছাড়</span><b>−${tk(t.disc)}</b></div>`:''}<div class="gt"><span>সর্বমোট</span><b>${tk(t.tot)}</b></div>`;return t};
f.area.onchange=sum;$('#ap').onclick=()=>{const t=sum();$('#cm').textContent=t.c.msg||'কুপন কোড লিখুন'};sum();
f.onsubmit=e=>{e.preventDefault();if(!f.checkValidity()){f.reportValidity();return}
const v=Object.fromEntries(new FormData(f)),ph=v.phone.replace(/[\s-]/g,'');if(!/^(\+?88)?01[3-9]\d{8}$/.test(ph)){toast('সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)');f.phone.focus();return}
const t=sum(),id='GB-'+Date.now().toString(36).toUpperCase().slice(-6)+Math.floor(Math.random()*90+10);
const msg=[`🛒 *নতুন অর্ডার — GramBazar*`,`🆔 অর্ডার আইডি: ${id}`,'',`👤 নাম: ${v.name}`,`📞 ফোন: ${ph}${v.alt?' / '+v.alt:''}`,`📍 ঠিকানা: ${v.addr}, গ্রাম: ${v.village}, ইউনিয়ন: ${v.union}, উপজেলা: ${v.upazila}, জেলা: ${v.district} (এলাকা: ${v.area})`,'','*পণ্য তালিকা:*',...L.map(({p,q},i)=>`${i+1}. ${p.name} — ${q} × ৳${pr(p)} = ৳${pr(p)*q}`),'',`সাবটোটাল: ৳${t.sub}`,`ডেলিভারি চার্জ: ৳${t.ship}`,...(t.disc?[`কুপন ছাড় (${t.c.code}): −৳${t.disc}`]:[]),`*সর্বমোট: ৳${t.tot}*`,'',`💳 পেমেন্ট: ক্যাশ অন ডেলিভারি`,...(v.note?[`📝 নির্দেশনা: ${v.note}`]:[])].join('\n');
const url=`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
try{localStorage.setItem(KEY,JSON.stringify({id,url}))}catch(x){}
if(!window.open(url,'_blank'))location.href=url;banner();$('#pend').scrollIntoView()};
banner()}
render()}
