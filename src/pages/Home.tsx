import { useState } from "react"

type Penjualan = {
  nama: string
  produk: string
  jumlah: number
  harga: number
  total: number
}

function Home() {
  const [nama, setNama] = useState("")
  const [produk, setProduk] = useState("")
  const [jumlah, setJumlah] = useState<number | "">("")
  const [harga, setHarga] = useState<number | "">("")
  const [dataPenjualan, setDataPenjualan] = useState<Penjualan[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const total = Number(jumlah) * Number(harga)

    const dataBaru: Penjualan = {
      nama,
      produk,
      jumlah: Number(jumlah),
      harga: Number(harga),
      total,
    }

    setDataPenjualan([...dataPenjualan, dataBaru])

    setNama("")
    setProduk("")
    setJumlah("")
    setHarga("")
  }

  const handleDelete = (index: number) => {
    const dataBaru = dataPenjualan.filter((_, i) => i !== index)
    setDataPenjualan(dataBaru)
  }

  const exportCSV = () => {
    if (dataPenjualan.length === 0) {
      alert("Belum ada data untuk diexport!")
      return
    }

    const header = ["Nama Pembeli", "Nama Produk", "Jumlah", "Harga", "Total"]

    const rows = dataPenjualan.map((item) => [
      item.nama,
      item.produk,
      item.jumlah.toString(),
      item.harga.toString(),
      item.total.toString(),
    ])

    const csvContent =
      "data:text/csv;charset=utf-8,\uFEFF" +
      [header, ...rows].map((e) => e.join(",")).join("\n")

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")

    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "data_penjualan.csv")
    document.body.appendChild(link)

    link.click()
  }

  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Sistem Pengumpulan Data Penjualan
        </h1>
        <p className="opacity-90">Kelola dan catat data penjualan</p>
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

            <button
              type="button"
              onClick={exportCSV}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Export CSV
            </button>
          </form>

          <div className="mt-6 bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Total Sementara</p>
            <p className="text-2xl font-bold text-blue-700">
              Rp {Number(jumlah) * Number(harga) || 0}
            </p>
          </div>
        </div>

        {dataPenjualan.length > 0 && (
          <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4 text-center">
              Data Penjualan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="p-2">Nama</th>
                    <th className="p-2">Produk</th>
                    <th className="p-2">Jumlah</th>
                    <th className="p-2">Harga</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {dataPenjualan.map((item, index) => (
                    <tr key={index} className="text-center border-t">
                      <td className="p-2">{item.nama}</td>
                      <td className="p-2">{item.produk}</td>
                      <td className="p-2">{item.jumlah}</td>
                      <td className="p-2">Rp {item.harga}</td>
                      <td className="p-2 font-semibold text-blue-700">
                        Rp {item.total}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() => handleDelete(index)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-right">
              <p className="text-lg font-bold text-green-700">
                Total Semua: Rp{" "}
                {dataPenjualan.reduce((acc, item) => acc + item.total, 0)}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Home