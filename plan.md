# Minik Anlar — Tanıtım Websitesi Planı

**Tarih:** 7 Ağustos 2026
**Kapsam:** Minik Anlar iOS uygulaması için App Store başvurusuna hazır, SEO destekli statik tanıtım sitesi
**Kaynak:** Bu plandaki her özellik, fiyat ve gizlilik ifadesi `MinikAnlar` uygulamasının **kod tabanından** doğrulanmıştır.
**Site türü:** Yalnızca tanıtım — interaktif araç yok. Uygulamayı anlatır, App Store'a yönlendirir, yasal sayfaları barındırır.

> Bu dosya 9 Temmuz 2026 tarihli planın yerine geçer. Eski plan; fiyatlandırma, abonelik ürünleri, gizlilik mimarisi ve özellik listesi bakımından uygulamayla **uyuşmuyordu**. Bölüm 10 farkları listeler.

---

## 1. Amaç ve Başarı Kriterleri

1. App Store Connect başvurusu için zorunlu URL'leri sağlamak (Marketing URL, Support URL, Privacy Policy URL, EULA).
2. Yasal sayfaların uygulamanın **gerçek** davranışını doğru anlatması — App Review'un gizlilik beyanı ile kodun çelişmesi ret sebebidir.
3. Uygulamanın özelliklerini net tanıtıp App Store'a dönüşüm sağlamak.
4. "hamilelik takip uygulaması", "hamilelik anı defteri" gibi Türkçe sorgularda organik görünürlük.

---

## 2. Doğrulanmış Uygulama Gerçekleri

Bu tablo sitedeki tüm iddiaların tek referansıdır. Değiştirmeden önce koddan tekrar doğrula.

| Konu | Gerçek | Kaynak |
|---|---|---|
| Bundle id | `com.minikanlar.app` | `CLAUDE.md` |
| Platform | Yalnızca iOS, deployment target 17.0 | `CLAUDE.md` |
| Dil | Tamamı Türkçe, `tr_TR` | `CLAUDE.md` |
| Depolama | SwiftData, **cihazda**; hesap ve uygulama sunucusu yok | `MinikAnlarApp.swift` |
| Fotoğraflar | `Application Support/Media/`, cihazda | `MediaStore.swift` |
| Sekmeler | Bugün · Günlük · Anılar · Ayarlar | `RootViews.swift` |
| **Üçüncü taraf SDK** | **Adapty** — satın alma doğrulama, Premium erişim yönetimi, abonelik analitiği | `PremiumStore.swift`, `MinikAnlarApp.swift` |
| Adapty placement | `main_premium`, access level `premium` | `PremiumConfiguration` |
| Ürün 1 | `premium_monthly_subscription` — **699,99 ₺ / ay**, otomatik yenilenen | `MinikAnlar.storekit` |
| Ürün 2 | `premium_weekly_subscription` — **199,99 ₺ / hafta**, otomatik yenilenen | `MinikAnlar.storekit` |
| Yıllık plan | **YOK** | `MinikAnlar.storekit` |
| Ücretsiz deneme | Sabit değil — Adapty'den kullanıcıya göre gelir (`introOfferPeriodTexts`) | `PremiumStore.swift` |
| Varsayılan seçim | Aylık paket | `PremiumPaywallView` |
| Premium'un açtığı | Gelişim Videosu · Dijital Albüm · PDF Anı Kitabı (+ kayıtlı projeler, hizalı poz kamerası, randevu özeti) | `PremiumBenefit`, `CLAUDE.md` |
| Ücretsiz kalan | Tüm temel gebelik takibi; video ve PDF'in kısa/imzalı sürümü | `CLAUDE.md` |
| Albüm temaları | Atölye · Bahçe · **Botanik** · Gökyüzü · Lavanta · Sade Film (6) | `DigitalAlbumTheme` |
| İzinler | Fotoğraf kitaplığı, **kamera** (haftalık poz), bildirim | `CLAUDE.md`, release checklist |
| Hafta hesabı | 280 gün; öncelik son adet → gebe kalma (−14g) → tahmini doğum (−280g); 40. haftada sabitlenir | `GestationalAgeService` |
| Sağlık takibi | Kilo, tansiyon, tekme sayacı — **hiçbir eşik/uyarı göstermez** | `HealthTrackingView` |
| Dışa aktarma | `DataExportService` — tüm kayıtlar + fotoğraflar `.zip` | `DataExportService.swift` |
| Reklam / IDFA / izleme | Yok; `NSPrivacyTracking = false` | `PrivacyInfo.xcprivacy` |

### 2.1 Gizlilik: sitenin söyleyebileceği ve söyleyemeyeceği

Uygulama gerçekten hesapsız ve gebelik verisi cihazda kalıyor — bu güçlü ve doğru bir mesaj. Ancak Adapty entegrasyonu nedeniyle **"analytics yok", "üçüncü taraf yok", "tamamen çevrimdışı"** ifadeleri yanlıştır ve Privacy Policy URL'inde yer alamaz.

