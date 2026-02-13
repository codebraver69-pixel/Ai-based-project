// ============================================================
// KitaBook Mock Data - Types, Data, and Utility Functions
// ============================================================

export type BookCondition = "Like New" | "Good" | "Fair"

export type Genre =
  | "Fiction"
  | "Non-Fiction"
  | "Science"
  | "History"
  | "Romance"
  | "Technology"
  | "Philosophy"
  | "Self-Help"
  | "Biography"
  | "Fantasy"

export interface Book {
  id: string
  title: string
  author: string
  price: number
  originalPrice: number
  condition: BookCondition
  genre: Genre
  description: string
  sellerId: string
  location: {
    city: string
    lat: number
    lng: number
  }
  listedDate: string
  isbn: string
  pages: number
  language: string
  publishedYear: number
  coverGradient: [string, string] // two colors for a placeholder gradient
}

export interface User {
  id: string
  name: string
  avatar: string
  location: string
  rating: number
  totalTrades: number
  joinedDate: string
  bio: string
  responseRate: number
  booksListed: number
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participants: [string, string]
  bookId: string
  messages: Message[]
  lastMessage: string
  lastTimestamp: string
  unreadCount: number
}

export interface Review {
  id: string
  fromUserId: string
  toUserId: string
  rating: number
  comment: string
  date: string
}

// ============================================================
// Cities with coordinates
// ============================================================

export const cities = [
  { name: "Beirut", lat: 33.8938, lng: 35.5018 },
  { name: "Tripoli", lat: 34.4367, lng: 35.8497 },
  { name: "Sidon", lat: 33.5633, lng: 35.3686 },
  { name: "Jounieh", lat: 33.9808, lng: 35.6178 },
  { name: "Byblos", lat: 34.1236, lng: 35.6511 },
  { name: "Batroun", lat: 34.2553, lng: 35.6581 },
  { name: "Zahle", lat: 33.8463, lng: 35.9020 },
  { name: "Tyre", lat: 33.2705, lng: 35.2038 },
]

// ============================================================
// Users
// ============================================================

export const users: User[] = [
  {
    id: "u1",
    name: "Rina Wijaya",
    avatar: "RW",
    location: "Beirut",
    rating: 4.8,
    totalTrades: 47,
    joinedDate: "2023-03-15",
    bio: "Avid reader and book collector. Love sharing stories with fellow readers. Mostly into literary fiction and philosophy.",
    responseRate: 98,
    booksListed: 23,
  },
  {
    id: "u2",
    name: "Budi Santoso",
    avatar: "BS",
    location: "Tripoli",
    rating: 4.6,
    totalTrades: 32,
    joinedDate: "2023-06-20",
    bio: "Computer science student who trades textbooks and tech reads. Always looking for good programming books!",
    responseRate: 95,
    booksListed: 18,
  },
  {
    id: "u3",
    name: "Siti Nurhaliza",
    avatar: "SN",
    location: "Jounieh",
    rating: 4.9,
    totalTrades: 61,
    joinedDate: "2022-11-01",
    bio: "Literature teacher with a passion for sharing knowledge. I believe books should be accessible to everyone.",
    responseRate: 100,
    booksListed: 35,
  },
  {
    id: "u4",
    name: "Ahmad Fauzi",
    avatar: "AF",
    location: "Sidon",
    rating: 4.5,
    totalTrades: 19,
    joinedDate: "2024-01-10",
    bio: "History buff and coffee enthusiast. Trading books to make room for more books!",
    responseRate: 90,
    booksListed: 12,
  },
  {
    id: "u5",
    name: "Dewi Lestari",
    avatar: "DL",
    location: "Batroun",
    rating: 4.7,
    totalTrades: 28,
    joinedDate: "2023-08-05",
    bio: "Writer, dreamer, and collector of beautiful stories. Love exchanging books by the beach.",
    responseRate: 92,
    booksListed: 15,
  },
  {
    id: "u6",
    name: "Reza Pratama",
    avatar: "RP",
    location: "Byblos",
    rating: 4.3,
    totalTrades: 15,
    joinedDate: "2024-04-12",
    bio: "Engineering student looking to trade textbooks. Also into sci-fi and fantasy novels.",
    responseRate: 88,
    booksListed: 9,
  },
  {
    id: "u7",
    name: "Maya Putri",
    avatar: "MP",
    location: "Zahle",
    rating: 4.8,
    totalTrades: 42,
    joinedDate: "2023-01-22",
    bio: "Bookworm since forever. Running out of shelf space, so here I am!",
    responseRate: 97,
    booksListed: 20,
  },
  {
    id: "u8",
    name: "Dani Kurniawan",
    avatar: "DK",
    location: "Beirut",
    rating: 4.4,
    totalTrades: 21,
    joinedDate: "2024-02-18",
    bio: "Business consultant who loves self-help and biography books. Happy trading!",
    responseRate: 85,
    booksListed: 11,
  },
]

