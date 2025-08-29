import { useState, useEffect } from "react";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../services/api";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    basePrice: "",
    estimatedDuration: "",
    type: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // === Fetch semua layanan ===
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getAllServices();
        setServices(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError("Gagal memuat data layanan");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (editingId) {
        await updateService(editingId, formData);
        setServices((prev) =>
          prev.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
        );
        setSuccess("Layanan berhasil diperbarui");
      } else {
        const newService = await createService(formData);
        setServices((prev) => [...prev, newService]);
        setSuccess("Layanan berhasil ditambahkan");
      }
      setFormData({
        name: "",
        description: "",
        basePrice: "",
        estimatedDuration: "",
        type: "",
      });
      setEditingId(null);
      setShowForm(false);
    } catch (err) {
      console.error("Error saving service:", err);
      setError("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleAddNew = () => {
    setFormData({
      name: "",
      description: "",
      basePrice: "",
      estimatedDuration: "",
      type: "",
    });
    setEditingId(null);
    setShowForm(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      document.getElementById("service-form").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleEdit = (service) => {
    setFormData({
      name: service.name,
      description: service.description,
      basePrice: service.basePrice,
      estimatedDuration: service.estimatedDuration,
      type: service.type,
    });
    setEditingId(service.id);
    setShowForm(true);
    setError(null);
    setSuccess(null);

    setTimeout(() => {
      document.getElementById("service-form").scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus layanan ini?")) return;

    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s.id !== id));
      setSuccess("Layanan berhasil dihapus");
      setError(null);
    } catch (err) {
      console.error("Error deleting service:", err);
      setError("Gagal menghapus layanan");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      description: "",
      basePrice: "",
      estimatedDuration: "",
      type: "",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          Manajemen Layanan
        </h1>
        {!showForm && (
          <button
            onClick={handleAddNew}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            + Tambah Layanan
          </button>
        )}
      </div>

      {/* Notifikasi */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md border border-green-200">
          {success}
        </div>
      )}

      {/* Form Tambah / Edit */}
      {showForm && (
        <div id="service-form" className="bg-gradient-to-r from-orange-50 to-pink-50 shadow-md rounded-lg p-6 mb-8 border border-orange-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editingId ? "Edit Layanan" : "Tambah Layanan Baru"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Layanan
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Layanan
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                  required
                >
                  <option value="">-- Pilih Tipe --</option>
                  <option value="GROOMING">GROOMING</option>
                  <option value="VAKSINASI">VAKSINASI</option>
                  <option value="STERILISASI">STERILISASI</option>
                  <option value="PENITIPAN">PENITIPAN</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deskripsi Layanan
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harga Dasar
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    Rp
                  </span>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Durasi Estimasi (menit)
                </label>
                <input
                  type="number"
                  name="estimatedDuration"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-orange-400 focus:border-orange-400"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
              >
                {editingId ? "Update Layanan" : "Tambah Layanan"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Daftar Layanan */}
      <div className="bg-white shadow-md rounded-lg ">
        <div className="px-6 py-4 border-b bg-white bg-gradient-to-r to-pink-50">
          <h2 className="text-lg font-semibold text-gray-700">Daftar Layanan</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total {services.length} layanan tersedia
          </p>
        </div>

        {services.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Tidak ada layanan yang tersedia
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Nama & Tipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Deskripsi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Durasi
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {services.map((service) => (
                  <tr key={service.id} className="hover:bg-orange-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {service.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{service.description}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(service.basePrice)}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{service.estimatedDuration} menit</td>
                    <td className="px-6 py-4 text-right text-sm font-medium space-x-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
