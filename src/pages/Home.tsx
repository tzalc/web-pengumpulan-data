import { useState } from "react";

function Home() {
  const [nama, setNama] = useState("");
  const [produk, setProduk] = useState("");
  const [jumlah, setJumlah] = useState<number | "">("");
  const [harga, setHarga] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const total = Number(jumlah) * Number(harga);

    alert(`Data tersimpan!\nTotal: Rp ${total}`);

    setNama("");
    setProduk("");
    setJumlah(0);
    setHarga(0);
  };

  return (
    <>
      

      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
            Sistem Pengumpulan Data Penjualan
        </h1>
        <p className="opacity-90">
            Kelola dan catat data penjualan
        </p>
      </section>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 p-10">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Form Data Penjualan
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="text"
              placeholder="Nama Pembeli"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="text"
              placeholder="Nama Produk"
              value={produk}
              onChange={(e) => setProduk(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Jumlah"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />

            <input
              type="number"
              placeholder="Harga"
              value={harga}
              onChange={(e) => setHarga(Number(e.target.value))}
              className="w-full border p-2 rounded"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Simpan
            </button>

          </form>
          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
    <p className="text-sm text-gray-600">Total Sementara</p>
    <p className="text-2xl font-bold text-blue-700">
      Rp {Number(jumlah) * Number(harga) || 0}
    </p>
  </div>
        </div>
      </div>
    </>
  );
}

export default Home;