**Söylenebilir:**
- "Hesap yok, reklam yok, izleme yok."
- "Gebelik kayıtların, fotoğrafların ve notların cihazında kalır."
- "Video ve PDF cihazında üretilir."
- "Yalnızca abonelik doğrulaması için Apple ve Adapty ile satın alma bilgisi paylaşılır; IDFA ve IP toplama kapalı."

**Söylenemez:**
- ❌ "Hiçbir üçüncü taraf yazılım kullanılmaz"
- ❌ "Analytics yok"
- ❌ "Tamamen çevrimdışı çalışır" (paywall, satın alma ve geri yükleme internet ister)
- ❌ "Üçüncü şahısların verilere erişimi yoktur"

---

## 3. Teknoloji

| Konu | Karar |
|---|---|
| Framework | Astro 5 + TypeScript |
| Stil | Saf CSS değişkenleri; palet `DesignSystem.swift` **neutral** temasından türetildi |
| Hosting | GitHub Pages + custom domain |
| Domain | `minikanlar.app` |
| Dil | Yalnızca Türkçe (`lang="tr"`) |
| JS | 0 KB — SSS native `<details>` ile |
| Tek konfig | `src/config.ts` — fiyat, e-posta, App Store ID, tarihler tek yerde |

### Palet (neutral temadan HSB→HEX)

| Değişken | HEX | Kaynak |
|---|---|---|
| `--primary` | `#729E84` | `primary` sage |
| `--accent` | `#8FA6B3` | `accent` sky |
| `--page-bg` | `#F6F2EC` | `pageBackground` sıcak krem |
| `--ink` | `#242220` | `ink` |
| `--text-secondary` | `#6B6966` | `secondaryText` |
| `--mint` / `--lavender` / `--sky` | `#C3E8D2` / `#CCD2E8` / `#BCD7E6` | pastel vurgular |

---

## 4. Site Haritası

| URL | Sayfa | App Store Connect alanı |
|---|---|---|
| `/` | Landing | Marketing URL |
| `/support/` | Destek + SSS | Support URL |
| `/gizlilik-politikasi/` | Gizlilik Politikası | Privacy Policy URL |
| `/kullanim-kosullari/` | Kullanım Koşulları (EULA) | Paywall'dan link |
| `/abonelik-kosullari/` | Abonelik Koşulları | Paywall'dan link |
| `/404` | Bulunamadı | — |

---

## 5. Landing Yapısı

**5.1 Hero** — H1 `Minik Anlar — Hamilelik Takibi ve Anı Defteri`. Alt metin + App Store rozeti (yayın öncesi "Yakında App Store'da"). Bugün ekranı mockup'ı.

**5.2 Gizlilik şeridi** — "Hesap yok. Reklam yok. İzleme yok. Gebelik kayıtların cihazında kalır." (Ayrıntı için gizlilik politikasına link.)

**5.3 Özellik bölümleri**

- **A — Hafta Hafta Takip (Bugün):** 40 haftanın bebek/anne özeti, benzersiz haftalık başlık ve "Bunu biliyor muydun?", bebek boyutu karşılaştırmaları, tahmini boy/kilo, trimester rehberi, 3 yöntemle hafta hesabı.
- **B — Günlük:** ruh hali, enerji, semptom; günlük rutin (su, vitamin, yürüyüş); doktor randevuları — öncesinde soru listesi, sonrasında notlar.
- **C — Anılar:** haftalık poz albümü, ultrason, "ilkler", bebeğe mektuplar; zaman tüneli ve albüm görünümü; **hizalı poz kamerası** (önceki haftanın hayalet çerçevesi).
- **D — Takip ve Hazırlık:** kilo, tansiyon, tekme sayacı (yorum yok, yalnızca kayıt); hastane çantası listesi; yerel bildirimlerle nazik hatırlatıcılar; doğum sonrası özet; `.zip` yedek dışa aktarma.

**5.4 Premium** — 3 fayda: Gelişim Videosu (müzikli MP4), Dijital Albüm (6 tema), PDF Anı Kitabı. Ücretsiz sürümde video ve PDF'in kısa/imzalı örneği alınabilir. Fiyat: 199,99 ₺/hafta · 699,99 ₺/ay. Deneme süresi varsa uygulama içinde gösterilir. Yanına abonelik + gizlilik linkleri.

**5.5 SSS** (`FAQPage` JSON-LD)
1. Gebelik haftam nasıl hesaplanıyor?
2. Verilerim nerede saklanıyor?
3. İnternet gerekiyor mu? → *Takip ve anılar çevrimdışı; yalnızca Premium satın alma/geri yükleme internet ister.*
4. Uygulama ücretsiz mi?
5. Premium neyi açar?
6. Verilerimi yedekleyebilir miyim?
7. Android sürümü var mı?
8. Tıbbi tavsiye veriyor mu?
9. Aboneliğimi nasıl iptal ederim?

**5.6 Kapanış CTA + Footer** — yasal linkler, "tıbbi tavsiye değildir" dipnotu, © .

**Yayın sonrası:** gerçek yorumlar + `AggregateRating`, App Store puanı rozeti, smart banner.

---

## 6. SEO

