# Minik Anlar — Tanıtım Websitesi Geliştirme Planı

**Tarih:** 9 Temmuz 2026
**Kapsam:** Minik Anlar iOS uygulaması (hamilelik takibi + anı defteri) için SEO destekli statik tanıtım sitesi
**Referans projeler:** `Lumi-Zone/aevo-web` (aevo-ada-pruefung.de), `Lumi-Zone/leben-in-deutschland-web` (lid-einbuergerung.de)
**Site türü:** Yalnızca tanıtım — interaktif araç/özellik YOK. Uygulamayı anlatır, App Store'a yönlendirir, yasal sayfaları barındırır.

---

## 1. Amaç ve Başarı Kriterleri

1. App Store Connect başvurusu için zorunlu URL'leri sağlamak (Marketing URL, Privacy Policy URL, Terms/EULA).
2. Uygulamanın özelliklerini net şekilde tanıtıp App Store'a dönüşüm sağlamak.
3. "hamilelik takip uygulaması", "hamilelik anı defteri" gibi Türkçe sorgularda organik görünürlük kazanmak.
4. Marka güveni: gizlilik farklılaşmasını (hesapsız, reklamsız, backend'siz) öne çıkarmak.

---

## 2. Teknoloji ve Altyapı

| Konu | Karar | Not |
|---|---|---|
| Framework | Astro 5 + TypeScript | aevo-web / leben-in-deutschland-web ile aynı |
| Stil | Saf CSS (CSS değişkenleri) | Framework yok; palet uygulamadan türetilecek |
| Hosting | GitHub Pages + custom domain | `deploy.yml` aevo-web'den kopyalanır |
| Repo | `Lumi-Zone/minik-anlar-web` | |
| Domain | `minikanlar.app` veya `minik-anlar.com` | 5 sayfalık tanıtım sitesi için marka domain'i yeterli |
| Dil | Yalnızca Türkçe (`lang="tr"`) | Uygulama tr_TR; hreflang gerekmiyor |
| JS | ~0 KB | Tek istisna: FAQ accordion (native `<details>` ile JS'siz de çözülebilir) |

### Repo iskeleti

```
minik-anlar-web/
├── .github/workflows/deploy.yml        # GitHub Pages deploy (aevo-web'den)
├── astro.config.mjs                    # site: 'https://minikanlar.app', @astrojs/sitemap
├── public/
│   ├── mockups/                        # Uygulama ekran görüntüleri (Bugün, Günlük, Anılar, Premium)
│   ├── og.png                          # 1200×630 paylaşım görseli
│   ├── favicon.svg / apple-touch-icon.png
│   └── robots.txt
└── src/
    ├── layouts/BaseLayout.astro        # TÜM SEO head mantığı tek merkezde
    ├── components/
    │   ├── Hero.astro
    │   ├── PrivacyStrip.astro          # Gizlilik vurgu şeridi
    │   ├── FeatureSection.astro        # Tekrar kullanılabilir özellik bloğu (görsel + metin)
    │   ├── PremiumSection.astro
    │   ├── FAQ.astro
    │   ├── DownloadCTA.astro
    │   └── Footer.astro
    ├── styles/global.css               # Palet + tipografi değişkenleri
    └── pages/
        ├── index.astro
        ├── support.astro
        ├── gizlilik-politikasi.astro
        ├── kullanim-kosullari.astro
        └── abonelik-kosullari.astro
```

---

## 3. Site Haritası

### Launch kapsamı (zorunlu)

| URL | Sayfa | Amaç |
|---|---|---|
| `/` | Landing | Tanıtım + App Store dönüşümü |
| `/support/` | Destek | SSS + iletişim e-postası (App Store "Support URL") |
| `/gizlilik-politikasi/` | Privacy Policy | App Store zorunlu |
| `/kullanim-kosullari/` | Terms of Use | Paywall'dan link verilecek |
| `/abonelik-kosullari/` | Abonelik Koşulları | Otomatik yenileme/deneme şartları (App Review paywall kontrolü) |

### Faz 3 — isteğe bağlı SEO genişlemesi (yayın sonrası)

| URL | Hedef sorgu |
|---|---|
| `/hamilelik-takip-uygulamasi/` | "hamilelik takip uygulaması", "gebelik takip uygulaması" |
| `/hamilelik-ani-defteri/` | "hamilelik anı defteri", "hamilelik günlüğü uygulaması" |

Bu sayfalar AEVO'daki `/aevo-pruefung` benzeri pillar sayfalardır: uygulamanın ilgili özelliklerini derinlemesine anlatır, sonunda App Store CTA'sı bulunur. İnteraktif öğe içermez.

---

## 4. Landing Sayfası Yapısı (bölüm bölüm)

Akış: AEVO'nun bölüm anlatımı + LiD'nin görsel yaklaşımı. Tüm özellik metinleri uygulamanın gerçek kod tabanındaki özelliklere dayanır.

### 4.1 Hero
- **H1:** `Minik Anlar — Hamilelik Takibi ve Anı Defteri`
- Alt metin: "Hafta hafta gebelik yolculuğunu takip et, en özel anlarını tek yerde sakla."
- App Store rozet butonu (yayın öncesi: "Yakında App Store'da")
- Telefon mockup'ı: uygulamanın **Bugün** ekranı (ilerleme halkası + bebek boyutu kartı)

### 4.2 Gizlilik şeridi (hero'nun hemen altında — ana farklılaşma)
> "Hesap yok. Reklam yok. Analytics yok. Tüm verilerin telefonunda kalır."

Hamilelik verisi en hassas veri kategorisi; büyük rakipler veri toplamasıyla biliniyor. Bu mesaj erken ve görünür durmalı.

### 4.3 Özellik bölümleri (uygulamanın 4 ana alanı, her biri mockup + metin)

**Bölüm A — Hafta Hafta Takip (Bugün sekmesi)**
- 40 haftanın her biri için: bebeğin gelişimi + annenin bedenindeki değişim özeti
- Bebek boyutu karşılaştırmaları (haşhaş tohumu → yaban mersini → …)
- Trimester rehberi ve gebelik ilerleme halkası
- Hafta hesabı 3 yöntemle: son adet tarihi, tahmini doğum tarihi veya gebe kalma tarihi

**Bölüm B — Günlük (Günlük sekmesi)**
- Ruh hali, enerji seviyesi ve semptom kaydı
- Günün mini listesi: su, vitamin, kısa yürüyüş, günlük kaydı
- Doktor randevuları: randevu öncesi soru listesi, randevu sonrası notlar

**Bölüm C — Anılar (Anılar sekmesi)**
- Haftalık hamilelik pozu fotoğraf albümü
- Ultrason fotoğrafları, "ilkler", bebeğe notlar, komik anlar
- Zaman tüneli ve albüm görünümleri

**Bölüm D — Doğuma Hazırlık**
- Hastane çantası kontrol listesi
- Yerel bildirimlerle nazik hatırlatıcılar (günlük durum, haftalık fotoğraf)

### 4.4 Premium bölümü
- **Dijital Albüm:** 6 tema (Atölye, Keten, Bahçe, Gökyüzü, Lavanta, Sade Film)
- **PDF Anı Kitabı:** baskıya hazır hamilelik hikâyesi
- **Haftalık anı soruları:** dönemlere özel yazma önerileri
- Fiyat: 79,99 ₺/ay (3 gün ücretsiz deneme) · 499,99 ₺/yıl
- Küçük not + linkler: abonelik koşulları, gizlilik politikası

### 4.5 SSS (accordion, `FAQPage` JSON-LD ile)
1. Gebelik haftam nasıl hesaplanıyor? (3 yöntem; standart: son adet tarihi, 280 gün)
2. Verilerim nerede saklanıyor? (Yalnızca cihazında; hesap/backend yok)
3. İnternet bağlantısı gerekiyor mu? (Hayır, tamamen çevrimdışı)
4. Uygulama ücretsiz mi? (Temel özellikler ücretsiz; Premium isteğe bağlı)
5. Android sürümü var mı? (Şu an yalnızca iOS)
6. Tıbbi tavsiye veriyor mu? (Hayır — bilgilendirme amaçlıdır, doktorunuza danışın)
7. Aboneliğimi nasıl iptal ederim? (Ayarlar → Apple ID → Abonelikler)

### 4.6 Kapanış CTA + Footer
- Footer linkleri: Support, Gizlilik Politikası, Kullanım Koşulları, Abonelik Koşulları, © Lumi-Zone
- "Tıbbi tavsiye değildir" dipnotu

### Yayın sonrası eklenecekler
- Gerçek App Store yorumları bölümü (LiD modelinde küratörlü kartlar) — launch'ta KOYMA, yorum birikince ekle
- App Store puanı rozeti

---

## 5. SEO Katmanı

### 5.1 Meta / head (BaseLayout.astro içinde merkezî)
- **Title (landing):** `Minik Anlar – Hamilelik Takibi ve Anı Defteri Uygulaması`
- **Description:** ~150 karakter; "hafta hafta gebelik takibi", "anı defteri", "gizlilik" temaları tek cümlede
- Canonical, `lang="tr"`, `robots: index, follow, max-image-preview:large`
- OG + Twitter card + `og.png` (1200×630: mockup + logo + slogan)
- Her sayfa kendi title/description'ını props ile geçer

### 5.2 Yapılandırılmış veri (JSON-LD)
- `SoftwareApplication`: name, operatingSystem: iOS, applicationCategory: HealthApplication, offers (79,99 ₺ / 499,99 ₺, TRY)
- `FAQPage`: landing SSS'sinden
- Yayın sonrası: `AggregateRating` (gerçek App Store puanıyla)
- `Organization` (Lumi-Zone) footer düzeyinde

### 5.3 App entegrasyon meta'ları
- `apple-itunes-app` smart banner (App Store ID yayın sonrası eklenir)
- `al:ios:app_store_id`, `al:ios:app_name` app link meta'ları
- Android meta'ları YOK (uygulama yalnızca iOS)

### 5.4 Teknik
- `@astrojs/sitemap` → sitemap.xml; robots.txt sitemap'i işaret eder
- Görseller: Astro `<Image>` ile AVIF/WebP, mockuplarda lazy loading
- Hedefler: LCP < 2.0 s, CLS ≈ 0
- Yayın sonrası: Google Search Console kaydı + sitemap gönderimi

### 5.5 Sayfa bazlı title/description tablosu

| Sayfa | Title | Description özü |
|---|---|---|
| `/` | Minik Anlar – Hamilelik Takibi ve Anı Defteri Uygulaması | Hafta hafta takip + anı saklama + gizlilik |
| `/support/` | Destek ve SSS – Minik Anlar | Sık sorulan sorular ve iletişim |
| `/gizlilik-politikasi/` | Gizlilik Politikası – Minik Anlar | Veri toplanmaz; her şey cihazda |
| `/kullanim-kosullari/` | Kullanım Koşulları – Minik Anlar | Kullanım şartları |
| `/abonelik-kosullari/` | Abonelik Koşulları – Minik Anlar Premium | Otomatik yenileme, deneme, iptal |

---

## 6. Görsel Kimlik

Palet, uygulamanın `DesignSystem.swift` **nötr** temasından CSS değişkenlerine çevrilir — site ile uygulama aynı görünmeli:

- Zemin: sıcak krem (hue 0.08, çok düşük doygunluk — `pageBackground`)
- Birincil vurgu: sage/mint yeşilleri (`accent` hue 0.40 ailesi)
- İkincil vurgular: blush, lavanta, gökyüzü pastel tonları (dozunda)
- Metin: koyu mürekkep tonu (`ink`) + ikincil gri
- Tipografi: sistem fontu ya da tek değişken Google Font (ör. Nunito/Inter); yumuşak köşeler (uygulamadaki card radius diliyle uyumlu)
- Genel his: sakin, nazik, tıbbi/klinik DEĞİL — uygulamanın metin tonuyla aynı ("nazik hatırlatma" dili)

---

## 7. Yasal Sayfa İçerik Notları

### Gizlilik Politikası
- Ana beyan: uygulama kişisel veri TOPLAMAZ; hesap, backend, analytics, reklam SDK'sı yok
- Verilerin (profil, günlük, fotoğraf, randevu, hatırlatıcı) yalnızca cihazda saklandığı
- İzinler ve amaçları: fotoğraf kitaplığı (albüm), bildirimler (hatırlatıcı)
- Satın alma işlemlerinin Apple/StoreKit tarafından işlendiği; Apple'ın gizlilik politikasına link
- `PrivacyInfo.xcprivacy` beyanıyla tutarlı olmalı
- İletişim e-postası + yürürlük tarihi

### Kullanım Koşulları
- Hizmet tanımı, kabul, fikri mülkiyet, sorumluluk sınırı
- **Tıbbi feragat (kritik):** içerik bilgilendirme amaçlıdır, tıbbi tavsiye değildir; sağlık kararları için doktora danışılmalıdır

### Abonelik Koşulları
- Ürünler: Aylık 79,99 ₺ (3 gün ücretsiz deneme) / Yıllık 499,99 ₺
- Otomatik yenileme mekanizması; dönem bitiminden 24 saat önce iptal edilmezse yenilenir
- İptal yolu: iOS Ayarlar → Apple ID → Abonelikler
- Deneme süresi bitmeden iptal edilirse ücret alınmaz

### Uygulama tarafında yapılacak (site değil ama bağlantılı)
- [ ] `PremiumPaywallView`'a Gizlilik Politikası + Kullanım/Abonelik Koşulları linklerini ekle (App Review şartı)
- [ ] App Store Connect: Marketing URL = `/`, Support URL = `/support/`, Privacy Policy URL = `/gizlilik-politikasi/`

---

## 8. Yol Haritası

### Faz 1 — Yasal çekirdek + iskelet (launch blocker)
- [ ] Repo kurulumu, Astro 5 projesi, deploy.yml, custom domain + HTTPS
- [ ] BaseLayout.astro (tüm meta/OG/JSON-LD mantığı)
- [ ] 3 yasal sayfa + `/support/` (metinleriyle)
- [ ] Basit landing v0 (hero + özellik özetleri + footer)
- [ ] robots.txt + sitemap
- **Çıktı:** App Store Connect başvurusuna girilebilir URL'ler

### Faz 2 — Tam landing (yayınla eşzamanlı)
- [ ] Uygulamadan ekran görüntüleri (Bugün, Günlük, Anılar, Premium) → mockup çerçevesi
- [ ] 4 özellik bölümü + gizlilik şeridi + Premium bölümü + SSS accordion
- [ ] og.png tasarımı
- [ ] JSON-LD (SoftwareApplication + FAQPage)
- [ ] Search Console kaydı

### Faz 3 — Yayın sonrası
- [ ] App Store ID ile smart banner + al:ios meta'ları + gerçek App Store butonu/linki
- [ ] Yorumlar bölümü (gerçek yorumlar birikince) + AggregateRating
- [ ] İsteğe bağlı: 2 pillar sayfa (`/hamilelik-takip-uygulamasi/`, `/hamilelik-ani-defteri/`)
- [ ] Search Console verisine göre iyileştirme

---

## 9. Kontrol Listesi — "Bitti" Tanımı

- [ ] Tüm sayfalarda benzersiz title + description + canonical
- [ ] OG görseliyle paylaşım önizlemesi doğru (WhatsApp/Twitter testi)
- [ ] Lighthouse: Performance ≥ 95, SEO = 100, Accessibility ≥ 95
- [ ] Mobilde tüm bölümler tek elle okunabilir; mockuplar lazy load
- [ ] sitemap.xml erişilebilir, Search Console'da hatasız
- [ ] Yasal sayfa URL'leri App Store Connect'e girildi
- [ ] "Tıbbi tavsiye değildir" ibaresi landing footer'ında ve kullanım koşullarında mevcut
- [ ] 404 sayfası mevcut