# VitaLife Klinika — Proje Beyni (CLAUDE.md)

Bu dosya projenin kalıcı kurallarıdır. Her oturumda bunu oku ve buna uy.
Plan zaten netleşmiştir; gereksiz soru sorma, büyük adımlarda kısa özet geç.

---

## 1. Proje Özeti
Azerbaycan'daki VitaLife Klinika için modern, minimalist, yüksek performanslı bir
web uygulaması (MVP). Klinik bilgilerini sunar; haftalık davetli doktorları,
hizmetleri ve fiyat listesini bir Admin panelinden dinamik yönetir. Ziyaretçi
arayüzü login gerektirmez; admin paneli korumalıdır. Amaç: dönüşüm odaklı
(form + WhatsApp), sade bir yapı.

## 2. Teknoloji (sapma yok)
- **Next.js** (App Router, TypeScript)
- **Tailwind CSS**
- **Supabase**: PostgreSQL (veri), Auth (sadece admin), Storage (doktor foto)
- **E-posta**: Resend — iletişim formu verisini kliniğin mail adresine yollar
- **Animasyon**: **framer-motion** (güncel paket adı `motion`): `npm i motion`,
  kullanım `import { motion } from 'motion/react'`. Aynı kütüphane.
- **Çoklu dil**: **next-intl** (App Router uyumlu, SEO için ayrı URL'ler).

## 3. Dil & Para Birimi
- Çift dilli: **Azerbaycanca (varsayılan)** + **Rusça**.
- Routing: next-intl ile locale bazlı. Varsayılan `az` (örn `/`), Rusça `/ru`.
  Navbar'da dil değiştirme butonu (AZ / RU).
- UI metinleri sözlük dosyalarında: `messages/az.json`, `messages/ru.json`.
- DB içeriği de çift dilli (aşağıdaki şemada `_az` / `_ru` kolonları).
- Para birimi: **AZN (₼)** — örn "150 ₼". (TL DEĞİL.)
  - `price` kolonu tek; dil-nötr değer girilir (örn "150 ₼").
  - Fiyat yoksa/boşsa UI dile göre "Qiymət üçün soruşun" / "Спросите цену" gösterir.

## 4. Tasarım Yönü (kalite burada belli olur)
- Premium bir tıp kliniğine yakışan, aşırı canlı OLMAYAN, kurumsal hava.
- Ya ferah **teal / soft** tonlar ya da zarif **"Soft Dark"** detaylar. Birini seç, tutarlı uygula.
- Minimalist, modern, bol beyaz alan. Klinik Instagram estetiğiyle uyumlu.
- **Animasyonlar framer-motion ile, incelikli ve amaçlı** (Emil Kowalski yaklaşımı):
  yumuşak fade/slide, kart ve sayfa geçişleri, carousel. AI-slop'tan kaçın: her yere
  hover-scale, sürekli pulse, abartılı stagger YOK. Az ama doğru animasyon.
  UI cilası/animasyon kararı gerektiğinde Emil'in `emil-design-eng` skill'inden faydalan.
- Mobil öncelikli, tam responsive.

## 5. Veritabanı Şeması (Supabase / PostgreSQL)
SQL migration olarak oluştur. RLS aç; public okuma (SELECT) serbest, yazma yalnızca
authenticated admin. İsim gibi dile bağlı olmayan alanlar tek; metinler çift dilli.

**doctors**
- id uuid PK (default gen_random_uuid())
- created_at timestamptz default now()
- name text not null               -- özel isim, tek
- specialty_az text not null
- specialty_ru text not null
- bio_az text not null
- bio_ru text not null
- image_url text nullable
- is_guest boolean default false        -- true: davetli/misafir hekim
- is_featured_this_week boolean default false   -- true: ana sayfa haftalık karuselde

**services**
- id uuid PK
- title_az text not null
- title_ru text not null
- description_az text nullable
- description_ru text nullable

**pricing**
- id uuid PK
- service_id uuid FK -> services.id (ON DELETE CASCADE)
- treatment_name_az text not null
- treatment_name_ru text not null
- price text nullable    -- dil-nötr, örn "150 ₼"; boşsa UI lokalize "fiyat sorun" gösterir

## 6. Klasör Yapısı
src/
  app/
    [locale]/
      (public)/
        page.tsx                # Ana sayfa: Hero + haftalık carousel + Instagram alanı
        hakkimizda/page.tsx     # Vizyon, hijyen, başhekim özgeçmişi, kadrolu personel
        hizmetlerimiz/page.tsx  # DB'den hizmetler, Accordion yapı
        fiyatlar/page.tsx       # DB'den fiyat tablosu, satırda forma yönlendiren mini buton
        iletisim/page.tsx       # Çalışma saatleri, harita, telefon + Akıllı Tercihli form
        doktorlar/[id]/page.tsx # Dinamik davetli doktor detayı + soru sor butonu
      admin/
        page.tsx                # Korumalı panel, 3 sekme (Doktor / Servis / Fiyat)
        login/page.tsx          # Supabase Auth ile giriş
      layout.tsx
    globals.css
  components/
    ui/                         # Carousel, Accordion, Button vb.
    Navbar.tsx                  # dil değiştirici (AZ/RU) burada
    Footer.tsx
  lib/
    supabaseClient.ts
    site-config.ts              # hardcoded statik içerik (adres, telefon, saatler vb.)
  i18n/                         # next-intl konfigürasyonu
messages/
  az.json
  ru.json

## 7. Sayfa Davranışları
- **Ana sayfa**: Statik Hero (başhekim foto + hoş geldin mesajı). Altında
  `is_featured_this_week === true` doktorlar carousel'de (framer-motion). Doktora tıkla
  -> detay sayfası. En altta Instagram akış tasarımı.
- **Hizmetlerimiz**: DB'den başlıklar, dikey Accordion (aktif dile göre `_az`/`_ru`).
- **Fiyatlar**: Hizmet kategorisine göre gruplu temiz tablo; her satırda iletişim formuna
  yönlendiren mini buton.
- **İletişim formu alanları**: Ad Soyad, Telefon, E-posta, Mesaj + radio grubu (aktif dilde):
  AZ: "Cavabı WhatsApp üzərindən almaq istəyirəm" / "Cavabı E-poçt ilə almaq istəyirəm"
  RU: "Хочу получить ответ через WhatsApp" / "Хочу получить ответ по E-mail"
  Gönderince Server Action tetiklenir; e-postanın EN BAŞINA kullanıcının tercihi belirgin
  yazılır ve kliniğin mailine gider.
- **Doktor detay**: Bio, uzmanlık, klinik çalışma takvimi + soru sor butonu (aktif dilde).

## 8. Admin (/admin)
- Next.js Middleware + Supabase session ile korunur. Yetkisiz erişim -> /admin/login.
- Tek sayfa, 3 sekme. Çift dilli alanlarda her dil için ayrı input (AZ ve RU yan yana):
  - **Doktor Yönetimi**: yeni doktor formu (foto yükleme Supabase Storage'a), mevcut
    doktor listesi, yanlarında "Bu Hafta Öne Çıkar" toggle.
  - **Servis Yönetimi**: kategori ekle / sil / düzenle.
  - **Fiyat Yönetimi**: bir servis seç, altına satır satır "Uygulama Adı (AZ/RU)" + "Fiyat" ekle/güncelle.

## 9. KESİN KURALLAR (bunlara mutlaka uy)
1. Form gönderimleri ve admin veri güncellemeleri TAMAMEN **Next.js Server Actions** ile.
2. Adres, telefon, çalışma saatleri, hakkımızda metni gibi nadiren değişen statik içerikleri
   veritabanına KOYMA — `lib/site-config.ts` içinde **hardcoded** tut (her iki dil için).
3. Supabase Storage: admin'den yüklenen resmin **public URL'ini al ve `doctors.image_url`
   alanına yaz** — bu fonksiyonu eksiksiz kur.
4. Gizli anahtarlar `.env.local`'de; asla commit'leme. Supabase service_role anahtarını
   yalnızca sunucu tarafında kullan, client'a sızdırma.

## 10. Çalışma Tarzı
- Önce projeyi kur ve `.env.local` için gereken değişkenleri bana sor (Supabase URL/anon key,
  service_role key, Resend API key, kliniğin alıcı mail adresi).
- Sonra: next-intl kurulumu -> DB migration -> public sayfalar -> iletişim formu ->
  doktor detay -> admin paneli -> Storage foto akışı.
- Her büyük adımda 2-3 cümlelik özet geç. Beni gereksiz mikro sorulara boğma; mantıklı
  varsayımları kendin yap ve özette belirt.

## 11. gstack Kullanımı (sadece bu 4 komut)
gstack kurulu ama yalnızca şunları kullan:
- `/autoplan`  -> büyük bir özelliğe başlamadan önce: tek komutla incelenmiş plan (az token, az soru-cevap).
- `/review`    -> kod yazıldıktan sonra: bug taraması, bariz olanları otomatik düzeltir.
- `/cso`       -> güvenlik denetimi (OWASP + STRIDE). Form, auth ve admin paneli kurulunca çalıştır.
- `/guard`     -> oturum boyunca açık tut; yıkıcı komutlardan önce uyarır.
Diğer gstack komutlarını çağırma.
