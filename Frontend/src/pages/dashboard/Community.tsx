import { useState, useEffect } from 'react';

// Define user type
const users = {
  "user1": {
    id: "user1",
    name: "Suraj Kumar Biswas",
    avatar: "SK",
    role: "Organic Farmer",
    location: "West Bengal, India"
  },
  "user2": {
    id: "user2",
    name: "Sayanika Raha",
    avatar: "SR",
    role: "Vineyard Owner",
    location: "West Bengal, India"
  },
  "user3": {
    id: "user3",
    name: "Sayantan Dev",
    avatar: "SD",
    role: "Sustainable Agriculture Expert",
    location: "Gujarat, India"
  },
  "user4": {
    id: "user4",
    name: "Debashmita",
    avatar: "DB",
    role: "Urban Farmer",
    location: "Odisha, India"
  }
};

// Sample posts
const samplePosts = [
  {
    id: "post1",
    userId: "user2",
    content: "Just harvested our first batch of organic grapes for the season! The drought-resistant varieties we planted last year are showing great promise with 30% less water consumption.",
    images: ["https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop"],
    likes: 45,
    comments: 12,
    timestamp: new Date(2025, 8, 20, 9, 30),
    tags: ["OrganicFarming", "Vineyard", "WaterConservation"]
  },
  {
    id: "post2",
    userId: "user3",
    content: "I'm testing a new companion planting technique with marigolds to repel pests naturally in my tomato fields. After 3 weeks, I'm seeing significantly fewer aphids. Has anyone else tried this combination?",
    likes: 32,
    comments: 24,
    timestamp: new Date(2025, 8, 19, 7, 15),
    tags: ["CompanionPlanting", "PestControl", "OrganicFarming"]
  },
  {
    id: "post3",
    userId: "user4",
    content: "My vertical hydroponic system is thriving on the rooftop! We've managed to grow 200kg of leafy greens in just 50 square meters. Urban farming is the future of sustainable food production in metropolitan areas.",
    images: ["https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"],
    likes: 67,
    comments: 18,
    timestamp: new Date(2025, 8, 18, 12, 45),
    tags: ["UrbanFarming", "Hydroponics", "FoodSecurity"]
  },
  {
    id: "post4",
    userId: "user1",
    content: "Weather alert! Heavy rainfall expected in the region next week. I'm preparing my fields by clearing drainage channels and delaying the fertilizer application. Stay safe, fellow farmers!",
    likes: 28,
    comments: 9,
    timestamp: new Date(2025, 8, 17, 15, 20),
    tags: ["WeatherAlert", "FarmManagement", "SoilConservation"]
  }
];

// Sample trending topics
const trendingTopics = [
  { id: "1", name: "DroughtResistantCrops", posts: 1243 },
  { id: "2", name: "RegenerativeAgriculture", posts: 856 },
  { id: "3", name: "SmartIrrigation", posts: 742 },
  { id: "4", name: "FarmTech2025", posts: 621 },
  { id: "5", name: "OrganicCertification", posts: 519 }
];

// Sample events
const upcomingEvents = [
  { id: "1", name: "Midwest Farming Expo", date: "Oct 25, 2025", location: "Chicago, IL" },
  { id: "2", name: "Sustainable Soil Workshop", date: "Nov 3, 2025", location: "Virtual Event" },
  { id: "3", name: "Organic Farmers Market", date: "Nov 10, 2025", location: "Denver, CO" }
];

// Agricultural tips data
const agricultureTips = [
  "Consider applying mulch around your vegetable plants to retain soil moisture as temperatures rise.",
  "Monitor for pest infestations - early detection is key to effective management.",
  "Check soil pH levels regularly. Ideal range for most crops is 6.0-7.0.",
  "Rotate your crops to maintain soil health and reduce pest buildup.",
  "Use companion planting to naturally deter pests and improve crop yields.",
  "Ensure proper drainage to prevent waterlogging during heavy rainfall.",
  "Apply organic fertilizers during the growing season for better soil health.",
  "Harvest early morning for better crop quality and longer storage life."
];

