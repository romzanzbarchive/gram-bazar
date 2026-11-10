const Cart={
k:'gb_cart',
get(){try{return JSON.parse(localStorage.getItem(this.k))||[]}catch(e){return[]}},
set(a){try{localStorage.setItem(this.k,JSON.stringify(a))}catch(e){}document.dispatchEvent(new Event('cart'))},
add(id,q=1){const p=PRODUCTS.find(x=>x.id==id);if(!p||p.stock<=0)return;const a=this.get(),i=a.find(x=>x.id==id);if(i)i.q=Math.min(p.stock,i.q+q);else a.push({id:+id,q:Math.min(p.stock,q)});this.set(a)},
chg(id,d){const a=this.get(),i=a.find(x=>x.id==id),p=PRODUCTS.find(x=>x.id==id);if(!i||!p)return;i.q=Math.min(p.stock,i.q+d);this.set(a.filter(x=>x.q>0))},
rem(id){this.set(this.get().filter(x=>x.id!=id))},
clear(){this.set([])},
lines(){return this.get().map(i=>({p:PRODUCTS.find(x=>x.id==i.id),q:i.q})).filter(l=>l.p)},
count(){return this.lines().reduce((s,l)=>s+l.q,0)},
sub(){return this.lines().reduce((s,l)=>s+(l.p.sale&&l.p.sale<l.p.price?l.p.sale:l.p.price)*l.q,0)},
coupon(code,sub){code=(code||'').trim().toUpperCase();if(!code)return{disc:0};const c=COUPONS[code];if(!c)return{disc:0,msg:'❌ কুপন কোড সঠিক নয়'};if(sub<(c.min||0))return{disc:0,msg:'❌ এই কুপনের জন্য ন্যূনতম অর্ডার ৳'+c.min.toLocaleString('bn-BD')};const d=c.pct?Math.round(sub*c.pct/100):c.flat;return{code,disc:Math.min(d,sub),msg:'✅ কুপন প্রয়োগ হয়েছে'}}
};
