/**
 * Sitedeki tüm değişken bilgiler tek yerde.
 *
 * Buradaki her değer uygulamanın kod tabanından doğrulanmıştır — ürün
 * kimlikleri `Services/PremiumStore.swift`. Değiştirmeden önce plan.md § 2'ye bak.
 */

export const SITE = {
  url: 'https://minikanlar.app',
  name: 'Minik Anlar',
  tagline: 'Hamilelik Takibi ve Anı Defteri',
  locale: 'tr_TR',
  publisher: 'Lumi-Zone',
  supportEmail: 'cfsmobiletech@gmail.com',
  /** Yasal sayfaların yürürlük tarihi (ISO). */
  legalUpdatedISO: '2026-08-07',
  legalUpdatedLabel: '7 Ağustos 2026',
} as const;

/**
 * Uygulama App Store'da yayınlandığında `appStoreId` doldurulur; o an
 * hero/CTA butonları otomatik olarak gerçek indirme linkine döner ve
 * BaseLayout smart banner meta'sını yayına alır.
 */
export const APP_STORE = {
  appStoreId: null as string | null,
  bundleId: 'com.minikanlar.app',
  minimumOSVersion: '17.0',
} as const;

export const appStoreUrl = APP_STORE.appStoreId
  ? `https://apps.apple.com/tr/app/id${APP_STORE.appStoreId}`
  : null;

export const downloadLabel = appStoreUrl
  ? "App Store'dan İndir"
  : "Yakında App Store'da";

/**
 * Başlıktaki gezinme. Çapalar ana sayfada; alt sayfalardan da çalışsın diye
 * kök göreli (`/#...`) yazılır.
 */
export const NAV = [
  { href: '/#ozellikler', label: 'Özellikler' },
  { href: '/#premium', label: 'Premium' },
  { href: '/#sss', label: 'SSS' },
  { href: '/support/', label: 'Destek' },
] as const;

/**
 * Otomatik yenilenen iki abonelik. Yıllık plan yoktur.
 *
 * Fiyat ve ücretsiz deneme süresi bilinçli olarak burada yer almaz: her ikisi de
 * Apple'ın bölgesel fiyatlandırmasına ve Adapty'nin kullanıcıya özel teklifine
 * bağlıdır (`PremiumStore.introOfferPeriodTexts`). Sitede sabit bir tutar veya
 * süre vaat edilmez; güncel değerler yalnızca satın alma ekranında gösterilir.
 */
export const SUBSCRIPTIONS = [
  {
    id: 'premium_weekly_subscription',
    name: 'Haftalık',
    period: 'hafta',
    note: 'Kısa süreli denemek için',
    featured: false,
  },
  {
    id: 'premium_monthly_subscription',
    name: 'Aylık',
    period: 'ay',
    note: 'Uygulamadaki varsayılan seçim',
    featured: true,
  },
] as const;

/** Premium'un açtığı yetenekler — `Features/PremiumViews.swift` `PremiumBenefit`. */
export const PREMIUM_BENEFITS = [
  {
    title: 'Gelişim Videosu',
    detail:
      'Haftalık pozlarından geçişler, müzik ve hafta etiketleriyle bir MP4 klip hazırla. Projen kayıtlı kalır, yeni pozlarla güncellenir.',
  },
  {
    title: 'Dijital Albüm',
    detail:
      'Kapak ve altı editoryal temayla anılarını albümde topla: Atölye, Bahçe, Botanik, Gökyüzü, Lavanta, Sade Film.',
  },
  {
    title: 'PDF Anı Kitabı',
    detail:
      'Seçtiğin anılardan albüm temanla uyumlu, baskıya hazır bir kitap oluşur. Yazdırabilir veya sevdiklerinle paylaşabilirsin.',
  },
] as const;