// SVG icons as components
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconNetwork = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconCrops = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const IconHeart = ({ filled }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className="h-5 w-5" 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor" 
    strokeWidth="2"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function AgriGram() {
  const [currentUser] = useState(users.user1);
  const [posts, setPosts] = useState(samplePosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [activeTab, setActiveTab] = useState('feed');
  const [likedPosts, setLikedPosts] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [locationData, setLocationData] = useState(null);
  const [currentTips, setCurrentTips] = useState([]);
  const [agricultureNews, setAgricultureNews] = useState([]);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const WEATHER_API_KEY = "15a089805b00267c8ec096f2affffe39";
  const APITUBE_API_KEY = "api_live_5n4rk59DIdshFHqteYbRv5YvEAlLGL3xMvjzjCKt5jnCaO";

  // Get user location and fetch weather data
  useEffect(() => {
    const getLocationAndWeather = async () => {
      try {
        // Get user location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              // Reverse geocoding to get location name
              const locationResponse = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${WEATHER_API_KEY}`
              );
              const locationInfo = await locationResponse.json();
              
              if (locationInfo.length > 0) {
                const location = {
                  name: locationInfo[0].name,
                  state: locationInfo[0].state || locationInfo[0].country,
                  country: locationInfo[0].country
                };
                setLocationData(location);
                
                // Fetch weather data
                const weatherResponse = await fetch(
                  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
                );
                const weatherInfo = await weatherResponse.json();
                setWeatherData(weatherInfo);
              }
              setIsLoadingWeather(false);
            },
            (error) => {
              console.error("Location access denied:", error);
              // Fallback to default location (Kolkata)
              fetchDefaultWeather();
            }
          );
        } else {
          fetchDefaultWeather();
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
        setIsLoadingWeather(false);
      }
    };

    const fetchDefaultWeather = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Kolkata,IN&appid=${WEATHER_API_KEY}&units=metric`
        );
        const weatherInfo = await weatherResponse.json();
        setWeatherData(weatherInfo);
        setLocationData({ name: "Kolkata", state: "West Bengal", country: "IN" });
      } catch (error) {
        console.error("Error fetching default weather:", error);
      }
      setIsLoadingWeather(false);
    };

    getLocationAndWeather();
  }, []);

  // Fetch agriculture news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Mock news data since the API might not be directly accessible in this environment
        const mockNews = [
          {
            id: 1,
            title: "Revolutionary Drought-Resistant Crops Show Promise in Climate Change Battle",
            summary: "Scientists develop new varieties that can survive extended dry periods.",
            source: "AgriTech Today",
            publishedAt: new Date().toISOString(),
            url: "#"
          },
          {
            id: 2,
            title: "Smart Farming Technology Reduces Water Usage by 40%",
            summary: "IoT sensors and AI-driven irrigation systems transforming agriculture.",
            source: "Farm Innovation",
            publishedAt: new Date(Date.now() - 86400000).toISOString(),
            url: "#"
          },
          {
            id: 3,
            title: "Organic Food Market Reaches Record High Demand",
            summary: "Consumer preference for organic products drives market growth.",
            source: "Agricultural Economics",
            publishedAt: new Date(Date.now() - 172800000).toISOString(),
            url: "#"
          },
          {
            id: 4,
            title: "New Pest Management Strategies Reduce Chemical Pesticide Use",
            summary: "Integrated pest management approaches gain popularity among farmers.",
            source: "Sustainable Agriculture",
            publishedAt: new Date(Date.now() - 259200000).toISOString(),
            url: "#"
          }
        ];
        
        setAgricultureNews(mockNews);
        setIsLoadingNews(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  // Generate random tips
  useEffect(() => {
    const getRandomTips = () => {
      const shuffled = [...agricultureTips].sort(() => 0.5 - Math.random());
      setCurrentTips(shuffled.slice(0, 3));
    };
    
    getRandomTips();
    // Update tips every 5 minutes
    const interval = setInterval(getRandomTips, 300000);
    return () => clearInterval(interval);
  }, []);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);
      const imageUrls = files.map(file => URL.createObjectURL(file));
    setSelectedImages(prev => [...prev, ...imageUrls]);
  };

  // Remove selected image
  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Handle posting new content
  const handlePost = () => {
    if (!newPostContent.trim() && selectedImages.length === 0) return;
    
    const newPost = {
      id: `post${Date.now()}`,
      userId: currentUser.id,
      content: newPostContent,
      images: selectedImages.length > 0 ? selectedImages : undefined,
      likes: 0,
      comments: 0,
      timestamp: new Date(),
      tags: extractHashtags(newPostContent)
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setSelectedImages([]);
  };

  // Extract hashtags from content
  const extractHashtags = (content) => {
    const hashtagRegex = /#(\w+)/g;
    const matches = content.match(hashtagRegex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };

  // Handle liking a post
  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const wasLiked = prev[postId];
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
      
      return { ...prev, [postId]: !wasLiked };
    });
  };

  // Format timestamp
  const formatTimestamp = (date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes}m ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get weather icon
  const getWeatherIcon = (weatherCode, isDay = true) => {
    if (weatherCode >= 200 && weatherCode < 300) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          <polyline points="13 11 9 17 11 17 7 23"/>
        </svg>
      );
    } else if (weatherCode >= 300 && weatherCode < 600) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          <polyline points="16 13 16 16 19 16"/>
        </svg>
      );
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          <circle cx="12" cy="17" r="1"/>
          <circle cx="9" cy="20" r="1"/>
          <circle cx="15" cy="20" r="1"/>
        </svg>
      );
    } else if (weatherCode >= 801) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      );
    }
  };

  // Post component
  const PostCard = ({ post }) => (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 pt-4 pb-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold">{users[post.userId].avatar}</span>
        </div>
        <div>
          <p className="font-medium text-green-800">{users[post.userId].name}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {users[post.userId].role} • {formatTimestamp(post.timestamp)}
          </p>
        </div>
      </div>
      
      <div className="px-4 py-2">
        <p className="text-sm text-gray-800 whitespace-pre-wrap">{post.content}</p>
        
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.map((tag, index) => (
              <span key={index} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        {post.images && post.images.length > 0 && (
          <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: post.images.length === 1 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))' }}>
            {post.images.map((img, index) => (
              <img 
                key={index} 
                src={img} 
                alt="Post image" 
                className="rounded-lg max-h-64 w-full object-cover" 
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="px-4 py-3 border-t border-green-50 flex justify-between">
        <button 
          onClick={() => handleLike(post.id)}
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm ${
            likedPosts[post.id] ? 'text-green-600 font-medium' : 'text-gray-600'
          }`}
        >
          <IconHeart filled={likedPosts[post.id]} />
          {post.likes}
        </button>
        <button className="flex items-center gap-1 text-gray-600 px-2 py-1 rounded-lg text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
          {post.comments}
        </button>
        <button className="flex items-center gap-1 text-gray-600 px-2 py-1 rounded-lg text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
          Share
        </button>
        <button className="flex items-center gap-1 text-gray-600 px-2 py-1 rounded-lg text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-green-50 overflow-hidden">
      {/* Header */}
      <header className="bg-green-500 text-white px-5 py-3 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
            <path d="M16.5 3.5c1.5 1.5 1.5 4.5 0 6S13 6.5 13 5s2-3 3.5-1.5z" />
          </svg>
          <span className="font-bold text-lg">AgriGram</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="bg-green-600 text-white placeholder-green-200 px-3 py-1 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-white"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute right-2 top-2 text-green-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 h-full max-w-6xl mx-auto w-full p-4 gap-4 overflow-hidden">
        {/* Left Sidebar */}
        <div className="hidden md:block w-60 bg-white rounded-xl p-4 shadow-sm h-fit sticky top-4">
          <div className="flex flex-col items-center mb-6 pb-4 border-b border-green-100">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-2">
              <span className="text-white text-xl font-semibold">{currentUser.avatar}</span>
            </div>
            <h2 className="font-medium text-green-800">{currentUser.name}</h2>
            <p className="text-xs text-gray-500">{currentUser.role}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {currentUser.location}
            </p>
          </div>
          
          <h3 className="text-green-800 mb-2 text-sm font-medium">Navigation</h3>
          <ul className="space-y-1 mb-6">
            <li className="p-2 rounded-lg cursor-pointer text-xs text-gray-700 hover:bg-green-50">
              🚜 Modern Farm Equipment
            </li>
            <li className="p-2 rounded-lg cursor-pointer text-xs text-gray-700 hover:bg-green-50">
              🌿 Organic Certification Group
            </li>
            <li className="p-2 rounded-lg cursor-pointer text-xs text-gray-700 hover:bg-green-50">
              💧 Irrigation Technology
            </li>
          </ul>
        </div>

        {/* Main Feed */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="bg-white rounded-t-xl overflow-hidden shadow-sm mb-4 sticky top-0 z-10">
            <div className="flex">
              <button 
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'feed' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-green-50'}`}
                onClick={() => setActiveTab('feed')}
              >
                Feed
              </button>
              <button 
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'trending' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-green-50'}`}
                onClick={() => setActiveTab('trending')}
              >
                Trending Topics
              </button>
              <button 
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'events' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-green-50'}`}
                onClick={() => setActiveTab('events')}
              >
                Events
              </button>
              <button 
                className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'news' ? 'text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:bg-green-50'}`}
                onClick={() => setActiveTab('news')}
              >
                Agri News
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className="overflow-y-auto flex-1 pb-16 md:pb-4">
            {/* New Post Input */}
            <div className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{currentUser.avatar}</span>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your farming updates, tips, or questions..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full border border-green-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[80px] text-sm"
                  />
                  
                  {/* Selected Images Preview */}
                  {selectedImages.length > 0 && (
                    <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
                      {selectedImages.map((img, index) => (
                        <div key={index} className="relative">
                          <img 
                            src={img} 
                            alt="Selected" 
                            className="w-full h-24 object-cover rounded-lg" 
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1 text-green-700 hover:bg-green-50 px-2 py-1 rounded-lg text-sm cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                        Photo
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageSelect}
                          className="hidden"
                        />
                      </label>
                      <button className="flex items-center gap-1 text-green-700 hover:bg-green-50 px-2 py-1 rounded-lg text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        Location
                      </button>
                      <button className="flex items-center gap-1 text-green-700 hover:bg-green-50 px-2 py-1 rounded-lg text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        Tag
                      </button>
                    </div>
                    <button
                      onClick={handlePost}
                      disabled={!newPostContent.trim() && selectedImages.length === 0}
                      className={`px-4 py-1 rounded-lg ${
                        (newPostContent.trim() || selectedImages.length > 0)
                          ? 'bg-green-500 text-white hover:bg-green-600' 
                          : 'bg-gray-100 text-gray-400'
                      } transition-colors text-sm font-medium`}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Feed Content */}
            {activeTab === 'feed' && (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
            
            {/* Trending Topics */}
            {activeTab === 'trending' && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-lg font-medium text-green-800 mb-4">Trending in Agriculture</h2>
                <div className="space-y-4">
                  {trendingTopics.map((topic) => (
                    <div key={topic.id} className="flex items-center justify-between p-3 hover:bg-green-50 rounded-lg cursor-pointer">
                      <div>
                        <p className="font-medium text-green-700">#{topic.name}</p>
                        <p className="text-xs text-gray-500">{topic.posts} posts</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Events */}
            {activeTab === 'events' && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-green-800">Upcoming Agricultural Events</h2>
                  <button className="text-green-600 hover:bg-green-50 p-1 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border border-green-100 rounded-lg p-4 hover:bg-green-50">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-green-800">{event.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                        </div>
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm font-medium h-fit">
                          {event.date}
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <button className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-green-600 transition-colors">
                          RSVP
                        </button>
                        <button className="border border-green-500 text-green-500 px-3 py-1 rounded-lg text-sm hover:bg-green-50 transition-colors">
                          Share
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agriculture News */}
            {activeTab === 'news' && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <h2 className="text-lg font-medium text-green-800 mb-4">Latest Agriculture News</h2>
                {isLoadingNews ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading news...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {agricultureNews.map((article) => (
                      <div key={article.id} className="border-b border-green-100 pb-4 last:border-b-0">
                        <h3 className="font-medium text-green-800 mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{article.summary}</p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>{article.source}</span>
                          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Right Sidebar - Weather and Tips */}
        <div className="hidden lg:block w-72 space-y-4">
          {/* Weather Widget */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-green-800">Weather Forecast</h3>
              <span className="text-xs text-gray-500">
                {locationData ? `${locationData.name}, ${locationData.state}` : 'Loading...'}
              </span>
            </div>
            {isLoadingWeather ? (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500 mx-auto"></div>
              </div>
            ) : weatherData && weatherData.list ? (
              <>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    {getWeatherIcon(weatherData.list[0].weather[0].id)}
                    <div>
                      <p className="text-3xl font-semibold text-gray-800">
                        {Math.round(weatherData.list[0].main.temp)}°C
                      </p>
                      <p className="text-xs text-gray-500">
                        {weatherData.list[0].weather[0].description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Wind: {Math.round(weatherData.list[0].wind.speed)} m/s</p>
                    <p className="text-sm">Humidity: {weatherData.list[0].main.humidity}%</p>
                  </div>
                </div>
                <div className="flex justify-between mt-4 pt-2 border-t border-green-100">
                  {weatherData.list.slice(1, 6).map((forecast, index) => {
                    const date = new Date(forecast.dt * 1000);
                    const dayName = date.toLocaleDateString('en', { weekday: 'short' });
                    return (
                      <div key={index} className="text-center">
                        <p className="text-xs text-gray-500">{dayName}</p>
                        <div className="flex justify-center my-1 h-6">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
                          </svg>
                        </div>
                        <p className="text-xs">{Math.round(forecast.main.temp)}°C</p>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="text-center py-4 text-gray-500">
                Unable to load weather data
              </div>
            )}
          </div>

          {/* Agriculture Tips */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-medium text-green-800 mb-3">Today's AgriTips</h3>
            <ul className="space-y-3">
              {currentTips.map((tip, index) => (
                <li key={index} className="text-sm flex gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <p>{tip}</p>
                </li>
              ))}
            </ul>
            <button className="w-full mt-3 text-center text-green-600 hover:underline text-sm">
              View more tips
            </button>
          </div>

          {/* Who to Follow */}
          <div className="bg-white rounded-xl shadow-sm p-4">
            <h3 className="font-medium text-green-800 mb-3">Connect with Farmers</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">AB</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Alex Brown</p>
                    <p className="text-xs text-gray-500">Dairy Farmer, WI</p>
                  </div>
                </div>
                <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">KL</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Kim Lee</p>
                    <p className="text-xs text-gray-500">Apple Orchard, WA</p>
                  </div>
                </div>
                <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600">
                  Connect
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">James Davis</p>
                    <p className="text-xs text-gray-500">Hemp Grower, CO</p>
                  </div>
                </div>
                <button className="text-xs bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600">
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Navigation Bar (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-green-100 px-2 py-2 flex justify-around items-center">
        <button className="p-1 rounded-full text-green-600">
          <IconHome />
        </button>
        <button className="p-1 rounded-full text-gray-400">
          <IconNetwork />
        </button>
        <button className="p-3 rounded-full bg-green-500 text-white shadow-lg -mt-5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
        <button className="p-1 rounded-full text-gray-400">
          <IconCrops />
        </button>
        <button className="p-1 rounded-full text-gray-400">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-800 font-semibold text-xs">{currentUser.avatar}</span>
          </div>
        </button>
      </div>
    </div>
  );
}