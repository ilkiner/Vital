// Statik / nadiren değişen içerik. Veritabanına KOYMA, buradan oku.
// Değerler şimdilik YER TUTUCU. Gerçek bilgiler gelince burayı değiştir.

type Localized = { az: string; ru: string };

export const siteConfig = {
  name: "VitaLife Klinika",

  contact: {
    phone: "242 77 78 78",             // klinika xətti (Mingəçevir)
    mobile: "+994 77 750 55 45",       // mobil
    whatsapp: "994777505545",          // wa.me linki üçün (+ və boşluqsuz)
    email: "vitalifeklinika@gmail.com",
    address: {
      az: "Mingəçevir şəhəri, Əliağa Vahid küçəsi 15, giriş 25",
      ru: "г. Мингечевир, ул. Элийага Вахид, 15, вход 25",
    } satisfies Localized,
  },

  // Çalışma saatleri — tablo olarak render edilebilir
  hours: [
    { az: "Bazar ertəsi – Şənbə", ru: "Понедельник – Суббота", time: "09:00 – 17:00" },
    { az: "Bazar", ru: "Воскресенье", time: "Bağlı / Закрыто" },
  ],

  social: {
    instagram: "https://www.instagram.com/vitalife.klinika",
    facebook: null as string | null,
    tiktok: "https://www.tiktok.com/@vitalifeklinika",
  },

  // Google Haritalar embed iframe src'i — Maps'te "Paylaş > Yerleştir" ile alıp buraya koy
  // Paylaş linki: https://maps.app.goo.gl/uoR9tWhxzhTMM4PD6
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=PLACEHOLDER",

  // Ana sayfa Hero
  hero: {
    title: {
      az: "Sağlamlığınız və gözəlliyiniz etibarlı əllərdə",
      ru: "Ваше здоровье и красота в надёжных руках",
    } satisfies Localized,
    subtitle: {
      az: "VitaLife Klinika — müasir avadanlıq və təcrübəli həkimlərlə premium tibbi xidmət.",
      ru: "VitaLife Klinika — премиальные медицинские услуги с современным оборудованием и опытными врачами.",
    } satisfies Localized,
  },

  // Hakkımızda sayfası
  about: {
    vision: {
      az: "Missiyamız hər müraciət edənə qayğı, etibar və yüksək standartlı tibbi xidmət təqdim etməkdir. [Yer tutucu mətn — sonra dəyişdirilir.]",
      ru: "Наша миссия — забота, доверие и медицинская помощь высокого стандарта для каждого пациента. [Текст-заглушка — заменить позже.]",
    } satisfies Localized,
    hygiene: {
      az: "Klinikamızda bütün prosedurlar beynəlxalq gigiyena və sterilizasiya standartlarına uyğun aparılır. [Yer tutucu mətn.]",
      ru: "Все процедуры в нашей клинике проводятся в соответствии с международными стандартами гигиены и стерилизации. [Текст-заглушка.]",
    } satisfies Localized,
  },

  // Başhekim (statik — DB'deki davetli doktorlardan ayrı)
  chiefDoctor: {
    name: "Prof. Dr. [Ad Soyad]",       // TODO
    title: {
      az: "Baş həkim",
      ru: "Главный врач",
    } satisfies Localized,
    bio: {
      az: "[Baş həkimin təcrübəsi, ixtisası və özgəçmişi buraya yazılır — yer tutucu mətn.]",
      ru: "[Опыт, специализация и биография главного врача — текст-заглушка.]",
    } satisfies Localized,
    imageUrl: "/images/chief-doctor.jpg",
  },
} as const;

export type SiteConfig = typeof siteConfig;
