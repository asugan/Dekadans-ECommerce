import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Sanat ve Dini Ürünler için veritabanı seedleniyor...')

  // Mevcut verileri temizle
  await prisma.inventory.deleteMany()
  await prisma.inventoryHistory.deleteMany()
  await prisma.cartItem.deleteMany()
  await prisma.cart.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.productReview.deleteMany()
  await prisma.productQuestion.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  console.log('🧹 Mevcut veriler temizlendi')

  // Kategorileri oluştur
  const sanatEserleri = await prisma.category.create({
    data: {
      name: 'Sanat Eserleri',
      slug: 'sanat-eserleri',
      description: 'Osmanlı ve modern Türk sanatı ürünleri',
      isActive: true,
      sortOrder: 1,
      seoTitle: 'Sanat Eserleri | Türk Sanat Ürünleri',
      seoDesc: 'Osmanlı motifleri, hat sanatı ve modern Türk sanatı ürünleri',
    },
  })

  const duvarTablolari = await prisma.category.create({
    data: {
      name: 'Duvar Tabloları',
      slug: 'duvar-tablolari',
      description: 'El yapımı duvar tabloları ve dekoratif sanat ürünleri',
      isActive: true,
      sortOrder: 1,
      parentId: sanatEserleri.id,
      seoTitle: 'Duvar Tabloları | El Yapımı Sanat Ürünleri',
      seoDesc: 'El yapımı duvar tabloları, hat sanatı ve dekoratif sanat ürünleri',
    },
  })

  const hatSanati = await prisma.category.create({
    data: {
      name: 'Hat Sanatı',
      slug: 'hat-sanati',
      description: 'Geleneksel ve modern hat sanatı ürünleri',
      isActive: true,
      sortOrder: 2,
      parentId: sanatEserleri.id,
      seoTitle: 'Hat Sanatı | Hilye ve Esma-ül Hüsna',
      seoDesc: 'Geleneksel Türk hat sanatı, Hilye-i Şerif ve Esma-ül Hüsna ürünleri',
    },
  })

  const diniUrunler = await prisma.category.create({
    data: {
      name: 'Dini Ürünler',
      slug: 'dini-urunler',
      description: 'Tesbihler, namaz ürünleri ve dini objeler',
      isActive: true,
      sortOrder: 2,
      seoTitle: 'Dini Ürünler | Tesbih ve Namaz Ürünleri',
      seoDesc: 'Kaliteli tesbihler, namaz ürünleri ve dini eserler',
    },
  })

  const tesbihler = await prisma.category.create({
    data: {
      name: 'Tesbihler',
      slug: 'tesbihler',
      description: 'Doğal taşlar ve el yapımı tesbihler',
      isActive: true,
      sortOrder: 1,
      parentId: diniUrunler.id,
      seoTitle: 'Tesbihler | Kehribar ve Doğal Taş Tesbih',
      seoDesc: 'Kehribar, mercan ve doğal taşlardan yapılmış el işi tesbihler',
    },
  })

  const namazUrunleri = await prisma.category.create({
    data: {
      name: 'Namaz Ürünleri',
      slug: 'namaz-urunleri',
      description: 'Seccade, hırka ve namaz aksesuarları',
      isActive: true,
      sortOrder: 2,
      parentId: diniUrunler.id,
      seoTitle: 'Namaz Ürünleri | Seccade ve Namaz Aksesuarları',
      seoDesc: 'Kaliteli seccadeler, hırkalar ve namaz aksesuarları',
    },
  })

  console.log('📂 Kategoriler oluşturuldu')

  // Ürün verileri
  const products = [
    // Tablolar
    {
      categoryId: duvarTablolari.id,
      name: 'Hilye-i Şerif Hat Sanatı Tablosu',
      slug: 'hilye-i-serif-hat-sanati-tablosu',
      description: 'El yapımı Hilye-i Şerif, 40x50 cm ebadında özel ahşap çerçeveli hat sanatı eseri. Geleneksel tezhip süslemeleriyle bezeli, orijinal mürekkep ve altın varak kullanılarak hazırlanmıştır.',
      shortDesc: 'El yapımı Hilye-i Şerif hat sanatı tablosu',
      sku: 'HT-001',
      price: 2850.00,
      comparePrice: 3500.00,
      costPrice: 1500.00,
      weight: 2.5,
      dimensions: JSON.stringify({ length: 50, width: 40, height: 5 }),
      images: [
        'https://picsum.photos/seed/hilye1/800/600.jpg',
        'https://picsum.photos/seed/hilye2/800/600.jpg',
        'https://picsum.photos/seed/hilye3/800/600.jpg'
      ],
      stock: 3,
      tags: 'hat sanatı, hilye, osmanlı, duvar tablosu',
      seoTitle: 'Hilye-i Şerif Hat Sanatı Tablosu | El Yapımı Sanat Eseri',
      seoDesc: 'El yapımı Hilye-i Şerif hat sanatı tablosu. Geleneksel Osmanlı sanatı, 40x50 cm, ahşap çerçeve.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Bismillahirrahmanirrahim Modern Hat Tablosu',
      slug: 'bismillahirrahmanirrahim-modern-hat-tablosu',
      description: 'Modern hat sanatı tekniğiyle hazırlanmış Bismillahirrahmanirrahim yazısı. 30x70 cm boyutlarında, şık siyah çerçeveli, modern iç mekanlar için ideal dekoratif sanat eseri.',
      shortDesc: 'Modern hat sanatı Bismillahirrahmanirrahim tablosu',
      sku: 'HT-002',
      price: 1250.00,
      comparePrice: 1500.00,
      costPrice: 650.00,
      weight: 1.8,
      dimensions: JSON.stringify({ length: 70, width: 30, height: 3 }),
      images: [
        'https://picsum.photos/seed/bismillah1/800/600.jpg',
        'https://picsum.photos/seed/bismillah2/800/600.jpg'
      ],
      stock: 5,
      tags: 'hat sanatı, bismillah, modern, duvar dekoru',
      seoTitle: 'Bismillahirrahmanirrahim Modern Hat Tablosu',
      seoDesc: 'Modern hat sanatı Bismillahirrahmanirrahim yazısı. 30x70 cm, şık çerçeve.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Yunus Emre Şiirli Tablo',
      slug: 'yunus-emre-siirli-tablo',
      description: 'Yunus Emre\'nin ünlü dizeleriyle süslenmiş sanat eseri. 50x70 cm ebadında, su ve mürekkep tekniğiyle hazırlanmış, otantik görünüm için özel antikasyon yapılmış.',
      shortDesc: 'Yunus Emre şiirleriyle bezeli duvar tablosu',
      sku: 'HT-003',
      price: 980.00,
      comparePrice: 1200.00,
      costPrice: 520.00,
      weight: 2.0,
      dimensions: JSON.stringify({ length: 70, width: 50, height: 4 }),
      images: [
        'https://picsum.photos/seed/yunus1/800/600.jpg',
        'https://picsum.photos/seed/yunus2/800/600.jpg',
        'https://picsum.photos/seed/yunus3/800/600.jpg'
      ],
      stock: 7,
      tags: 'yunus emre, şiir, tasavvuf, sanat eseri',
      seoTitle: 'Yunus Emre Şiirli Tablo | Tasavvuf Sanatı',
      seoDesc: 'Yunus Emre\'nin şiirleriyle süslenmiş el yapımı tablo. 50x70 cm.'
    },
    {
      categoryId: hatSanati.id,
      name: 'Esma-ül Hüsna Seti (6 Adet)',
      slug: 'esma-ul-husna-seti-6-adet',
      description: 'Güzel isimler olan Esma-ül Hüsna\'dan seçilmiş 6 ismin yer aldığı set. Her bir tablo 20x30 cm ebadında, toplam 6 parçadan oluşan koleksiyon. Özel kutulu ambalaj.',
      shortDesc: '6 parçalık Esma-ül Hüsna hat sanatı seti',
      sku: 'HS-001',
      price: 1850.00,
      comparePrice: 2200.00,
      costPrice: 950.00,
      weight: 3.2,
      dimensions: JSON.stringify({ length: 30, width: 20, height: 2 }),
      images: [
        'https://picsum.photos/seed/esma1/800/600.jpg',
        'https://picsum.photos/seed/esma2/800/600.jpg'
      ],
      stock: 4,
      tags: 'esma-ül hüsna, güzel isimler, hat sanatı, set',
      seoTitle: 'Esma-ül Hüsna Seti | 6 Parça Hat Sanatı Koleksiyonu',
      seoDesc: '6 parçalık Esma-ül Hüsna hat sanatı seti. 20x30 cm, özel kutulu.'
    },
    {
      categoryId: hatSanati.id,
      name: 'Ayet-el Kürsi Siyah Altın Hat Tablosu',
      slug: 'ayet-el-kursi-siyah-altin-hat-tablosu',
      description: 'Ayet-el Kürsi\'nin siyah fon üzerine altın varakla yazıldığı şık tablo. 60x80 cm ebadında, lüks ahşap çerçeveli, göz alıcı sanat eseri.',
      shortDesc: 'Ayet-el Kürsi siyah altın hat sanatı tablosu',
      sku: 'HS-002',
      price: 4200.00,
      comparePrice: 5000.00,
      costPrice: 2200.00,
      weight: 4.5,
      dimensions: JSON.stringify({ length: 80, width: 60, height: 5 }),
      images: [
        'https://picsum.photos/seed/ayet1/800/600.jpg',
        'https://picsum.photos/seed/ayet2/800/600.jpg',
        'https://picsum.photos/seed/ayet3/800/600.jpg'
      ],
      stock: 2,
      tags: 'ayet-el kürsi, altın varak, lüks, hat sanatı',
      seoTitle: 'Ayet-el Kürsi Siyah Altın Hat Tablosu | Lüks Sanat Eseri',
      seoDesc: 'Ayet-el Kürsi, siyah fon üzerine altın varak. 60x80 cm, lüks ahşap çerçeve.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Mescid-i Aksa Minyatür Tablo',
      slug: 'mescid-i-aksa-minyatur-tablo',
      description: 'Geleneksel minyatür tekniğiyle çizilmiş Mescid-i Aksa tablosu. 35x50 cm ebadında, detaylı işçilik, orijinal minyatür boya kullanılarak hazırlanmıştır.',
      shortDesc: 'El yapımı Mescid-i Aksa minyatür tablosu',
      sku: 'MT-001',
      price: 1580.00,
      comparePrice: 1900.00,
      costPrice: 820.00,
      weight: 1.5,
      dimensions: JSON.stringify({ length: 50, width: 35, height: 3 }),
      images: [
        'https://picsum.photos/seed/aksa1/800/600.jpg',
        'https://picsum.photos/seed/aksa2/800/600.jpg'
      ],
      stock: 6,
      tags: 'mescid-i aksa, minyatür, sanat, mimari',
      seoTitle: 'Mescid-i Aksa Minyatür Tablo | Geleneksel Sanat',
      seoDesc: 'Geleneksel minyatür tekniğiyle Mescid-i Aksa. 35x50 cm, detaylı işçilik.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Rumi Mevlevi Sanatı Tablosu',
      slug: 'rumi-mevlevi-sanati-tablosu',
      description: 'Mevlana Celaleddin Rumi\'nin felsefesini yansıtan semazen figürlü tablo. 45x60 cm, su ve mürekkep tekniği, çarpıcı renklerle tasavvuf sanatı.',
      shortDesc: 'Rumi semazen figürlü tasavvuf sanat tablosu',
      sku: 'TS-001',
      price: 1250.00,
      comparePrice: 1500.00,
      costPrice: 680.00,
      weight: 2.1,
      dimensions: JSON.stringify({ length: 60, width: 45, height: 4 }),
      images: [
        'https://picsum.photos/seed/rumi1/800/600.jpg',
        'https://picsum.photos/seed/rumi2/800/600.jpg'
      ],
      stock: 5,
      tags: 'rumi, mevlevi, semazen, tasavvuf, sanat',
      seoTitle: 'Rumi Mevlevi Sanatı Tablosu | Semazen Figürlü',
      seoDesc: 'Mevlana Rumi\'yi yansıtan semazen tablosu. 45x60 cm, tasavvuf sanatı.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Lale Devri Osmanlı Motifleri',
      slug: 'lale-devri-osmanli-motifleri',
      description: 'Lale devri Osmanlı motiflerinin modern yorumlandığı tablo. 50x50 cm kare format, akrilik boya tuval üzerinde, dekoratif ve şık tasarım.',
      shortDesc: 'Lale devri Osmanlı motifleri modern tablo',
      sku: 'OT-001',
      price: 950.00,
      comparePrice: 1150.00,
      costPrice: 480.00,
      weight: 1.8,
      dimensions: JSON.stringify({ length: 50, width: 50, height: 3 }),
      images: [
        'https://picsum.photos/seed/lale1/800/600.jpg',
        'https://picsum.photos/seed/lale2/800/600.jpg'
      ],
      stock: 8,
      tags: 'osmanlı, lale devri, motif, modern sanat',
      seoTitle: 'Lale Devri Osmanlı Motifleri Tablosu',
      seoDesc: 'Lale devri Osmanlı motifleri. 50x50 cm, modern yorumlama.'
    },

    // Tesbihler
    {
      categoryId: tesbihler.id,
      name: 'Kehribar Doğal 33lü Tesbih',
      slug: 'kehribar-dogal-33lu-tesbih',
      description: 'Sıcak bölgeden elde edilmiş doğal kehribar tesbih. 33 tane, her biri 8-10mm ebadında, yumuşak dokunuş, doğal kehribar kokusu. Kutulu ambalaj.',
      shortDesc: 'Doğal kehribar 33lü tesbih',
      sku: 'TSB-001',
      price: 850.00,
      comparePrice: 1100.00,
      costPrice: 420.00,
      weight: 0.3,
      dimensions: JSON.stringify({ length: 25, width: 15, height: 5 }),
      images: [
        'https://picsum.photos/seed/kehribar1/800/600.jpg',
        'https://picsum.photos/seed/kehribar2/800/600.jpg',
        'https://picsum.photos/seed/kehribar3/800/600.jpg'
      ],
      stock: 12,
      tags: 'kehribar, doğal taş, 33lü, kaliteli',
      seoTitle: 'Kehribar Doğal 33lü Tesbih | Orijinal Kehribar',
      seoDesc: 'Doğal kehribar 33lü tesbih. 8-10mm taneler, kutulu ambalaj.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Mercan Doğal 99lu Tesbih',
      slug: 'mercan-dogal-99lu-tesbih',
      description: 'Akdeniz mercanından yapılmış doğal 99lu tesbih. Her bir mercan tanesi 6-8mm, doğal mercan rengi ve dokusu, püsküllü imame. Özel hediye kutusunda.',
      shortDesc: 'Doğal mercan 99lu tesbih',
      sku: 'TS-002',
      price: 1250.00,
      comparePrice: 1500.00,
      costPrice: 680.00,
      weight: 0.4,
      dimensions: JSON.stringify({ length: 35, width: 20, height: 6 }),
      images: [
        'https://picsum.photos/seed/mercan1/800/600.jpg',
        'https://picsum.photos/seed/mercan2/800/600.jpg'
      ],
      stock: 6,
      tags: 'mercan, doğal taş, 99lu, lüks',
      seoTitle: 'Mercan Doğal 99lu Tesbih | Lüks Hediye',
      seoDesc: 'Doğal mercan 99lu tesbih. 6-8mm taneler, özel hediye kutusu.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Sandal Ağacı Kokulu Tesbih',
      slug: 'sandal-agaci-kokulu-tesbih',
      description: 'Hint sandal ağacından yapılmış kokulu 33lü tesbih. Doğal sandal kokusu, yuvarlak taneler, 8mm ebadında, meditasyon ve zikir için ideal. Lüks kutu.',
      shortDesc: 'Sandal ağacı kokulu 33lü tesbih',
      sku: 'TS-003',
      price: 580.00,
      comparePrice: 750.00,
      costPrice: 280.00,
      weight: 0.2,
      dimensions: JSON.stringify({ length: 22, width: 12, height: 4 }),
      images: [
        'https://picsum.photos/seed/sandal1/800/600.jpg',
        'https://picsum.photos/seed/sandal2/800/600.jpg'
      ],
      stock: 15,
      tags: 'sandal ağacı, kokulu, meditasyon, zikir',
      seoTitle: 'Sandal Ağacı Kokulu Tesbih | Meditasyon İçin',
      seoDesc: 'Hint sandal ağacı kokulu tesbih. Doğal koku, 33lü, meditasyon için.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Gümüş Kaplı 99lu Özel Tasarım Tesbih',
      slug: 'gumus-kapli-99lu-ozel-tasarim-tesbih',
      description: '925 ayar gümüş kaplı nazar boncuklu 99lu tesbih. Metal iç gövde, gümüş kaplama, elmas işlemeli nazar boncuklar, şık ve gösterişli tasarım. Özel hediye kutusu.',
      shortDesc: 'Gümüş kaplı nazarlı 99lu tesbih',
      sku: 'TS-004',
      price: 1850.00,
      comparePrice: 2200.00,
      costPrice: 980.00,
      weight: 0.6,
      dimensions: JSON.stringify({ length: 40, width: 25, height: 8 }),
      images: [
        'https://picsum.photos/seed/gumus1/800/600.jpg',
        'https://picsum.photos/seed/gumus2/800/600.jpg',
        'https://picsum.photos/seed/gumus3/800/600.jpg'
      ],
      stock: 4,
      tags: 'gümüş kaplı, nazar boncuklu, lüks, hediye',
      seoTitle: 'Gümüş Kaplı 99lu Özel Tasarım Tesbih | Lüks Hediye',
      seoDesc: '925 ayar gümüş kaplı, nazar boncuklu 99lu tesbih. Özel tasarım.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Kokulu Oltu Taşı 33lü Tesbih',
      slug: 'kokulu-oltu-tasi-33lu-tesbih',
      description: 'Erzurum oltu taşından yapılmış, özel formüllerle kokulandırılmış 33lü tesbih. Siyah mat görünümlü, hafif ve dayanıklı, zikir için pratik kullanım.',
      shortDesc: 'Kokulu oltu taşı 33lü tesbih',
      sku: 'TS-005',
      price: 450.00,
      comparePrice: 600.00,
      costPrice: 220.00,
      weight: 0.25,
      dimensions: JSON.stringify({ length: 24, width: 14, height: 5 }),
      images: [
        'https://picsum.photos/seed/oltu1/800/600.jpg',
        'https://picsum.photos/seed/oltu2/800/600.jpg'
      ],
      stock: 18,
      tags: 'oltu taşı, kokulu, erzurum, pratik',
      seoTitle: 'Kokulu Oltu Taşı 33lü Tesbih | Geleneksel',
      seoDesc: 'Erzurum oltu taşından, kokulu 33lü tesbih. Pratik zikir için.'
    },
    {
      categoryId: tesbihler.id,
      name: 'El Yapımı Mercan Pırlantalı Tesbih',
      slug: 'el-yapimi-mercan-pirlantali-tesbih',
      description: 'El yapımı doğal mercan taneler arasında pırlanta detaylı özel tasarım tesbih. 33lü, 925 ayar gümüş detaylar, lüks ve şık tasarım. Sınırlı sayıda üretim.',
      shortDesc: 'El yapımı mercan pırlantalı lüks tesbih',
      sku: 'TS-006',
      price: 8500.00,
      comparePrice: 10000.00,
      costPrice: 4500.00,
      weight: 0.5,
      dimensions: JSON.stringify({ length: 28, width: 18, height: 7 }),
      images: [
        'https://picsum.photos/seed/pirlanta1/800/600.jpg',
        'https://picsum.photos/seed/pirlanta2/800/600.jpg',
        'https://picsum.photos/seed/pirlanta3/800/600.jpg'
      ],
      stock: 1,
      tags: 'el yapımı, pırlanta, lüks, sınırlı sayı',
      seoTitle: 'El Yapımı Mercan Pırlantalı Tesbih | Özel Tasarım',
      seoDesc: 'El yapımı mercan, pırlanta detaylı lüks tesbih. Sınırlı sayıda.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Özel Tasarımlı Hatlı Tesbih Seti',
      slug: 'ozel-tasarimli-hatli-tesbih-seti',
      description: 'Üzerinde Esma-ül Hüsna\'dan isimlerin bulunduğu özel tasarım hatlı tesbih. Gümüş kaplı taneler, her tanede farklı bir isim, özel kutulu. Koleksiyonluk parça.',
      shortDesc: 'Hatlı Esma-ül Hüsna tesbih seti',
      sku: 'TS-007',
      price: 3200.00,
      comparePrice: 3800.00,
      costPrice: 1650.00,
      weight: 0.4,
      dimensions: JSON.stringify({ length: 32, width: 20, height: 6 }),
      images: [
        'https://picsum.photos/seed/hatli1/800/600.jpg',
        'https://picsum.photos/seed/hatli2/800/600.jpg'
      ],
      stock: 3,
      tags: 'hatlı, esma-ül hüsna, özel tasarım, koleksiyon',
      seoTitle: 'Özel Tasarımlı Hatlı Esma-ül Hüsna Tesbih',
      seoDesc: 'Esma-ül Hüsna yazılı hatlı tesbih. Gümüş kaplı, özel tasarım.'
    },
    {
      categoryId: tesbihler.id,
      name: 'Vintage Gümüş Osmanlı Tesbihi',
      slug: 'vintage-gumus-osmanli-tesbihi',
      description: 'Osmanlı döneminden kalma tarzda, vintage gümüş 33lü tesbih. 925 ayar gümüş, oymalı detaylar, antik görünüm, koleksiyoncular için değerli parça. Sertifika ile birlikte.',
      shortDesc: 'Vintage gümüş Osmanlı 33lü tesbih',
      sku: 'TS-008',
      price: 15500.00,
      comparePrice: 18000.00,
      costPrice: 8200.00,
      weight: 0.8,
      dimensions: JSON.stringify({ length: 30, width: 22, height: 8 }),
      images: [
        'https://picsum.photos/seed/vintage1/800/600.jpg',
        'https://picsum.photos/seed/vintage2/800/600.jpg',
        'https://picsum.photos/seed/vintage3/800/600.jpg'
      ],
      stock: 1,
      tags: 'vintage, gümüş, osmanlı, koleksiyon, antik',
      seoTitle: 'Vintage Gümüş Osmanlı Tesbihi | Koleksiyonluk',
      seoDesc: 'Osmanlı dönemi tarzı vintage gümüş tesbih. 925 ayar, sertifika ile.'
    },

    // Diğer Sanat Ürünleri
    {
      categoryId: namazUrunleri.id,
      name: 'Büyükel Hacı Seti (İpek Çanta ile)',
      slug: 'buyukel-haci-seti-ipek-canta-ile',
      description: 'Kaliteli ipek çanta içerisinde tam donanımlı büyük hacı seti. İpek seccade, tesbih, hırka, sabun, misvak, kuran seti ve daha fazlası. Lüks hediye paketi.',
      shortDesc: 'İpek çantalı lüks büyük hacı seti',
      sku: 'HCS-001',
      price: 2850.00,
      comparePrice: 3400.00,
      costPrice: 1500.00,
      weight: 2.8,
      dimensions: JSON.stringify({ length: 45, width: 35, height: 12 }),
      images: [
        'https://picsum.photos/seed/haci1/800/600.jpg',
        'https://picsum.photos/seed/haci2/800/600.jpg',
        'https://picsum.photos/seed/haci3/800/600.jpg'
      ],
      stock: 5,
      tags: 'hacı seti, ipek çanta, lüks, hediye',
      seoTitle: 'Büyükel Hacı Seti | İpek Çanta ile Lüks Paket',
      seoDesc: 'İpek çantalı tam donanımlı büyük hacı seti. Lüks hediye paketi.'
    },
    {
      categoryId: hatSanati.id,
      name: 'El Yazması Kur\'an-ı Kerim Takımı',
      slug: 'el-yazmasi-kuran-i-kerim-takimi',
      description: 'El yazması tekniğiyle yazılmış Kur\'an-ı Kerim ve özel kutulu takım. 15 cilt, her cilt özel kutu, yaldızlı kapak, hat sanatı. Sınırlı sayıda özel üretim.',
      shortDesc: 'El yazması Kur\'an-ı Kerim 15 cilt takım',
      sku: 'KU-001',
      price: 15000.00,
      comparePrice: 18000.00,
      costPrice: 8200.00,
      weight: 8.5,
      dimensions: JSON.stringify({ length: 40, width: 30, height: 25 }),
      images: [
        'https://picsum.photos/seed/kuran1/800/600.jpg',
        'https://picsum.photos/seed/kuran2/800/600.jpg'
      ],
      stock: 1,
      tags: 'kur\'an, el yazması, hat sanatı, lüks, özel',
      seoTitle: 'El Yazması Kur\'an-ı Kerim Takımı | 15 Cilt',
      seoDesc: 'El yazması tekniğiyle yazılmış Kur\'an-ı Kerim. 15 cilt, özel kutulu.'
    },
    {
      categoryId: hatSanati.id,
      name: 'Osmanlıca Hat Levha "Dua"',
      slug: 'osmanlica-hat-levha-dua',
      description: 'Osmanlıca yazılmış ünlü duanın yer aldığı hat levha. 35x50 cm ebadında, ahşap levha üzerine el işçiliği, antik görünüm, dekoratif ve manevi değer taşır.',
      shortDesc: 'Osmanlıca dua yazılı hat levha',
      sku: 'HL-001',
      price: 1850.00,
      comparePrice: 2200.00,
      costPrice: 980.00,
      weight: 2.2,
      dimensions: JSON.stringify({ length: 50, width: 35, height: 4 }),
      images: [
        'https://picsum.photos/seed/levha1/800/600.jpg',
        'https://picsum.photos/seed/levha2/800/600.jpg'
      ],
      stock: 4,
      tags: 'osmanlıca, hat levha, dua, ahşap, dekoratif',
      seoTitle: 'Osmanlıca Hat Levha | Dua Yazılı Ahşap Sanat Eseri',
      seoDesc: 'Osmanlıca dua yazılı hat levha. 35x50 cm, ahşap, el işçiliği.'
    },
    {
      categoryId: duvarTablolari.id,
      name: 'Modern Hat Sanatı Poster Seti',
      slug: 'modern-hat-sanati-poster-seti',
      description: 'Modern hat sanatı tekniğiyle hazırlanmış 4 parçalı poster seti. A4 ebadında, kaliteli mat kağıt, modern iç mekanlar için uygun, şık çerçevelere uyumlu. Koleksiyonluk set.',
      shortDesc: 'Modern hat sanatı 4 parçalı poster seti',
      sku: 'PS-001',
      price: 480.00,
      comparePrice: 600.00,
      costPrice: 220.00,
      weight: 0.8,
      dimensions: JSON.stringify({ length: 30, width: 21, height: 2 }),
      images: [
        'https://picsum.photos/seed/poster1/800/600.jpg',
        'https://picsum.photos/seed/poster2/800/600.jpg'
      ],
      stock: 10,
      tags: 'modern hat, poster, set, dekoratif, uygun fiyatlı',
      seoTitle: 'Modern Hat Sanatı Poster Seti | 4 Parça',
      seoDesc: 'Modern hat sanatı 4 parçalı poster seti. A4, kaliteli mat kağıt.'
    }
  ]

  console.log('📦 Ürünler oluşturuluyor...')

  // Ürünleri ve ilgili verileri oluştur
  for (const productData of products) {
    const { images, stock, ...productFields } = productData

    // Ürünü oluştur
    const product = await prisma.product.create({
      data: {
        ...productFields,
        isActive: true,
        isFeatured: Math.random() > 0.7, // %30 ihtimalle öne çıkan ürün
        tags: productFields.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Ürün görsellerini oluştur
    for (let i = 0; i < images.length; i++) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          url: images[i],
          alt: `${product.name} - Görsel ${i + 1}`,
          sortOrder: i,
          createdAt: new Date()
        }
      })
    }

    // Stok bilgisini oluştur
    const inventory = await prisma.inventory.create({
      data: {
        productId: product.id,
        quantity: stock,
        reserved: 0,
        minQuantity: Math.max(1, Math.floor(stock * 0.2)), // Stokun %20'si min seviye
        trackQuantity: true,
        allowBackorder: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Stok geçmişi oluştur
    await prisma.inventoryHistory.create({
      data: {
        inventoryId: inventory.id,
        quantity: stock,
        reason: 'INITIAL',
        notes: 'Başlangıç stoğu',
        createdAt: new Date()
      }
    })
  }

  console.log(`✅ ${products.length} ürün ve ilgili veriler başarıyla oluşturuldu`)
  console.log('📊 Kategori dağılımı:')
  console.log(`   - Duvar Tabloları: ${products.filter(p => p.categoryId === duvarTablolari.id).length} ürün`)
  console.log(`   - Hat Sanatı: ${products.filter(p => p.categoryId === hatSanati.id).length} ürün`)
  console.log(`   - Tesbihler: ${products.filter(p => p.categoryId === tesbihler.id).length} ürün`)
  console.log(`   - Namaz Ürünleri: ${products.filter(p => p.categoryId === namazUrunleri.id).length} ürün`)
  console.log('🎉 Sanat ve Dini Ürünler seedleme tamamlandı!')
}

main()
  .catch((e) => {
    console.error('❌ Seedleme hatası:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })