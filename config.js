// ===== GramBazar কনফিগারেশন — এখানে সহজে পরিবর্তন করুন =====
const WHATSAPP_NUMBER = "966571701449"; // দেশ কোডসহ, + ছাড়া
const SITE = { name: "GramBazar", bn: "গ্রাম বাজার", tagline: "আপনার এলাকার অনলাইন বাজার।", url: "https://grambazar.vercel.app" };
// ডেলিভারি চার্জ (টাকা)
const DELIVERY = { "শ্রীনগর": 40, "ভাগ্যকুল": 50, "বাঘড়া": 50, "ষোলঘর": 60, "হাসাড়া": 60, "জয়পাড়া": 70, "দোহার": 80 };
const FREE_DELIVERY_OVER = 1500; // এর বেশি অর্ডারে ডেলিভারি ফ্রি (বন্ধ করতে 0 দিন)
// কুপন: pct = শতকরা ছাড়, flat = নির্দিষ্ট ছাড়, min = ন্যূনতম অর্ডার
const COUPONS = { GRAM10: { pct: 10, min: 500 }, WELCOME50: { flat: 50, min: 300 } };