// ============================================================
// Books
// ============================================================

export const books: Book[] = [
  {
    id: "b1",
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    price: 4.50,
    originalPrice: 8.99,
    condition: "Good",
    genre: "Fiction",
    description:
      "A heartwarming story about the power of education and friendship in a small village on Belitung Island. This beloved Indonesian classic follows the journey of young students and their inspiring teachers. Minor wear on the cover, but pages are clean and intact.",
    sellerId: "u1",
    location: { city: "Beirut", lat: 33.8938, lng: 35.5018 },
    listedDate: "2025-12-15",
    isbn: "978-979-015-171-2",
    pages: 534,
    language: "Indonesian",
    publishedYear: 2005,
    coverGradient: ["#4A90D9", "#2C5F8A"],
  },
  {
    id: "b2",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 7.50,
    originalPrice: 14.99,
    condition: "Like New",
    genre: "History",
    description:
      "Explore the history of our species from the Stone Age to the Silicon Age. This international bestseller challenges everything we know about being human. Barely read, spine is perfect.",
    sellerId: "u2",
    location: { city: "Tripoli", lat: 34.4367, lng: 35.8497 },
    listedDate: "2026-01-03",
    isbn: "978-006-231-609-7",
    pages: 443,
    language: "English",
    publishedYear: 2015,
    coverGradient: ["#D4956B", "#8B5E3C"],
  },
  {
    id: "b3",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 8.50,
    originalPrice: 17.99,
    condition: "Good",
    genre: "Technology",
    description:
      "The classic guide to writing clean, maintainable code. Essential reading for any software developer. Some highlighting in early chapters, otherwise in great condition.",
    sellerId: "u2",
    location: { city: "Tripoli", lat: 34.4367, lng: 35.8497 },
    listedDate: "2026-01-10",
    isbn: "978-013-235-088-4",
    pages: 464,
    language: "English",
    publishedYear: 2008,
    coverGradient: ["#3B7DD8", "#1A4E8A"],
  },
  {
    id: "b4",
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    price: 5.50,
    originalPrice: 9.99,
    condition: "Fair",
    genre: "Fiction",
    description:
      "The first book in the Buru Quartet, a masterpiece of Indonesian literature set in the colonial era. This copy has some age-related yellowing but remains fully readable and cherished.",
    sellerId: "u3",
    location: { city: "Jounieh", lat: 33.9808, lng: 35.6178 },
    listedDate: "2025-11-20",
    isbn: "978-979-403-032-4",
    pages: 535,
    language: "Indonesian",
    publishedYear: 1980,
    coverGradient: ["#C4784A", "#7A4A2E"],
  },
  {
    id: "b5",
    title: "Atomic Habits",
    author: "James Clear",
    price: 6.50,
    originalPrice: 12.99,
    condition: "Like New",
    genre: "Self-Help",
    description:
      "The breakthrough guide to building good habits and breaking bad ones. Practical strategies backed by science. Read once, perfect condition.",
    sellerId: "u4",
    location: { city: "Sidon", lat: 33.5633, lng: 35.3686 },
    listedDate: "2026-01-20",
    isbn: "978-073-521-129-2",
    pages: 320,
    language: "English",
    publishedYear: 2018,
    coverGradient: ["#E8C547", "#B89530"],
  },
  {
    id: "b6",
    title: "Filosofi Teras",
    author: "Henry Manampiring",
    price: 3.99,
    originalPrice: 7.99,
    condition: "Good",
    genre: "Philosophy",
    description:
      "Stoic philosophy explained in a relatable, Indonesian context. A modern guide to living a more peaceful and meaningful life. Some dog-eared pages.",
    sellerId: "u5",
    location: { city: "Batroun", lat: 34.2553, lng: 35.6581 },
    listedDate: "2026-01-05",
    isbn: "978-602-291-532-1",
    pages: 346,
    language: "Indonesian",
    publishedYear: 2018,
    coverGradient: ["#6B8E6B", "#3D5C3D"],
  },
  {
    id: "b7",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 3.50,
    originalPrice: 7.50,
    condition: "Good",
    genre: "Fiction",
    description:
      "Follow Santiago's journey from Spain to Egypt in search of treasure and self-discovery. A timeless fable about following your dreams.",
    sellerId: "u1",
    location: { city: "Beirut", lat: 33.8938, lng: 35.5018 },
    listedDate: "2025-12-28",
    isbn: "978-006-112-008-4",
    pages: 197,
    language: "English",
    publishedYear: 1988,
    coverGradient: ["#D4A76A", "#A67C4A"],
  },
  {
    id: "b8",
    title: "Design Patterns",
    author: "Gang of Four",
    price: 9.50,
    originalPrice: 19.99,
    condition: "Fair",
    genre: "Technology",
    description:
      "The definitive guide to software design patterns. A must-have reference for software engineers. Some wear on the cover, annotations in margins.",
    sellerId: "u6",
    location: { city: "Byblos", lat: 34.1236, lng: 35.6511 },
    listedDate: "2026-02-01",
    isbn: "978-020-163-361-0",
    pages: 395,
    language: "English",
    publishedYear: 1994,
    coverGradient: ["#5B5BAE", "#363672"],
  },
  {
    id: "b9",
    title: "Norwegian Wood",
    author: "Haruki Murakami",
    price: 4.99,
    originalPrice: 10.99,
    condition: "Like New",
    genre: "Romance",
    description:
      "A poignant story of loss, sexuality, and the transition to adulthood in 1960s Japan. Murakami at his most intimate and accessible.",
    sellerId: "u7",
    location: { city: "Zahle", lat: 33.8463, lng: 35.9020 },
    listedDate: "2026-01-15",
    isbn: "978-037-570-402-7",
    pages: 296,
    language: "English",
    publishedYear: 1987,
    coverGradient: ["#C45B5B", "#8A3030"],
  },
  {
    id: "b10",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    price: 6.99,
    originalPrice: 14.50,
    condition: "Good",
    genre: "Science",
    description:
      "Nobel laureate Daniel Kahneman explores the two systems that drive the way we think. Fascinating insights into decision-making and cognitive biases.",
    sellerId: "u8",
    location: { city: "Beirut", lat: 33.8938, lng: 35.5018 },
    listedDate: "2026-01-25",
    isbn: "978-037-453-355-7",
    pages: 499,
    language: "English",
    publishedYear: 2011,
    coverGradient: ["#E88C4A", "#B36325"],
  },
  {
    id: "b11",
    title: "Dune",
    author: "Frank Herbert",
    price: 5.99,
    originalPrice: 11.99,
    condition: "Good",
    genre: "Fantasy",
    description:
      "The epic science fiction masterpiece about politics, religion, and ecology on the desert planet Arrakis. A must-read for any sci-fi fan.",
    sellerId: "u3",
    location: { city: "Jounieh", lat: 33.9808, lng: 35.6178 },
    listedDate: "2025-12-10",
    isbn: "978-044-117-271-9",
    pages: 688,
    language: "English",
    publishedYear: 1965,
    coverGradient: ["#D4A03D", "#8A6A20"],
  },
  {
    id: "b12",
    title: "Cantik Itu Luka",
    author: "Eka Kurniawan",
    price: 4.75,
    originalPrice: 8.99,
    condition: "Like New",
    genre: "Fiction",
    description:
      "A sweeping novel that blends Indonesian history with magical realism. Eka Kurniawan's masterwork that put Indonesian literature on the global stage.",
    sellerId: "u5",
    location: { city: "Batroun", lat: 34.2553, lng: 35.6581 },
    listedDate: "2026-02-05",
    isbn: "978-979-433-892-7",
    pages: 480,
    language: "Indonesian",
    publishedYear: 2002,
    coverGradient: ["#8B6BB5", "#5A3D7A"],
  },
  {
    id: "b13",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    price: 5.50,
    originalPrice: 12.50,
    condition: "Good",
    genre: "Biography",
    description:
      "The authorized biography of Apple's co-founder, based on exclusive interviews. An intimate portrait of a creative genius who revolutionized technology.",
    sellerId: "u4",
    location: { city: "Sidon", lat: 33.5633, lng: 35.3686 },
    listedDate: "2025-12-20",
    isbn: "978-145-391-352-5",
    pages: 656,
    language: "English",
    publishedYear: 2011,
    coverGradient: ["#4A4A4A", "#1A1A1A"],
  },
  {
    id: "b14",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    price: 5.75,
    originalPrice: 11.50,
    condition: "Fair",
    genre: "Science",
    description:
      "Stephen Hawking's classic exploration of the cosmos, from the Big Bang to black holes. Made complex physics accessible to millions of readers worldwide.",
    sellerId: "u7",
    location: { city: "Zahle", lat: 33.8463, lng: 35.9020 },
    listedDate: "2026-01-18",
    isbn: "978-055-338-016-3",
    pages: 212,
    language: "English",
    publishedYear: 1988,
    coverGradient: ["#1A2A4A", "#0D1525"],
  },
  {
    id: "b15",
    title: "Laut Bercerita",
    author: "Leila S. Chudori",
    price: 5.25,
    originalPrice: 9.99,
    condition: "Like New",
    genre: "Fiction",
    description:
      "A powerful novel about activism and the dark period of Indonesian history in the late 1990s. Beautifully written and deeply moving.",
    sellerId: "u1",
    location: { city: "Beirut", lat: 33.8938, lng: 35.5018 },
    listedDate: "2026-02-08",
    isbn: "978-602-291-662-5",
    pages: 394,
    language: "Indonesian",
    publishedYear: 2017,
    coverGradient: ["#4A8EB5", "#2A5E7A"],
  },
  {
    id: "b16",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    price: 8.99,
    originalPrice: 17.50,
    condition: "Good",
    genre: "Technology",
    description:
      "Updated 20th anniversary edition of the classic guide for developers. Packed with practical advice for crafting better software. Light pencil markings.",
    sellerId: "u6",
    location: { city: "Byblos", lat: 34.1236, lng: 35.6511 },
    listedDate: "2026-01-28",
    isbn: "978-013-595-705-9",
    pages: 352,
    language: "English",
    publishedYear: 2019,
    coverGradient: ["#3D7A3D", "#255A25"],
  },
  {
    id: "b17",
    title: "Educated",
    author: "Tara Westover",
    price: 4.25,
    originalPrice: 9.50,
    condition: "Good",
    genre: "Biography",
    description:
      "A memoir about growing up in a survivalist family and the transformative power of education. One of the most compelling memoirs of the decade.",
    sellerId: "u3",
    location: { city: "Jounieh", lat: 33.9808, lng: 35.6178 },
    listedDate: "2026-02-10",
    isbn: "978-039-959-050-4",
    pages: 334,
    language: "English",
    publishedYear: 2018,
    coverGradient: ["#B5834A", "#7A5530"],
  },
  {
    id: "b18",
    title: "Perahu Kertas",
    author: "Dee Lestari",
    price: 3.75,
    originalPrice: 7.99,
    condition: "Good",
    genre: "Romance",
    description:
      "A beautiful love story intertwined with the pursuit of artistic dreams. A modern Indonesian romance that captures the spirit of young creativity.",
    sellerId: "u8",
    location: { city: "Beirut", lat: 33.8938, lng: 35.5018 },
    listedDate: "2025-12-22",
    isbn: "978-979-018-212-2",
    pages: 444,
    language: "Indonesian",
    publishedYear: 2009,
    coverGradient: ["#D97A8A", "#A04A5A"],
  },
  {
    id: "b19",
    title: "The Art of War",
    author: "Sun Tzu",
    price: 2.50,
    originalPrice: 5.50,
    condition: "Fair",
    genre: "Philosophy",
    description:
      "The ancient Chinese military treatise that remains relevant in business and strategy today. Compact edition with modern commentary.",
    sellerId: "u4",
    location: { city: "Sidon", lat: 33.5633, lng: 35.3686 },
    listedDate: "2026-01-12",
    isbn: "978-159-030-893-1",
    pages: 68,
    language: "English",
    publishedYear: 500,
    coverGradient: ["#8B1A1A", "#5A0D0D"],
  },
  {
    id: "b20",
    title: "Cosmos",
    author: "Carl Sagan",
    price: 5.50,
    originalPrice: 10.99,
    condition: "Good",
    genre: "Science",
    description:
      "Carl Sagan's timeless exploration of the universe and our place within it. A beautifully written journey through space and time that inspires wonder.",
    sellerId: "u5",
    location: { city: "Batroun", lat: 34.2553, lng: 35.6581 },
    listedDate: "2026-02-02",
    isbn: "978-034-553-903-2",
    pages: 396,
    language: "English",
    publishedYear: 1980,
    coverGradient: ["#2A2A6B", "#15153A"],
  },
]

