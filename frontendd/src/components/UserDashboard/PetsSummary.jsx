// src/components/UserDashboard/PetsSummary.jsx
import { Link } from "react-router-dom";

export default function PetsSummary({ pets }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 group hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Hewan Peliharaan Saya</h2>
        <Link to="/user/pets" className="text-orange-600 text-sm hover:underline font-medium flex items-center group-hover:translate-x-1">
          Lihat Semua →
        </Link>
      </div>

      {pets.length > 0 ? (
        <div className="space-y-4">
          {pets.slice(0, 3).map(pet => (
            <div key={pet.id} className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 border border-orange-200/50">
              <div className="flex-shrink-0 bg-orange-200 rounded-xl p-3 mr-4">
                <span className="text-orange-600 text-xl">
                  {pet.species === 'Cat' ? '🐱' : pet.species === 'Bird' ? '🐦' : pet.species === 'Rabbit' ? '🐰' : '🐶'}
                </span>
              </div>
              <div className="flex-grow">
                <h4 className="font-semibold text-gray-800">{pet.name}</h4>
                <p className="text-sm text-gray-600">{pet.breed} • {pet.age} tahun</p>
              </div>
            </div>
          ))}
          {pets.length > 3 && <p className="text-sm text-orange-600 text-center">+{pets.length - 3} hewan lainnya</p>}
        </div>
      ) : (
        <div className="text-center py-6 px-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200/50">
          <p className="text-gray-600 mb-3">Anda belum memiliki hewan peliharaan</p>
          <Link to="/user/pets" className="inline-flex items-center text-orange-600 font-medium text-sm hover:underline">
            Tambah Hewan Peliharaan
          </Link>
        </div>
      )}
    </div>
  );
}