- `BaseLayout.astro` tüm meta/OG/JSON-LD'yi merkezîleştirir; her sayfa kendi title/description'ını props ile geçer.
- Canonical, `lang="tr"`, `og:locale=tr_TR`, `robots: index, follow, max-image-preview:large`.
- JSON-LD: `SoftwareApplication` (iOS, HealthApplication, offers 199,99 / 699,99 TRY), `FAQPage`, `Organization`.
- `@astrojs/sitemap` + `robots.txt`.
- Yayın sonrası: `apple-itunes-app` smart banner + `al:ios:*` meta'ları (App Store ID gerekir).
- Hedef: LCP < 2,0 s, CLS ≈ 0, Lighthouse SEO 100 / Performance ≥ 95 / A11y ≥ 95.

---

## 7. Yasal Sayfa İçerik Notları

**Gizlilik Politikası** — cihazda saklama; hesap/reklam/izleme yok; **Adapty ve Apple'ın satın alma verisini işlediği açıkça yazılır** (amaç: doğrulama, erişim, abonelik analitiği; IDFA ve IP kapalı); izinler (fotoğraf, kamera, bildirim) ve amaçları; uygulama silinince veri kalıcı gider; dışa aktarma ile yedek alınabilir; `PrivacyInfo.xcprivacy` ile tutarlı; iletişim + yürürlük tarihi.

**Kullanım Koşulları** — hizmet tanımı, lisans, fikri mülkiyet, sorumluluk sınırı, veri kaybı riski ve **tıbbi feragat** (kritik).

**Abonelik Koşulları** — iki ürün ve gerçek fiyatları; otomatik yenileme ve 24 saat kuralı; deneme süresinin sabit olmadığı; iptal yolu (Ayarlar → Apple ID → Abonelikler); iadelerin Apple'a tabi olduğu; Premium'un neyi açtığı ve temel takibin ücretsiz kaldığı.

---

## 8. Uygulama Tarafı (site değil, ama bağlantılı)

- [ ] `PremiumPaywallView`'da Gizlilik Politikası + Kullanım/Abonelik Koşulları linkleri görünür olmalı (App Review şartı).
- [ ] App Store Connect: Marketing `/`, Support `/support/`, Privacy `/gizlilik-politikasi/`, EULA `/kullanim-kosullari/`.
- [ ] **`PrivacyInfo.xcprivacy` gözden geçirilmeli:** `NSPrivacyCollectedDataTypes` boş, ancak Adapty satın alma verisi işliyor. App Store Connect gizlilik formunda "Satın Alma Geçmişi" beyanı ile manifest'in tutarlı olması gerekir.

---

## 9. Yol Haritası

**Faz 1 — Yasal çekirdek (launch blocker)** · BaseLayout + meta, 3 yasal sayfa + `/support/`, landing v1, robots + sitemap, 404. → App Store Connect'e girilebilir URL'ler.

**Faz 2 — Tam landing** · Uygulama ekran görüntüleri → mockup çerçevesi, `og.png`, JSON-LD, Search Console.

**Faz 3 — Yayın sonrası** · App Store ID ile gerçek link + smart banner, yorumlar + `AggregateRating`, opsiyonel pillar sayfalar (`/hamilelik-takip-uygulamasi/`, `/hamilelik-ani-defteri/`).

---

## 10. Eski Planın Düzeltilen Hataları

| Eski (yanlış) | Yeni (doğru) |
|---|---|
| 79,99 ₺/ay + 499,99 ₺/yıl | 199,99 ₺/hafta + 699,99 ₺/ay; yıllık plan yok |
| "3 gün ücretsiz deneme" | Deneme sabit değil, Adapty'den gelir |
| "Analytics yok, backend'siz" | Adapty satın alma verisini işler (analitik dahil) |
| "Tamamen çevrimdışı" | Takip çevrimdışı; satın alma/geri yükleme internet ister |
| Premium = albüm + PDF + haftalık anı soruları | Premium = Gelişim Videosu + Dijital Albüm + PDF Anı Kitabı |
| Tema "Keten" | Tema "Botanik" |
| İzinler: fotoğraf + bildirim | + **kamera** (hizalı haftalık poz) |
| Özellik listesinde yok | Gelişim videosu, sağlık takibi, poz kamerası, veri dışa aktarma, doğum özeti |
| 3 sekme ima ediliyordu | Bugün · Günlük · Anılar · Ayarlar |

---

## 11. "Bitti" Tanımı

- [ ] Her sayfada benzersiz title + description + canonical
- [ ] Sitedeki hiçbir gizlilik/fiyat ifadesi kodla çelişmiyor (Bölüm 2 tablosuyla karşılaştır)
- [ ] OG görseliyle paylaşım önizlemesi doğru
- [ ] Lighthouse: Performance ≥ 95, SEO 100, A11y ≥ 95
- [ ] sitemap.xml erişilebilir; robots.txt işaret ediyor
- [ ] "Tıbbi tavsiye değildir" landing footer'ında ve kullanım koşullarında
- [ ] 404 sayfası mevcut
- [ ] Yasal URL'ler App Store Connect'e girildi