// ============================================================
// Reviews
// ============================================================

export const reviews: Review[] = [
  { id: "r1", fromUserId: "u2", toUserId: "u1", rating: 5, comment: "Excellent seller! Book was exactly as described. Fast response and friendly communication.", date: "2026-01-05" },
  { id: "r2", fromUserId: "u3", toUserId: "u1", rating: 5, comment: "Great condition book, very happy with the trade. Would definitely trade again!", date: "2025-12-20" },
  { id: "r3", fromUserId: "u4", toUserId: "u1", rating: 4, comment: "Good experience overall. Book had slightly more wear than expected but still a fair deal.", date: "2025-11-15" },
  { id: "r4", fromUserId: "u1", toUserId: "u2", rating: 5, comment: "Super fast delivery and the book was in pristine condition. Highly recommended!", date: "2026-01-12" },
  { id: "r5", fromUserId: "u5", toUserId: "u2", rating: 4, comment: "Good seller, fair prices. The book was well-packaged.", date: "2025-12-28" },
  { id: "r6", fromUserId: "u1", toUserId: "u3", rating: 5, comment: "Best trader on the platform! Books are always exactly as described.", date: "2026-01-18" },
  { id: "r7", fromUserId: "u2", toUserId: "u3", rating: 5, comment: "Incredible collection and very generous with pricing. A true book lover!", date: "2025-12-15" },
  { id: "r8", fromUserId: "u7", toUserId: "u3", rating: 5, comment: "Siti is amazing! Quick responses and the book arrived beautifully wrapped.", date: "2026-02-01" },
  { id: "r9", fromUserId: "u6", toUserId: "u3", rating: 4, comment: "Great communication and fair pricing. Will trade again.", date: "2025-11-30" },
  { id: "r10", fromUserId: "u1", toUserId: "u4", rating: 4, comment: "Good trade experience. Ahmad was easy to deal with.", date: "2026-01-22" },
  { id: "r11", fromUserId: "u3", toUserId: "u5", rating: 5, comment: "Dewi is wonderful! The book was in better condition than expected.", date: "2026-01-08" },
  { id: "r12", fromUserId: "u8", toUserId: "u7", rating: 5, comment: "Maya is the best! Super quick replies and great book condition.", date: "2025-12-10" },
  { id: "r13", fromUserId: "u5", toUserId: "u7", rating: 5, comment: "Perfect trade from start to finish. Highly recommended seller.", date: "2026-01-30" },
  { id: "r14", fromUserId: "u7", toUserId: "u8", rating: 4, comment: "Good seller. Book condition was as described. Smooth transaction.", date: "2026-02-05" },
  { id: "r15", fromUserId: "u2", toUserId: "u6", rating: 4, comment: "Nice trading experience. Reza was responsive and honest about book condition.", date: "2026-01-15" },
]

