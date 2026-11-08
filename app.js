// KASAP SELLER - HANYA untuk seller login. JANGAN dipakai di APK Buyer.
// Key publishable sama, tapi akses tulis dikunci RLS: hanya jika role = 'seller'
var SUPA_URL = 'https://zgliygdpbaorutzttxlr.supabase.co';
var SUPA_KEY = 'sb_publishable_o7z4YitotXfBKTSR67YScg_pcBRFS84';
let PRODUCTS = [];
async function loadProducts(){
  const res = await fetch(SUPA_URL + '/rest/v1/products?select=*&order=id.asc', {headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY}});
  PRODUCTS = await res.json();
  document.getElementById('totalProduk').textContent = PRODUCTS.length + ' produk';
  document.getElementById('productGrid').innerHTML = PRODUCTS.map(p=>`<article class="product"><h3>${p.nama}</h3><div class="price">Rp ${p.harga.toLocaleString('id-ID')}</div><div>Stok ${p.stok}</div><button class="btn-del" onclick="hapus(${p.id})">Hapus</button></article>`).join('');
}
async function hapus(id){ if(!confirm('Hapus produk ini?')) return; await fetch(SUPA_URL + '/rest/v1/products?id=eq.'+id, {method:'DELETE', headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY}}); loadProducts(); }
document.getElementById('tambahBtn').addEventListener('click', async ()=>{
  const nama=document.getElementById('nama').value, harga=+document.getElementById('harga').value, stok=+document.getElementById('stok').value;
  if(!nama||!harga) return alert('Isi nama & harga dulu');
  await fetch(SUPA_URL + '/rest/v1/products', {method:'POST', headers:{'apikey':SUPA_KEY,'Authorization':'Bearer '+SUPA_KEY,'Content-Type':'application/json','Prefer':'return=minimal'}, body: JSON.stringify({nama,harga,stok})});
  alert('Produk ditambahkan (kalau RLS seller sudah aktif)'); loadProducts();
});
loadProducts();
