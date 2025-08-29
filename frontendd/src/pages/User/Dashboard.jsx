import { useEffect, useState } from "react";
import { getMyPets, getMyBookings, getMyPetPoints, getOutlets, getServices } from "../../services/api";
import Footer from "../../components/Common/Footer";
import WelcomeSection from "../../components/UserDashboard/WelcomeSection";
import QuickActions from "../../components/UserDashboard/QuickActions";
import PetsSummary from "../../components/UserDashboard/PetsSummary";
import BookingsSummary from "../../components/UserDashboard/BookingsSummary";
import ServicesOverview from "../../components/UserDashboard/ServicesOverview";
import WhyChoose from "../../components/UserDashboard/WhyChoose";
import Testimonials from "../../components/UserDashboard/Testimonials";
import OutletsSection from "../../components/UserDashboard/OutletsSection";

export default function Dashboard() {
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [petPoints, setPetPoints] = useState({ points: 0 });
  const [outlets, setOutlets] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOutlet, setSelectedOutlet] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [petsRes, bookingsRes, pointsRes, outletsRes, servicesRes] = await Promise.all([
          getMyPets(),
          getMyBookings(),
          getMyPetPoints(),
          getOutlets(),
          getServices(),
        ]);
        setPets(petsRes);
        setBookings(bookingsRes);
        setPetPoints(pointsRes);
        setOutlets(outletsRes);
        setServices(servicesRes);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
          <p className="text-gray-600 font-medium">Memuat data hewan peliharaan Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-orange-100 rounded-full -translate-x-16 -translate-y-16 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-100 rounded-full translate-x-24 translate-y-24 opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <WelcomeSection petPoints={petPoints} />
        
        <QuickActions />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <PetsSummary pets={pets} />
          <BookingsSummary bookings={bookings} />
        </div>
        
        <ServicesOverview services={services} />
        <WhyChoose />
        <Testimonials />
        <OutletsSection outlets={outlets} selectedOutlet={selectedOutlet} setSelectedOutlet={setSelectedOutlet} />
      </div>
      <Footer />
    </div>
  );
}