// ============================================================
// Conversations (current user is "u1" - Rina Wijaya)
// ============================================================

export const currentUserId = "u1"

export const conversations: Conversation[] = [
  {
    id: "c1",
    participants: ["u1", "u2"],
    bookId: "b2",
    messages: [
      { id: "m1", senderId: "u1", content: "Hi! Is the Sapiens book still available?", timestamp: "2026-02-10T10:30:00", read: true },
      { id: "m2", senderId: "u2", content: "Yes, it is! Are you interested?", timestamp: "2026-02-10T10:35:00", read: true },
      { id: "m3", senderId: "u1", content: "Definitely! Would you consider $6.50?", timestamp: "2026-02-10T10:40:00", read: true },
      { id: "m4", senderId: "u2", content: "I can do $7.00. It is really in great condition, barely read!", timestamp: "2026-02-10T10:45:00", read: true },
      { id: "m5", senderId: "u1", content: "Deal! How should we arrange the exchange?", timestamp: "2026-02-10T10:50:00", read: true },
      { id: "m6", senderId: "u2", content: "I can meet at the bookstore near Braga Street this weekend. Would Saturday at 2pm work?", timestamp: "2026-02-10T11:00:00", read: false },
    ],
    lastMessage: "I can meet at the bookstore near Braga Street this weekend. Would Saturday at 2pm work?",
    lastTimestamp: "2026-02-10T11:00:00",
    unreadCount: 1,
  },
  {
    id: "c2",
    participants: ["u1", "u3"],
    bookId: "b4",
    messages: [
      { id: "m7", senderId: "u3", content: "Hi Rina! I saw you were interested in Bumi Manusia. Would you like to trade for one of your books?", timestamp: "2026-02-09T14:00:00", read: true },
      { id: "m8", senderId: "u1", content: "That sounds great! Which book are you interested in?", timestamp: "2026-02-09T14:15:00", read: true },
      { id: "m9", senderId: "u3", content: "I would love to get The Alchemist! We could do a direct swap.", timestamp: "2026-02-09T14:20:00", read: true },
      { id: "m10", senderId: "u1", content: "Perfect trade! Let me know when you are free.", timestamp: "2026-02-09T14:30:00", read: true },
    ],
    lastMessage: "Perfect trade! Let me know when you are free.",
    lastTimestamp: "2026-02-09T14:30:00",
    unreadCount: 0,
  },
  {
    id: "c3",
    participants: ["u1", "u7"],
    bookId: "b9",
    messages: [
      { id: "m11", senderId: "u1", content: "Hey Maya! Love your collection. Is Norwegian Wood still up for trade?", timestamp: "2026-02-08T09:00:00", read: true },
      { id: "m12", senderId: "u7", content: "Hi Rina! Yes it is. I am a huge Murakami fan but I have two copies now.", timestamp: "2026-02-08T09:10:00", read: true },
      { id: "m13", senderId: "u1", content: "Amazing! Can we do $4.50?", timestamp: "2026-02-08T09:15:00", read: true },
      { id: "m14", senderId: "u7", content: "How about $4.75? It is really like new!", timestamp: "2026-02-08T09:20:00", read: true },
      { id: "m15", senderId: "u1", content: "Sounds fair. Deal!", timestamp: "2026-02-08T09:25:00", read: true },
    ],
    lastMessage: "Sounds fair. Deal!",
    lastTimestamp: "2026-02-08T09:25:00",
    unreadCount: 0,
  },
  {
    id: "c4",
    participants: ["u1", "u5"],
    bookId: "b12",
    messages: [
      { id: "m16", senderId: "u5", content: "Hi! Are you interested in Cantik Itu Luka? I noticed you like Indonesian literature.", timestamp: "2026-02-11T16:00:00", read: false },
      { id: "m17", senderId: "u5", content: "I can offer a great price since you are a frequent trader!", timestamp: "2026-02-11T16:05:00", read: false },
    ],
    lastMessage: "I can offer a great price since you are a frequent trader!",
    lastTimestamp: "2026-02-11T16:05:00",
    unreadCount: 2,
  },
]

