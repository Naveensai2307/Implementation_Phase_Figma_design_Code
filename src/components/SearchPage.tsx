import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Search, Filter, TrendingUp, Clock, Star, Users, BookOpen } from 'lucide-react';
import { getAllCourses } from '../data/coursesData';

export function SearchPage({ searchQuery, onSearchChange, onBack, onNavigate }) {
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    'Python programming', 'Machine Learning', 'UI Design', 'Data Science', 'React'
  ]);

  // Get all courses data for searching
  const allCourses = getAllCourses().map(course => ({
    ...course,
    // Ensure all required properties exist with defaults
    subtitle: course.subtitle || course.description || '',
    category: course.category || 'General',
    instructor: course.instructor || 'Unknown Instructor',
    type: (course.isFree === false || course.isPaid === true) ? 'Paid' : 'Free',
    price: (course.isFree === false || course.isPaid === true) ? `$${course.price}` : 'Free',
    tags: generateTags(course),
    students: course.students || Math.floor(Math.random() * 20000) + 5000,
    lessons: course.lessons?.length || 0
  }));

  // Generate search tags for each course
  function generateTags(course) {
    const baseTags = [
      course.title?.toLowerCase().split(' ') || [],
      course.subtitle?.toLowerCase().split(' ') || [],
      course.category?.toLowerCase().split(' ') || [],
      course.instructor?.toLowerCase().split(' ') || []
    ].flat();
    
    // Add category-specific tags
    const categoryTags = {
      'Programming': ['coding', 'development', 'software', 'computer science'],
      'Data Science': ['analytics', 'statistics', 'visualization', 'python'],
      'Data Analytics': ['excel', 'analysis', 'business intelligence', 'reporting'],
      'AI & ML': ['artificial intelligence', 'machine learning', 'algorithms', 'neural networks'],
      'Math': ['mathematics', 'calculus', 'algebra', 'statistics'],
      'Design': ['ui', 'ux', 'interface', 'graphics'],
      'Languages': ['speaking', 'conversation', 'fluency', 'communication']
    };
    
    return [...baseTags, ...(categoryTags[course.category] || [])].filter(tag => tag && tag.length > 2);
  }

  const trendingSearches = [
    'Machine Learning', 'Python Programming', 'Data Science', 'Excel Mastery',
    'NumPy', 'Pandas', 'SQL for Data Analysis', 'Power BI', 'Data Structures'
  ];

  const categories = ['All', 'Programming', 'Data Science', 'Data Analytics', 'AI & ML', 'Languages', 'Math', 'Design'];
  const priceFilters = ['All', 'Free', 'Paid'];
  const ratingFilters = ['All', '4.5+', '4.7+', '4.8+'];

  // Search function
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    setTimeout(() => {
      const filtered = allCourses.filter(course => {
        const searchTerms = query.toLowerCase().split(' ');
        return searchTerms.some(term => 
          (course.title?.toLowerCase() || '').includes(term) ||
          (course.subtitle?.toLowerCase() || '').includes(term) ||
          (course.category?.toLowerCase() || '').includes(term) ||
          (course.tags || []).some(tag => tag && tag.includes(term)) ||
          (course.instructor?.toLowerCase() || '').includes(term)
        );
      });
      
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  // Handle search input change
  useEffect(() => {
    performSearch(localQuery);
    onSearchChange(localQuery);
  }, [localQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localQuery.trim() && !recentSearches.includes(localQuery.trim())) {
      setRecentSearches(prev => [localQuery.trim(), ...prev.slice(0, 4)]);
    }
    performSearch(localQuery);
  };

  const handleTrendingClick = (term) => {
    setLocalQuery(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-4xl mx-auto bg-white min-h-screen pb-20">
        {/* Header */}
        <div className="flex items-center gap-4 p-4 lg:p-6 border-b border-gray-100">
          <button onClick={onBack} className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          
          <form onSubmit={handleSearchSubmit} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search courses, instructors, topics..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                className="pl-10 pr-4 h-12 bg-gray-50 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </form>
          
          <button className="hover:bg-gray-100 p-2 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-4 lg:p-6 space-y-6">
          {/* Show trending/recent when no search query */}
          {!localQuery.trim() && (
            <>
              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="font-semibold">Trending Searches</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((term, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => handleTrendingClick(term)}
                      className="h-9 px-4 rounded-full border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-sm"
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-5 h-5 text-gray-500" />
                    <h3 className="font-semibold">Recent Searches</h3>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => setLocalQuery(term)}
                        className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Categories */}
              <div>
                <h3 className="font-semibold mb-4">Popular Categories</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {categories.slice(1).map((category, index) => (
                    <Card
                      key={index}
                      className="p-4 text-center cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => setLocalQuery(category)}
                    >
                      <div className="text-2xl mb-2">
                        {category === 'Programming' ? '💻' :
                         category === 'Data Science' ? '📊' :
                         category === 'AI & ML' ? '🤖' :
                         category === 'Languages' ? '🌍' :
                         category === 'Math' ? '🔢' : '🎨'}
                      </div>
                      <p className="text-sm font-medium">{category}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Search Results */}
          {localQuery.trim() && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  {isSearching ? 'Searching...' : `${searchResults.length} results for "${localQuery}"`}
                </h3>
                {searchResults.length > 0 && (
                  <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
                    <option>Most Relevant</option>
                    <option>Highest Rated</option>
                    <option>Most Popular</option>
                    <option>Newest</option>
                  </select>
                )}
              </div>

              {isSearching ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4 rounded-2xl animate-pulse">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-xl"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  {searchResults.map((course) => (
                    <Card
                      key={course.id}
                      className="p-4 lg:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                      onClick={() => onNavigate('courseDetails', course)}
                    >
                      <div className="flex gap-4">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                          <span className="text-2xl lg:text-3xl">
                            {course.category === 'Programming' ? '💻' :
                             course.category === 'Data Science' ? '📊' :
                             course.category === 'AI & ML' ? '🤖' :
                             course.category === 'Languages' ? '🌍' :
                             course.category === 'Math' ? '🔢' : '🎨'}
                          </span>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-lg lg:text-xl mb-1">{course.title}</h4>
                              <p className="text-gray-600 text-sm lg:text-base">{course.subtitle}</p>
                            </div>
                            <Badge className={`ml-2 ${
                              course.type === 'Free' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {course.price}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                            <span>👥 {course.students.toLocaleString()}</span>
                            <span>📚 {course.lessons} lessons</span>
                            <span>⏱️ {course.duration}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-600">By {course.instructor}</p>
                            <Button className="h-8 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm">
                              View Course
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    Try searching with different keywords or browse our popular categories
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {trendingSearches.slice(0, 4).map((term, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleTrendingClick(term)}
                        className="rounded-full"
                      >
                        {term}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}