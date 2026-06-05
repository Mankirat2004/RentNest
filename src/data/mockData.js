// Mock data — mirrors Firestore collections
// Replace these with real Firestore calls (getDocs, addDoc, updateDoc, deleteDoc)

export const mockUsers = [
  { id: "u1", name: "Sarah Thompson", email: "sarah@example.com", role: "buyer", status: "active", joined: "2024-03-12", bookings: 8, avatar: "ST" },
  { id: "u2", name: "James Carter", email: "james@example.com", role: "seller", status: "active", joined: "2024-01-05", bookings: 23, avatar: "JC" },
  { id: "u3", name: "Mia Nguyen", email: "mia@example.com", role: "buyer", status: "inactive", joined: "2023-11-20", bookings: 2, avatar: "MN" },
  { id: "u4", name: "Oliver Brown", email: "oliver@example.com", role: "seller", status: "active", joined: "2024-02-14", bookings: 15, avatar: "OB" },
  { id: "u5", name: "Priya Patel", email: "priya@example.com", role: "buyer", status: "active", joined: "2024-04-01", bookings: 5, avatar: "PP" },
  { id: "u6", name: "Liam Wilson", email: "liam@example.com", role: "buyer", status: "inactive", joined: "2023-09-08", bookings: 0, avatar: "LW" },
  { id: "u7", name: "Emma Davis", email: "emma@example.com", role: "seller", status: "active", joined: "2024-05-22", bookings: 9, avatar: "ED" },
  { id: "u8", name: "Noah Kim", email: "noah@example.com", role: "buyer", status: "active", joined: "2024-06-01", bookings: 3, avatar: "NK" },
];

export const mockListings = [
  { id: "l1", title: "Canon EOS R5 Camera", category: "Electronics", seller: "James Carter", price: 45, status: "pending", submitted: "2024-06-01", description: "Professional mirrorless camera, excellent condition. Comes with 24-105mm lens.", condition: "Excellent" },
  { id: "l2", title: "DJI Mavic 3 Drone", category: "Electronics", seller: "Oliver Brown", price: 80, status: "pending", submitted: "2024-06-02", description: "Latest DJI drone with 4K camera. Perfect for aerial photography.", condition: "Like New" },
  { id: "l3", title: "Yamaha Acoustic Guitar", category: "Music", seller: "Emma Davis", price: 20, status: "approved", submitted: "2024-05-28", description: "Full size acoustic guitar with case.", condition: "Good" },
  { id: "l4", title: "Bosch Power Drill Set", category: "Tools", seller: "James Carter", price: 18, status: "approved", submitted: "2024-05-25", description: "Cordless drill with full accessory kit and carry case.", condition: "Very Good" },
  { id: "l5", title: "Surfboard 7ft Longboard", category: "Sports", seller: "Oliver Brown", price: 35, status: "rejected", submitted: "2024-05-20", description: "Damaged fin. Listing did not meet quality standards.", condition: "Fair" },
  { id: "l6", title: "Sony PlayStation 5", category: "Gaming", seller: "Noah Kim", price: 30, status: "pending", submitted: "2024-06-03", description: "PS5 disc edition with 2 controllers and 5 games.", condition: "Excellent" },
  { id: "l7", title: "Trek Mountain Bike", category: "Sports", seller: "Emma Davis", price: 25, status: "pending", submitted: "2024-06-04", description: "Trek Marlin 5, 27.5 inch wheels, recently serviced.", condition: "Good" },
];

export const mockCategories = [
  { id: "c1", name: "Electronics", icon: "📷", listingCount: 14, description: "Cameras, drones, gadgets and tech equipment" },
  { id: "c2", name: "Tools", icon: "🔧", listingCount: 9, description: "Power tools, hand tools and construction equipment" },
  { id: "c3", name: "Sports", icon: "🏄", listingCount: 11, description: "Sporting gear, bikes, boards and outdoor equipment" },
  { id: "c4", name: "Music", icon: "🎸", listingCount: 6, description: "Instruments, audio equipment and accessories" },
  { id: "c5", name: "Gaming", icon: "🎮", listingCount: 8, description: "Consoles, games and gaming accessories" },
  { id: "c6", name: "Furniture", icon: "🛋️", listingCount: 5, description: "Home and office furniture for short-term rental" },
  { id: "c7", name: "Kitchen", icon: "🍳", listingCount: 7, description: "Appliances and kitchen equipment" },
  { id: "c8", name: "Fitness", icon: "🏋️", listingCount: 12, description: "Gym equipment, treadmills, bikes and more" },
];

export const mockBookings = [
  { id: "b1", item: "Canon EOS R5", buyer: "Sarah Thompson", amount: 180, commission: 18, date: "2024-05-10" },
  { id: "b2", item: "Bosch Drill Set", buyer: "Priya Patel", amount: 72, commission: 7.2, date: "2024-05-14" },
  { id: "b3", item: "Yamaha Guitar", buyer: "Mia Nguyen", amount: 60, commission: 6, date: "2024-05-18" },
  { id: "b4", item: "Fitness Treadmill", buyer: "Noah Kim", amount: 88, commission: 8.8, date: "2024-05-22" },
  { id: "b5", item: "Trek Bike", buyer: "Sarah Thompson", amount: 100, commission: 10, date: "2024-05-28" },
  { id: "b6", item: "PS5 Console", buyer: "Liam Wilson", amount: 90, commission: 9, date: "2024-06-01" },
];

export const mockRevenueData = [
  { month: "Jan", revenue: 420, bookings: 12 },
  { month: "Feb", revenue: 680, bookings: 18 },
  { month: "Mar", revenue: 540, bookings: 15 },
  { month: "Apr", revenue: 920, bookings: 25 },
  { month: "May", revenue: 1240, bookings: 34 },
  { month: "Jun", revenue: 860, bookings: 22 },
];