// ============================================================
// Auto-reply messages for chat simulation
// ============================================================

export const autoReplies = [
  "Sounds good to me!",
  "Let me think about it and get back to you.",
  "That works! When are you free to meet?",
  "I can do that price. Should we arrange a meetup?",
  "Great choice! The book is in excellent condition.",
  "How about we meet at the local coffee shop?",
  "I also have other books you might like!",
  "Thanks for your interest! Let me check my schedule.",
  "Would you be open to a direct trade instead?",
  "Perfect! I will keep it reserved for you.",
]

// ============================================================
// Testimonials for landing page
// ============================================================

export const testimonials = [
  {
    name: "Rina Wijaya",
    location: "Beirut",
    avatar: "RW",
    quote: "I have saved over $200 buying books through KitaBook. The community here is so friendly and trustworthy!",
  },
  {
    name: "Budi Santoso",
    location: "Tripoli",
    avatar: "BS",
    quote: "As a student, KitaBook has been a lifesaver. I get all my textbooks at half price and can sell them when the semester ends.",
  },
  {
    name: "Siti Nurhaliza",
    location: "Jounieh",
    avatar: "SN",
    quote: "I love the trading feature! I have exchanged over 60 books and met amazing fellow readers through this platform.",
  },
]

// ============================================================
// Utility Functions
// ============================================================

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id)
}

