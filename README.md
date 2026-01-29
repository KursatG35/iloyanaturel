# İloya Tasarım ERP - Next.js Version

Modern, web tabanlı işletme yönetim sistemi - Vercel'de yayına hazır!

## 🚀 Vercel'e Deploy Etme

### Yöntem 1: GitHub Üzerinden (Önerilen)

1. **GitHub'da Yeni Repo Oluşturun**
   - GitHub'da yeni bir repository oluşturun
   - Private veya Public olabilir

2. **Kodu GitHub'a Push Edin**
   ```bash
   cd iloya_erp_nextjs
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
   git push -u origin main
   ```

3. **Vercel'e Bağlayın**
   - [vercel.com](https://vercel.com) adresine gidin
   - "New Project" butonuna tıklayın
   - GitHub repository'nizi seçin
   - "Deploy" butonuna tıklayın
   - ✅ Birkaç dakika içinde yayında!

### Yöntem 2: Vercel CLI ile

1. **Vercel CLI Kurun**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Edin**
   ```bash
   cd iloya_erp_nextjs
   vercel
   ```

3. **Soruları Cevaplayın**
   - Set up and deploy? → Yes
   - Which scope? → Hesabınızı seçin
   - Link to existing project? → No
   - Project name? → iloya-erp (veya istediğiniz isim)
   - Directory? → ./ (Enter)
   - Override settings? → No

4. **Production'a Deploy**
   ```bash
   vercel --prod
   ```

## 🔧 Yerel Geliştirme

```bash
# Bağımlılıkları kurun
npm install

# Development sunucusunu başlatın
npm run dev

# Tarayıcıda açın: http://localhost:3000
```

## 📦 Proje Yapısı

```
iloya_erp_nextjs/
├── app/
│   ├── api/              # API routes
│   │   ├── products/
│   │   ├── sales/
│   │   ├── purchases/
│   │   └── expenses/
│   ├── layout.tsx        # Ana layout
│   ├── page.tsx          # Ana sayfa
│   └── globals.css       # Global stiller
├── components/           # React componentleri
│   ├── Dashboard.tsx
│   ├── Products.tsx
│   ├── Sales.tsx
│   ├── Purchases.tsx
│   ├── Expenses.tsx
│   ├── Reports.tsx
│   └── Sidebar.tsx
├── lib/
│   └── store.ts          # Veri yönetimi
├── data/
│   └── initial-products.json  # Başlangıç ürün verileri
├── package.json
├── tsconfig.json
├── next.config.js
└── vercel.json
```

## ⚠️ Önemli Notlar

### Veri Saklama

**Şu Anki Durum:**
- Veriler in-memory (RAM'de) saklanıyor
- Sunucu her yeniden başladığında veriler sıfırlanır
- Demo ve test için uygundur

**Production İçin Öneriler:**

1. **Vercel KV (Redis) - Basit ve Hızlı**
   ```bash
   npm install @vercel/kv
   ```
   - Vercel dashboard'dan KV database ekleyin
   - `lib/store.ts` dosyasını güncelleyin

2. **MongoDB Atlas - Tam Özellikli**
   ```bash
   npm install mongodb
   ```
   - MongoDB Atlas'ta ücretsiz cluster oluşturun
   - Connection string'i environment variables'a ekleyin

3. **Supabase - PostgreSQL**
   ```bash
   npm install @supabase/supabase-js
   ```
   - Supabase projesi oluşturun
   - API keys'leri ekleyin

### Environment Variables

Production'da hassas bilgiler için `.env.local` kullanın:

```env
# Vercel KV
KV_REST_API_URL=your-kv-url
KV_REST_API_TOKEN=your-kv-token

# veya MongoDB
MONGODB_URI=your-mongodb-connection-string

# veya Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

Vercel dashboard'dan Environment Variables ekleyebilirsiniz.

## 🎨 Özellikler

✅ **Modern Dashboard** - Gerçek zamanlı metriklr
✅ **Ürün Yönetimi** - 129 ürün hazır
✅ **Satış Takibi** - Kanal bazlı analiz
✅ **Alım Yönetimi** - Tedarikçi takibi
✅ **Gider Takibi** - Kategorize giderler
✅ **Raporlama** - Detaylı gelir-gider analizi
✅ **Responsive** - Mobil uyumlu
✅ **Modern UI** - Minimalist, şık tasarım

## 📊 Kullanım

1. **Ürünler**: Maliyet ve stok bilgilerini güncelleyin
2. **Satışlar**: Yeni satış ekleyin, otomatik kar hesaplanır
3. **Alımlar**: Tedarikçi alımlarını kaydedin
4. **Giderler**: Operasyonel giderleri takip edin
5. **Raporlar**: Detaylı mali raporları inceleyin

## 🔗 Faydalı Linkler

- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)

## 📝 Lisans

Bu proje İloya Tasarım için özel geliştirilmiştir.

---

**Geliştirici**: Claude (Anthropic)  
**Framework**: Next.js 14  
**Deployment**: Vercel  
**Versiyon**: 1.0
