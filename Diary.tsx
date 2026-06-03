import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FloatingBalloons } from "@/components/FloatingBalloons";
import { RibbonDecor } from "@/components/RibbonDecor";

interface DiaryProps {
  onFinish: () => void;
}

const CHAPTERS = [
  { date: "May 10, 2026", title: "My First Impression of You" },
  { date: "May 11, 2026", title: "The First Thing I Noticed" },
  { date: "May 12, 2026", title: "The First Time You Stayed In My Mind" },
  { date: "May 13, 2026", title: "Things You Did That Changed Everything" },
  { date: "May 14, 2026", title: "The First Time I Smiled Because of You" },
  { date: "May 15, 2026", title: "If I Could Rewatch One Early Memory" },
  { date: "May 16, 2026", title: "Habits I Secretly Memorized" },
  { date: "May 29, 2026", title: "Things I Hope Never Change ✦" },
];

const MYANMAR_STYLE: React.CSSProperties = {
  fontFamily: "'Noto Sans Myanmar', sans-serif",
  lineHeight: 2,
  fontSize: "1.05rem",
};

export default function Diary({ onFinish }: DiaryProps) {
  const [activeChapter, setActiveChapter] = useState(0);
  const [unlockedChapters, setUnlockedChapters] = useState<number[]>([0]);
  const [isFinalUnlocked, setIsFinalUnlocked] = useState(false);

  const [animals] = useState(() =>
    Array.from({ length: 8 }).map(() => ({
      x: 5 + Math.random() * 88,
      y: 5 + Math.random() * 88,
      isCat: Math.random() > 0.5,
    }))
  );

  useEffect(() => {
    if (!unlockedChapters.includes(activeChapter)) {
      setUnlockedChapters(prev => [...prev, activeChapter]);
    }
  }, [activeChapter, unlockedChapters]);

  useEffect(() => {
    const allRead = [0, 1, 2, 3, 4, 5, 6].every(c => unlockedChapters.includes(c));
    if (allRead) setIsFinalUnlocked(true);
  }, [unlockedChapters]);

  const handleNext = () => {
    if (activeChapter < 6) setActiveChapter(p => p + 1);
    else if (activeChapter === 6 && isFinalUnlocked) setActiveChapter(7);
  };

  const handlePrev = () => {
    if (activeChapter > 0) setActiveChapter(p => p - 1);
  };

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #f8e8f8 0%, #e8eaf6 50%, #e3f2fd 100%)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
      transition={{ duration: 1.2 }}
    >
      {/* Soft background blobs — subtle, non-distracting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(249,168,212,0.12), transparent 70%)" }} />
        <motion.div animate={{ x: [0, -25, 0], y: [0, 20, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(196,181,253,0.12), transparent 70%)" }} />
      </div>

      <FloatingBalloons count={2} />
      <RibbonDecor position="top-left" />
      <RibbonDecor position="top-right" />

      {/* Hidden animal */}
      {activeChapter < 7 && (
        <motion.div className="absolute text-2xl cursor-pointer z-50 select-none"
          style={{ left: `${animals[activeChapter].x}%`, top: `${animals[activeChapter].y}%` }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.45 }}
          whileHover={{ opacity: 1, scale: 1.6 }}
        >
          {animals[activeChapter].isCat ? "🐱" : "🐶"}
        </motion.div>
      )}

      {/* Sidebar bookmarks */}
      <div className="hidden lg:flex flex-col fixed right-0 top-1/2 -translate-y-1/2 gap-1 z-50 p-4">
        {CHAPTERS.map((ch, i) => (
          <button key={i}
            onClick={() => { if (i === 7 && !isFinalUnlocked) return; setActiveChapter(i); }}
            className={`text-right font-sans text-[10px] uppercase tracking-widest px-3 py-1.5 transition-all border-r-2 max-w-[110px] truncate ${
              activeChapter === i ? "text-pink-600 border-pink-400 -translate-x-2" :
              i === 7 && !isFinalUnlocked ? "text-slate-300 border-transparent cursor-not-allowed" :
              "text-slate-400 border-transparent hover:text-pink-400 hover:-translate-x-1"
            }`}
          >
            {i === 7 && !isFinalUnlocked ? "🔒" : `Day ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Main area */}
      <div className="max-w-3xl mx-auto px-4 py-8 md:py-12 flex flex-col min-h-screen">
        {/* Progress stars */}
        <div className="flex justify-center gap-2 mb-8">
          {CHAPTERS.map((_, i) => (
            <motion.span key={i}
              className={`text-lg ${unlockedChapters.includes(i) || (i === 7 && isFinalUnlocked) ? "text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" : "text-slate-300"}`}
              animate={{ scale: activeChapter === i ? [1, 1.25, 1] : 1, opacity: i === 7 && !isFinalUnlocked ? 0.3 : 1 }}
              transition={{ repeat: activeChapter === i ? Infinity : 0, duration: 2 }}
            >
              {i === 7 && !isFinalUnlocked ? "🔒" : "✦"}
            </motion.span>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeChapter}
            initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
            transition={{ duration: 0.7 }}
            className="flex-1 flex flex-col"
          >
            {/* ─── READING CARD ─── */}
            <div style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(8px)",
              borderRadius: 24,
              boxShadow: "0 8px 40px rgba(139,92,246,0.1), 0 2px 12px rgba(0,0,0,0.06)",
              border: "1px solid rgba(196,181,253,0.3)",
              padding: "2rem 2.5rem",
              flex: 1,
            }}>
              {/* Date */}
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", color: "#a78bfa", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                {CHAPTERS[activeChapter].date}
              </p>

              {/* Chapter title */}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", color: "#4c1d95", fontWeight: 600, lineHeight: 1.3, marginBottom: "1.8rem", paddingBottom: "1rem", borderBottom: "1.5px solid rgba(196,181,253,0.3)" }}>
                {CHAPTERS[activeChapter].title}
              </h2>

              {/* Content */}
              <div style={{ color: "#1e1b4b", ...MYANMAR_STYLE }}>

                {activeChapter === 0 && (
                  <div className="space-y-5">
                    <p>ညက နင်နဲ့ fs ပျက်မယ်လို့ ပြီးတော့ နင့်ကိုလွမ်းရင်းဖြတ်သန်းရတဲ့ ပထမနေပေါ့။ ဒီနေ့လည်း Tiktok မှာ block မထားလို့ လာပြောချင်ခဲ့တာပဲ။ ဒါပေမယ့်လည်း မပြောပဲ နေရင်း နင်တကယ် move on နိုင်သွားရင်လဲ ကောင်းပါတယ်လေ။ ဒီတိုင်းရေးထားတာတွေမို့ နင်စိတ်မပါတော့ရင် မဖတ်ဖို့ ကြိုသတိပေးပါတယ်ဗျာ။</p>
                    <p>ဒီနေ့ မိုးတအားရွာနေတာ။ မိုးလေးအေးတော့ ဆွေးလို့ ကောင်းတာပေါ့ဗျာ။ ဒီနေ့ ဘာလုပ်စရာမှမရှိဘူး။ နင်နဲ့သာဆို တနေကုန် စကားပြောနေရမလားမသိဘူး။ နင်က ငါ့ကို block ထားတယ်။ ငါအရမ်းဝမ်းနည်းတာပဲ ဟင့်။</p>
                    <p>ChatGPT ကိုမေးလိုက်တော့ ဒီနေ့ ပြောရမယ့်အကြောင်းအရာက "My First Impression of You" တဲ့။ အဲ့အကြောင်းပြောရမယ်ဆိုရင် နည်းနည်းလေးတော့ စိတ်ကူးယဥ်ဆန်တာပေါ့လေ ငါက နင့်မှမြင်နေရတာမဟုတ်တာ နော်။ နင့်ကို စတွေ့တုန်းက တွေးမိတာ သုံးခုတည်းတင်။</p>
                    <div className="pl-4 space-y-2" style={{ borderLeft: "3px solid rgba(196,181,253,0.5)" }}>
                      <p>၁။ အရမ်းဖလစ်တာပဲ</p>
                      <p>၂။ အတွေ့အကြုံရှိပြီးသား ဒီလိုဖလစ်နေကြ ထင်တယ်</p>
                      <p>၃။ ဆွဲဆောင်မှုရှိတယ်</p>
                    </div>
                    <p>ဒီလိုပြောရင် ကြူးတဲ့ပုံစံပေါက်နေမလားမသိပေမယ့် နင်က အရမ်း attraction ကောင်းတာပဲ။ နင်နဲ့ စကားပြောရတာတင် ထီပေါက်သလိုပဲ နော်။ ဘယ်လိုပြောရမလဲ — အဲ့တုန်းကဆိုတွေးတာ fiction ထဲကလိုပဲလို့။ နင်က ဒီတိုင်း နင်ပြောတာကိုက ကြိုက်ချင်စရာဖြစ်နေတာ။ ငါနင့်ကိုစတွေ့ကတည်းက နင်ဘယ်သူလဲတောင်မသိပဲ စိတ်ဝင်စားတာပေါ့။</p>
                    <p>နင်က ငါ့ရဲ့ ပထမဆုံးကြိုက်မိတဲ့သူဆိုတော့ နင်အရမ်းကြိုက်ချင်စရာကောင်းတာ နင်လက်ခံလိုက်။</p>
                  </div>
                )}

                {activeChapter === 1 && (
                  <div className="space-y-5">
                    <p>ဒီနေ့လဲ မိုးအုံ့‌နေတာ။ နင်က ငါ့ကို Block ဖြည်ထားတယ်။ ငါနင့်ကိုအရမ်းစာပို့ချင်တာပဲ။ ဒါပေမယ့် သည်းခံထားရမယ် သည်းခံ သည်းခံ။ ဗြဲး နင်မသိလို့ ငါက နင့်ကို အခု အရမ်း လွမ်းတယ်သိလား။ ဒီနေ့ ပုဇွန်စားရင်း နင့်ကိုသတိရနေတာ။ ပုဇွန်က ချီးစားတယ်ပြောရင် နင်က ရွံဦးမယ် ငါဆိုရင် စားနေတုန်း တွေးတာတောင် ဘယ်လိုမှမနေဘူးလေ။</p>
                    <p>ဒီနေ့ topic က "The First Thing I Noticed" တဲ့။ ဒါကနည်းနည်းတော့ စဥ်းစားရတယ် — နင်နဲ့သက်ပြီး ငါဘာသတိထားမိလဲဆိုရင် နင်က စကားချိုချိုလေးတွေကြိုက်တာပဲ။ အချိုတွေကိုပြောတာမဟုတ်ပဲ နင့်ဘက်ပါတာဆိုကြိုက်တာပဲ လို့သိလိုက်တယ်။</p>
                    <p>အငယ်လေးကိစ္စဖြစ်တုန်းကထင်တယ် — နင်က သူ့ကို block လိုက်လို့ပြောတာနဲ့ ငါ့ block တာကို နင့်မှာ "အမယ်" ဘာညာဖြစ်နေတာကို။ တကယ်တော့ သာမန်ကိစ္စလေးပါပဲ။ ဒါပေမယ့် နင်က စိတ်နုတဲ့သူမလို့ အဲ့သလို သာမန်ကိစ္စလေးတွေကိုတောင် တကယ်အလေးထားနေတာပဲ။ အဲ့ကတည်းက သိလိုက်တာ — နင်နဲ့ပြောတဲ့အခါ ငါ့စကား‌ကို သေချာဂရုတစိုက်ပြောဖို့ လိုတယ်ဆိုတာ။</p>
                    <p>ဒါကြောင့်ဖြစ်မယ် ငါတို့ အခုနောက်ပိုင်းအဆင်မပြေဖြစ်တော့ ငါနင့်ကို ဆိုးတာတွေ အများကြီးပြောမိတယ်လေ။ အဲ့ကြောင့် စတတ်တဲ့ သီရိနှင်းစက်လေးကိုတောင် သိပ်မမြင်ရတော့ဘူးဗျာ။ ဒါပေမယ့် ငါက နင့်ကို သေချာပြောပြချင်ရုံပါ။</p>
                    <p style={{ fontStyle: "italic", color: "#7c3aed" }}>ကဲပါ ငါ့အချစ်လေး‌မွေးနေမှာ ပျော်ပျော်ထားရမယ်</p>
                  </div>
                )}

                {activeChapter === 2 && (
                  <div className="space-y-5">
                    <p>ဒီကိစ္စက သိပ်မမှတ်မိတော့ဘူး ကြာနေပြီမလို့။ ဒါပေမယ့် ငါနင့်ကို message 20+ ပဲ ပို့ဖူးတဲ့ ပထမဆုံးအခေါက်ကို မှတ်မိသေးတယ်။</p>
                    <p>နင်ကတော့ သတိတောင် ထားမိမယ့်သူမဟုတ်ဘူး။ အဲ့တုန်းက စခင်ခါစလေ ၁ ပတ် ၂ ပတ်လောက်ပဲ ရှိဦးမယ်ထင်တယ်။ နင်ကျောင်းပြန်တက်ရပြီ လေ — အမြဲ last seen… ပဲ ဖြစ်နေ‌တော့ "ပလစ်တယ်" "ဗြဲးး" အဲ့လိုဟာတွေကို စာ ၂၀ လောက်ပို့ခဲ့တာ ငိုနေတဲ့ sticker တွေကော ပါတာပေါ့။</p>
                    <p>နင်စာပြန်တာ ၂ ကြောင်းထဲလေ။ အခုထိ မှတ်မိသေးတယ်။</p>
                    <div style={{ background: "rgba(196,181,253,0.12)", borderRadius: 12, padding: "1rem 1.5rem", borderLeft: "3px solid #a78bfa" }}>
                      <p style={{ fontStyle: "italic", color: "#4c1d95" }}>"မပလစ်ပါဘူး သားသားရယ်… ဒီမှာကျောင်းပြန်တက်ရပြီမလို့"</p>
                    </div>
                    <p>ဒါလေးတင်။</p>
                  </div>
                )}

                {activeChapter === 3 && (
                  <div className="space-y-5">
                    <p>အမ်… ၃ ခုပြောပြမယ်။</p>
                    <div className="space-y-4">
                      <div style={{ background: "rgba(249,168,212,0.1)", borderRadius: 12, padding: "1rem 1.5rem", borderLeft: "3px solid #f9a8d4" }}>
                        <p style={{ fontWeight: 600, color: "#9d174d", marginBottom: "0.5rem" }}>ပထမတခုက —</p>
                        <p>နင်ငါနဲ့ တနေကုန်ပြောတာ။ ငါကအဲ့လိုပြောတတ်တဲ့သူလဲမဟုတ်ပဲ နင်က တနေကုန် ငါနဲ့ပြော နားထောင်ပေးတော့ အကျင့်ပါသွားတာပေါ့ — နင့်ကို အကုန်ပြောပြတာက။ တကယ်မကောင်းဘူးသိလား — နင်ငါ့ကို ငြိုငြင်သွားရင် ငါပဲ အကျင့်ပါသွားပြီး မနည်းပြန်ဖျောက်ရတော့မှာ။</p>
                      </div>
                      <div style={{ background: "rgba(196,181,253,0.1)", borderRadius: 12, padding: "1rem 1.5rem", borderLeft: "3px solid #c4b5fd" }}>
                        <p style={{ fontWeight: 600, color: "#4c1d95", marginBottom: "0.5rem" }}>နောက်တစ်ခုက —</p>
                        <p>နင်က မနက်မိုးလင်းရင် ဖုန်းအရင်မကိုင်ဘူး အကျင့်ပျက်လို့ ဆိုတာ — ဒါပေမယ့် မနက်မိုးလာတာနဲ့ နင့်က ပို့ထားတာတွေ အများကြီးရှိမှာဆိုတာ သိတော့ မိုးလင်းလာတာနဲ့ လုပ်စရာရှိတယ်လေ။ စိတ်‌လေးကို ကြည်သွားတာပဲ။ နိုးလာရင် Tg မှာ နင့်စာကို အရင်ကြည့်တဲ့ အကျင့်က ငါတောင်မသိပဲ အကျင့်ဖြစ်သွားတာ။</p>
                      </div>
                      <div style={{ background: "rgba(167,243,208,0.1)", borderRadius: 12, padding: "1rem 1.5rem", borderLeft: "3px solid #6ee7b7" }}>
                        <p style={{ fontWeight: 600, color: "#065f46", marginBottom: "0.5rem" }}>နောက်ဆုံးတစ်ခုက —</p>
                        <p>fs ပျက်မပေးတာ။ ဒုတိယတခါကနေစပြီး fs ပျက်မယ်ပြောရင် တန်းမပျက်ပေးလိုက်တာကိုက တော်ပါသေးတယ်နော်။ ဘယ်လိုပဲဖြစ်ဖြစ် အနည်းဆုံးတော့ နင်က နည်းနည်းခင်ပါသေးတယ်ဆိုပြီး တွေးလို့ ရတာကို ✦</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeChapter === 4 && (
                  <div className="space-y-5">
                    <p>အဲ့ဒါကလဲ သိပ်မမှတ်မိတော့ဘူးလေ နင်က ဟာသလုပ်တတ်တာပဲ နင်ဟာသလုပ်လို့ရီတာပဲဖြစ်မှာပေါ့ ဘယ်လိုလုပ် romantic ဆန်နေမလဲ။</p>
                    <p>ငါစဥ်းစားကြည့်တော့ မှတ်မိတာက နင်နဲ့ couple ထားတာလား အဲ့အချိန်ဖြစ်မယ်။ ဟေး နိုးနိုး အတွေးမမှားပါနဲ့</p>
                    <p>ကျနော် ရီတာက — နင်နဲ့ အငယ်လေးနှစ်ယောက်လုံး cp ထားမယ်ပြောပြီး နင်က "ဗြဲးးး" လို့ပြောသေးတာလေ ပြီးတော့ကျ ငါကအငယ်လေးနဲ့ ထားမလိုနဲ့မထားဖြစ်တော့ နင့်လာပြောတော့ —</p>
                    <div style={{ background: "rgba(251,207,232,0.2)", borderRadius: 12, padding: "1rem 1.5rem", borderLeft: "3px solid #fbcfe8" }}>
                      <p style={{ fontStyle: "italic", color: "#9d174d" }}>"သူနဲ့ထားမှာဆို"</p>
                      <p style={{ fontStyle: "italic", color: "#9d174d" }}>"နင်ထားချင်ရင်တော့ ငါထားပေးမယ်"</p>
                    </div>
                    <p>အဲ့လို မူတာလေ။ မူတာလား တကယ်ပဲချေတတ်တာလားမသေချာဘူး။ ဒါပေမယ့် ချစ်စရာကလေးလေးပဲ ။</p>
                  </div>
                )}

                {activeChapter === 5 && (
                  <div className="space-y-5">
                    <p>နင့်ကို ငါ new year တုန်းကကြိုက်တယ်ပြောနေတဲ့အပိုင်းလေး ပြန်မြင်ချင်တယ် ပြန်ကြည့်လို့ရရင် ဟီး။</p>
                    <p>နင်‌ရော ဘာကြည့်ချင်မလဲမသိဘူး။</p>
                  </div>
                )}

                {activeChapter === 6 && (
                  <div className="space-y-3">
                    {[
                      "နင်က စကားတခွန်းဆိုတခွန်းအရမ်းသတိထားမိတတ်တာပဲ",
                      "နင့်ကို လုပ်ပေးတာ၊ နင့်ကိုပြောတာ၊ နင်နဲ့ပြောတာ၊ နင်နဲ့အတူတူ cp ထားတဲ့ဟာ၊ အကုန်ပြောရရင် နင်နဲ့တူတဲ့သူကိုမကြိုက်ဘူး နင့်ကိုလုပ်ပေးတာ နင့်အတွက်သီးသန့်ဖြစ်ရမယ် ပြီးတော့ သူများနဲ့ဆင်တူဖြစ်ရတာမကြိုက်ဘူး",
                      "နင်က ရှက်စရာကောင်းတာတခုခုပြောရင် Emj သို့မဟုတ် stk ထည့်တတ်တယ်",
                      "နင်က chat ဖျက်မယ်လို့ပြောရင်မကြိုက်ဘူး",
                      "နင်က စိတ်ကူးယဥ်ဆန်တယ် နင့်ကိုတခုခုလုပ်ပေးချင်ရင် စိတ်ကူးယဥ်ဆန်ဆန်နဲ့ တကယ်လုပ်ပေးချင်စိတ်ရှိပေးဖို့ပဲလိုတယ်",
                      "နင်ပြောတာကို သေချာနားထောင်ပေးရမယ် နင်က စကားသိပ်မပြောဘူးထင်ရပေမယ့် နင့်ကို လွှတ်ထားပေးလိုက်ရင် တကယ်စကားပြောတာပဲ ဘယ်လိုပြောရမလဲ ခလုတ်နှိပ်မှ အသံထွက်တဲ့အရုပ်လိုပဲ နင်စကားပြောနေတာကို ဆက်ထိန်းထားချင်ရင် နင့်ကို ထပ်ထပ်မေးဖို့ လိုတယ်",
                      "တခါတလေ နင်က တအားအများကြီးပြောသလိုဖြစ်သွားမှာစိုးတဲ့အခါ နင်ကစကားလမ်းကြောင်းလွှဲတတ်တယ်",
                      "နင့်ကို ခင်တဲ့အကြောင်း၊ ကြိုက်တဲ့အကြောင်း ခဏခဏပြောပေးရမယ် အထူးသဖြင့် ငါမအားတဲ့နေ့တွေဆို နည်းနည်းများသွားရင် နင်က ဘယ်လိုဖြစ်သွားမှန်းကိုမသိဘူး",
                      "သီရိနှင်းစက်က အတွေးများတဲ့သူပဲ ဒါကြောင့်လဲ ငါတို့ ပြဿနာဖြစ်ရင် နင်က အကြာကြီးစဥ်းစားပြီးမှပြန်ပြန်ပြောတာ အဲ့တာကကောင်းတာလဲဖြစ်နိုင်သလို ငါ့အတွက်တော့စိတ်မရှည်ချင်စရာလေးပါဗျာ အတွေးများတာလျှော့",
                      "နင်ဘာဖြစ်နေလဲဆိုတာသိချင်ရင် နင့်ကို တိုက်ရိုက်မေးတာက အသုံးမဝင်ဘူး။ နင်ကမပြောပြဘူး။ ဒါဆိုရင် ဘယ်လိုနည်းနဲ့ သိအောင်လုပ်လို့ရမလဲဆိုရင် နင့်ကိုမေးချင်တဲ့ ကိစ္စဘက်ရောက်အောင် စကားလမ်းကြောင်းပြောင်းရမယ် ပြီးရင် ငါတခုခုမှားတွေးမိသလိုပြောရမယ် စကားပြောရင်း နင့်အပေါ်မူတည်ပြီး မေးခွန်းမေးတတ်မယ်ဆိုရင် နင်ဖြစ်နေတာကို သိရလိမ့်မယ်",
                      "နင်က ငါကချည်းနင့်ကိုခင်မယ်ဆိုတာပဲမဟုတ်ပဲ နင်ငါ့ကိုခင်တာမျိုးလိုချင်တာမျိုးဖြစ်စေချင်တယ်",
                      "နင်က ချစ်စရာကောင်းတာလေးတွေကိုသဘောကျတာပဲ မိန်းကလေးဆန်လိုက်တာ သောက်ကလေးရာ",
                    ].map((habit, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06, duration: 0.4 }}
                        style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0.75rem", borderRadius: 10, background: i % 2 === 0 ? "rgba(196,181,253,0.08)" : "rgba(249,168,212,0.08)" }}
                      >
                        <span style={{ color: "#a78bfa", flexShrink: 0, marginTop: "0.1rem" }}>✦</span>
                        <p>{habit}</p>
                      </motion.div>
                    ))}
                    <p style={{ marginTop: "1rem", color: "#7c3aed", fontStyle: "italic" }}>ဆက်ရေးရင် တထောင့်တည်ပုံပြင်ဖြစ်သွားမယ်။ ဒီလောက်ပဲ ✦</p>
                  </div>
                )}

                {activeChapter === 7 && (
                  <div className="space-y-6 text-center">
                    <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🌙</div>
                    <p>သီရိနှင်းစက်က ငါ့ကို ခင်တာ မပြောင်းလဲဖို့မျှော်လင့်တာပေါ့ဗျာ နည်းနည်းလေးတောင် မလျော့ပဲ။ အဲ့လယ်</p>
                    <p style={{ fontStyle: "italic", color: "#7c3aed" }}>ငါတို့တနေကုန်ပြောကြတာလေး..အဲ့တာ</p>
                    <div style={{ marginTop: "2rem" }}>
                      <motion.button
                        data-testid="button-unlock-final"
                        onClick={onFinish}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ padding: "14px 48px", background: "linear-gradient(135deg, #6d28d9, #a855f7)", borderRadius: 50, fontFamily: "'Playfair Display', serif", fontSize: 18, color: "white", fontWeight: 600, border: "none", boxShadow: "0 0 30px rgba(139,92,246,0.4)", cursor: "pointer" }}
                      >
                        ✦ Open the Final Page ✦
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation */}
            {activeChapter < 7 && (
              <div className="flex justify-between items-center mt-6 px-2 pb-4">
                <button data-testid="button-prev-chapter" onClick={handlePrev}
                  className={`font-sans text-slate-500 hover:text-pink-600 transition-colors uppercase tracking-widest text-sm ${activeChapter === 0 ? "opacity-0 pointer-events-none" : ""}`}
                >
                  ← Previous
                </button>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: "#a78bfa", letterSpacing: "0.1em" }}>
                  {activeChapter + 1} / {CHAPTERS.length}
                </span>
                <button data-testid="button-next-chapter" onClick={handleNext}
                  className="font-sans text-slate-500 hover:text-pink-600 transition-colors uppercase tracking-widest text-sm disabled:opacity-30 disabled:cursor-not-allowed"
                  disabled={activeChapter === 6 && !isFinalUnlocked}
                >
                  {activeChapter === 6 ? (isFinalUnlocked ? "Final Page →" : "Read all chapters first") : "Next Page →"}
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