export function getBookById(id: string): Book | undefined {
  return books.find((b) => b.id === id)
}

export function getBooksBySeller(sellerId: string): Book[] {
  return books.filter((b) => b.sellerId === sellerId)
}

export function getBooksByCity(city: string): Book[] {
  if (city === "All Cities") return books
  return books.filter((b) => b.location.city === city)
}

export function getBooksByGenre(genre: Genre): Book[] {
  return books.filter((b) => b.genre === genre)
}

export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase()
  return books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.genre.toLowerCase().includes(q)
  )
}

export function getReviewsForUser(userId: string): Review[] {
  return reviews.filter((r) => r.toUserId === userId)
}

export function getSimilarBooks(bookId: string, limit = 4): Book[] {
  const book = getBookById(bookId)
  if (!book) return []
  return books
    .filter((b) => b.id !== bookId && b.genre === book.genre)
    .slice(0, limit)
}

export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return Math.round(R * c)
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

export function getTimeAgo(dateString: string): string {
  const now = new Date("2026-02-13")
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Yesterday"
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

export function getMessageTime(timestamp: string): string {
  return new Date(timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
}

export const genres: Genre[] = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Romance",
  "Technology",
  "Philosophy",
  "Self-Help",
  "Biography",
  "Fantasy",
]

export const conditions: BookCondition[] = ["Like New", "Good", "Fair"]
