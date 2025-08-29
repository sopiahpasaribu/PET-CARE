import { useState, useEffect } from "react";
import Header from "../../components/Common/Header";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { getMyPets, addPet, updatePet, deletePet } from "../../services/api";
import Footer from "../../components/Common/Footer";


export default function Pets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    species: "Dog",
    breed: "",
    age: "",
  });

  const fetchPets = async () => {
    try {
      const petsData = await getMyPets();
      setPets(petsData);
    } catch (err) {
      console.error("Error fetching pets:", err);
      alert("Terjadi kesalahan saat mengambil data hewan peliharaan");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAdd = () => {
    setEditingPet(null);
    setFormData({
      name: "",
      species: "Dog",
      breed: "",
      age: "",
    });
    setShowForm(true);
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      species: pet.species,
      breed: pet.breed,
      age: pet.age,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus hewan peliharaan ini?")) {
      try {
        await deletePet(id);
        fetchPets();
        alert("Hewan peliharaan berhasil dihapus");
      } catch (error) {
        console.error("Error deleting pet:", error);
        alert("Terjadi kesalahan saat menghapus hewan peliharaan");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPet) {
        await updatePet(editingPet.id, formData);
        alert("Data hewan peliharaan berhasil diperbarui");
      } else {
        await addPet(formData);
        alert("Hewan peliharaan berhasil ditambahkan");
      }
      setShowForm(false);
      fetchPets();
    } catch (error) {
      console.error("Error saving pet:", error);
      alert("Terjadi kesalahan saat menyimpan data hewan peliharaan");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getSpeciesLabel = (species) => {
    switch (species) {
      case "Dog": return "Anjing";
      case "Cat": return "Kucing";
      case "Bird": return "Burung";
      case "Rabbit": return "Kelinci";
      default: return species;
    }
  };

  const getSpeciesColor = (species) => {
    switch (species) {
      case "Dog": return { 
        bg: "bg-blue-50", 
        hover: "bg-blue-100", 
        bar: "bg-blue-500", 
        icon: "🐶",
        card: "border-blue-200",
        text: "text-blue-800"
      };
      case "Cat": return { 
        bg: "bg-pink-50", 
        hover: "bg-pink-100", 
        bar: "bg-pink-500", 
        icon: "🐱",
        card: "border-pink-200",
        text: "text-pink-800"
      };
      case "Bird": return { 
        bg: "bg-yellow-50", 
        hover: "bg-yellow-100", 
        bar: "bg-yellow-500", 
        icon: "🐦",
        card: "border-yellow-200",
        text: "text-yellow-800"
      };
      case "Rabbit": return { 
        bg: "bg-purple-50", 
        hover: "bg-purple-100", 
        bar: "bg-purple-500", 
        icon: "🐰",
        card: "border-purple-200",
        text: "text-purple-800"
      };
      default: return { 
        bg: "bg-gray-50", 
        hover: "bg-gray-100", 
        bar: "bg-gray-500", 
        icon: "🐾",
        card: "border-gray-200",
        text: "text-gray-800"
      };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hewan Peliharaan Saya</h1>
            <p className="text-gray-600">Kelola data hewan peliharaan Anda</p>
          </div>

          <button
            onClick={handleAdd}
            className="mt-4 md:mt-0 px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 flex items-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="mr-2">+</span> Tambah Hewan
          </button>
        </div>

        {/* Pet Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-gray-100">
              <h2 className="text-xl font-bold mb-6 text-gray-800 border-b border-gray-100 pb-3">
                {editingPet ? "Edit Hewan Peliharaan" : "Tambah Hewan Peliharaan"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Hewan
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      required
                      placeholder="Nama hewan peliharaan"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jenis Hewan
                    </label>
                    <select
                      name="species"
                      value={formData.species}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                    >
                      <option value="Dog">Anjing</option>
                      <option value="Cat">Kucing</option>
                      <option value="Rabbit">Kelinci</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ras
                    </label>
                    <input
                      type="text"
                      name="breed"
                      value={formData.breed}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="Ras hewan (jika diketahui)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Usia (tahun)
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      min="0"
                      step="0.1"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-colors"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-colors duration-200 shadow-md"
                  >
                    {editingPet ? "Simpan Perubahan" : "Tambah Hewan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Pets List */}
        {pets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pets.map((pet) => {
              const colorInfo = getSpeciesColor(pet.species);
              return (
                <div
                  key={pet.id}
                  className={`${colorInfo.bg} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${colorInfo.card} relative overflow-hidden group`}
                >
                  <div className={`absolute inset-0 ${colorInfo.hover} opacity-0 transition-opacity duration-300 group-hover:opacity-30`}></div>

                  <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className="flex items-center">
                      <div className="rounded-full p-3 mr-4 bg-white bg-opacity-80 shadow-sm">
                        <span className="text-2xl">
                          {colorInfo.icon}
                        </span>
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${colorInfo.text}`}>{pet.name}</h3>
                        <p className="text-gray-600">{getSpeciesLabel(pet.species)}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(pet)}
                        className="text-blue-600 hover:text-blue-800 p-2 transition-colors bg-white bg-opacity-80 rounded-full shadow-sm hover:shadow-md"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(pet.id)}
                        className="text-red-600 hover:text-red-800 p-2 transition-colors bg-white bg-opacity-80 rounded-full shadow-sm hover:shadow-md"
                        title="Hapus"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 relative z-10">
                    <div className="flex items-center text-sm text-gray-600 bg-white bg-opacity-80 rounded-xl px-3 py-2 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {pet.age} tahun
                    </div>
                    {pet.breed && (
                      <div className="flex items-center text-sm text-gray-600 bg-white bg-opacity-80 rounded-xl px-3 py-2 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        {pet.breed}
                      </div>
                    )}
                  </div>

                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1.5 ${colorInfo.bar} transform origin-left transition-transform duration-500 group-hover:scale-x-100 scale-x-0`}
                  ></div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🐾</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Belum ada hewan peliharaan
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Tambahkan hewan peliharaan Anda untuk mulai menggunakan layanan
            </p>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              Tambah Hewan Peliharaan Pertama
            </button>
          </div>
        )}
      </div>
                    <Footer />
      
    </div>
    
  );
}