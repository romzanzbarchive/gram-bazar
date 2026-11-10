# গ্রাম বাজার (GramBazar) — সেটআপ গাইড

HTML + CSS + JavaScript, কোনো ডাটাবেস/ব্যাকএন্ড নেই। সম্পূর্ণ ফ্রি।

## ১. GitHub-এ আপলোড
1. github.com-এ অ্যাকাউন্ট খুলুন → **New repository** → নাম `grambazar` → Create।
2. **uploading an existing file** চাপুন → ZIP আনজিপ করে ভেতরের সব ফাইল/ফোল্ডার ড্র্যাগ করুন → **Commit changes**।

## ২. Vercel-এ ডিপ্লয়
1. vercel.com → GitHub দিয়ে লগইন → **Add New → Project**।
2. `grambazar` রিপোজিটরি **Import** করুন → Framework: **Other** → **Deploy**।
3. লিংক পেলে সেটি `sitemap.xml`, `robots.txt` ও `js/config.js`-এর `SITE.url`-এ বসান।

## ৩. পণ্য যোগ/এডিট — `js/products.js`
- নতুন পণ্য: যেকোনো লাইন কপি করে নতুন `id` (অনন্য সংখ্যা) দিন।
- নাম: `name`, ক্যাটাগরি: `cat` (তালিকার নাম হুবহু), বিবরণ: `d`
- ছবি: ছবি `assets/products/` ফোল্ডারে রেখে `img:"assets/products/rice.jpg"` লিখুন (একাধিক হলে `imgs:[...]`)
- স্টক: `stock` (০ = স্টক নেই)

## ৪. দাম পরিবর্তন
`price` = নিয়মিত দাম, `sale` = ছাড়ের দাম (ছাড় না থাকলে `0`)। ছাড়ের ব্যাজ নিজে থেকেই হিসাব হয়।

## ৫. ডেলিভারি চার্জ — `js/config.js`
`DELIVERY` অবজেক্টে এলাকার পাশে টাকার অঙ্ক বদলান। `FREE_DELIVERY_OVER` = ফ্রি ডেলিভারির ন্যূনতম অর্ডার (বন্ধ করতে `0`)। কুপন বদলাতে `COUPONS`।

## ৬. WhatsApp নম্বর পরিবর্তন
`js/config.js`-এ `WHATSAPP_NUMBER = "966571701449"` — দেশ কোডসহ, `+` ছাড়া। সব অর্ডার ও সাপোর্ট বাটন এই নম্বর ব্যবহার করে।

## নোট
- গ্রাহক WhatsApp-এ নিজে **Send** না চাপলে অর্ডার পৌঁছায় না; সাইট তাই "নিশ্চিত" দেখায় না।
- হোমপেজের গ্রাহক মতামত নমুনা — `index.html`-এ আসল মতামত বসান।
- `og:image` ও সাইটম্যাপে নিজের ডোমেইন বসান।
