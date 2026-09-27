/**
 * IndexNow Batch Submission Script for dpsmarkajalan.com
 * Protocol Docs: https://www.indexnow.org/documentation
 */

const HOST = "dpsmarkajalan.com";
const KEY = "929697187b08462e9b590a1dc1fa5fb2";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_API_ENDPOINT = "https://api.indexnow.org/indexnow";

async function fetchSitemapUrls() {
  console.log(`🔍 Mengambil daftar URL dari sitemap: ${SITEMAP_URL}...`);
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) {
      throw new Error(`Gagal mengambil sitemap (${res.status} ${res.statusText})`);
    }
    const xml = await res.text();
    const matches = [...xml.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
    const urls = matches.map((m) => m[1].trim());
    return [...new Set(urls)];
  } catch (err) {
    console.warn(`⚠️ Peringatan: Tidak dapat mengambil sitemap online (${err.message}).`);
    console.log("Menggunakan daftar URL statis utama sebagai cadangan...");
    return [
      `https://${HOST}`,
      `https://${HOST}/tentang`,
      `https://${HOST}/layanan`,
      `https://${HOST}/produk`,
      `https://${HOST}/artikel`,
    ];
  }
}

async function submitToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.error("❌ Tidak ada URL yang ditemukan untuk dikirim.");
    process.exit(1);
  }

  console.log(`📦 Ditemukan ${urls.length} URL siap dikirim:`);
  urls.forEach((u, i) => console.log(`   ${i + 1}. ${u}`));

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`\n🚀 Mengirim ${urls.length} URL ke IndexNow (${INDEXNOW_API_ENDPOINT})...`);

  try {
    const response = await fetch(INDEXNOW_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    let responseBody = "";
    try {
      responseBody = await response.text();
    } catch (_) {}

    console.log(`\nHTTP Response Status: ${status}`);

    if (status === 200) {
      console.log("✅ Berhasil! Semua URL berhasil dikirim dan diverifikasi.");
    } else if (status === 202) {
      console.log("✅ Diterima (HTTP 202 Accepted)! Permintaan sedang diproses oleh IndexNow (Bing & mitra).");
    } else if (status === 400) {
      console.error("❌ HTTP 400: Format request tidak valid.");
      if (responseBody) console.error(responseBody);
    } else if (status === 403) {
      console.error("❌ HTTP 403: Kunci (Key) belum valid atau file verifikasi belum ditemukan di hosting.");
      console.error(`   Pastikan ${KEY_LOCATION} sudah bisa dibuka di browser publik.`);
      if (responseBody) console.error(responseBody);
    } else if (status === 422) {
      console.error("❌ HTTP 422: Beberapa URL tidak cocok dengan domain host (" + HOST + ").");
      if (responseBody) console.error(responseBody);
    } else if (status === 429) {
      console.error("❌ HTTP 429: Terlalu banyak permintaan (rate limit). Coba beberapa saat lagi.");
    } else {
      console.log(`ℹ️ Response: Status ${status}`);
      if (responseBody) console.log(responseBody);
    }
  } catch (err) {
    console.error("❌ Gagal mengirim ke IndexNow:", err);
  }
}

async function main() {
  console.log("=========================================");
  console.log("       INDEXNOW BATCH SUBMITTER          ");
  console.log("=========================================\n");

  // Jika ada argumen URL dari command line (misal: node scripts/submit-indexnow.mjs https://dpsmarkajalan.com/produk/xyz)
  const cliUrls = process.argv.slice(2).filter((arg) => arg.startsWith("http"));

  let urls = [];
  if (cliUrls.length > 0) {
    console.log(`💡 Menggunakan URL dari input terminal:`);
    urls = cliUrls;
  } else {
    urls = await fetchSitemapUrls();
  }

  await submitToIndexNow(urls);
}

main();
